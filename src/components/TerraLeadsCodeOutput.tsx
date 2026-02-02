import { TerraLeadsConfig } from "@/types/terraleads";
import {
  generateTerraLeadsFormHTML,
  generateTerraLeadsOrderPHP,
  generateTerraLeadsSuccessHTML,
} from "@/lib/terraleads-generators";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, Download, FileCode, FileText, CheckCircle } from "lucide-react";
import { useState } from "react";

interface TerraLeadsCodeOutputProps {
  config: TerraLeadsConfig;
  language: string;
}

export function TerraLeadsCodeOutput({ config, language }: TerraLeadsCodeOutputProps) {
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const formHTML = generateTerraLeadsFormHTML(config, language);
  const orderPHP = generateTerraLeadsOrderPHP(config);
  const successHTML = generateTerraLeadsSuccessHTML(config, language);

  const handleCopy = async (content: string, tab: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedTab(tab);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    handleDownload(formHTML, "index.html");
    setTimeout(() => handleDownload(orderPHP, "order.php"), 100);
    setTimeout(() => handleDownload(successHTML, "success.html"), 200);
  };

  return (
    <div className="h-full flex flex-col bg-card rounded-lg border border-border overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-amber-500" />
          <span className="text-sm font-medium">Código Gerado - Terra Leads</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownloadAll}
          className="h-8 text-xs"
        >
          <Download className="w-3 h-3 mr-1" />
          Baixar Todos
        </Button>
      </div>

      <Tabs defaultValue="html" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="flex-shrink-0 w-full justify-start rounded-none border-b bg-transparent p-0 h-auto">
          <TabsTrigger
            value="html"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-500 data-[state=active]:bg-transparent px-4 py-2 text-xs"
          >
            <FileText className="w-3 h-3 mr-1" />
            index.html
          </TabsTrigger>
          <TabsTrigger
            value="php"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-500 data-[state=active]:bg-transparent px-4 py-2 text-xs"
          >
            <FileCode className="w-3 h-3 mr-1" />
            order.php
          </TabsTrigger>
          <TabsTrigger
            value="success"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-500 data-[state=active]:bg-transparent px-4 py-2 text-xs"
          >
            <CheckCircle className="w-3 h-3 mr-1" />
            success.html
          </TabsTrigger>
        </TabsList>

        <TabsContent value="html" className="flex-1 overflow-hidden m-0 flex flex-col">
          <div className="flex items-center justify-end gap-2 p-2 border-b border-border bg-muted/20">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(formHTML, "html")}
              className="h-7 text-xs"
            >
              {copiedTab === "html" ? (
                <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
              ) : (
                <Copy className="w-3 h-3 mr-1" />
              )}
              {copiedTab === "html" ? "Copiado!" : "Copiar"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDownload(formHTML, "index.html")}
              className="h-7 text-xs"
            >
              <Download className="w-3 h-3 mr-1" />
              Baixar
            </Button>
          </div>
          <div className="flex-1 overflow-auto">
            <pre className="p-4 text-xs font-mono text-muted-foreground whitespace-pre-wrap break-all">
              {formHTML}
            </pre>
          </div>
        </TabsContent>

        <TabsContent value="php" className="flex-1 overflow-hidden m-0 flex flex-col">
          <div className="flex items-center justify-end gap-2 p-2 border-b border-border bg-muted/20">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(orderPHP, "php")}
              className="h-7 text-xs"
            >
              {copiedTab === "php" ? (
                <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
              ) : (
                <Copy className="w-3 h-3 mr-1" />
              )}
              {copiedTab === "php" ? "Copiado!" : "Copiar"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDownload(orderPHP, "order.php")}
              className="h-7 text-xs"
            >
              <Download className="w-3 h-3 mr-1" />
              Baixar
            </Button>
          </div>
          <div className="flex-1 overflow-auto">
            <pre className="p-4 text-xs font-mono text-muted-foreground whitespace-pre-wrap break-all">
              {orderPHP}
            </pre>
          </div>
        </TabsContent>

        <TabsContent value="success" className="flex-1 overflow-hidden m-0 flex flex-col">
          <div className="flex items-center justify-end gap-2 p-2 border-b border-border bg-muted/20">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(successHTML, "success")}
              className="h-7 text-xs"
            >
              {copiedTab === "success" ? (
                <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
              ) : (
                <Copy className="w-3 h-3 mr-1" />
              )}
              {copiedTab === "success" ? "Copiado!" : "Copiar"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDownload(successHTML, "success.html")}
              className="h-7 text-xs"
            >
              <Download className="w-3 h-3 mr-1" />
              Baixar
            </Button>
          </div>
          <div className="flex-1 overflow-auto">
            <pre className="p-4 text-xs font-mono text-muted-foreground whitespace-pre-wrap break-all">
              {successHTML}
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
