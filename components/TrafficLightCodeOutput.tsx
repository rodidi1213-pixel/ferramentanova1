import { useState } from "react";
import { TrafficLightConfig } from "@/types/trafficlight";
import { generateTrafficLightFormHTML, generateTrafficLightSendLeadPHP, generateTrafficLightSuccessHTML } from "@/lib/trafficlight-generators";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, Check, Download, FileCode, FileText, Server } from "lucide-react";

interface TrafficLightCodeOutputProps {
  config: TrafficLightConfig;
  language: string;
}

export function TrafficLightCodeOutput({ config, language }: TrafficLightCodeOutputProps) {
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const formHTML = generateTrafficLightFormHTML(config, language);
  const sendLeadPHP = generateTrafficLightSendLeadPHP(config);
  const successHTML = generateTrafficLightSuccessHTML(config, language);

  const handleCopy = async (code: string, tabName: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedTab(tabName);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const handleDownload = (code: string, filename: string) => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    handleDownload(formHTML, 'index.html');
    setTimeout(() => handleDownload(sendLeadPHP, 'send-lead.php'), 100);
    setTimeout(() => handleDownload(successHTML, 'success.html'), 200);
  };

  return (
    <div className="h-full flex flex-col bg-card rounded-xl border border-border overflow-hidden">
      <Tabs defaultValue="form" className="h-full flex flex-col">
        <div className="flex items-center justify-between p-3 border-b border-border flex-shrink-0">
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="form" className="flex items-center gap-1.5 text-xs">
              <FileCode className="w-3.5 h-3.5" />
              index.html
            </TabsTrigger>
            <TabsTrigger value="sendlead" className="flex items-center gap-1.5 text-xs">
              <Server className="w-3.5 h-3.5" />
              send-lead.php
            </TabsTrigger>
            <TabsTrigger value="success" className="flex items-center gap-1.5 text-xs">
              <FileText className="w-3.5 h-3.5" />
              success.html
            </TabsTrigger>
          </TabsList>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadAll}
            className="text-xs gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Baixar Todos
          </Button>
        </div>

        <TabsContent value="form" className="flex-1 m-0 overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-2 bg-secondary/30 border-b border-border flex-shrink-0">
              <span className="text-xs text-muted-foreground">Formulário HTML</span>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(formHTML, 'form')}
                  className="h-7 px-2 text-xs"
                >
                  {copiedTab === 'form' ? (
                    <Check className="w-3.5 h-3.5 text-green-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDownload(formHTML, 'index.html')}
                  className="h-7 px-2 text-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-auto custom-scrollbar">
              <pre className="p-4 text-xs font-mono text-foreground/90 whitespace-pre-wrap break-all">
                {formHTML}
              </pre>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sendlead" className="flex-1 m-0 overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-2 bg-secondary/30 border-b border-border flex-shrink-0">
              <span className="text-xs text-muted-foreground">Send Lead PHP (Traffic Light API)</span>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(sendLeadPHP, 'sendlead')}
                  className="h-7 px-2 text-xs"
                >
                  {copiedTab === 'sendlead' ? (
                    <Check className="w-3.5 h-3.5 text-green-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDownload(sendLeadPHP, 'send-lead.php')}
                  className="h-7 px-2 text-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-auto custom-scrollbar">
              <pre className="p-4 text-xs font-mono text-foreground/90 whitespace-pre-wrap break-all">
                {sendLeadPHP}
              </pre>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="success" className="flex-1 m-0 overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-2 bg-secondary/30 border-b border-border flex-shrink-0">
              <span className="text-xs text-muted-foreground">Página de Obrigado</span>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(successHTML, 'success')}
                  className="h-7 px-2 text-xs"
                >
                  {copiedTab === 'success' ? (
                    <Check className="w-3.5 h-3.5 text-green-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDownload(successHTML, 'success.html')}
                  className="h-7 px-2 text-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-auto custom-scrollbar">
              <pre className="p-4 text-xs font-mono text-foreground/90 whitespace-pre-wrap break-all">
                {successHTML}
              </pre>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
