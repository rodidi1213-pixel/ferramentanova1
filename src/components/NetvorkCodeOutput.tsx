import { useState } from "react";
import { NetvorkConfig } from "@/types/netvork";
import { generateNetvorkFormHTML, generateNetvorkOrderPHP, generateNetvorkSuccessHTML } from "@/lib/netvork-generators";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, FileCode, FileText, Server } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NetvorkCodeOutputProps {
  config: NetvorkConfig;
  language: string;
}

export function NetvorkCodeOutput({ config, language }: NetvorkCodeOutputProps) {
  const [copiedTab, setCopiedTab] = useState<string | null>(null);
  const { toast } = useToast();

  const formHTML = generateNetvorkFormHTML(config, language);
  const orderPHP = generateNetvorkOrderPHP(config);
  const successHTML = generateNetvorkSuccessHTML(config);

  const copyToClipboard = async (code: string, tabName: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedTab(tabName);
      toast({
        title: "Copiado!",
        description: `Código ${tabName} copiado para a área de transferência`,
      });
      setTimeout(() => setCopiedTab(null), 2000);
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o código",
        variant: "destructive",
      });
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
    toast({
      title: "Download iniciado!",
      description: `Arquivo ${filename} baixado com sucesso`,
    });
  };

  return (
    <div className="h-full flex flex-col bg-card rounded-xl border border-border overflow-hidden">
      <Tabs defaultValue="form" className="h-full flex flex-col">
        <div className="border-b border-border px-4 pt-4">
          <TabsList className="grid grid-cols-3 bg-secondary/50">
            <TabsTrigger value="form" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <FileCode className="w-4 h-4 mr-2" />
              index.html
            </TabsTrigger>
            <TabsTrigger value="php" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Server className="w-4 h-4 mr-2" />
              order.php
            </TabsTrigger>
            <TabsTrigger value="success" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <FileText className="w-4 h-4 mr-2" />
              success.html
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="form" className="flex-1 flex flex-col m-0 overflow-hidden data-[state=inactive]:hidden">
          <div className="p-3 border-b border-border flex items-center justify-between bg-secondary/30">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">index.html</span>
              <span className="px-1.5 py-0.5 text-xs bg-purple-600/20 text-purple-400 rounded">Netvork</span>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(formHTML, "index.html")}
                className="h-7 text-xs"
              >
                {copiedTab === "index.html" ? (
                  <Check className="w-3 h-3 mr-1" />
                ) : (
                  <Copy className="w-3 h-3 mr-1" />
                )}
                Copiar
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => downloadFile(formHTML, "index.html")}
                className="h-7 text-xs"
              >
                Download
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-auto custom-scrollbar">
            <pre className="p-4 text-xs font-mono text-muted-foreground leading-relaxed whitespace-pre-wrap break-words">
              {formHTML}
            </pre>
          </div>
        </TabsContent>

        <TabsContent value="php" className="flex-1 flex flex-col m-0 overflow-hidden data-[state=inactive]:hidden">
          <div className="p-3 border-b border-border flex items-center justify-between bg-secondary/30">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">order.php</span>
              <span className="px-1.5 py-0.5 text-xs bg-blue-600/20 text-blue-400 rounded">API Netvork</span>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(orderPHP, "order.php")}
                className="h-7 text-xs"
              >
                {copiedTab === "order.php" ? (
                  <Check className="w-3 h-3 mr-1" />
                ) : (
                  <Copy className="w-3 h-3 mr-1" />
                )}
                Copiar
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => downloadFile(orderPHP, "order.php")}
                className="h-7 text-xs"
              >
                Download
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-auto custom-scrollbar">
            <pre className="p-4 text-xs font-mono text-muted-foreground leading-relaxed whitespace-pre-wrap break-words">
              {orderPHP}
            </pre>
          </div>
        </TabsContent>

        <TabsContent value="success" className="flex-1 flex flex-col m-0 overflow-hidden data-[state=inactive]:hidden">
          <div className="p-3 border-b border-border flex items-center justify-between bg-secondary/30">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">success.html</span>
              <span className="px-1.5 py-0.5 text-xs bg-green-600/20 text-green-400 rounded">Obrigado</span>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(successHTML, "success.html")}
                className="h-7 text-xs"
              >
                {copiedTab === "success.html" ? (
                  <Check className="w-3 h-3 mr-1" />
                ) : (
                  <Copy className="w-3 h-3 mr-1" />
                )}
                Copiar
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => downloadFile(successHTML, "success.html")}
                className="h-7 text-xs"
              >
                Download
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-auto custom-scrollbar">
            <pre className="p-4 text-xs font-mono text-muted-foreground leading-relaxed whitespace-pre-wrap break-words">
              {successHTML}
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
