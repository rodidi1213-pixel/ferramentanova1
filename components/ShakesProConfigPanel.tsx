import { ShakesProConfig, ShakesProTheme, SHAKESPRO_LANGUAGES, getDefaultShakesProConfig } from "@/types/shakespro";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Palette, LayoutGrid, Gift, CheckCircle, Sparkles } from "lucide-react";

const THEME_OPTIONS: { value: ShakesProTheme; label: string; description: string }[] = [
  { value: "classic", label: "🎨 Classic", description: "Estilo tradicional e limpo" },
  { value: "neon", label: "⚡ Neon", description: "Efeitos de brilho cyberpunk" },
  { value: "minimal", label: "✨ Minimal", description: "Design clean e elegante" },
  { value: "premium", label: "👑 Premium", description: "Gradientes dourados luxuosos" },
];

interface ShakesProConfigPanelProps {
  config: ShakesProConfig;
  onConfigChange: (config: ShakesProConfig) => void;
}

export function ShakesProConfigPanel({ config, onConfigChange }: ShakesProConfigPanelProps) {
  const updateConfig = (updates: Partial<ShakesProConfig>) => {
    onConfigChange({ ...config, ...updates });
  };

  const handleLanguageChange = (langCode: string) => {
    const newConfig = getDefaultShakesProConfig(langCode);
    onConfigChange({
      ...newConfig,
      offerId: config.offerId,
      landingId: config.landingId,
      domain: config.domain,
      productImage: config.productImage,
      upsellImage: config.upsellImage,
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-amber-600 to-orange-600">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          🥤 Shakes.pro
        </h2>
        <p className="text-amber-100 text-sm">Configure seu formulário</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="api" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-5 m-2 mr-4">
          <TabsTrigger value="api" className="flex items-center gap-1 text-xs">
            <Settings className="w-3 h-3" />
            <span className="hidden sm:inline">API</span>
          </TabsTrigger>
          <TabsTrigger value="visual" className="flex items-center gap-1 text-xs">
            <Palette className="w-3 h-3" />
            <span className="hidden sm:inline">Visual</span>
          </TabsTrigger>
          <TabsTrigger value="features" className="flex items-center gap-1 text-xs">
            <LayoutGrid className="w-3 h-3" />
            <span className="hidden sm:inline">Features</span>
          </TabsTrigger>
          <TabsTrigger value="thankyou" className="flex items-center gap-1 text-xs">
            <CheckCircle className="w-3 h-3" />
            <span className="hidden sm:inline">Thank You</span>
          </TabsTrigger>
          <TabsTrigger value="upsell" className="flex items-center gap-1 text-xs">
            <Gift className="w-3 h-3" />
            <span className="hidden sm:inline">Upsell</span>
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto p-4">
          {/* API Tab */}
          <TabsContent value="api" className="mt-0 space-y-4">
            <div className="space-y-4">
              <div>
                <Label className="text-xs font-medium">Idioma / GEO</Label>
                <Select value={config.country} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(SHAKESPRO_LANGUAGES).map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs font-medium">Offer ID</Label>
                <Input
                  value={config.offerId}
                  onChange={(e) => updateConfig({ offerId: e.target.value })}
                  placeholder="Ex: 18974"
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-xs font-medium">Landing ID</Label>
                <Input
                  value={config.landingId}
                  onChange={(e) => updateConfig({ landingId: e.target.value })}
                  placeholder="Ex: 12345"
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-xs font-medium">Domínio</Label>
                <Input
                  value={config.domain}
                  onChange={(e) => updateConfig({ domain: e.target.value })}
                  placeholder="Ex: seu-dominio.com"
                  className="mt-1"
                />
              </div>
            </div>
          </TabsContent>

          {/* Visual Tab */}
          <TabsContent value="visual" className="mt-0 space-y-4">
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

            <div className="pt-4 border-t border-border space-y-4">
              <div>
                <Label className="text-xs font-medium">Título</Label>
                <Input
                  value={config.title}
                  onChange={(e) => updateConfig({ title: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-medium">Preço Antigo</Label>
                  <Input
                    value={config.oldPrice}
                    onChange={(e) => updateConfig({ oldPrice: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium">Preço Novo</Label>
                  <Input
                    value={config.newPrice}
                    onChange={(e) => updateConfig({ newPrice: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-medium">Moeda</Label>
                  <Input
                    value={config.currency}
                    onChange={(e) => updateConfig({ currency: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium">Desconto %</Label>
                  <Input
                    type="number"
                    value={config.discountPercent}
                    onChange={(e) => updateConfig({ discountPercent: Number(e.target.value) })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs font-medium">Texto do Botão (CTA)</Label>
                <Input
                  value={config.ctaText}
                  onChange={(e) => updateConfig({ ctaText: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-xs font-medium">Largura do Formulário: {config.formWidth}px</Label>
                <Slider
                  value={[config.formWidth]}
                  onValueChange={([value]) => updateConfig({ formWidth: value })}
                  min={300}
                  max={500}
                  step={10}
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-medium">Cor Principal</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="color"
                      value={config.primaryColor}
                      onChange={(e) => updateConfig({ primaryColor: e.target.value })}
                      className="w-12 h-9 p-1"
                    />
                    <Input
                      value={config.primaryColor}
                      onChange={(e) => updateConfig({ primaryColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-medium">Cor do Botão</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="color"
                      value={config.buttonColor}
                      onChange={(e) => updateConfig({ buttonColor: e.target.value })}
                      className="w-12 h-9 p-1"
                    />
                    <Input
                      value={config.buttonColor}
                      onChange={(e) => updateConfig({ buttonColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-medium">Cor de Fundo</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="color"
                      value={config.backgroundColor}
                      onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                      className="w-12 h-9 p-1"
                    />
                    <Input
                      value={config.backgroundColor}
                      onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-medium">Cor do Countdown</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="color"
                      value={config.countdownColor}
                      onChange={(e) => updateConfig({ countdownColor: e.target.value })}
                      className="w-12 h-9 p-1"
                    />
                    <Input
                      value={config.countdownColor}
                      onChange={(e) => updateConfig({ countdownColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-xs font-medium">Borda do Botão</Label>
                <Select
                  value={config.buttonBorderRadius}
                  onValueChange={(value: "small" | "medium" | "large" | "full") =>
                    updateConfig({ buttonBorderRadius: value })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Pequeno (4px)</SelectItem>
                    <SelectItem value="medium">Médio (8px)</SelectItem>
                    <SelectItem value="large">Grande (12px)</SelectItem>
                    <SelectItem value="full">Arredondado (25px)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features" className="mt-0 space-y-4">
            <div className="space-y-4">
              {/* Product Image */}
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium">Mostrar Imagem do Produto</Label>
                <Switch
                  checked={config.showProductImage}
                  onCheckedChange={(checked) => updateConfig({ showProductImage: checked })}
                />
              </div>

              {config.showProductImage && (
                <div>
                  <Label className="text-xs font-medium">URL da Imagem</Label>
                  <Input
                    value={config.productImage}
                    onChange={(e) => updateConfig({ productImage: e.target.value })}
                    placeholder="https://..."
                    className="mt-1"
                  />
                </div>
              )}

              {/* Countdown */}
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium">Mostrar Countdown</Label>
                <Switch
                  checked={config.showCountdown}
                  onCheckedChange={(checked) => updateConfig({ showCountdown: checked })}
                />
              </div>

              {config.showCountdown && (
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label className="text-xs">Horas</Label>
                    <Input
                      type="number"
                      value={config.countdownHours}
                      onChange={(e) => updateConfig({ countdownHours: Number(e.target.value) })}
                      min={0}
                      max={23}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Minutos</Label>
                    <Input
                      type="number"
                      value={config.countdownMinutes}
                      onChange={(e) => updateConfig({ countdownMinutes: Number(e.target.value) })}
                      min={0}
                      max={59}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Segundos</Label>
                    <Input
                      type="number"
                      value={config.countdownSeconds}
                      onChange={(e) => updateConfig({ countdownSeconds: Number(e.target.value) })}
                      min={0}
                      max={59}
                      className="mt-1"
                    />
                  </div>
                </div>
              )}

              {/* Social Proof */}
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium">Mostrar Prova Social</Label>
                <Switch
                  checked={config.showSocialProof}
                  onCheckedChange={(checked) => updateConfig({ showSocialProof: checked })}
                />
              </div>

              {config.showSocialProof && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Pessoas Online</Label>
                    <Input
                      type="number"
                      value={config.viewingCount}
                      onChange={(e) => updateConfig({ viewingCount: Number(e.target.value) })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Vendas na Última Hora</Label>
                    <Input
                      type="number"
                      value={config.salesLastHour}
                      onChange={(e) => updateConfig({ salesLastHour: Number(e.target.value) })}
                      className="mt-1"
                    />
                  </div>
                </div>
              )}

              {/* Placeholders */}
              <div>
                <Label className="text-xs font-medium">Placeholder do Nome</Label>
                <Input
                  value={config.namePlaceholder}
                  onChange={(e) => updateConfig({ namePlaceholder: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-xs font-medium">Placeholder do Telefone</Label>
                <Input
                  value={config.phonePlaceholder}
                  onChange={(e) => updateConfig({ phonePlaceholder: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-xs font-medium">Texto de Segurança</Label>
                <Input
                  value={config.securityText}
                  onChange={(e) => updateConfig({ securityText: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-xs font-medium">Disclaimer</Label>
                <Input
                  value={config.disclaimerText}
                  onChange={(e) => updateConfig({ disclaimerText: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
          </TabsContent>

          {/* Thank You Tab */}
          <TabsContent value="thankyou" className="mt-0 space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium">Habilitar Página de Obrigado</Label>
                <Switch
                  checked={config.showThankYouPage}
                  onCheckedChange={(checked) => updateConfig({ showThankYouPage: checked })}
                />
              </div>

              <div>
                <Label className="text-xs font-medium">Título</Label>
                <Input
                  value={config.thankYouTitle}
                  onChange={(e) => updateConfig({ thankYouTitle: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-xs font-medium">Mensagem</Label>
                <Input
                  value={config.thankYouMessage}
                  onChange={(e) => updateConfig({ thankYouMessage: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-medium">Texto do Botão</Label>
                  <Input
                    value={config.thankYouButtonText}
                    onChange={(e) => updateConfig({ thankYouButtonText: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium">URL do Botão</Label>
                  <Input
                    value={config.thankYouButtonUrl}
                    onChange={(e) => updateConfig({ thankYouButtonUrl: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-medium">Cor de Fundo</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="color"
                      value={config.thankYouBackgroundColor}
                      onChange={(e) => updateConfig({ thankYouBackgroundColor: e.target.value })}
                      className="w-12 h-9 p-1"
                    />
                    <Input
                      value={config.thankYouBackgroundColor}
                      onChange={(e) => updateConfig({ thankYouBackgroundColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-medium">Cor do Card</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="color"
                      value={config.thankYouCardColor}
                      onChange={(e) => updateConfig({ thankYouCardColor: e.target.value })}
                      className="w-12 h-9 p-1"
                    />
                    <Input
                      value={config.thankYouCardColor}
                      onChange={(e) => updateConfig({ thankYouCardColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-medium">Cor do Título</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="color"
                      value={config.thankYouTitleColor}
                      onChange={(e) => updateConfig({ thankYouTitleColor: e.target.value })}
                      className="w-12 h-9 p-1"
                    />
                    <Input
                      value={config.thankYouTitleColor}
                      onChange={(e) => updateConfig({ thankYouTitleColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-medium">Cor da Mensagem</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="color"
                      value={config.thankYouMessageColor}
                      onChange={(e) => updateConfig({ thankYouMessageColor: e.target.value })}
                      className="w-12 h-9 p-1"
                    />
                    <Input
                      value={config.thankYouMessageColor}
                      onChange={(e) => updateConfig({ thankYouMessageColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium">Mostrar Imagem do Produto</Label>
                <Switch
                  checked={config.showThankYouProductImage}
                  onCheckedChange={(checked) => updateConfig({ showThankYouProductImage: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium">Mostrar Detalhes do Pedido</Label>
                <Switch
                  checked={config.showOrderDetails}
                  onCheckedChange={(checked) => updateConfig({ showOrderDetails: checked })}
                />
              </div>

              <div>
                <Label className="text-xs font-medium">Texto Final</Label>
                <Input
                  value={config.finalText}
                  onChange={(e) => updateConfig({ finalText: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-xs font-medium">Email de Contato</Label>
                <Input
                  value={config.contactEmail}
                  onChange={(e) => updateConfig({ contactEmail: e.target.value })}
                  placeholder="suporte@seusite.com"
                  className="mt-1"
                />
              </div>
            </div>
          </TabsContent>

          {/* Upsell Tab */}
          <TabsContent value="upsell" className="mt-0 space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium">Habilitar Upsell</Label>
                <Switch
                  checked={config.showUpsell}
                  onCheckedChange={(checked) => updateConfig({ showUpsell: checked })}
                />
              </div>

              {config.showUpsell && (
                <>
                  <div>
                    <Label className="text-xs font-medium">Título do Upsell</Label>
                    <Input
                      value={config.upsellTitle}
                      onChange={(e) => updateConfig({ upsellTitle: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-xs font-medium">Mensagem do Upsell</Label>
                    <Input
                      value={config.upsellMessage}
                      onChange={(e) => updateConfig({ upsellMessage: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs font-medium">Preço do Upsell</Label>
                      <Input
                        value={config.upsellPrice}
                        onChange={(e) => updateConfig({ upsellPrice: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium">URL do Upsell</Label>
                      <Input
                        value={config.upsellButtonUrl}
                        onChange={(e) => updateConfig({ upsellButtonUrl: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs font-medium">Texto do Botão</Label>
                    <Input
                      value={config.upsellButtonText}
                      onChange={(e) => updateConfig({ upsellButtonText: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs font-medium">Cor do Fundo</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          type="color"
                          value={config.upsellBackgroundColor}
                          onChange={(e) => updateConfig({ upsellBackgroundColor: e.target.value })}
                          className="w-12 h-9 p-1"
                        />
                        <Input
                          value={config.upsellBackgroundColor}
                          onChange={(e) => updateConfig({ upsellBackgroundColor: e.target.value })}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs font-medium">Cor do Botão</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          type="color"
                          value={config.upsellButtonColor}
                          onChange={(e) => updateConfig({ upsellButtonColor: e.target.value })}
                          className="w-12 h-9 p-1"
                        />
                        <Input
                          value={config.upsellButtonColor}
                          onChange={(e) => updateConfig({ upsellButtonColor: e.target.value })}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-medium">Mostrar Imagem do Upsell</Label>
                    <Switch
                      checked={config.showUpsellImage}
                      onCheckedChange={(checked) => updateConfig({ showUpsellImage: checked })}
                    />
                  </div>

                  {config.showUpsellImage && (
                    <div>
                      <Label className="text-xs font-medium">URL da Imagem</Label>
                      <Input
                        value={config.upsellImage}
                        onChange={(e) => updateConfig({ upsellImage: e.target.value })}
                        placeholder="https://..."
                        className="mt-1"
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
