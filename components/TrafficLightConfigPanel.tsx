import { TrafficLightConfig, TrafficLightTheme, TRAFFICLIGHT_LANGUAGES, getDefaultTrafficLightConfig } from "@/types/trafficlight";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Palette, 
  Gift,
  ImageIcon,
  Clock,
  Key,
  Users,
  ShoppingBag,
  Server,
  Sparkles,
} from "lucide-react";

const THEME_OPTIONS: { value: TrafficLightTheme; label: string; description: string }[] = [
  { value: "classic", label: "🎨 Classic", description: "Estilo tradicional e limpo" },
  { value: "neon", label: "⚡ Neon", description: "Efeitos de brilho cyberpunk" },
  { value: "minimal", label: "✨ Minimal", description: "Design clean e elegante" },
  { value: "premium", label: "👑 Premium", description: "Gradientes dourados luxuosos" },
];

interface TrafficLightConfigPanelProps {
  config: TrafficLightConfig;
  language: string;
  updateConfig: (updates: Partial<TrafficLightConfig>) => void;
  onLanguageChange: (language: string) => void;
}

const TRAFFICLIGHT_LANGUAGE_OPTIONS = Object.values(TRAFFICLIGHT_LANGUAGES);

export function TrafficLightConfigPanel({ config, language, updateConfig, onLanguageChange }: TrafficLightConfigPanelProps) {
  const handleLanguageChange = (languageCode: string) => {
    const newDefaults = getDefaultTrafficLightConfig(languageCode);
    onLanguageChange(languageCode);
    updateConfig({
      ...newDefaults,
      apiKey: config.apiKey,
      offerId: config.offerId,
      domain: config.domain,
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Platform Header */}
      <div className="p-4 border-b border-border bg-gradient-to-r from-green-600/10 to-yellow-600/10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold">
            🚦
          </div>
          <span className="font-semibold text-sm">Traffic Light</span>
        </div>
        
        <Label className="text-muted-foreground text-xs mb-2 block">Idioma/País</Label>
        <Select value={language} onValueChange={handleLanguageChange}>
          <SelectTrigger className="bg-secondary/50 border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            {TRAFFICLIGHT_LANGUAGE_OPTIONS.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Config Tabs */}
      <Tabs defaultValue="api" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-4 grid grid-cols-5 bg-secondary/50">
          <TabsTrigger value="api" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            <Key className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="visual" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            <Palette className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="features" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            <Clock className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="thankyou" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            <Gift className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="upsell" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            <ShoppingBag className="w-4 h-4" />
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* API Settings */}
          <TabsContent value="api" className="p-4 space-y-4 mt-0">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-green-400 flex items-center gap-2">
                <Key className="w-4 h-4" />
                Configurações da API Traffic Light
              </h3>
              
              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Chave da API</Label>
                <Input
                  value={config.apiKey}
                  onChange={(e) => updateConfig({ apiKey: e.target.value })}
                  placeholder="SUA CHAVE API AQUI"
                  className="bg-secondary/50 border-border"
                />
                <p className="text-xs text-muted-foreground">Sua chave de API do Traffic Light (cpa.tl)</p>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">ID da Oferta (offer_id)</Label>
                <Input
                  value={config.offerId}
                  onChange={(e) => updateConfig({ offerId: e.target.value })}
                  placeholder="Ex: 1"
                  className="bg-secondary/50 border-border"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">País</Label>
                <Input
                  value={config.country}
                  onChange={(e) => updateConfig({ country: e.target.value })}
                  placeholder="Ex: RO"
                  className="bg-secondary/50 border-border"
                />
                <p className="text-xs text-muted-foreground">Código do país para API</p>
              </div>
            </div>

            <Separator className="bg-border" />

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-green-400 flex items-center gap-2">
                <Server className="w-4 h-4" />
                Domínio
              </h3>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Seu Domínio</Label>
                <Input
                  value={config.domain.replace('https://', '')}
                  onChange={(e) => {
                    const domain = e.target.value.replace('https://', '').replace('http://', '');
                    updateConfig({ 
                      domain: `https://${domain}`
                    });
                  }}
                  placeholder="seudominio.com"
                  className="bg-secondary/50 border-border"
                />
                <p className="text-xs text-muted-foreground">Ex: seudominio.com (sem https://)</p>
              </div>
            </div>

            <Separator className="bg-border" />

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-green-400">Dimensões do Formulário</h3>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Largura: {config.formWidth}px</Label>
                <Slider
                  value={[config.formWidth]}
                  onValueChange={([v]) => updateConfig({ formWidth: v })}
                  min={280}
                  max={500}
                  step={10}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Largura Máx</Label>
                <Input
                  value={config.formMaxWidth}
                  onChange={(e) => updateConfig({ formMaxWidth: e.target.value })}
                  className="bg-secondary/50 border-border"
                />
              </div>
            </div>
          </TabsContent>

          {/* Visual Settings */}
          <TabsContent value="visual" className="p-4 space-y-4 mt-0">
            {/* Theme Selector */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-green-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Tema do Formulário
              </h3>
              
              <div className="grid grid-cols-1 gap-2">
                {THEME_OPTIONS.map((theme) => (
                  <button
                    key={theme.value}
                    onClick={() => updateConfig({ theme: theme.value })}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      config.theme === theme.value
                        ? "border-green-500 bg-green-500/10"
                        : "border-border bg-secondary/30 hover:bg-secondary/50"
                    }`}
                  >
                    <div className="font-medium text-sm">{theme.label}</div>
                    <div className="text-xs text-muted-foreground">{theme.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <Separator className="bg-border" />

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-green-400">Configurações Visuais</h3>
              
              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Título Principal</Label>
                <Input
                  value={config.title}
                  onChange={(e) => updateConfig({ title: e.target.value })}
                  className="bg-secondary/50 border-border"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Preço Antigo</Label>
                  <Input
                    value={config.oldPrice}
                    onChange={(e) => updateConfig({ oldPrice: e.target.value })}
                    className="bg-secondary/50 border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Preço Novo</Label>
                  <Input
                    value={config.newPrice}
                    onChange={(e) => updateConfig({ newPrice: e.target.value })}
                    className="bg-secondary/50 border-border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Moeda</Label>
                  <Select value={config.currency} onValueChange={(v) => updateConfig({ currency: v })}>
                    <SelectTrigger className="bg-secondary/50 border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="RON">RON</SelectItem>
                      <SelectItem value="PLN">PLN</SelectItem>
                      <SelectItem value="BRL">BRL</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="RUB">RUB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Desconto %</Label>
                  <Input
                    type="number"
                    value={config.discountPercent}
                    onChange={(e) => updateConfig({ discountPercent: parseInt(e.target.value) || 0 })}
                    className="bg-secondary/50 border-border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Texto do Botão CTA</Label>
                <Input
                  value={config.ctaText}
                  onChange={(e) => updateConfig({ ctaText: e.target.value })}
                  className="bg-secondary/50 border-border"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Placeholder do Nome</Label>
                <Input
                  value={config.namePlaceholder}
                  onChange={(e) => updateConfig({ namePlaceholder: e.target.value })}
                  className="bg-secondary/50 border-border"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Placeholder do Telefone</Label>
                <Input
                  value={config.phonePlaceholder}
                  onChange={(e) => updateConfig({ phonePlaceholder: e.target.value })}
                  className="bg-secondary/50 border-border"
                />
              </div>
            </div>

            <Separator className="bg-border" />

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-green-400">Cores</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Primária</Label>
                  <Input
                    type="color"
                    value={config.primaryColor}
                    onChange={(e) => updateConfig({ primaryColor: e.target.value })}
                    className="w-full h-10 p-1 bg-secondary/50 border-border cursor-pointer"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Botão</Label>
                  <Input
                    type="color"
                    value={config.buttonColor}
                    onChange={(e) => updateConfig({ buttonColor: e.target.value })}
                    className="w-full h-10 p-1 bg-secondary/50 border-border cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Fundo</Label>
                  <Input
                    type="color"
                    value={config.backgroundColor}
                    onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                    className="w-full h-10 p-1 bg-secondary/50 border-border cursor-pointer"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Countdown</Label>
                  <Input
                    type="color"
                    value={config.countdownColor}
                    onChange={(e) => updateConfig({ countdownColor: e.target.value })}
                    className="w-full h-10 p-1 bg-secondary/50 border-border cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <Separator className="bg-border" />

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-green-400">Botão</h3>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Bordas do Botão</Label>
                <Select value={config.buttonBorderRadius} onValueChange={(v: TrafficLightConfig["buttonBorderRadius"]) => updateConfig({ buttonBorderRadius: v })}>
                  <SelectTrigger className="bg-secondary/50 border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Pequena</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="large">Grande</SelectItem>
                    <SelectItem value="full">Arredondada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Tamanho do Botão</Label>
                <Select value={config.buttonSize} onValueChange={(v: TrafficLightConfig["buttonSize"]) => updateConfig({ buttonSize: v })}>
                  <SelectTrigger className="bg-secondary/50 border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Pequeno</SelectItem>
                    <SelectItem value="medium">Médio</SelectItem>
                    <SelectItem value="large">Grande</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Largura do Botão</Label>
                <Select value={config.buttonWidth} onValueChange={(v: TrafficLightConfig["buttonWidth"]) => updateConfig({ buttonWidth: v })}>
                  <SelectTrigger className="bg-secondary/50 border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Automática</SelectItem>
                    <SelectItem value="full">Largura Total</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          {/* Features Settings */}
          <TabsContent value="features" className="p-4 space-y-4 mt-0">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-green-400 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Countdown
              </h3>

              <div className="flex items-center justify-between">
                <Label className="text-muted-foreground text-xs">Mostrar Countdown</Label>
                <Switch
                  checked={config.showCountdown}
                  onCheckedChange={(checked) => updateConfig({ showCountdown: checked })}
                />
              </div>

              {config.showCountdown && (
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">Horas</Label>
                    <Input
                      type="number"
                      value={config.countdownHours}
                      onChange={(e) => updateConfig({ countdownHours: parseInt(e.target.value) || 0 })}
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">Minutos</Label>
                    <Input
                      type="number"
                      value={config.countdownMinutes}
                      onChange={(e) => updateConfig({ countdownMinutes: parseInt(e.target.value) || 0 })}
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">Segundos</Label>
                    <Input
                      type="number"
                      value={config.countdownSeconds}
                      onChange={(e) => updateConfig({ countdownSeconds: parseInt(e.target.value) || 0 })}
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                </div>
              )}
            </div>

            <Separator className="bg-border" />

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-green-400 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Prova Social
              </h3>

              <div className="flex items-center justify-between">
                <Label className="text-muted-foreground text-xs">Mostrar Prova Social</Label>
                <Switch
                  checked={config.showSocialProof}
                  onCheckedChange={(checked) => updateConfig({ showSocialProof: checked })}
                />
              </div>

              {config.showSocialProof && (
                <>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">Pessoas Online</Label>
                    <Input
                      type="number"
                      value={config.viewingCount}
                      onChange={(e) => updateConfig({ viewingCount: parseInt(e.target.value) || 0 })}
                      className="bg-secondary/50 border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">Vendas na Última Hora</Label>
                    <Input
                      type="number"
                      value={config.salesLastHour}
                      onChange={(e) => updateConfig({ salesLastHour: parseInt(e.target.value) || 0 })}
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                </>
              )}
            </div>

            <Separator className="bg-border" />

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-green-400 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Imagem do Produto
              </h3>

              <div className="flex items-center justify-between">
                <Label className="text-muted-foreground text-xs">Mostrar Imagem</Label>
                <Switch
                  checked={config.showProductImage}
                  onCheckedChange={(checked) => updateConfig({ showProductImage: checked })}
                />
              </div>

              {config.showProductImage && (
                <>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">URL da Imagem</Label>
                    <Input
                      value={config.productImage}
                      onChange={(e) => updateConfig({ productImage: e.target.value })}
                      placeholder="https://..."
                      className="bg-secondary/50 border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">Posição</Label>
                    <Select value={config.productImagePosition} onValueChange={(v: TrafficLightConfig["productImagePosition"]) => updateConfig({ productImagePosition: v })}>
                      <SelectTrigger className="bg-secondary/50 border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="top">Topo</SelectItem>
                        <SelectItem value="side">Ao Lado do Preço</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>

            <Separator className="bg-border" />

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-green-400">Textos de Segurança</h3>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Emoji de Segurança</Label>
                <Input
                  value={config.securityEmoji}
                  onChange={(e) => updateConfig({ securityEmoji: e.target.value })}
                  className="bg-secondary/50 border-border"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Texto de Segurança</Label>
                <Input
                  value={config.securityText}
                  onChange={(e) => updateConfig({ securityText: e.target.value })}
                  className="bg-secondary/50 border-border"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Texto de Subtítulo do Botão</Label>
                <Input
                  value={config.buttonSubText}
                  onChange={(e) => updateConfig({ buttonSubText: e.target.value })}
                  className="bg-secondary/50 border-border"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Disclaimer</Label>
                <Input
                  value={config.disclaimerText}
                  onChange={(e) => updateConfig({ disclaimerText: e.target.value })}
                  className="bg-secondary/50 border-border"
                />
              </div>
            </div>
          </TabsContent>

          {/* Thank You Settings */}
          <TabsContent value="thankyou" className="p-4 space-y-4 mt-0">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-green-400 flex items-center gap-2">
                <Gift className="w-4 h-4" />
                Página de Obrigado
              </h3>

              <div className="flex items-center justify-between">
                <Label className="text-muted-foreground text-xs">Habilitar Página</Label>
                <Switch
                  checked={config.showThankYouPage}
                  onCheckedChange={(checked) => updateConfig({ showThankYouPage: checked })}
                />
              </div>

              {config.showThankYouPage && (
                <>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">Título</Label>
                    <Input
                      value={config.thankYouTitle}
                      onChange={(e) => updateConfig({ thankYouTitle: e.target.value })}
                      className="bg-secondary/50 border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">Mensagem</Label>
                    <Input
                      value={config.thankYouMessage}
                      onChange={(e) => updateConfig({ thankYouMessage: e.target.value })}
                      className="bg-secondary/50 border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">Texto do Botão</Label>
                    <Input
                      value={config.thankYouButtonText}
                      onChange={(e) => updateConfig({ thankYouButtonText: e.target.value })}
                      className="bg-secondary/50 border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">URL do Botão</Label>
                    <Input
                      value={config.thankYouButtonUrl}
                      onChange={(e) => updateConfig({ thankYouButtonUrl: e.target.value })}
                      className="bg-secondary/50 border-border"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-xs">Cor Fundo</Label>
                      <Input
                        type="color"
                        value={config.thankYouBackgroundColor}
                        onChange={(e) => updateConfig({ thankYouBackgroundColor: e.target.value })}
                        className="w-full h-10 p-1 bg-secondary/50 border-border cursor-pointer"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-xs">Cor Card</Label>
                      <Input
                        type="color"
                        value={config.thankYouCardColor}
                        onChange={(e) => updateConfig({ thankYouCardColor: e.target.value })}
                        className="w-full h-10 p-1 bg-secondary/50 border-border cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-xs">Cor Título</Label>
                      <Input
                        type="color"
                        value={config.thankYouTitleColor}
                        onChange={(e) => updateConfig({ thankYouTitleColor: e.target.value })}
                        className="w-full h-10 p-1 bg-secondary/50 border-border cursor-pointer"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-xs">Cor Mensagem</Label>
                      <Input
                        type="color"
                        value={config.thankYouMessageColor}
                        onChange={(e) => updateConfig({ thankYouMessageColor: e.target.value })}
                        className="w-full h-10 p-1 bg-secondary/50 border-border cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-muted-foreground text-xs">Mostrar Imagem do Produto</Label>
                    <Switch
                      checked={config.showThankYouProductImage}
                      onCheckedChange={(checked) => updateConfig({ showThankYouProductImage: checked })}
                    />
                  </div>
                </>
              )}
            </div>

            <Separator className="bg-border" />

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-green-400">Detalhes do Pedido</h3>

              <div className="flex items-center justify-between">
                <Label className="text-muted-foreground text-xs">Mostrar Detalhes</Label>
                <Switch
                  checked={config.showOrderDetails}
                  onCheckedChange={(checked) => updateConfig({ showOrderDetails: checked })}
                />
              </div>

              {config.showOrderDetails && (
                <>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">Título</Label>
                    <Input
                      value={config.orderDetailsTitle}
                      onChange={(e) => updateConfig({ orderDetailsTitle: e.target.value })}
                      className="bg-secondary/50 border-border"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-xs">Label Produto</Label>
                      <Input
                        value={config.productLabel}
                        onChange={(e) => updateConfig({ productLabel: e.target.value })}
                        className="bg-secondary/50 border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-xs">Label Preço</Label>
                      <Input
                        value={config.priceLabel}
                        onChange={(e) => updateConfig({ priceLabel: e.target.value })}
                        className="bg-secondary/50 border-border"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-xs">Label Desconto</Label>
                      <Input
                        value={config.discountLabel}
                        onChange={(e) => updateConfig({ discountLabel: e.target.value })}
                        className="bg-secondary/50 border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-xs">Label Status</Label>
                      <Input
                        value={config.statusLabel}
                        onChange={(e) => updateConfig({ statusLabel: e.target.value })}
                        className="bg-secondary/50 border-border"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">Texto Confirmado</Label>
                    <Input
                      value={config.statusConfirmedText}
                      onChange={(e) => updateConfig({ statusConfirmedText: e.target.value })}
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                </>
              )}
            </div>

            <Separator className="bg-border" />

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-green-400">Texto Final</h3>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Texto Final</Label>
                <Input
                  value={config.finalText}
                  onChange={(e) => updateConfig({ finalText: e.target.value })}
                  className="bg-secondary/50 border-border"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Email de Contato</Label>
                <Input
                  value={config.contactEmail}
                  onChange={(e) => updateConfig({ contactEmail: e.target.value })}
                  placeholder="suporte@seusite.com"
                  className="bg-secondary/50 border-border"
                />
              </div>
            </div>
          </TabsContent>

          {/* Upsell Settings */}
          <TabsContent value="upsell" className="p-4 space-y-4 mt-0">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-green-400 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                Upsell
              </h3>

              <div className="flex items-center justify-between">
                <Label className="text-muted-foreground text-xs">Habilitar Upsell</Label>
                <Switch
                  checked={config.showUpsell}
                  onCheckedChange={(checked) => updateConfig({ showUpsell: checked })}
                />
              </div>

              {config.showUpsell && (
                <>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">Título</Label>
                    <Input
                      value={config.upsellTitle}
                      onChange={(e) => updateConfig({ upsellTitle: e.target.value })}
                      className="bg-secondary/50 border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">Mensagem</Label>
                    <Input
                      value={config.upsellMessage}
                      onChange={(e) => updateConfig({ upsellMessage: e.target.value })}
                      className="bg-secondary/50 border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">Preço do Upsell</Label>
                    <Input
                      value={config.upsellPrice}
                      onChange={(e) => updateConfig({ upsellPrice: e.target.value })}
                      className="bg-secondary/50 border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">Texto do Botão</Label>
                    <Input
                      value={config.upsellButtonText}
                      onChange={(e) => updateConfig({ upsellButtonText: e.target.value })}
                      className="bg-secondary/50 border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">URL do Botão</Label>
                    <Input
                      value={config.upsellButtonUrl}
                      onChange={(e) => updateConfig({ upsellButtonUrl: e.target.value })}
                      className="bg-secondary/50 border-border"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-xs">Cor do Botão</Label>
                      <Input
                        type="color"
                        value={config.upsellButtonColor}
                        onChange={(e) => updateConfig({ upsellButtonColor: e.target.value })}
                        className="w-full h-10 p-1 bg-secondary/50 border-border cursor-pointer"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-xs">Cor Fundo</Label>
                      <Input
                        type="color"
                        value={config.upsellBackgroundColor}
                        onChange={(e) => updateConfig({ upsellBackgroundColor: e.target.value })}
                        className="w-full h-10 p-1 bg-secondary/50 border-border cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-muted-foreground text-xs">Mostrar Imagem</Label>
                    <Switch
                      checked={config.showUpsellImage}
                      onCheckedChange={(checked) => updateConfig({ showUpsellImage: checked })}
                    />
                  </div>

                  {config.showUpsellImage && (
                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-xs">URL da Imagem</Label>
                      <Input
                        value={config.upsellImage}
                        onChange={(e) => updateConfig({ upsellImage: e.target.value })}
                        placeholder="https://..."
                        className="bg-secondary/50 border-border"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
