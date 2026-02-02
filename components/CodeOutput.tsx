import { FormConfig } from "@/types/form-config";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { generateFormHTML, generateThankYouPage, generateSendOrderPHP } from "@/lib/code-generators";
import { useState } from "react";
import { Copy, Download, Globe, FileCode, Server, Check } from "lucide-react";
import { toast } from "sonner";

interface CodeOutputProps {
  config: FormConfig;
}

export function CodeOutput({ config }: CodeOutputProps) {
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const formHTML = generateFormHTML(config);
  const thankYouHTML = generateThankYouPage(config);
  const sendOrderPHP = generateSendOrderPHP(config);

  const copyToClipboard = async (text: string, tab: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedTab(tab);
      toast.success("Código copiado!");
      setTimeout(() => setCopiedTab(null), 2000);
    } catch {
      toast.error("Erro ao copiar código");
    }
  };

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`${filename} baixado!`);
  };

  const tabs = [
    {
      id: "form",
      label: "Formulário HTML",
      shortLabel: "HTML",
      icon: Globe,
      content: formHTML,
      filename: "formulario.html",
      gradient: "from-primary to-chart-2",
    },
    {
      id: "thanks",
      label: "Página Obrigado",
      shortLabel: "Obrigado",
      icon: FileCode,
      content: thankYouHTML,
      filename: "obrigado.html",
      gradient: "from-success to-chart-3",
    },
    {
      id: "php",
      label: "Backend PHP",
      shortLabel: "PHP",
      icon: Server,
      content: sendOrderPHP,
      filename: "send-order.php",
      gradient: "from-warning to-destructive",
    },
  ];

  return (
    <div className="h-full flex flex-col bg-card rounded-xl overflow-hidden border border-border">
      <Tabs defaultValue="form" className="flex-1 flex flex-col">
        <div className="p-3 border-b border-border">
          <TabsList className="grid grid-cols-3 bg-secondary/50">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={`flex items-center gap-1.5 text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:${tab.gradient} data-[state=active]:text-white data-[state=active]:shadow-lg transition-all`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {tabs.map((tab) => (
          <TabsContent
            key={tab.id}
            value={tab.id}
            className="flex-1 flex flex-col mt-0"
          >
            <div className="flex items-center justify-between p-3 border-b border-border bg-secondary/30">
              <span className="text-sm text-muted-foreground font-mono">
                {tab.filename}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(tab.content, tab.id)}
                  className="h-8 px-3 text-xs hover:bg-primary/10 hover:text-primary"
                >
                  {copiedTab === tab.id ? (
                    <Check className="w-3.5 h-3.5 mr-1.5 text-success" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 mr-1.5" />
                  )}
                  {copiedTab === tab.id ? "Copiado!" : "Copiar"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => downloadFile(tab.content, tab.filename)}
                  className="h-8 px-3 text-xs hover:bg-accent/10 hover:text-accent"
                >
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  Baixar
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-auto custom-scrollbar p-4 bg-background/50">
              <pre className="text-xs leading-relaxed font-mono text-muted-foreground whitespace-pre-wrap break-all">
                <code>{tab.content}</code>
              </pre>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
