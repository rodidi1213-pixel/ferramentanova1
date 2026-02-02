import { ShakesProConfig } from "@/types/shakespro";
import { generateShakesProIndexHtml, generateShakesProSuccessHtml, generateShakesProOrderPhp } from "@/lib/shakespro-generators";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Download, FileCode, FileText, Code } from "lucide-react";
import { toast } from "sonner";

interface ShakesProCodeOutputProps {
  config: ShakesProConfig;
}

export function ShakesProCodeOutput({ config }: ShakesProCodeOutputProps) {
  const indexHtml = generateShakesProIndexHtml(config);
  const successHtml = generateShakesProSuccessHtml(config);
  const orderPhp = generateShakesProOrderPhp(config);

  const copyToClipboard = (text: string, fileName: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${fileName} copiado!`);
  };

  const downloadFile = (content: string, fileName: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`${fileName} baixado!`);
  };

  const downloadAll = () => {
    downloadFile(indexHtml, "index.html");
    setTimeout(() => downloadFile(successHtml, "success.html"), 100);
    setTimeout(() => downloadFile(orderPhp, "order.php"), 200);
    toast.success("Todos os arquivos baixados!");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">🥤 Código Gerado - Shakes.pro</h2>
            <p className="text-amber-100 text-sm">Arquivos prontos para uso</p>
          </div>
          <Button
            onClick={downloadAll}
            size="sm"
            className="bg-white/20 hover:bg-white/30 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Baixar Todos
          </Button>
        </div>
      </div>

      <Tabs defaultValue="index" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3 m-2 mr-4">
          <TabsTrigger value="index" className="flex items-center gap-1 text-xs">
            <FileCode className="w-3 h-3" />
            index.html
          </TabsTrigger>
          <TabsTrigger value="success" className="flex items-center gap-1 text-xs">
            <FileText className="w-3 h-3" />
            success.html
          </TabsTrigger>
          <TabsTrigger value="order" className="flex items-center gap-1 text-xs">
            <Code className="w-3 h-3" />
            order.php
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="index" className="h-full mt-0 flex flex-col">
            <div className="flex gap-2 p-2 border-b">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(indexHtml, "index.html")}
              >
                <Copy className="w-3 h-3 mr-1" />
                Copiar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => downloadFile(indexHtml, "index.html")}
              >
                <Download className="w-3 h-3 mr-1" />
                Baixar
              </Button>
            </div>
            <pre className="flex-1 overflow-auto p-4 bg-gray-900 text-gray-100 text-xs font-mono">
              <code>{indexHtml}</code>
            </pre>
          </TabsContent>

          <TabsContent value="success" className="h-full mt-0 flex flex-col">
            <div className="flex gap-2 p-2 border-b">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(successHtml, "success.html")}
              >
                <Copy className="w-3 h-3 mr-1" />
                Copiar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => downloadFile(successHtml, "success.html")}
              >
                <Download className="w-3 h-3 mr-1" />
                Baixar
              </Button>
            </div>
            <pre className="flex-1 overflow-auto p-4 bg-gray-900 text-gray-100 text-xs font-mono">
              <code>{successHtml}</code>
            </pre>
          </TabsContent>

          <TabsContent value="order" className="h-full mt-0 flex flex-col">
            <div className="flex gap-2 p-2 border-b">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(orderPhp, "order.php")}
              >
                <Copy className="w-3 h-3 mr-1" />
                Copiar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => downloadFile(orderPhp, "order.php")}
              >
                <Download className="w-3 h-3 mr-1" />
                Baixar
              </Button>
            </div>
            <pre className="flex-1 overflow-auto p-4 bg-gray-900 text-gray-100 text-xs font-mono">
              <code>{orderPhp}</code>
            </pre>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
