import { FormConfig, COUNTRIES, getDefaultConfig } from "@/types/form-config";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Globe, 
  Palette, 
  Settings, 
  Gift,
  ImageIcon,
  Clock,
  Package,
} from "lucide-react";

interface ConfigPanelProps {
  config: FormConfig;
  updateConfig: (updates: Partial<FormConfig>) => void;
  updateThankYou: (updates: Partial<FormConfig["thankYou"]>) => void;
}

export function ConfigPanel({ config, updateConfig, updateThankYou }: ConfigPanelProps) {
  const handleCountryChange = (countryCode: string) => {
    const newDefaults = getDefaultConfig(countryCode);
    updateConfig({
      country: countryCode,
      currency: newDefaults.currency,
      headline: newDefaults.headline,
      oldPriceLabel: newDefaults.oldPriceLabel,
      newPriceLabel: newDefaults.newPriceLabel,
      namePlaceholder: newDefaults.namePlaceholder,
      phonePlaceholder: newDefaults.phonePlaceholder,
      addressPlaceholder: newDefaults.addressPlaceholder,
      cityPlaceholder: newDefaults.cityPlaceholder,
      ctaText: newDefaults.ctaText,
      securityText: newDefaults.securityText,
      availabilityText: newDefaults.availabilityText,
      thankYou: newDefaults.thankYou,
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Country Selector */}
      <div className="p-4 border-b border-border">
        <Label className="text-muted-foreground text-xs mb-2 block">País / Idioma</Label>
        <Select value={config.country} onValueChange={handleCountryChange}>
          <SelectTrigger className="bg-secondary/50 border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            {Object.values(COUNTRIES).map((country) => (
              <SelectItem key={country.code} value={country.code}>
                {country.flag} {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Config Tabs */}
      <Tabs defaultValue="basic" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-4 grid grid-cols-4 bg-secondary/50">
          <TabsTrigger value="basic" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Settings className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Palette className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="features" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Clock className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="thankyou" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Gift className="w-4 h-4" />
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Basic Settings */}
          <TabsContent value="basic" className="p-4 space-y-4 mt-0">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Package className="w-4 h-4 text-primary" />
                Produto
              </h3>
              
              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Nome do Produto</Label>
                <Input
                  value={config.productName}
                  onChange={(e) => updateConfig({ productName: e.target.value })}
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

              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">URL da Imagem do Produto</Label>
                <Input
                  value={config.productImage}
                  onChange={(e) => updateConfig({ productImage: e.target.value })}
                  placeholder="https://..."
                  className="bg-secondary/50 border-border"
                />
              </div>
            </div>

            <Separator className="bg-border" />

            <div className="space-y-4">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Globe className="w-4 h-4 text-accent" />
                Textos
              </h3>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Chamada Principal</Label>
                <Input
                  value={config.headline}
                  onChange={(e) => updateConfig({ headline: e.target.value })}
                  className="bg-secondary/50 border-border"
                />
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
                <Label className="text-muted-foreground text-xs">Texto de Segurança</Label>
                <Input
                  value={config.securityText}
                  onChange={(e) => updateConfig({ securityText: e.target.value })}
                  className="bg-secondary/50 border-border"
                />
              </div>
            </div>
          </TabsContent>

          {/* Appearance */}
          <TabsContent value="appearance" className="p-4 space-y-4 mt-0">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Palette className="w-4 h-4 text-primary" />
                Cores
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Cor Principal</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={config.primaryColor}
                      onChange={(e) => updateConfig({ primaryColor: e.target.value })}
                      className="w-12 h-10 p-1 bg-secondary/50 border-border cursor-pointer"
                    />
                    <Input
                      value={config.primaryColor}
                      onChange={(e) => updateConfig({ primaryColor: e.target.value })}
                      className="flex-1 bg-secondary/50 border-border text-xs"
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
                      className="w-12 h-10 p-1 bg-secondary/50 border-border cursor-pointer"
                    />
                    <Input
                      value={config.backgroundColor}
                      onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                      className="flex-1 bg-secondary/50 border-border text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Quick color presets */}
              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Presets</Label>
                <div className="flex gap-2">
                  {[
                    { primary: "#22c55e", bg: "#f8fafc" },
                    { primary: "#3b82f6", bg: "#f8fafc" },
                    { primary: "#ef4444", bg: "#fef2f2" },
                    { primary: "#8b5cf6", bg: "#faf5ff" },
                    { primary: "#f59e0b", bg: "#fffbeb" },
                    { primary: "#ec4899", bg: "#fdf2f8" },
                  ].map((preset, i) => (
                    <button
                      key={i}
                      onClick={() => updateConfig({ primaryColor: preset.primary, backgroundColor: preset.bg })}
                      className="w-8 h-8 rounded-lg border-2 border-border hover:scale-110 transition-transform"
                      style={{ backgroundColor: preset.primary }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <Separator className="bg-border" />

            <div className="space-y-4">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-accent" />
                Dimensões
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Largura (px)</Label>
                  <Input
                    type="number"
                    value={config.formWidth}
                    onChange={(e) => updateConfig({ formWidth: parseInt(e.target.value) || 380 })}
                    className="bg-secondary/50 border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Max Width</Label>
                  <Input
                    value={config.formMaxWidth}
                    onChange={(e) => updateConfig({ formMaxWidth: e.target.value })}
                    className="bg-secondary/50 border-border"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Features */}
          <TabsContent value="features" className="p-4 space-y-4 mt-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Contador Regressivo</Label>
                  <p className="text-xs text-muted-foreground">Exibe tempo limitado</p>
                </div>
                <Switch
                  checked={config.showCountdown}
                  onCheckedChange={(checked) => updateConfig({ showCountdown: checked })}
                />
              </div>

              {config.showCountdown && (
                <div className="grid grid-cols-3 gap-3 pl-4 border-l-2 border-primary/30">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">Horas</Label>
                    <Input
                      type="number"
                      min="0"
                      max="23"
                      value={config.countdownHours}
                      onChange={(e) => updateConfig({ countdownHours: parseInt(e.target.value) || 0 })}
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">Min</Label>
                    <Input
                      type="number"
                      min="0"
                      max="59"
                      value={config.countdownMinutes}
                      onChange={(e) => updateConfig({ countdownMinutes: parseInt(e.target.value) || 0 })}
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">Seg</Label>
                    <Input
                      type="number"
                      min="0"
                      max="59"
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
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Disponibilidade</Label>
                  <p className="text-xs text-muted-foreground">Mostra estoque limitado</p>
                </div>
                <Switch
                  checked={config.showAvailability}
                  onCheckedChange={(checked) => updateConfig({ showAvailability: checked })}
                />
              </div>

              {config.showAvailability && (
                <div className="space-y-3 pl-4 border-l-2 border-accent/30">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">Quantidade</Label>
                    <Input
                      type="number"
                      min="1"
                      value={config.availabilityCount}
                      onChange={(e) => updateConfig({ availabilityCount: parseInt(e.target.value) || 1 })}
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">Texto</Label>
                    <Input
                      value={config.availabilityText}
                      onChange={(e) => updateConfig({ availabilityText: e.target.value })}
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                </div>
              )}
            </div>

            <Separator className="bg-border" />

            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Configurações Avançadas</h3>
              
              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Form Action (PHP)</Label>
                <Input
                  value={config.formAction}
                  onChange={(e) => updateConfig({ formAction: e.target.value })}
                  className="bg-secondary/50 border-border"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Redirect após envio</Label>
                <Input
                  value={config.successRedirect}
                  onChange={(e) => updateConfig({ successRedirect: e.target.value })}
                  className="bg-secondary/50 border-border"
                />
              </div>
            </div>
          </TabsContent>

          {/* Thank You Page */}
          <TabsContent value="thankyou" className="p-4 space-y-4 mt-0">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Gift className="w-4 h-4 text-success" />
                Página de Obrigado
              </h3>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Título</Label>
                <Input
                  value={config.thankYou.title}
                  onChange={(e) => updateThankYou({ title: e.target.value })}
                  className="bg-secondary/50 border-border"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Mensagem</Label>
                <Textarea
                  value={config.thankYou.message}
                  onChange={(e) => updateThankYou({ message: e.target.value })}
                  rows={3}
                  className="bg-secondary/50 border-border resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Texto do Botão</Label>
                  <Input
                    value={config.thankYou.buttonText}
                    onChange={(e) => updateThankYou({ buttonText: e.target.value })}
                    className="bg-secondary/50 border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">URL do Botão</Label>
                  <Input
                    value={config.thankYou.buttonUrl}
                    onChange={(e) => updateThankYou({ buttonUrl: e.target.value })}
                    className="bg-secondary/50 border-border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Texto Final</Label>
                <Textarea
                  value={config.thankYou.finalText}
                  onChange={(e) => updateThankYou({ finalText: e.target.value })}
                  rows={2}
                  className="bg-secondary/50 border-border resize-none"
                />
              </div>
            </div>

            <Separator className="bg-border" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Detalhes do Pedido</Label>
                  <p className="text-xs text-muted-foreground">Mostra resumo da compra</p>
                </div>
                <Switch
                  checked={config.thankYou.showOrderDetails}
                  onCheckedChange={(checked) => updateThankYou({ showOrderDetails: checked })}
                />
              </div>
            </div>

            <Separator className="bg-border" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Upsell</Label>
                  <p className="text-xs text-muted-foreground">Oferta adicional</p>
                </div>
                <Switch
                  checked={config.thankYou.showUpsell}
                  onCheckedChange={(checked) => updateThankYou({ showUpsell: checked })}
                />
              </div>

              {config.thankYou.showUpsell && (
                <div className="space-y-3 pl-4 border-l-2 border-primary/30">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">Título do Upsell</Label>
                    <Input
                      value={config.thankYou.upsellTitle}
                      onChange={(e) => updateThankYou({ upsellTitle: e.target.value })}
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">Mensagem</Label>
                    <Textarea
                      value={config.thankYou.upsellMessage}
                      onChange={(e) => updateThankYou({ upsellMessage: e.target.value })}
                      rows={2}
                      className="bg-secondary/50 border-border resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-xs">Botão</Label>
                      <Input
                        value={config.thankYou.upsellButtonText}
                        onChange={(e) => updateThankYou({ upsellButtonText: e.target.value })}
                        className="bg-secondary/50 border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-xs">URL</Label>
                      <Input
                        value={config.thankYou.upsellButtonUrl}
                        onChange={(e) => updateThankYou({ upsellButtonUrl: e.target.value })}
                        className="bg-secondary/50 border-border"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Separator className="bg-border" />

            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Cores da Página</h3>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Fundo</Label>
                  <Input
                    type="color"
                    value={config.thankYou.backgroundColor}
                    onChange={(e) => updateThankYou({ backgroundColor: e.target.value })}
                    className="w-full h-10 p-1 bg-secondary/50 border-border cursor-pointer"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Card</Label>
                  <Input
                    type="color"
                    value={config.thankYou.cardColor}
                    onChange={(e) => updateThankYou({ cardColor: e.target.value })}
                    className="w-full h-10 p-1 bg-secondary/50 border-border cursor-pointer"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Botão</Label>
                  <Input
                    type="color"
                    value={config.thankYou.buttonColor}
                    onChange={(e) => updateThankYou({ buttonColor: e.target.value })}
                    className="w-full h-10 p-1 bg-secondary/50 border-border cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
