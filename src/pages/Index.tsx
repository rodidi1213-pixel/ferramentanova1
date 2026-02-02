import { useState, useCallback } from "react";
import { FormConfig, getDefaultConfig } from "@/types/form-config";
import { DrCashConfig, getDefaultDrCashConfig, PlatformType } from "@/types/platforms";
import { AdComboConfig, getDefaultAdComboConfig } from "@/types/adcombo";
import { NetvorkConfig, getDefaultNetvorkConfig } from "@/types/netvork";
import { WebvorkConfig, getDefaultWebvorkConfig } from "@/types/webvork";
import { LemonadConfig, getDefaultLemonadConfig } from "@/types/lemonad";
import { TrafficLightConfig, getDefaultTrafficLightConfig } from "@/types/trafficlight";
import { TerraLeadsConfig, getDefaultTerraLeadsConfig } from "@/types/terraleads";
import { ShakesProConfig, getDefaultShakesProConfig } from "@/types/shakespro";
import { ConfigPanel } from "@/components/ConfigPanel";
import { DrCashConfigPanel } from "@/components/DrCashConfigPanel";
import { AdComboConfigPanel } from "@/components/AdComboConfigPanel";
import { NetvorkConfigPanel } from "@/components/NetvorkConfigPanel";
import { WebvorkConfigPanel } from "@/components/WebvorkConfigPanel";
import { LemonadConfigPanel } from "@/components/LemonadConfigPanel";
import { TrafficLightConfigPanel } from "@/components/TrafficLightConfigPanel";
import { TerraLeadsConfigPanel } from "@/components/TerraLeadsConfigPanel";
import { ShakesProConfigPanel } from "@/components/ShakesProConfigPanel";
import { FormPreview } from "@/components/FormPreview";
import { DrCashFormPreview } from "@/components/DrCashFormPreview";
import { DrCashThankYouPreview } from "@/components/DrCashThankYouPreview";
import { AdComboFormPreview } from "@/components/AdComboFormPreview";
import { AdComboThankYouPreview } from "@/components/AdComboThankYouPreview";
import { NetvorkFormPreview } from "@/components/NetvorkFormPreview";
import { NetvorkThankYouPreview } from "@/components/NetvorkThankYouPreview";
import { WebvorkFormPreview } from "@/components/WebvorkFormPreview";
import { WebvorkThankYouPreview } from "@/components/WebvorkThankYouPreview";
import { LemonadFormPreview } from "@/components/LemonadFormPreview";
import { LemonadThankYouPreview } from "@/components/LemonadThankYouPreview";
import { TrafficLightFormPreview } from "@/components/TrafficLightFormPreview";
import { TrafficLightThankYouPreview } from "@/components/TrafficLightThankYouPreview";
import { TerraLeadsFormPreview } from "@/components/TerraLeadsFormPreview";
import { TerraLeadsThankYouPreview } from "@/components/TerraLeadsThankYouPreview";
import { ShakesProFormPreview } from "@/components/ShakesProFormPreview";
import { ShakesProThankYouPreview } from "@/components/ShakesProThankYouPreview";
import { CodeOutput } from "@/components/CodeOutput";
import { DrCashCodeOutput } from "@/components/DrCashCodeOutput";
import { AdComboCodeOutput } from "@/components/AdComboCodeOutput";
import { NetvorkCodeOutput } from "@/components/NetvorkCodeOutput";
import { WebvorkCodeOutput } from "@/components/WebvorkCodeOutput";
import { LemonadCodeOutput } from "@/components/LemonadCodeOutput";
import { TrafficLightCodeOutput } from "@/components/TrafficLightCodeOutput";
import { TerraLeadsCodeOutput } from "@/components/TerraLeadsCodeOutput";
import { ShakesProCodeOutput } from "@/components/ShakesProCodeOutput";
import GoogleAdsCopyGenerator from "@/components/GoogleAdsCopyGenerator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, Code, Sparkles, FileText, Megaphone } from "lucide-react";

type ExtendedPlatformType = PlatformType | "adcombo" | "netvork" | "webvork" | "lemonad" | "trafficlight" | "terraleads" | "shakespro";

const PLATFORMS = [
  { id: "generic" as ExtendedPlatformType, name: "Genérico (PHP)", icon: "📦" },
  { id: "drcash" as ExtendedPlatformType, name: "DR.CASH", icon: "💊" },
  { id: "adcombo" as ExtendedPlatformType, name: "AdCombo", icon: "🔗" },
  { id: "netvork" as ExtendedPlatformType, name: "Netvork", icon: "🌐" },
  { id: "webvork" as ExtendedPlatformType, name: "Webvork", icon: "🔶" },
  { id: "lemonad" as ExtendedPlatformType, name: "Lemonad", icon: "🍋" },
  { id: "trafficlight" as ExtendedPlatformType, name: "Traffic Light", icon: "🚦" },
  { id: "terraleads" as ExtendedPlatformType, name: "Terra Leads", icon: "🌍" },
  { id: "shakespro" as ExtendedPlatformType, name: "Shakes.pro", icon: "🥤" },
];

const Index = () => {
  const [platform, setPlatform] = useState<ExtendedPlatformType>("drcash");
  const [config, setConfig] = useState<FormConfig>(() => getDefaultConfig("BR"));
  const [drCashConfig, setDrCashConfig] = useState<DrCashConfig>(() => getDefaultDrCashConfig("RO"));
  const [drCashLanguage, setDrCashLanguage] = useState("RO");
  const [adComboConfig, setAdComboConfig] = useState<AdComboConfig>(() => getDefaultAdComboConfig("RO"));
  const [adComboLanguage, setAdComboLanguage] = useState("RO");
  const [netvorkConfig, setNetvorkConfig] = useState<NetvorkConfig>(() => getDefaultNetvorkConfig("RO"));
  const [netvorkLanguage, setNetvorkLanguage] = useState("RO");
  const [webvorkConfig, setWebvorkConfig] = useState<WebvorkConfig>(() => getDefaultWebvorkConfig("RO"));
  const [webvorkLanguage, setWebvorkLanguage] = useState("RO");
  const [lemonadConfig, setLemonadConfig] = useState<LemonadConfig>(() => getDefaultLemonadConfig("RO"));
  const [lemonadLanguage, setLemonadLanguage] = useState("RO");
  const [trafficLightConfig, setTrafficLightConfig] = useState<TrafficLightConfig>(() => getDefaultTrafficLightConfig("RO"));
  const [trafficLightLanguage, setTrafficLightLanguage] = useState("RO");
  const [terraLeadsConfig, setTerraLeadsConfig] = useState<TerraLeadsConfig>(() => getDefaultTerraLeadsConfig("RO"));
  const [terraLeadsLanguage, setTerraLeadsLanguage] = useState("RO");
  const [shakesProConfig, setShakesProConfig] = useState<ShakesProConfig>(() => getDefaultShakesProConfig("RO"));
  const [activeTool, setActiveTool] = useState<"form" | "ads">("form");

  const updateConfig = useCallback((updates: Partial<FormConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateThankYou = useCallback((updates: Partial<FormConfig["thankYou"]>) => {
    setConfig((prev) => ({
      ...prev,
      thankYou: { ...prev.thankYou, ...updates },
    }));
  }, []);

  const updateDrCashConfig = useCallback((updates: Partial<DrCashConfig>) => {
    setDrCashConfig((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleDrCashLanguageChange = useCallback((language: string) => {
    setDrCashLanguage(language);
  }, []);

  const updateAdComboConfig = useCallback((updates: Partial<AdComboConfig>) => {
    setAdComboConfig((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleAdComboLanguageChange = useCallback((language: string) => {
    setAdComboLanguage(language);
  }, []);

  const updateNetvorkConfig = useCallback((updates: Partial<NetvorkConfig>) => {
    setNetvorkConfig((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleNetvorkLanguageChange = useCallback((language: string) => {
    setNetvorkLanguage(language);
  }, []);

  const updateWebvorkConfig = useCallback((updates: Partial<WebvorkConfig>) => {
    setWebvorkConfig((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleWebvorkLanguageChange = useCallback((language: string) => {
    setWebvorkLanguage(language);
  }, []);

  const updateLemonadConfig = useCallback((updates: Partial<LemonadConfig>) => {
    setLemonadConfig((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleLemonadLanguageChange = useCallback((language: string) => {
    setLemonadLanguage(language);
  }, []);

  const updateTrafficLightConfig = useCallback((updates: Partial<TrafficLightConfig>) => {
    setTrafficLightConfig((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleTrafficLightLanguageChange = useCallback((language: string) => {
    setTrafficLightLanguage(language);
  }, []);

  const updateTerraLeadsConfig = useCallback((updates: Partial<TerraLeadsConfig>) => {
    setTerraLeadsConfig((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleTerraLeadsLanguageChange = useCallback((language: string) => {
    setTerraLeadsLanguage(language);
  }, []);

  const handleShakesProConfigChange = useCallback((newConfig: ShakesProConfig) => {
    setShakesProConfig(newConfig);
  }, []);

  const renderConfigPanel = () => {
    if (platform === "drcash") {
      return (
        <DrCashConfigPanel
          config={drCashConfig}
          language={drCashLanguage}
          updateConfig={updateDrCashConfig}
          onLanguageChange={handleDrCashLanguageChange}
        />
      );
    }
    if (platform === "adcombo") {
      return (
        <AdComboConfigPanel
          config={adComboConfig}
          language={adComboLanguage}
          updateConfig={updateAdComboConfig}
          onLanguageChange={handleAdComboLanguageChange}
        />
      );
    }
    if (platform === "netvork") {
      return (
        <NetvorkConfigPanel
          config={netvorkConfig}
          language={netvorkLanguage}
          updateConfig={updateNetvorkConfig}
          onLanguageChange={handleNetvorkLanguageChange}
        />
      );
    }
    if (platform === "webvork") {
      return (
        <WebvorkConfigPanel
          config={webvorkConfig}
          language={webvorkLanguage}
          updateConfig={updateWebvorkConfig}
          onLanguageChange={handleWebvorkLanguageChange}
        />
      );
    }
    if (platform === "lemonad") {
      return (
        <LemonadConfigPanel
          config={lemonadConfig}
          language={lemonadLanguage}
          updateConfig={updateLemonadConfig}
          onLanguageChange={handleLemonadLanguageChange}
        />
      );
    }
    if (platform === "trafficlight") {
      return (
        <TrafficLightConfigPanel
          config={trafficLightConfig}
          language={trafficLightLanguage}
          updateConfig={updateTrafficLightConfig}
          onLanguageChange={handleTrafficLightLanguageChange}
        />
      );
    }
    if (platform === "terraleads") {
      return (
        <TerraLeadsConfigPanel
          config={terraLeadsConfig}
          language={terraLeadsLanguage}
          updateConfig={updateTerraLeadsConfig}
          onLanguageChange={handleTerraLeadsLanguageChange}
        />
      );
    }
    if (platform === "shakespro") {
      return (
        <ShakesProConfigPanel
          config={shakesProConfig}
          onConfigChange={handleShakesProConfigChange}
        />
      );
    }
    return (
      <ConfigPanel
        config={config}
        updateConfig={updateConfig}
        updateThankYou={updateThankYou}
      />
    );
  };

  const renderFormPreview = () => {
    if (platform === "drcash") {
      return <DrCashFormPreview config={drCashConfig} language={drCashLanguage} />;
    }
    if (platform === "adcombo") {
      return <AdComboFormPreview config={adComboConfig} language={adComboLanguage} />;
    }
    if (platform === "netvork") {
      return <NetvorkFormPreview config={netvorkConfig} language={netvorkLanguage} />;
    }
    if (platform === "webvork") {
      return <WebvorkFormPreview config={webvorkConfig} language={webvorkLanguage} />;
    }
    if (platform === "lemonad") {
      return <LemonadFormPreview config={lemonadConfig} language={lemonadLanguage} />;
    }
    if (platform === "trafficlight") {
      return <TrafficLightFormPreview config={trafficLightConfig} language={trafficLightLanguage} />;
    }
    if (platform === "terraleads") {
      return <TerraLeadsFormPreview config={terraLeadsConfig} language={terraLeadsLanguage} />;
    }
    if (platform === "shakespro") {
      return <ShakesProFormPreview config={shakesProConfig} />;
    }
    return <FormPreview config={config} />;
  };

  const renderThankYouPreview = () => {
    if (platform === "drcash") {
      return <DrCashThankYouPreview config={drCashConfig} />;
    }
    if (platform === "adcombo") {
      return <AdComboThankYouPreview config={adComboConfig} />;
    }
    if (platform === "netvork") {
      return <NetvorkThankYouPreview config={netvorkConfig} />;
    }
    if (platform === "webvork") {
      return <WebvorkThankYouPreview config={webvorkConfig} />;
    }
    if (platform === "lemonad") {
      return <LemonadThankYouPreview config={lemonadConfig} />;
    }
    if (platform === "trafficlight") {
      return <TrafficLightThankYouPreview config={trafficLightConfig} />;
    }
    if (platform === "terraleads") {
      return <TerraLeadsThankYouPreview config={terraLeadsConfig} />;
    }
    if (platform === "shakespro") {
      return <ShakesProThankYouPreview config={shakesProConfig} />;
    }
    // Generic thank you preview
    return (
      <div
        className="h-full overflow-auto custom-scrollbar flex items-center justify-center p-8"
        style={{ backgroundColor: config.thankYou.backgroundColor }}
      >
        <div className="text-center max-w-md">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6"
            style={{ backgroundColor: config.thankYou.buttonColor }}
          >
            ✓
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            {config.thankYou.title}
          </h2>
          <p className="text-white/90 mb-6">
            {config.thankYou.message}
          </p>
          {config.thankYou.showOrderDetails && (
            <div 
              className="rounded-xl p-6 mb-6 text-left"
              style={{ backgroundColor: config.thankYou.cardColor }}
            >
              <div className="text-white font-semibold mb-4 pb-3 border-b border-white/10">
                {config.thankYou.orderDetailsTitle}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-white/80">
                  <span>{config.thankYou.productLabel}</span>
                  <span className="font-medium text-white">{config.productName}</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>{config.thankYou.priceLabel}</span>
                  <span className="font-medium text-white">{config.currency} {config.newPrice}</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>{config.thankYou.statusLabel}</span>
                  <span className="font-medium text-success">{config.thankYou.statusConfirmed}</span>
                </div>
              </div>
            </div>
          )}
          {config.thankYou.showUpsell && (
            <div className="bg-gradient-to-r from-primary to-chart-2 rounded-xl p-6 mb-6">
              <div className="text-xl font-bold text-white mb-2">
                {config.thankYou.upsellTitle}
              </div>
              <p className="text-white/90 text-sm mb-4">
                {config.thankYou.upsellMessage}
              </p>
              <button className="px-6 py-2 bg-white text-primary rounded-lg font-semibold text-sm">
                {config.thankYou.upsellButtonText}
              </button>
            </div>
          )}
          <button
            className="px-8 py-3 text-white font-semibold rounded-xl"
            style={{ backgroundColor: config.thankYou.buttonColor }}
          >
            {config.thankYou.buttonText}
          </button>
          <p className="text-white/70 text-sm mt-6">
            {config.thankYou.finalText}
          </p>
        </div>
      </div>
    );
  };

  const renderCodeOutput = () => {
    if (platform === "drcash") {
      return <DrCashCodeOutput config={drCashConfig} language={drCashLanguage} />;
    }
    if (platform === "adcombo") {
      return <AdComboCodeOutput config={adComboConfig} language={adComboLanguage} />;
    }
    if (platform === "netvork") {
      return <NetvorkCodeOutput config={netvorkConfig} language={netvorkLanguage} />;
    }
    if (platform === "webvork") {
      return <WebvorkCodeOutput config={webvorkConfig} language={webvorkLanguage} />;
    }
    if (platform === "lemonad") {
      return <LemonadCodeOutput config={lemonadConfig} language={lemonadLanguage} />;
    }
    if (platform === "trafficlight") {
      return <TrafficLightCodeOutput config={trafficLightConfig} language={trafficLightLanguage} />;
    }
    if (platform === "terraleads") {
      return <TerraLeadsCodeOutput config={terraLeadsConfig} language={terraLeadsLanguage} />;
    }
    if (platform === "shakespro") {
      return <ShakesProCodeOutput config={shakesProConfig} />;
    }
    return <CodeOutput config={config} />;
  };

  const getPlatformBadge = () => {
    if (platform === "drcash") {
      return <span className="px-2 py-0.5 text-xs bg-destructive/10 text-destructive rounded-full">DR.CASH</span>;
    }
    if (platform === "adcombo") {
      return <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">AdCombo</span>;
    }
    if (platform === "netvork") {
      return <span className="px-2 py-0.5 text-xs bg-purple-600/10 text-purple-400 rounded-full">Netvork</span>;
    }
    if (platform === "webvork") {
      return <span className="px-2 py-0.5 text-xs bg-orange-600/10 text-orange-400 rounded-full">Webvork</span>;
    }
    if (platform === "lemonad") {
      return <span className="px-2 py-0.5 text-xs bg-yellow-600/10 text-yellow-400 rounded-full">Lemonad</span>;
    }
    if (platform === "trafficlight") {
      return <span className="px-2 py-0.5 text-xs bg-green-600/10 text-green-400 rounded-full">Traffic Light</span>;
    }
    if (platform === "terraleads") {
      return <span className="px-2 py-0.5 text-xs bg-amber-600/10 text-amber-400 rounded-full">Terra Leads</span>;
    }
    if (platform === "shakespro") {
      return <span className="px-2 py-0.5 text-xs bg-orange-500/10 text-orange-500 rounded-full">Shakes.pro</span>;
    }
    return null;
  };

  const getFooterText = () => {
    if (platform === "drcash") return "Plataforma: DR.CASH";
    if (platform === "adcombo") return "Plataforma: AdCombo";
    if (platform === "netvork") return "Plataforma: Netvork";
    if (platform === "webvork") return "Plataforma: Webvork";
    if (platform === "lemonad") return "Plataforma: Lemonad";
    if (platform === "trafficlight") return "Plataforma: Traffic Light";
    if (platform === "terraleads") return "Plataforma: Terra Leads";
    if (platform === "shakespro") return "Plataforma: Shakes.pro";
    return "Múltiplos países e idiomas suportados";
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gradient-primary">COD Tools</h1>
            </div>
          </div>
          
          {/* Tool Navigation */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTool("form")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTool === "form"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Formulário COD</span>
            </button>
            <button
              onClick={() => setActiveTool("ads")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTool === "ads"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Megaphone className="w-4 h-4" />
              <span className="hidden sm:inline">Google Ads Copy</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
            <span className="px-2 py-1 bg-success/10 text-success rounded-full">
              v2.0
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {activeTool === "form" ? (
        <main className="flex-1 container px-4 py-4 flex gap-4 overflow-hidden">
          {/* Config Panel - Left Side */}
          <aside className="hidden lg:flex w-80 flex-shrink-0 flex-col gap-3 overflow-hidden">
            {/* Platform Selector */}
            <div className="bg-card rounded-xl border border-border p-3 flex-shrink-0">
              <label className="text-xs text-muted-foreground mb-2 block">Plataforma</label>
              <Select value={platform} onValueChange={(v) => setPlatform(v as ExtendedPlatformType)}>
                <SelectTrigger className="bg-secondary/50 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {PLATFORMS.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.icon} {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 bg-card rounded-xl border border-border overflow-hidden">
              <div className="h-full overflow-y-auto custom-scrollbar">
                {renderConfigPanel()}
              </div>
            </div>
          </aside>

          {/* Main Area - Preview & Code */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Mobile Config Toggle */}
            <div className="lg:hidden mb-4">
              <Tabs defaultValue="config" className="w-full">
                <TabsList className="grid grid-cols-3 bg-card border border-border">
                  <TabsTrigger value="config">Configurar</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Código</TabsTrigger>
                </TabsList>
                <TabsContent value="config" className="mt-4 space-y-3">
                  {/* Mobile Platform Selector */}
                  <div className="bg-card rounded-xl border border-border p-3">
                    <label className="text-xs text-muted-foreground mb-2 block">Plataforma</label>
                    <Select value={platform} onValueChange={(v) => setPlatform(v as ExtendedPlatformType)}>
                      <SelectTrigger className="bg-secondary/50 border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        {PLATFORMS.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.icon} {p.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="bg-card rounded-xl border border-border overflow-hidden max-h-[60vh] overflow-y-auto">
                    {renderConfigPanel()}
                  </div>
                </TabsContent>
                <TabsContent value="preview" className="mt-4">
                  <div className="bg-card rounded-xl border border-border overflow-hidden h-[60vh]">
                    {renderFormPreview()}
                  </div>
                </TabsContent>
                <TabsContent value="code" className="mt-4">
                  <div className="h-[60vh]">
                    {renderCodeOutput()}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex flex-1 gap-4 min-h-0 overflow-hidden">
              {/* Preview Panel */}
              <div className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden">
                <Tabs defaultValue="form" className="h-full flex flex-col min-h-0">
                  <div className="flex items-center justify-between mb-3 flex-shrink-0">
                    <TabsList className="bg-card border border-border">
                      <TabsTrigger value="form" className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Formulário
                      </TabsTrigger>
                      <TabsTrigger value="thanks" className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Obrigado
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="form" className="flex-1 mt-0 min-h-0 overflow-hidden data-[state=inactive]:hidden">
                    <div className="h-full bg-card rounded-xl border border-border overflow-y-auto custom-scrollbar">
                      {renderFormPreview()}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="thanks" className="flex-1 mt-0 min-h-0 overflow-hidden data-[state=inactive]:hidden">
                    <div className="h-full bg-card rounded-xl border border-border overflow-y-auto custom-scrollbar">
                      {renderThankYouPreview()}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Code Panel */}
              <div className="w-[480px] flex-shrink-0 flex flex-col min-h-0 overflow-hidden">
                <div className="flex items-center gap-2 mb-3 flex-shrink-0">
                  <Code className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Código Gerado</span>
                  {getPlatformBadge()}
                </div>
                <div className="flex-1 min-h-0 overflow-hidden">
                  {renderCodeOutput()}
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <main className="flex-1 container px-4 py-6 max-w-4xl mx-auto overflow-y-auto custom-scrollbar">
          <GoogleAdsCopyGenerator />
        </main>
      )}

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-3 flex-shrink-0">
        <div className="container px-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>Ferramentas COD para Afiliados</span>
          <span>{getFooterText()}</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
