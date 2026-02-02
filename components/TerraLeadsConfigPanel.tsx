import { TerraLeadsConfig, TerraLeadsTheme, TERRALEADS_LANGUAGES, getDefaultTerraLeadsConfig } from "@/types/terraleads";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Key, Palette, Settings, Gift, Heart, User, Sparkles } from "lucide-react";

const THEME_OPTIONS: { value: TerraLeadsTheme; label: string; description: string }[] = [
  { value: "classic", label: "🎨 Classic", description: "Estilo tradicional e limpo" },
  { value: "neon", label: "⚡ Neon", description: "Efeitos de brilho cyberpunk" },
  { value: "minimal", label: "✨ Minimal", description: "Design clean e elegante" },
  { value: "premium", label: "👑 Premium", description: "Gradientes dourados luxuosos" },
];

const GEO_OPTIONS = [
  { code: "RO", name: "România", flag: "🇷🇴" },
  { code: "BR", name: "Brasil", flag: "🇧🇷" },
  { code: "PL", name: "Polska", flag: "🇵🇱" },
  { code: "IT", name: "Italia", flag: "🇮🇹" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "RU", name: "Россия", flag: "🇷🇺" },
];

interface TerraLeadsConfigPanelProps {
  config: TerraLeadsConfig;
  language: string;
  updateConfig: (updates: Partial<TerraLeadsConfig>) => void;
  onLanguageChange: (language: string) => void;
}

export function TerraLeadsConfigPanel({
  config,
  language,
  updateConfig,
  onLanguageChange,
}: TerraLeadsConfigPanelProps) {
  const handleLanguageChange = (newLanguage: string) => {
    onLanguageChange(newLanguage);
    const newDefaults = getDefaultTerraLeadsConfig(newLanguage);
    updateConfig({
      country: newDefaults.country,
      currency: newDefaults.currency,
      thankYouTitle: newDefaults.thankYouTitle,
      thankYouMessage: newDefaults.thankYouMessage,
      thankYouButtonText: newDefaults.thankYouButtonText,
      orderDetailsTitle: newDefaults.orderDetailsTitle,
      productLabel: newDefaults.productLabel,
      priceLabel: newDefaults.priceLabel,
      discountLabel: newDefaults.discountLabel,
      statusLabel: newDefaults.statusLabel,
      statusConfirmedText: newDefaults.statusConfirmedText,
      finalText: newDefaults.finalText,
      upsellTitle: newDefaults.upsellTitle,
      upsellMessage: newDefaults.upsellMessage,
      upsellButtonText: newDefaults.upsellButtonText,
    });
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-border bg-gradient-to-r from-amber-600/10 to-orange-600/10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-sm">
            🌍
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Terra Leads</h2>
            <p className="text-xs text-muted-foreground">Configuração do formulário</p>
          </div>
        </div>

        {/* Geo Selector */}
        <Select value={language} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-full h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {GEO_OPTIONS.map((geo) => (
              <SelectItem key={geo.code} value={geo.code}>
                <span className="flex items-center gap-2">
                  <span>{geo.flag}</span>
                  <span>{geo.name}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="api" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="flex-shrink-0 w-full justify-start rounded-none border-b bg-transparent p-0 h-auto">
          <TabsTrigger value="api" className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-500 data-[state=active]:bg-transparent px-4 py-2">
            <Key className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="visual" className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-500 data-[state=active]:bg-transparent px-4 py-2">
            <Palette className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="features" className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-500 data-[state=active]:bg-transparent px-4 py-2">
            <Settings className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="thankyou" className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-500 data-[state=active]:bg-transparent px-4 py-2">
            <Heart className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="upsell" className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-500 data-[state=active]:bg-transparent px-4 py-2">
            <Gift className="w-4 h-4" />
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-auto custom-scrollbar">
          {/* API Tab */}
          <TabsContent value="api" className="m-0 p-4 space-y-4">
            <div className="space-y-2">
              <Label className="text-xs flex items-center gap-1">
                <Key className="w-3 h-3" /> Chave API
              </Label>
              <Input
                value={config.apiKey}
                onChange={(e) => updateConfig({ apiKey: e.target.value })}
                placeholder="Sua chave API secreta"
                type="password"
                className="h-9 text-sm"
              />
            </div>

            {/* UNIQUE FIELD: User ID */}
            <div className="space-y-2 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <Label className="text-xs flex items-center gap-1 text-amber-600 font-semibold">
                <User className="w-3 h-3" /> User ID (Exclusivo Terra Leads)
              </Label>
              <Input
                value={config.userId}
                onChange={(e) => updateConfig({ userId: e.target.value })}
                placeholder="Seu User ID (número)"
                className="h-9 text-sm border-amber-500/50"
              />
              <p className="text-xs text-muted-foreground">
                Campo obrigatório exclusivo da Terra Leads. Encontre no seu perfil.
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Offer ID</Label>
              <Input
                value={config.offerId}
                onChange={(e) => updateConfig({ offerId: e.target.value })}
                placeholder="ID da oferta"
                className="h-9 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Domínio</Label>
              <Input
                value={config.domain}
                onChange={(e) => updateConfig({ domain: e.target.value })}
                placeholder="https://seudominio.com"
                className="h-9 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs">País</Label>
              <Select value={config.country} onValueChange={(value) => updateConfig({ country: value })}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {GEO_OPTIONS.map((geo) => (
                    <SelectItem key={geo.code} value={geo.code}>
                      {geo.flag} {geo.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          {/* Visual Tab */}
          <TabsContent value="visual" className="m-0 p-4 space-y-4">
            {/* Theme Selector */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-amber-400 flex items-center gap-2">
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
                        ? "border-amber-500 bg-amber-500/10"
                        : "border-border bg-secondary/30 hover:bg-secondary/50"
                    }`}
                  >
                    <div className="font-medium text-sm">{theme.label}</div>
                    <div className="text-xs text-muted-foreground">{theme.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border space-y-2">
              <Label className="text-xs">Título do Formulário</Label>
              <Input
                value={config.title}
                onChange={(e) => updateConfig({ title: e.target.value })}
                className="h-9 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Largura do formulário: {config.formWidth}px</Label>
              <Slider
                value={[config.formWidth]}
                onValueChange={([value]) => updateConfig({ formWidth: value })}
                min={300}
                max={500}
                step={10}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-xs">Cor de Fundo</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={config.backgroundColor}
                    onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                    className="w-10 h-9 p-1 cursor-pointer"
                  />
                  <Input
                    value={config.backgroundColor}
                    onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                    className="flex-1 h-9 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Cor Primária</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={config.primaryColor}
                    onChange={(e) => updateConfig({ primaryColor: e.target.value })}
                    className="w-10 h-9 p-1 cursor-pointer"
                  />
                  <Input
                    value={config.primaryColor}
                    onChange={(e) => updateConfig({ primaryColor: e.target.value })}
                    className="flex-1 h-9 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Cor do Botão</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={config.buttonColor}
                    onChange={(e) => updateConfig({ buttonColor: e.target.value })}
                    className="w-10 h-9 p-1 cursor-pointer"
                  />
                  <Input
                    value={config.buttonColor}
                    onChange={(e) => updateConfig({ buttonColor: e.target.value })}
                    className="flex-1 h-9 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Cor do Countdown</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={config.countdownColor}
                    onChange={(e) => updateConfig({ countdownColor: e.target.value })}
                    className="w-10 h-9 p-1 cursor-pointer"
                  />
                  <Input
                    value={config.countdownColor}
                    onChange={(e) => updateConfig({ countdownColor: e.target.value })}
                    className="flex-1 h-9 text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-xs">Borda do Botão</Label>
                <Select value={config.buttonBorderRadius} onValueChange={(value: TerraLeadsConfig["buttonBorderRadius"]) => updateConfig({ buttonBorderRadius: value })}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Pequena</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="large">Grande</SelectItem>
                    <SelectItem value="full">Completa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Tamanho do Botão</Label>
                <Select value={config.buttonSize} onValueChange={(value: TerraLeadsConfig["buttonSize"]) => updateConfig({ buttonSize: value })}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Pequeno</SelectItem>
                    <SelectItem value="medium">Médio</SelectItem>
                    <SelectItem value="large">Grande</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Largura do Botão</Label>
              <Select value={config.buttonWidth} onValueChange={(value: TerraLeadsConfig["buttonWidth"]) => updateConfig({ buttonWidth: value })}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Automática</SelectItem>
                  <SelectItem value="full">Largura Total</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Pricing Section */}
            <div className="pt-4 border-t border-border space-y-3">
              <h3 className="text-sm font-medium">Preços</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs">Preço Antigo</Label>
                  <Input
                    value={config.oldPrice}
                    onChange={(e) => updateConfig({ oldPrice: e.target.value })}
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Preço Novo</Label>
                  <Input
                    value={config.newPrice}
                    onChange={(e) => updateConfig({ newPrice: e.target.value })}
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Moeda</Label>
                  <Input
                    value={config.currency}
                    onChange={(e) => updateConfig({ currency: e.target.value })}
                    className="h-9 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Form Fields Section */}
            <div className="pt-4 border-t border-border space-y-3">
              <h3 className="text-sm font-medium">Campos do Formulário</h3>
              <div className="space-y-2">
                <Label className="text-xs">Placeholder do Nome</Label>
                <Input
                  value={config.namePlaceholder}
                  onChange={(e) => updateConfig({ namePlaceholder: e.target.value })}
                  className="h-9 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Placeholder do Telefone</Label>
                <Input
                  value={config.phonePlaceholder}
                  onChange={(e) => updateConfig({ phonePlaceholder: e.target.value })}
                  className="h-9 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Texto do Botão (CTA)</Label>
                <Input
                  value={config.ctaText}
                  onChange={(e) => updateConfig({ ctaText: e.target.value })}
                  className="h-9 text-sm"
                />
              </div>
            </div>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features" className="m-0 p-4 space-y-4">
            {/* Countdown */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium">Mostrar Countdown</Label>
                <Switch
                  checked={config.showCountdown}
                  onCheckedChange={(checked) => updateConfig({ showCountdown: checked })}
                />
              </div>
              {config.showCountdown && (
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs">Horas</Label>
                    <Input
                      type="number"
                      value={config.countdownHours}
                      onChange={(e) => updateConfig({ countdownHours: parseInt(e.target.value) || 0 })}
                      className="h-9 text-sm"
                      min={0}
                      max={23}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Minutos</Label>
                    <Input
                      type="number"
                      value={config.countdownMinutes}
                      onChange={(e) => updateConfig({ countdownMinutes: parseInt(e.target.value) || 0 })}
                      className="h-9 text-sm"
                      min={0}
                      max={59}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Segundos</Label>
                    <Input
                      type="number"
                      value={config.countdownSeconds}
                      onChange={(e) => updateConfig({ countdownSeconds: parseInt(e.target.value) || 0 })}
                      className="h-9 text-sm"
                      min={0}
                      max={59}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Social Proof */}
            <div className="pt-4 border-t border-border space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium">Mostrar Prova Social</Label>
                <Switch
                  checked={config.showSocialProof}
                  onCheckedChange={(checked) => updateConfig({ showSocialProof: checked })}
                />
              </div>
              {config.showSocialProof && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">Pessoas visualizando</Label>
                    <Input
                      type="number"
                      value={config.viewingCount}
                      onChange={(e) => updateConfig({ viewingCount: parseInt(e.target.value) || 0 })}
                      className="h-9 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Vendas na última hora</Label>
                    <Input
                      type="number"
                      value={config.salesLastHour}
                      onChange={(e) => updateConfig({ salesLastHour: parseInt(e.target.value) || 0 })}
                      className="h-9 text-sm"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Product Image */}
            <div className="pt-4 border-t border-border space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium">Imagem do Produto</Label>
                <Switch
                  checked={config.showProductImage}
                  onCheckedChange={(checked) => updateConfig({ showProductImage: checked })}
                />
              </div>
              {config.showProductImage && (
                <>
                  <div className="space-y-2">
                    <Label className="text-xs">URL da Imagem</Label>
                    <Input
                      value={config.productImage}
                      onChange={(e) => updateConfig({ productImage: e.target.value })}
                      placeholder="https://..."
                      className="h-9 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Posição da Imagem</Label>
                    <Select value={config.productImagePosition} onValueChange={(value: TerraLeadsConfig["productImagePosition"]) => updateConfig({ productImagePosition: value })}>
                      <SelectTrigger className="h-9 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="top">Acima dos Preços</SelectItem>
                        <SelectItem value="side">Ao lado dos Preços</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>

            {/* Security & Disclaimer */}
            <div className="pt-4 border-t border-border space-y-3">
              <h3 className="text-sm font-medium">Segurança e Disclaimer</h3>
              <div className="grid grid-cols-4 gap-2">
                <div className="space-y-1">
                  <Label className="text-xs">Emoji</Label>
                  <Input
                    value={config.securityEmoji}
                    onChange={(e) => updateConfig({ securityEmoji: e.target.value })}
                    className="h-9 text-sm text-center"
                  />
                </div>
                <div className="col-span-3 space-y-1">
                  <Label className="text-xs">Texto de Segurança</Label>
                  <Input
                    value={config.securityText}
                    onChange={(e) => updateConfig({ securityText: e.target.value })}
                    className="h-9 text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Texto Disclaimer</Label>
                <Input
                  value={config.disclaimerText}
                  onChange={(e) => updateConfig({ disclaimerText: e.target.value })}
                  className="h-9 text-sm"
                />
              </div>
            </div>
          </TabsContent>

          {/* Thank You Tab */}
          <TabsContent value="thankyou" className="m-0 p-4 space-y-4">
            <div className="space-y-2">
              <Label className="text-xs">Título</Label>
              <Input
                value={config.thankYouTitle}
                onChange={(e) => updateConfig({ thankYouTitle: e.target.value })}
                className="h-9 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Mensagem</Label>
              <Textarea
                value={config.thankYouMessage}
                onChange={(e) => updateConfig({ thankYouMessage: e.target.value })}
                className="text-sm min-h-[80px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-xs">Texto do Botão</Label>
                <Input
                  value={config.thankYouButtonText}
                  onChange={(e) => updateConfig({ thankYouButtonText: e.target.value })}
                  className="h-9 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">URL do Botão</Label>
                <Input
                  value={config.thankYouButtonUrl}
                  onChange={(e) => updateConfig({ thankYouButtonUrl: e.target.value })}
                  className="h-9 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-xs">Cor de Fundo</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={config.thankYouBackgroundColor}
                    onChange={(e) => updateConfig({ thankYouBackgroundColor: e.target.value })}
                    className="w-10 h-9 p-1 cursor-pointer"
                  />
                  <Input
                    value={config.thankYouBackgroundColor}
                    onChange={(e) => updateConfig({ thankYouBackgroundColor: e.target.value })}
                    className="flex-1 h-9 text-xs"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Cor do Card</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={config.thankYouCardColor}
                    onChange={(e) => updateConfig({ thankYouCardColor: e.target.value })}
                    className="w-10 h-9 p-1 cursor-pointer"
                  />
                  <Input
                    value={config.thankYouCardColor}
                    onChange={(e) => updateConfig({ thankYouCardColor: e.target.value })}
                    className="flex-1 h-9 text-xs"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Cor do Título</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={config.thankYouTitleColor}
                    onChange={(e) => updateConfig({ thankYouTitleColor: e.target.value })}
                    className="w-10 h-9 p-1 cursor-pointer"
                  />
                  <Input
                    value={config.thankYouTitleColor}
                    onChange={(e) => updateConfig({ thankYouTitleColor: e.target.value })}
                    className="flex-1 h-9 text-xs"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Cor da Mensagem</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={config.thankYouMessageColor}
                    onChange={(e) => updateConfig({ thankYouMessageColor: e.target.value })}
                    className="w-10 h-9 p-1 cursor-pointer"
                  />
                  <Input
                    value={config.thankYouMessageColor}
                    onChange={(e) => updateConfig({ thankYouMessageColor: e.target.value })}
                    className="flex-1 h-9 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Show Product Image on Thank You */}
            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium">Mostrar Imagem do Produto</Label>
                <Switch
                  checked={config.showThankYouProductImage}
                  onCheckedChange={(checked) => updateConfig({ showThankYouProductImage: checked })}
                />
              </div>
            </div>

            {/* Order Details */}
            <div className="pt-4 border-t border-border space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium">Detalhes do Pedido</Label>
                <Switch
                  checked={config.showOrderDetails}
                  onCheckedChange={(checked) => updateConfig({ showOrderDetails: checked })}
                />
              </div>
              {config.showOrderDetails && (
                <div className="space-y-2">
                  <Input
                    value={config.orderDetailsTitle}
                    onChange={(e) => updateConfig({ orderDetailsTitle: e.target.value })}
                    placeholder="Título"
                    className="h-9 text-sm"
                  />
                  <Input
                    value={config.discountPercent}
                    onChange={(e) => updateConfig({ discountPercent: e.target.value })}
                    placeholder="% Desconto"
                    className="h-9 text-sm"
                  />
                </div>
              )}
            </div>

            {/* Contact & Final Text */}
            <div className="pt-4 border-t border-border space-y-3">
              <div className="space-y-2">
                <Label className="text-xs">Email de Contato</Label>
                <Input
                  value={config.contactEmail}
                  onChange={(e) => updateConfig({ contactEmail: e.target.value })}
                  className="h-9 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Texto Final</Label>
                <Textarea
                  value={config.finalText}
                  onChange={(e) => updateConfig({ finalText: e.target.value })}
                  className="text-sm min-h-[80px]"
                />
              </div>
            </div>
          </TabsContent>

          {/* Upsell Tab */}
          <TabsContent value="upsell" className="m-0 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium">Ativar Upsell</Label>
              <Switch
                checked={config.showUpsell}
                onCheckedChange={(checked) => updateConfig({ showUpsell: checked })}
              />
            </div>

            {config.showUpsell && (
              <>
                <div className="space-y-2">
                  <Label className="text-xs">Título</Label>
                  <Input
                    value={config.upsellTitle}
                    onChange={(e) => updateConfig({ upsellTitle: e.target.value })}
                    className="h-9 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs">Mensagem</Label>
                  <Textarea
                    value={config.upsellMessage}
                    onChange={(e) => updateConfig({ upsellMessage: e.target.value })}
                    className="text-sm min-h-[60px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs">Preço</Label>
                    <Input
                      value={config.upsellPrice}
                      onChange={(e) => updateConfig({ upsellPrice: e.target.value })}
                      className="h-9 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Texto do Botão</Label>
                    <Input
                      value={config.upsellButtonText}
                      onChange={(e) => updateConfig({ upsellButtonText: e.target.value })}
                      className="h-9 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs">URL do Botão</Label>
                  <Input
                    value={config.upsellButtonUrl}
                    onChange={(e) => updateConfig({ upsellButtonUrl: e.target.value })}
                    className="h-9 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs">Cor de Fundo</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={config.upsellBackgroundColor}
                        onChange={(e) => updateConfig({ upsellBackgroundColor: e.target.value })}
                        className="w-10 h-9 p-1 cursor-pointer"
                      />
                      <Input
                        value={config.upsellBackgroundColor}
                        onChange={(e) => updateConfig({ upsellBackgroundColor: e.target.value })}
                        className="flex-1 h-9 text-xs"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Cor do Botão</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={config.upsellButtonColor}
                        onChange={(e) => updateConfig({ upsellButtonColor: e.target.value })}
                        className="w-10 h-9 p-1 cursor-pointer"
                      />
                      <Input
                        value={config.upsellButtonColor}
                        onChange={(e) => updateConfig({ upsellButtonColor: e.target.value })}
                        className="flex-1 h-9 text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Upsell Image */}
                <div className="pt-4 border-t border-border space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-medium">Imagem do Upsell</Label>
                    <Switch
                      checked={config.showUpsellImage}
                      onCheckedChange={(checked) => updateConfig({ showUpsellImage: checked })}
                    />
                  </div>
                  {config.showUpsellImage && (
                    <div className="space-y-2">
                      <Label className="text-xs">URL da Imagem</Label>
                      <Input
                        value={config.upsellImage}
                        onChange={(e) => updateConfig({ upsellImage: e.target.value })}
                        placeholder="https://..."
                        className="h-9 text-sm"
                      />
                    </div>
                  )}
                </div>
              </>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
