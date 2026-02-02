import React, { useState } from 'react';
import { Copy, Check, Sparkles, Settings, Loader2, Zap, Globe, WifiOff } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';


interface CampaignData {
  titulosFixados: {
    h1: string;
    h2: string;
    h3: string;
  };
  titulosAcao: string[];
  titulosOferta: string[];
  titulosConfianca: string[];
  titulosUrgencia: string[];
  descricoes: string[];
  sitelinks: { titulo: string; descricoes: string[] }[];
  callouts: string[];
  snippets: string[];
  acao: string;
  promocao: string;
}

type CampaignLanguage = 'en' | 'es' | 'pl' | 'ru' | 'pt';

const languageLabels: Record<CampaignLanguage, string> = {
  en: 'English',
  es: 'Español',
  pl: 'Polski',
  ru: 'Русский',
  pt: 'Português (BR)',
};

const fixedTitlesByLang: Record<CampaignLanguage, { official: string; cod: string; add: string }> = {
  en: { official: 'Official Site', cod: 'Pay on Delivery', add: 'Add to Cart' },
  es: { official: 'Sitio Oficial', cod: 'Pago Contra Entrega', add: 'Añadir al Carrito' },
  pl: { official: 'Oficjalna Strona', cod: 'Płatność przy Odbiorze', add: 'Dodaj do Koszyka' },
  ru: { official: 'Официальный Сайт', cod: 'Оплата при Доставке', add: 'Добавить в Корзину' },
  pt: { official: 'Site Oficial', cod: 'Pague na Entrega', add: 'Adicionar ao Carrinho' },
};

const generateOfflineCampaign = (productName: string, language: CampaignLanguage): CampaignData => {
  const product = productName.trim();
  const fixed = fixedTitlesByLang[language];

  // NOTE: offline mode is template-based. Only replaces product name.
  // Copy itself is localized for the selected language.
  const templates: Record<CampaignLanguage, Omit<CampaignData, 'titulosFixados'>> = {
    en: {
      titulosAcao: [
        'Add to Cart Now',
        'Complete Your Order Today',
        'Claim the Special Offer',
        'Buy Now with Discount',
        'Get Yours Today',
      ],
      titulosOferta: [
        'Exclusive Discount Today',
        'Limited-Time Offer',
        'Promo Price Available',
        'Best Deal of the Day',
        'Save More Right Now',
      ],
      titulosConfianca: [
        'Pay on Delivery',
        'Pay When You Receive',
        'Only Pay at Delivery',
        'Fast & Secure Delivery',
        'Original Sealed Product',
        '100% Secure Purchase',
        'Official Trusted Website',
        'Customer Support Available',
      ],
      titulosUrgencia: ['Last Units in Stock', 'Offer Ends Today'],
      descricoes: [
        `Add ${product} to your cart and pay only when it arrives. Claim today’s special discount now.`,
        `Secure checkout on the official website, sealed product and fast shipping. Get ${product} now at a promo price.`,
      ],
      sitelinks: [
        { titulo: 'Buy', descricoes: ['Add to Cart', 'Finish Your Order', 'Fast & Secure Purchase'] },
        { titulo: 'Offer', descricoes: ['Special Offer Today', 'Limited-Time Discount', 'Get It Now'] },
        { titulo: 'Payment', descricoes: ['Pay on Delivery', 'Pay When Received', 'Safer Checkout'] },
        { titulo: 'Guarantee', descricoes: ['60-Day Guarantee', 'Satisfaction or Refund', 'Risk-Free Purchase'] },
        { titulo: 'Delivery', descricoes: ['Fast & Secure Shipping', 'Home Delivery', 'Trusted Carrier'] },
      ],
      callouts: ['Pay on Delivery', 'Official Site', 'Original Product', 'Today’s Discount', 'Secure Delivery', 'Trusted Checkout'],
      snippets: ['Secure Purchase', 'Pay on Delivery', 'Satisfaction Guarantee'],
      acao: 'Buy Now',
      promocao: "Limited-Time Offer, Save Today",
    },
    es: {
      titulosAcao: [
        'Añade al Carrito Ahora',
        'Finaliza Tu Pedido Hoy',
        'Aprovecha la Oferta Especial',
        'Compra Ahora con Descuento',
        'Consigue el Tuyo Hoy',
      ],
      titulosOferta: [
        'Descuento Exclusivo Hoy',
        'Oferta por Tiempo Limitado',
        'Precio Promocional Disponible',
        'Mejor Oferta del Día',
        'Ahorra Más Ahora',
      ],
      titulosConfianca: [
        'Pago Contra Entrega',
        'Paga al Recibir',
        'Solo Pagas en la Entrega',
        'Entrega Rápida y Segura',
        'Producto Original Sellado',
        'Compra 100% Segura',
        'Sitio Oficial Confiable',
        'Atención al Cliente',
      ],
      titulosUrgencia: ['Últimas Unidades en Stock', 'La Promoción Termina Hoy'],
      descricoes: [
        `Añade ${product} al carrito y paga solo al recibirlo. Aprovecha el descuento especial de hoy.`,
        `Compra segura en el sitio oficial, producto sellado y entrega rápida. Consigue ${product} ahora con precio promocional.`,
      ],
      sitelinks: [
        { titulo: 'Compra', descricoes: ['Añadir al Carrito', 'Finaliza Tu Pedido', 'Compra Rápida y Segura'] },
        { titulo: 'Oferta', descricoes: ['Oferta Especial Hoy', 'Descuento Limitado', 'Aprovecha Ahora'] },
        { titulo: 'Pago', descricoes: ['Pago Contra Entrega', 'Paga al Recibir', 'Más Seguridad'] },
        { titulo: 'Garantía', descricoes: ['Garantía de 60 Días', 'Satisfacción o Reembolso', 'Compra sin Riesgo'] },
        { titulo: 'Entrega', descricoes: ['Entrega Rápida y Segura', 'Recibe en Casa', 'Envío Confiable'] },
      ],
      callouts: ['Pago Contra Entrega', 'Sitio Oficial', 'Producto Original', 'Descuento Hoy', 'Entrega Segura', 'Compra Confiable'],
      snippets: ['Compra Segura', 'Pago Contra Entrega', 'Garantía de Satisfacción'],
      acao: 'Comprar Ahora',
      promocao: 'Oferta por Tiempo Limitado, Ahorra Hoy',
    },
    pl: {
      titulosAcao: [
        'Dodaj do Koszyka Teraz',
        'Złóż Zamówienie Dziś',
        'Skorzystaj ze Specjalnej Oferty',
        'Kup Teraz z Rabatem',
        'Zamów Już Dziś',
      ],
      titulosOferta: [
        'Ekskluzywny Rabat Dziś',
        'Oferta na Ograniczony Czas',
        'Cena Promocyjna Dostępna',
        'Najlepsza Oferta Dnia',
        'Oszczędzaj Już Teraz',
      ],
      titulosConfianca: [
        'Płatność przy Odbiorze',
        'Zapłać przy Dostawie',
        'Płacisz Dopiero przy Dostawie',
        'Szybka i Bezpieczna Dostawa',
        'Oryginalny, Zaplombowany Produkt',
        '100% Bezpieczny Zakup',
        'Oficjalna Zaufana Strona',
        'Wsparcie Klienta',
      ],
      titulosUrgencia: ['Ostatnie Sztuki w Magazynie', 'Promocja Kończy się Dziś'],
      descricoes: [
        `Dodaj ${product} do koszyka i zapłać dopiero przy odbiorze. Skorzystaj z dzisiejszego rabatu.`,
        `Bezpieczny zakup na oficjalnej stronie, zaplombowany produkt i szybka dostawa. Zamów ${product} w cenie promocyjnej.`,
      ],
      sitelinks: [
        { titulo: 'Zakup', descricoes: ['Dodaj do Koszyka', 'Złóż Zamówienie', 'Szybki i Bezpieczny Zakup'] },
        { titulo: 'Oferta', descricoes: ['Specjalna Oferta Dziś', 'Rabat Ograniczony Czasowo', 'Skorzystaj Teraz'] },
        { titulo: 'Płatność', descricoes: ['Płatność przy Odbiorze', 'Zapłać przy Dostawie', 'Bezpieczny Checkout'] },
        { titulo: 'Gwarancja', descricoes: ['60 Dni Gwarancji', 'Satysfakcja lub Zwrot', 'Zakup bez Ryzyka'] },
        { titulo: 'Dostawa', descricoes: ['Szybka i Bezpieczna Wysyłka', 'Dostawa do Domu', 'Zaufany Kurier'] },
      ],
      callouts: ['Płatność przy Odbiorze', 'Oficjalna Strona', 'Oryginalny Produkt', 'Rabat Dziś', 'Bezpieczna Dostawa', 'Zaufany Zakup'],
      snippets: ['Bezpieczny Zakup', 'Płatność przy Odbiorze', 'Gwarancja Satysfakcji'],
      acao: 'Kup Teraz',
      promocao: 'Oferta Ograniczona Czasowo, Oszczędzaj Dziś',
    },
    ru: {
      titulosAcao: [
        'Добавьте в Корзину Сейчас',
        'Оформите Заказ Сегодня',
        'Получите Спецпредложение',
        'Купите Сейчас со Скидкой',
        'Закажите Сегодня',
      ],
      titulosOferta: [
        'Эксклюзивная Скидка Сегодня',
        'Предложение Ограничено',
        'Доступна Промо-Цена',
        'Лучшая Цена Сегодня',
        'Экономьте Прямо Сейчас',
      ],
      titulosConfianca: [
        'Оплата при Доставке',
        'Платите при Получении',
        'Оплата только при Доставке',
        'Быстрая и Надёжная Доставка',
        'Оригинальный Запечатанный Товар',
        '100% Безопасная Покупка',
        'Официальный Надёжный Сайт',
        'Поддержка Клиентов',
      ],
      titulosUrgencia: ['Осталось Мало на Складе', 'Акция Заканчивается Сегодня'],
      descricoes: [
        `Добавьте ${product} в корзину и платите только при получении. Успейте получить скидку сегодня.`,
        `Безопасная покупка на официальном сайте, запечатанный товар и быстрая доставка. Закажите ${product} по промо-цене.`,
      ],
      sitelinks: [
        { titulo: 'Покупка', descricoes: ['Добавить в Корзину', 'Оформить Заказ', 'Быстро и Безопасно'] },
        { titulo: 'Акция', descricoes: ['Спецпредложение Сегодня', 'Скидка Ограничена', 'Успейте Сейчас'] },
        { titulo: 'Оплата', descricoes: ['Оплата при Доставке', 'Платите при Получении', 'Больше Безопасности'] },
        { titulo: 'Гарантия', descricoes: ['Гарантия 60 Дней', 'Удовлетворение или Возврат', 'Покупка Без Риска'] },
        { titulo: 'Доставка', descricoes: ['Быстрая и Надёжная', 'Доставка до Дома', 'Проверенная Служба'] },
      ],
      callouts: ['Оплата при Доставке', 'Официальный Сайт', 'Оригинальный Товар', 'Скидка Сегодня', 'Надёжная Доставка', 'Безопасная Оплата'],
      snippets: ['Безопасная Покупка', 'Оплата при Доставке', 'Гарантия Удовлетворения'],
      acao: 'Купить Сейчас',
      promocao: 'Предложение Ограничено, Скидка Сегодня',
    },
    pt: {
      titulosAcao: [
        'Adicione ao Carrinho Agora',
        'Finalize Seu Pedido Hoje',
        'Aproveite a Oferta Especial',
        'Compre Agora com Desconto',
        'Garanta o Seu Hoje',
      ],
      titulosOferta: [
        'Desconto Exclusivo Hoje',
        'Oferta por Tempo Limitado',
        'Preço Promocional Disponível',
        'Melhor Oferta do Dia',
        'Economize Mais Agora',
      ],
      titulosConfianca: [
        'Pague na Entrega',
        'Pague ao Receber',
        'Só Paga na Entrega',
        'Entrega Rápida e Segura',
        'Produto Original Lacrado',
        'Compra 100% Segura',
        'Site Oficial Confiável',
        'Atendimento ao Cliente',
        'Pague Somente no Recebimento',
        'Cadastre-se e Pague ao Receber',
        'Pagamento Seguro na Entrega',
        'Pagamento Apenas na Entrega',
        'Garanta Sua Vaga Hoje',
        'Preencha e Pague ao Receber',
        'Pedido Seguro na Entrega',
        'Desconto Exclusivo no Recebimento',
        'Reserve Agora, Pague Depois',
        'Confirmação Rápida por Atendente',
        'Entrega Rápida + Pagamento Seguro',
        'Só Paga Quando Receber',
        'Oferta Limitada – Pague na Entrega',
        'Cadastro Gratuito e Sem Risco',
        'Compra Simples e Segura',
        'Pedido Confirmado por Telefone',
        'Confirmação Rápida por Telefone',
        'Atendente Confirma Seu Pedido',
        'Pedido Validado por Atendente',
        'Confirmação Manual Antes do Envio',
        'Atendimento Humano para Confirmar',
        'Confirmação Antes da Entrega',
        'Pedido Confirmado em Minutos',
      ],
      titulosUrgencia: ['Últimas Unidades em Estoque', 'Promoção Acaba Hoje'],
      descricoes: [
        `Adicione ${product} ao carrinho e pague apenas ao receber. Aproveite o desconto especial de hoje.`,
        `Compra segura no site oficial, produto lacrado e entrega rápida. Garanta ${product} agora com preço promocional.`,
      ],
      sitelinks: [
        { titulo: 'Compra', descricoes: ['Adicionar ao Carrinho', 'Finalizar Pedido', 'Compra Rápida e Segura'] },
        { titulo: 'Oferta', descricoes: ['Oferta Especial Hoje', 'Desconto Limitado', 'Aproveite Agora'] },
        { titulo: 'Pagamento', descricoes: ['Pague na Entrega', 'Pague ao Receber', 'Mais Segurança'] },
        { titulo: 'Garantia', descricoes: ['Garantia de 60 Dias', 'Satisfação ou Reembolso', 'Compra sem Risco'] },
        { titulo: 'Entrega', descricoes: ['Entrega Rápida e Segura', 'Receba em Casa', 'Envio Confiável'] },
      ],
      callouts: ['Pague na Entrega', 'Site Oficial', 'Produto Original', 'Desconto Hoje', 'Entrega Segura', 'Compra Confiável'],
      snippets: ['Compra Segura', 'Pague na Entrega', 'Garantia de Satisfação'],
      acao: 'Comprar Agora',
      promocao: 'Oferta por Tempo Limitado, Economize Hoje',
    },
  };

  const t = templates[language];
  return {
    titulosFixados: {
      h1: `${product} | ${fixed.official}`,
      h2: `${product} | ${fixed.cod}`,
      h3: `${product} | ${fixed.add}`,
    },
    ...t,
  };
};

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: "Copiado!",
        description: "Texto copiado para a área de transferência.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o texto.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      className="h-8 w-8 text-muted-foreground hover:text-primary"
    >
      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
    </Button>
  );
};

const TextBlock: React.FC<{ label: string; text: string; highlight?: boolean }> = ({ label, text, highlight }) => (
  <div className={`flex items-start justify-between gap-2 p-3 rounded-lg ${highlight ? 'bg-primary/10 border border-primary/20' : 'bg-muted/30'}`}>
    <div className="flex-1">
      <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
      <p className="text-sm mt-1">{text}</p>
    </div>
    <CopyButton text={text} />
  </div>
);

const ListBlock = React.forwardRef<HTMLDivElement, { title: string; items: string[] }>(({ title, items }, ref) => (
  <div ref={ref} className="space-y-2">
    <h4 className="text-sm font-medium text-foreground">{title}</h4>
    <div className="space-y-1">
      {items.map((item, index) => (
        <div key={index} className="flex items-center justify-between gap-2 p-2 rounded bg-muted/20 hover:bg-muted/40 transition-colors">
          <span className="text-sm">{item}</span>
          <CopyButton text={item} />
        </div>
      ))}
    </div>
  </div>
));
ListBlock.displayName = 'ListBlock';

const GoogleAdsCopyGenerator: React.FC = () => {
  const [productName, setProductName] = useState('');
  const [language, setLanguage] = useState<CampaignLanguage>('en');
  const [isOnlineMode, setIsOnlineMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [campaign, setCampaign] = useState<CampaignData | null>(null);
  const { toast } = useToast();

  const callEdgeFunction = async (retries = 2): Promise<CampaignData> => {
    const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-google-ads-copy`;
    
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout
        
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify({ 
            productName: productName.trim(), 
            language 
          }),
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Attempt ${attempt + 1} failed:`, response.status, errorText);
          
          if (attempt === retries) {
            throw new Error(`Erro ${response.status}: ${errorText || 'Falha na requisição'}`);
          }
          
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
          continue;
        }
        
        const data = await response.json();
        
        if (data?.error) {
          throw new Error(data.error);
        }
        
        if (!data?.campaign) {
          throw new Error('Resposta inválida da API');
        }
        
        return data.campaign;
      } catch (error) {
        console.error(`Attempt ${attempt + 1} error:`, error);
        
        if (attempt === retries) {
          throw error;
        }
        
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
      }
    }
    
    throw new Error('Todas as tentativas falharam');
  };

  const handleGenerate = async () => {
    if (!productName.trim()) {
      toast({
        title: "Nome do produto obrigatório",
        description: "Por favor, insira o nome do produto.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    if (isOnlineMode) {
      try {
        const campaignData = await callEdgeFunction();
        setCampaign(campaignData);
        toast({
          title: "Campanha gerada com IA!",
          description: "Variações criativas foram geradas com sucesso.",
        });
      } catch (error) {
        console.error('Error generating campaign:', error);
        toast({
          title: "Erro ao gerar com IA",
          description: error instanceof Error ? error.message : "Falha ao chamar a função de IA. Usando modo offline.",
          variant: "destructive",
        });
        // Fallback to offline mode
        setCampaign(generateOfflineCampaign(productName, language));
      }
    } else {
      // Offline mode - simple template replacement
      await new Promise(resolve => setTimeout(resolve, 500));
      setCampaign(generateOfflineCampaign(productName, language));
      toast({
        title: "Campanha gerada!",
        description: "Template aplicado com sucesso.",
      });
    }

    setIsLoading(false);
  };

  const copyAllSection = (title: string, items: string[]) => {
    const text = `[${title}]\n${items.join('\n')}`;
    navigator.clipboard.writeText(text);
    toast({
      title: "Seção copiada!",
      description: `Todos os ${title.toLowerCase()} foram copiados.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">Google Ads Copy Generator</span>
        </div>
        <h2 className="text-2xl font-bold">Gerador de Copy para Campanhas</h2>
        <p className="text-muted-foreground">Crie copies otimizados para Google Ads focados em COD/Nutra</p>
      </div>

      {/* Input Section */}
      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configurações
          </CardTitle>
          <CardDescription>Configure os parâmetros para gerar sua campanha</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Product Name */}
          <div className="space-y-2">
            <Label htmlFor="productName">Nome do Produto *</Label>
            <Input
              id="productName"
              placeholder="Ex: Suplemento XYZ, Creme Anti-Idade, etc."
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="bg-background/50"
            />
          </div>

          {/* Language */}
          <div className="space-y-2">
            <Label>Idioma da campanha</Label>
            <Select value={language} onValueChange={(v) => setLanguage(v as CampaignLanguage)}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Selecione o idioma" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(languageLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Mode Toggle */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center gap-3">
              {isOnlineMode ? (
                <Globe className="h-5 w-5 text-green-500" />
              ) : (
                <WifiOff className="h-5 w-5 text-muted-foreground" />
              )}
              <div>
                <p className="font-medium">Modo: {isOnlineMode ? 'Online (IA)' : 'Offline (Template)'}</p>
                <p className="text-xs text-muted-foreground">
                  {isOnlineMode 
                    ? 'Gera variações criativas usando Lovable AI' 
                    : 'Usa template fixo com substituição simples'}
                </p>
              </div>
            </div>
            <Switch
              checked={isOnlineMode}
              onCheckedChange={setIsOnlineMode}
            />
          </div>

          {/* Generate Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleGenerate}
              disabled={isLoading || !productName.trim()}
              className="flex-1 h-12 text-lg font-semibold"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Gerando...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-5 w-5" />
                  Gerar Campanha
                </>
              )}
            </Button>
            {campaign && (
              <Button
                onClick={handleGenerate}
                disabled={isLoading || !productName.trim()}
                variant="outline"
                className="h-12 px-6"
                size="lg"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Nova Variação
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {campaign && (
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Campanha Gerada</CardTitle>
            <CardDescription>Clique no ícone de copiar ao lado de cada item</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="titulos" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-6">
                <TabsTrigger value="titulos">Títulos</TabsTrigger>
                <TabsTrigger value="descricoes">Descrições</TabsTrigger>
                <TabsTrigger value="sitelinks">Sitelinks</TabsTrigger>
                <TabsTrigger value="extensoes">Extensões</TabsTrigger>
                <TabsTrigger value="cta">CTA</TabsTrigger>
              </TabsList>

              {/* Títulos */}
              <TabsContent value="titulos" className="space-y-6">
                {/* Títulos Fixados */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-primary">Títulos Fixados (Branding)</h3>
                  </div>
                  <TextBlock label="H1" text={campaign.titulosFixados.h1} highlight />
                  <TextBlock label="H2" text={campaign.titulosFixados.h2} highlight />
                  <TextBlock label="H3" text={campaign.titulosFixados.h3} highlight />
                </div>

                {/* Títulos de Ação */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Títulos de Ação</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyAllSection('TÍTULOS DE AÇÃO', campaign.titulosAcao)}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copiar Todos
                    </Button>
                  </div>
                  <ListBlock title="" items={campaign.titulosAcao} />
                </div>

                {/* Títulos de Oferta */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Títulos de Oferta</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyAllSection('TÍTULOS DE OFERTA', campaign.titulosOferta)}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copiar Todos
                    </Button>
                  </div>
                  <ListBlock title="" items={campaign.titulosOferta} />
                </div>

                {/* Títulos de Confiança */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Títulos de Confiança/COD</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyAllSection('TÍTULOS DE CONFIANÇA', campaign.titulosConfianca)}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copiar Todos
                    </Button>
                  </div>
                  <ListBlock title="" items={campaign.titulosConfianca} />
                </div>

                {/* Títulos de Urgência */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Títulos de Urgência</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyAllSection('TÍTULOS DE URGÊNCIA', campaign.titulosUrgencia)}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copiar Todos
                    </Button>
                  </div>
                  <ListBlock title="" items={campaign.titulosUrgencia} />
                </div>
              </TabsContent>

              {/* Descrições */}
              <TabsContent value="descricoes" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Descrições de Anúncio</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyAllSection('DESCRIÇÕES', campaign.descricoes)}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copiar Todas
                  </Button>
                </div>
                {campaign.descricoes.map((desc, index) => (
                  <TextBlock key={index} label={`Descrição ${index + 1}`} text={desc} />
                ))}
              </TabsContent>

              {/* Sitelinks */}
              <TabsContent value="sitelinks" className="space-y-6">
                {campaign.sitelinks.map((sitelink, index) => (
                  <div key={index} className="space-y-3 p-4 rounded-lg bg-muted/20 border border-border/30">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-primary">{sitelink.titulo}</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyAllSection(`SITELINK: ${sitelink.titulo}`, sitelink.descricoes)}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copiar
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {sitelink.descricoes.map((desc, i) => (
                        <div key={i} className="flex items-center justify-between gap-2 p-2 rounded bg-background/50">
                          <span className="text-sm">{desc}</span>
                          <CopyButton text={desc} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </TabsContent>

              {/* Extensões (Callouts & Snippets) */}
              <TabsContent value="extensoes" className="space-y-6">
                {/* Callouts */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Callouts</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyAllSection('CALLOUTS', campaign.callouts)}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copiar Todos
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {campaign.callouts.map((callout, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-primary/10 border border-primary/20"
                      >
                        <span className="text-sm">{callout}</span>
                        <CopyButton text={callout} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Snippets */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Snippets Estruturados</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyAllSection('SNIPPETS', campaign.snippets)}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copiar Todos
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {campaign.snippets.map((snippet, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30 border border-border/50"
                      >
                        <span className="text-sm">{snippet}</span>
                        <CopyButton text={snippet} />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* CTA */}
              <TabsContent value="cta" className="space-y-4">
                <TextBlock label="Botão de Ação" text={campaign.acao} highlight />
                <TextBlock label="Texto Promocional" text={campaign.promocao} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GoogleAdsCopyGenerator;
