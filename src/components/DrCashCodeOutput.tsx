import { DrCashConfig } from "@/types/platforms";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { generateDrCashFormHTML, generateDrCashThankYouHTML } from "@/lib/drcash-generators";
import { useState } from "react";
import { Copy, Download, Globe, FileCode, Check } from "lucide-react";
import { toast } from "sonner";

interface DrCashCodeOutputProps {
  config: DrCashConfig;
  language: string;
}

export function DrCashCodeOutput({ config, language }: DrCashCodeOutputProps) {
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const formHTML = generateDrCashFormHTML(config, language);
  const thankYouHTML = generateDrCashThankYouHTML(config);

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
      filename: "index.html",
      gradient: "from-red-600 to-orange-500",
    },
    {
      id: "thanks",
      label: "Página Obrigado",
      shortLabel: "Obrigado",
      icon: FileCode,
      content: thankYouHTML,
      filename: "thank-you.html",
      gradient: "from-green-600 to-emerald-500",
    },
  ];

  return (
    <div className="h-full flex flex-col bg-card rounded-xl overflow-hidden border border-border">
      <Tabs defaultValue="form" className="flex-1 flex flex-col">
        <div className="p-3 border-b border-border">
          <TabsList className="grid grid-cols-2 bg-secondary/50">
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
                  className="h-8 px-3 text-xs hover:bg-red-600/10 hover:text-red-600"
                >
                  {copiedTab === tab.id ? (
                    <Check className="w-3.5 h-3.5 mr-1.5 text-green-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 mr-1.5" />
                  )}
                  {copiedTab === tab.id ? "Copiado!" : "Copiar"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => downloadFile(tab.content, tab.filename)}
                  className="h-8 px-3 text-xs hover:bg-orange-600/10 hover:text-orange-600"
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
