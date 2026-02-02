import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
};

interface AIResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
}

async function callLovableAI(systemPrompt: string, userPrompt: string, apiKey: string): Promise<string> {
  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Lovable AI error:", response.status, errorText);
    throw new Error(`Lovable AI failed: ${response.status}`);
  }

  const data: AIResponse = await response.json();
  const content = data.choices?.[0]?.message?.content;
  
  if (!content) {
    throw new Error("Empty response from Lovable AI");
  }
  
  return content;
}

async function callOpenAI(systemPrompt: string, userPrompt: string, apiKey: string): Promise<string> {
  console.log("Falling back to OpenAI API...");
  
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("OpenAI error:", response.status, errorText);
    throw new Error(`OpenAI failed: ${response.status}`);
  }

  const data: AIResponse = await response.json();
  const content = data.choices?.[0]?.message?.content;
  
  if (!content) {
    throw new Error("Empty response from OpenAI");
  }
  
  return content;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { productName, language } = await req.json();

    const lang = typeof language === "string" ? language.toLowerCase() : "en";
    const allowed = new Set(["en", "es", "pl", "ru", "pt"]);
    const selectedLang = allowed.has(lang) ? (lang as "en" | "es" | "pl" | "ru" | "pt") : "en";

    if (!productName || typeof productName !== "string") {
      return new Response(
        JSON.stringify({ error: "Nome do produto é obrigatório" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const fixedByLang: Record<"en" | "es" | "pl" | "ru" | "pt", { official: string; cod: string; add: string }> = {
      en: { official: "Official Site", cod: "Pay on Delivery", add: "Add to Cart" },
      es: { official: "Sitio Oficial", cod: "Pago Contra Entrega", add: "Añadir al Carrito" },
      pl: { official: "Oficjalna Strona", cod: "Płatność przy Odbiorze", add: "Dodaj do Koszyka" },
      ru: { official: "Официальный Сайт", cod: "Оплата при Доставке", add: "Добавить в Корзину" },
      pt: { official: "Site Oficial", cod: "Pague na Entrega", add: "Adicionar ao Carrinho" },
    };
    const fixed = fixedByLang[selectedLang];
    const product = productName.trim().slice(0, 80);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

    if (!LOVABLE_API_KEY && !OPENAI_API_KEY) {
      throw new Error("Nenhuma API key configurada (LOVABLE_API_KEY ou OPENAI_API_KEY)");
    }

    const systemPrompt = `Você é um especialista em Copywriting para Google Ads focado em conversão direta (COD) para produtos físicos (Nutra).
Objetivo: fundo de funil (alta intenção), com CTA claro, urgência e confiança (pagamento na entrega).
Idioma final: ${selectedLang}.

IMPORTANTE: Os títulos H1, H2 e H3 devem ser FIXOS:
- H1: "${product} | ${fixed.official}"
- H2: "${product} | ${fixed.cod}"  
- H3: "${product} | ${fixed.add}"

Retorne APENAS um JSON válido (sem markdown, sem \`\`\`json) com esta estrutura exata:
{
  "titulosFixados": { "h1": "...", "h2": "...", "h3": "..." },
  "titulosAcao": ["5 títulos de ação persuasivos"],
  "titulosOferta": ["5 títulos de oferta"],
  "titulosConfianca": ["8 títulos de confiança/COD"],
  "titulosUrgencia": ["2 títulos de urgência"],
  "descricoes": ["2 descrições completas mencionando ${product}"],
  "sitelinks": [
    { "titulo": "Compra", "descricoes": ["3 descrições"] },
    { "titulo": "Oferta", "descricoes": ["3 descrições"] },
    { "titulo": "Pagamento", "descricoes": ["3 descrições"] },
    { "titulo": "Garantia", "descricoes": ["3 descrições"] },
    { "titulo": "Entrega", "descricoes": ["3 descrições"] }
  ],
  "callouts": ["6 callouts"],
  "snippets": ["3 snippets"],
  "acao": "texto do botão de ação",
  "promocao": "texto promocional"
}`;

    const userPrompt = `Gere uma campanha completa de Google Ads para o produto: ${product}. Responda somente com JSON válido.`;

    let content: string;

    // Try Lovable AI first, fallback to OpenAI
    try {
      if (LOVABLE_API_KEY) {
        console.log("Trying Lovable AI (Gemini)...");
        content = await callLovableAI(systemPrompt, userPrompt, LOVABLE_API_KEY);
        console.log("Lovable AI success!");
      } else {
        throw new Error("LOVABLE_API_KEY not configured");
      }
    } catch (lovableError) {
      console.error("Lovable AI failed:", lovableError);
      
      if (OPENAI_API_KEY) {
        console.log("Falling back to OpenAI...");
        content = await callOpenAI(systemPrompt, userPrompt, OPENAI_API_KEY);
        console.log("OpenAI success!");
      } else {
        throw new Error("Ambas APIs falharam e OpenAI não está configurada como fallback");
      }
    }

    // Parse JSON response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("Invalid JSON response:", content);
      throw new Error("Formato de resposta inválido");
    }

    const campaign = JSON.parse(jsonMatch[0]);

    return new Response(
      JSON.stringify({ campaign }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
