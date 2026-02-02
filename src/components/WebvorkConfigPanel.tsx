import { WebvorkConfig, WebvorkTheme, WEBVORK_LANGUAGES, getDefaultWebvorkConfig } from "@/types/webvork";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
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
  Sparkles,
} from "lucide-react";

const THEME_OPTIONS: { value: WebvorkTheme; label: string; description: string }[] = [
  { value: "classic", label: "🎨 Classic", description: "Estilo tradicional e limpo" },
  { value: "neon", label: "⚡ Neon", description: "Efeitos de brilho cyberpunk" },
  { value: "minimal", label: "✨ Minimal", description: "Design clean e elegante" },
  { value: "premium", label: "👑 Premium", description: "Gradientes dourados luxuosos" },
];

interface WebvorkConfigPanelProps {
  config: WebvorkConfig;
  language: string;
  updateConfig: (updates: Partial<WebvorkConfig>) => void;
  onLanguageChange: (language: string) => void;
}

export function WebvorkConfigPanel({
  config,
  language,
  updateConfig,
  onLanguageChange,
}: WebvorkConfigPanelProps) {
  const handleLanguageChange = (newLanguage: string) => {
    onLanguageChange(newLanguage);
    const newDefaults = getDefaultWebvorkConfig(newLanguage);
    updateConfig({
      title: newDefaults.title,
      ctaText: newDefaults.ctaText,
      namePlaceholder: newDefaults.namePlaceholder,
      phonePlaceholder: newDefaults.phonePlaceholder,
      securityText: newDefaults.securityText,
      disclaimerText: newDefaults.disclaimerText,
      buttonSubText: newDefaults.buttonSubText,
      currency: newDefaults.currency,
      country: newDefaults.country,
      lang: newDefaults.lang,
      thankYouTitle: newDefaults.thankYouTitle,
      thankYouMessage: newDefaults.thankYouMessage,
      thankYouButtonText: newDefaults.thankYouButtonText,
      orderDetailsTitle: newDefaults.orderDetailsTitle,
      productLabel: newDefaults.productLabel,
      priceLabel: newDefaults.priceLabel,
      discountLabel: newDefaults.discountLabel,
      statusLabel: newDefaults.statusLabel,
      statusConfirmedText: newDefaults.statusConfirmedText,
      upsellTitle: newDefaults.upsellTitle,
      upsellMessage: newDefaults.upsellMessage,
      upsellButtonText: newDefaults.upsellButtonText,
      finalText: newDefaults.finalText,
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Platform Header */}
      <div className="p-4 border-b border-border bg-gradient-to-r from-orange-600/10 to-red-600/10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-orange-600 rounded flex items-center justify-center text-white text-xs font-bold">
            WV
          </div>
          <span className="font-semibold text-sm">Webvork</span>
        </div>
        
        <Label className="text-muted-foreground text-xs mb-2 block">Idioma / País</Label>
        <Select value={language} onValueChange={handleLanguageChange}>
          <SelectTrigger className="bg-secondary/50 border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            {Object.entries(WEBVORK_LANGUAGES).map(([code, lang]) => (
              <SelectItem key={code} value={code}>
                {lang.flag} {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Config Tabs */}
      <Tabs defaultValue="api" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-4 grid grid-cols-5 bg-secondary/50">
          <TabsTrigger value="api" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
            <Key className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="visual" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
            <Palette className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="features" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
            <Clock className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="thankyou" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
            <Gift className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="upsell" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
            <ShoppingBag className="w-4 h-4" />
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* API Settings */}
          <TabsContent value="api" className="p-4 space-y-4 mt-0">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-orange-400 flex items-center gap-2">
                <Key className="w-4 h-4" />
                Configurações da API Webvork
              </h3>
              
              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Token da API</Label>
                <Input
                  value={config.apiToken}
                  onChange={(e) => updateConfig({ apiToken: e.target.value })}
                  placeholder="Seu token da API Webvork"
                  className="bg-secondary/50 border-border"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Offer ID</Label>
                <Input
                  value={config.offerId}
                  onChange={(e) => updateConfig({ offerId: e.target.value })}
                  placeholder="ID da oferta"
                  className="bg-secondary/50 border-border"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">País</Label>
                  <Input
                    value={config.country}
                    onChange={(e) => updateConfig({ country: e.target.value })}
                    placeholder="RO"
                    className="bg-secondary/50 border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Idioma</Label>
                  <Input
                    value={config.lang}
                    onChange={(e) => updateConfig({ lang: e.target.value })}
                    placeholder="ro"
                    className="bg-secondary/50 border-border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Domínio</Label>
                <Input
                  value={config.domain}
                  onChange={(e) => updateConfig({ domain: e.target.value })}
                  placeholder="obrigado.exemplo.com"
                  className="bg-secondary/50 border-border"
                />
              </div>
            </div>

            <Separator className="bg-border" />

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-orange-400">Dimensões do Formulário</h3>
              
              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">
                  Largura do Form: {config.formWidth}px
                </Label>
                <Slider
                  value={[config.formWidth]}
                  onValueChange={([v]) => updateConfig({ formWidth: v })}
                  min={300}
                  max={500}
                  step={10}
                />
              </div>
            </div>
          </TabsContent>

          {/* Visual Settings */}
          <TabsContent value="visual" className="p-4 space-y-4 mt-0">
            {/* Theme Selector */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-orange-400 flex items-center gap-2">
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
                        ? "border-orange-500 bg-orange-500/10"
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
              <h3 className="text-sm font-semibold text-orange-400">Conteúdo do Formulário</h3>
              
              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Título</Label>
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
                  <Input
                    value={config.currency}
                    onChange={(e) => updateConfig({ currency: e.target.value })}
                    className="bg-secondary/50 border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">% Desconto</Label>
                  <Input
                    type="number"
                    value={config.discountPercent}
                    onChange={(e) => updateConfig({ discountPercent: parseInt(e.target.value) || 0 })}
                    className="bg-secondary/50 border-border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Texto do Botão</Label>
                <Input
                  value={config.ctaText}
                  onChange={(e) => updateConfig({ ctaText: e.target.value })}
                  className="bg-secondary/50 border-border"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Placeholder Nome</Label>
                <Input
                  value={config.namePlaceholder}
                  onChange={(e) => updateConfig({ namePlaceholder: e.target.value })}
                  className="bg-secondary/50 border-border"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Placeholder Telefone</Label>
                <Input
                  value={config.phonePlaceholder}
                  onChange={(e) => updateConfig({ phonePlaceholder: e.target.value })}
                  className="bg-secondary/50 border-border"
                />
              </div>
            </div>

            <Separator className="bg-border" />

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-orange-400">Cores</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Cor do Botão</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={config.buttonColor}
                      onChange={(e) => updateConfig({ buttonColor: e.target.value })}
                      className="w-10 h-10 p-1 bg-secondary/50 border-border cursor-pointer"
                    />
                    <Input
                      value={config.buttonColor}
                      onChange={(e) => updateConfig({ buttonColor: e.target.value })}
                      className="bg-secondary/50 border-border flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Cor de Fundo</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={config.backgroundColor}
                      onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                      className="w-10 h-10 p-1 bg-secondary/50 border-border cursor-pointer"
                    />
                    <Input
                      value={config.backgroundColor}
                      onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                      className="bg-secondary/50 border-border flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Cor do Countdown</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={config.countdownColor}
                    onChange={(e) => updateConfig({ countdownColor: e.target.value })}
                    className="w-10 h-10 p-1 bg-secondary/50 border-border cursor-pointer"
                  />
                  <Input
                    value={config.countdownColor}
                    onChange={(e) => updateConfig({ countdownColor: e.target.value })}
                    className="bg-secondary/50 border-border flex-1"
                  />
                </div>
              </div>
            </div>

            <Separator className="bg-border" />

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-orange-400 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Imagem do Produto
              </h3>

              <div className="flex items-center justify-between">
                <Label className="text-muted-foreground text-xs">Mostrar Imagem</Label>
                <Switch
                  checked={config.showProductImage}
                  onCheckedChange={(v) => updateConfig({ showProductImage: v })}
                />
              </div>

              {config.showProductImage && (
                <>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">URL da Imagem</Label>
                    <Input
                      value={config.productImage}
                      onChange={(e) => updateConfig({ productImage: e.target.value })}
                      placeholder="https://exemplo.com/produto.jpg"
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">Posição</Label>
                    <Select
                      value={config.productImagePosition}
                      onValueChange={(v: "top" | "side") => updateConfig({ productImagePosition: v })}
                    >
                      <SelectTrigger className="bg-secondary/50 border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="top">Topo</SelectItem>
                        <SelectItem value="side">Lateral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>
          </TabsContent>

          {/* Features (Countdown, Social Proof) */}
          <TabsContent value="features" className="p-4 space-y-4 mt-0">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-orange-400 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Countdown
              </h3>

              <div className="flex items-center justify-between">
                <Label className="text-muted-foreground text-xs">Mostrar Countdown</Label>
                <Switch
                  checked={config.showCountdown}
                  onCheckedChange={(v) => updateConfig({ showCountdown: v })}
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
                      min={0}
                      max={23}
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">Minutos</Label>
                    <Input
                      type="number"
                      value={config.countdownMinutes}
                      onChange={(e) => updateConfig({ countdownMinutes: parseInt(e.target.value) || 0 })}
                      min={0}
                      max={59}
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">Segundos</Label>
                    <Input
                      type="number"
                      value={config.countdownSeconds}
                      onChange={(e) => updateConfig({ countdownSeconds: parseInt(e.target.value) || 0 })}
                      min={0}
                      max={59}
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                </div>
              )}
            </div>

            <Separator className="bg-border" />

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-orange-400 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Prova Social
              </h3>

              <div className="flex items-center justify-between">
                <Label className="text-muted-foreground text-xs">Mostrar Prova Social</Label>
                <Switch
                  checked={config.showSocialProof}
                  onCheckedChange={(v) => updateConfig({ showSocialProof: v })}
                />
              </div>

              {config.showSocialProof && (
                <div className="grid grid-cols-2 gap-3">
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
                    <Label className="text-muted-foreground text-xs">Vendas/Hora</Label>
                    <Input
                      type="number"
                      value={config.salesLastHour}
                      onChange={(e) => updateConfig({ salesLastHour: parseInt(e.target.value) || 0 })}
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Thank You Page */}
          <TabsContent value="thankyou" className="p-4 space-y-4 mt-0">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-orange-400 flex items-center gap-2">
                <Gift className="w-4 h-4" />
                Página de Obrigado
              </h3>

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

              <div className="grid grid-cols-2 gap-3">
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
              </div>
            </div>

            <Separator className="bg-border" />

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-orange-400">Cores da Página</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Fundo</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={config.thankYouBackgroundColor}
                      onChange={(e) => updateConfig({ thankYouBackgroundColor: e.target.value })}
                      className="w-10 h-10 p-1 bg-secondary/50 border-border cursor-pointer"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Cartão</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={config.thankYouCardColor}
                      onChange={(e) => updateConfig({ thankYouCardColor: e.target.value })}
                      className="w-10 h-10 p-1 bg-secondary/50 border-border cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Título</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={config.thankYouTitleColor}
                      onChange={(e) => updateConfig({ thankYouTitleColor: e.target.value })}
                      className="w-10 h-10 p-1 bg-secondary/50 border-border cursor-pointer"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Mensagem</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={config.thankYouMessageColor}
                      onChange={(e) => updateConfig({ thankYouMessageColor: e.target.value })}
                      className="w-10 h-10 p-1 bg-secondary/50 border-border cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-border" />

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-orange-400">Detalhes do Pedido</h3>

              <div className="flex items-center justify-between">
                <Label className="text-muted-foreground text-xs">Mostrar Detalhes</Label>
                <Switch
                  checked={config.showOrderDetails}
                  onCheckedChange={(v) => updateConfig({ showOrderDetails: v })}
                />
              </div>

              {config.showOrderDetails && (
                <>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">Título Detalhes</Label>
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
              <h3 className="text-sm font-semibold text-orange-400">Imagem do Produto</h3>

              <div className="flex items-center justify-between">
                <Label className="text-muted-foreground text-xs">Mostrar Imagem</Label>
                <Switch
                  checked={config.showThankYouProductImage}
                  onCheckedChange={(v) => updateConfig({ showThankYouProductImage: v })}
                />
              </div>
            </div>

            <Separator className="bg-border" />

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-orange-400">Texto Final</h3>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Texto</Label>
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
                  placeholder="contato@exemplo.com"
                  className="bg-secondary/50 border-border"
                />
              </div>
            </div>
          </TabsContent>

          {/* Upsell */}
          <TabsContent value="upsell" className="p-4 space-y-4 mt-0">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-orange-400 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                Upsell
              </h3>

              <div className="flex items-center justify-between">
                <Label className="text-muted-foreground text-xs">Mostrar Upsell</Label>
                <Switch
                  checked={config.showUpsell}
                  onCheckedChange={(v) => updateConfig({ showUpsell: v })}
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

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-xs">Preço</Label>
                      <Input
                        value={config.upsellPrice}
                        onChange={(e) => updateConfig({ upsellPrice: e.target.value })}
                        className="bg-secondary/50 border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-xs">Texto Botão</Label>
                      <Input
                        value={config.upsellButtonText}
                        onChange={(e) => updateConfig({ upsellButtonText: e.target.value })}
                        className="bg-secondary/50 border-border"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">URL do Botão</Label>
                    <Input
                      value={config.upsellButtonUrl}
                      onChange={(e) => updateConfig({ upsellButtonUrl: e.target.value })}
                      className="bg-secondary/50 border-border"
                    />
                  </div>

                  <Separator className="bg-border" />

                  <h4 className="text-sm font-semibold text-orange-400">Cores do Upsell</h4>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-xs">Fundo</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={config.upsellBackgroundColor}
                          onChange={(e) => updateConfig({ upsellBackgroundColor: e.target.value })}
                          className="w-10 h-10 p-1 bg-secondary/50 border-border cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-xs">Botão</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={config.upsellButtonColor}
                          onChange={(e) => updateConfig({ upsellButtonColor: e.target.value })}
                          className="w-10 h-10 p-1 bg-secondary/50 border-border cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-border" />

                  <h4 className="text-sm font-semibold text-orange-400">Imagem do Upsell</h4>

                  <div className="flex items-center justify-between">
                    <Label className="text-muted-foreground text-xs">Mostrar Imagem</Label>
                    <Switch
                      checked={config.showUpsellImage}
                      onCheckedChange={(v) => updateConfig({ showUpsellImage: v })}
                    />
                  </div>

                  {config.showUpsellImage && (
                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-xs">URL da Imagem</Label>
                      <Input
                        value={config.upsellImage}
                        onChange={(e) => updateConfig({ upsellImage: e.target.value })}
                        placeholder="https://exemplo.com/upsell.jpg"
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
