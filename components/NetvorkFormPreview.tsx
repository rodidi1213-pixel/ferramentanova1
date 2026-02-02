import { NetvorkConfig, NETVORK_LANGUAGES, NetvorkTheme } from "@/types/netvork";
import { useEffect, useState } from "react";

interface NetvorkFormPreviewProps {
  config: NetvorkConfig;
  language: string;
}

// Theme-specific styles
const getThemeStyles = (theme: NetvorkTheme, config: NetvorkConfig) => {
  switch (theme) {
    case "neon":
      return {
        card: {
          background: "linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)",
          border: `2px solid ${config.countdownColor}`,
          boxShadow: `0 0 30px ${config.countdownColor}40, 0 0 60px ${config.countdownColor}20, inset 0 1px 0 rgba(255,255,255,0.1)`,
        },
        title: {
          color: "#fff",
          textShadow: `0 0 10px ${config.primaryColor}, 0 0 20px ${config.primaryColor}80`,
        },
        countdownBox: {
          background: "transparent",
          border: `2px solid ${config.countdownColor}`,
          boxShadow: `0 0 15px ${config.countdownColor}60, inset 0 0 10px ${config.countdownColor}30`,
          color: config.countdownColor,
        },
        priceOld: { color: "#888" },
        priceNew: { 
          color: "#fff",
          textShadow: `0 0 10px ${config.primaryColor}`,
        },
        socialProof: {
          background: "rgba(255,255,255,0.05)",
          borderRadius: "8px",
          padding: "12px",
          border: "1px solid rgba(255,255,255,0.1)",
        },
        socialDot: {
          boxShadow: `0 0 10px currentColor`,
        },
        input: {
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "#fff",
        },
        button: {
          background: `linear-gradient(135deg, ${config.buttonColor} 0%, ${config.buttonColor}dd 100%)`,
          boxShadow: `0 0 20px ${config.buttonColor}80, 0 0 40px ${config.buttonColor}40`,
        },
        footerText: { color: "#aaa" },
        hiddenFields: {
          background: "rgba(255,255,255,0.05)",
          border: "1px dashed rgba(255,255,255,0.2)",
          color: "#888",
        },
      };
    case "minimal":
      return {
        card: {
          background: "#ffffff",
          border: "none",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 8px 30px rgba(0,0,0,0.05)",
        },
        title: {
          color: "#1a1a1a",
          fontWeight: "400",
          letterSpacing: "0.05em",
        },
        countdownBox: {
          background: "#f5f5f5",
          border: "none",
          borderRadius: "4px",
          color: "#333",
          fontWeight: "500",
        },
        priceOld: { color: "#999" },
        priceNew: { color: "#1a1a1a" },
        socialProof: {
          borderTop: "1px solid #eee",
          borderBottom: "1px solid #eee",
          padding: "16px 0",
          margin: "16px 0",
        },
        socialDot: {},
        input: {
          background: "#fafafa",
          border: "1px solid #e5e5e5",
          borderRadius: "4px",
        },
        button: {
          background: config.buttonColor,
          boxShadow: "none",
          borderRadius: "4px",
        },
        footerText: { color: "#888" },
        hiddenFields: {
          background: "#f9f9f9",
          border: "1px dashed #e0e0e0",
          color: "#999",
        },
      };
    case "premium":
      return {
        card: {
          background: "linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)",
          border: "2px solid transparent",
          borderImage: "linear-gradient(135deg, #d4af37, #f4e4bc, #d4af37) 1",
          boxShadow: "0 20px 60px rgba(212, 175, 55, 0.15), 0 0 40px rgba(212, 175, 55, 0.1), inset 0 1px 0 rgba(255,255,255,0.1)",
        },
        title: {
          background: "linear-gradient(135deg, #d4af37 0%, #f4e4bc 50%, #d4af37 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fontWeight: "600",
          letterSpacing: "0.1em",
          textTransform: "uppercase" as const,
        },
        countdownBox: {
          background: "linear-gradient(145deg, rgba(212,175,55,0.1) 0%, rgba(244,228,188,0.05) 100%)",
          border: "1px solid rgba(212,175,55,0.5)",
          borderRadius: "8px",
          color: "#f4e4bc",
          fontWeight: "600",
          boxShadow: "0 4px 15px rgba(212,175,55,0.2)",
        },
        priceOld: { color: "#888" },
        priceNew: { 
          background: "linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        },
        socialProof: {
          background: "rgba(212,175,55,0.05)",
          borderRadius: "8px",
          padding: "12px",
          border: "1px solid rgba(212,175,55,0.2)",
        },
        socialDot: {
          boxShadow: "0 0 8px currentColor",
        },
        input: {
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(212,175,55,0.3)",
          borderRadius: "8px",
          color: "#f4e4bc",
        },
        button: {
          background: "linear-gradient(135deg, #d4af37 0%, #f4e4bc 30%, #d4af37 70%, #aa8c2c 100%)",
          boxShadow: "0 8px 25px rgba(212,175,55,0.4), inset 0 1px 0 rgba(255,255,255,0.3)",
          color: "#1a1a1a",
          fontWeight: "700",
          textShadow: "0 1px 0 rgba(255,255,255,0.2)",
        },
        footerText: { color: "#d4af37" },
        hiddenFields: {
          background: "rgba(212,175,55,0.05)",
          border: "1px dashed rgba(212,175,55,0.3)",
          color: "#d4af37",
        },
      };
    default: // classic
      return {
        card: {
          background: "#ffffff",
          border: "1px solid #e9ecef",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        },
        title: { color: "#212529" },
        countdownBox: {
          background: config.countdownColor,
          color: "#fff",
        },
        priceOld: { color: "#6c757d" },
        priceNew: { color: config.primaryColor },
        socialProof: {},
        socialDot: {},
        input: {
          background: "#fff",
          border: "1px solid #ced4da",
        },
        button: {
          background: config.buttonColor,
        },
        footerText: { color: "#6c757d" },
        hiddenFields: {
          background: "#f3e8ff",
          border: "1px dashed #c4b5fd",
          color: "#6c757d",
        },
      };
  }
};

export function NetvorkFormPreview({ config, language }: NetvorkFormPreviewProps) {
  const [countdown, setCountdown] = useState({
    hours: config.countdownHours,
    minutes: config.countdownMinutes,
    seconds: config.countdownSeconds,
  });

  const themeStyles = getThemeStyles(config.theme, config);
  const lang = NETVORK_LANGUAGES[language] || NETVORK_LANGUAGES.RO;

  useEffect(() => {
    setCountdown({
      hours: config.countdownHours,
      minutes: config.countdownMinutes,
      seconds: config.countdownSeconds,
    });
  }, [config.countdownHours, config.countdownMinutes, config.countdownSeconds]);

  useEffect(() => {
    if (!config.showCountdown) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [config.showCountdown]);

  const getButtonRadius = () => {
    const map = { small: "4px", medium: "8px", large: "12px", full: "50px" };
    return map[config.buttonBorderRadius] || "8px";
  };

  const getButtonHeight = () => {
    const map = { small: "40px", medium: "50px", large: "60px" };
    return map[config.buttonSize] || "50px";
  };

  return (
    <div
      className="flex items-start justify-center p-4 transition-colors"
      style={{ backgroundColor: config.backgroundColor }}
    >
      {/* Theme-specific keyframes */}
      {config.theme === "neon" && (
        <style>{`
          @keyframes neonPulse {
            0%, 100% { box-shadow: 0 0 20px ${config.buttonColor}80, 0 0 40px ${config.buttonColor}40; }
            50% { box-shadow: 0 0 30px ${config.buttonColor}, 0 0 60px ${config.buttonColor}60; }
          }
          @keyframes neonBorder {
            0%, 100% { border-color: ${config.countdownColor}; box-shadow: 0 0 15px ${config.countdownColor}60; }
            50% { border-color: ${config.countdownColor}dd; box-shadow: 0 0 25px ${config.countdownColor}80; }
          }
        `}</style>
      )}
      {config.theme === "premium" && (
        <style>{`
          @keyframes premiumShine {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}</style>
      )}

      <div 
        className="w-full rounded-xl overflow-hidden transition-all duration-300"
        style={{ 
          maxWidth: `${config.formWidth}px`,
          ...themeStyles.card,
        }}
      >
        <div className="p-5">
          {/* Header */}
          <div className="text-center mb-5 pt-2">
            <h2 
              className="text-xl font-semibold"
              style={themeStyles.title}
            >
              {config.title}
            </h2>
          </div>

          {/* Countdown Timer */}
          {config.showCountdown && (
            <div className="flex justify-center items-center gap-2 mb-5">
              {[
                { value: countdown.hours, label: "H" },
                { value: countdown.minutes, label: "M" },
                { value: countdown.seconds, label: "S" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="text-center px-3 py-2 rounded min-w-[40px] transition-all font-bold text-lg"
                  style={{
                    ...themeStyles.countdownBox,
                    animation: config.theme === "neon" ? "neonBorder 2s ease-in-out infinite" : undefined,
                  }}
                >
                  {String(value).padStart(2, "0")}
                </div>
              ))}
            </div>
          )}

          {/* Product Image - Top Position */}
          {config.showProductImage && config.productImage && config.productImagePosition === 'top' && (
            <div className="flex justify-center my-5">
              <img 
                src={config.productImage} 
                alt="Product"
                className="max-w-[200px] max-h-[200px] object-contain rounded-lg shadow-md"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Price Section */}
          <div className={`my-5 px-2 ${config.showProductImage && config.productImage && config.productImagePosition === 'side' ? 'flex items-center gap-4' : ''}`}>
            {config.showProductImage && config.productImage && config.productImagePosition === 'side' && (
              <img 
                src={config.productImage} 
                alt="Product"
                className="w-24 h-24 object-contain rounded-md shadow-sm flex-shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            )}
            <div className="flex justify-between items-center flex-1">
              <div>
                <div className="text-xs mb-1" style={themeStyles.priceOld}>{lang.oldPriceLabel}</div>
                <div className="text-base line-through" style={themeStyles.priceOld}>
                  {config.oldPrice} {config.currency}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs mb-1" style={themeStyles.priceOld}>{lang.newPriceLabel}</div>
                <div className="text-2xl font-bold" style={themeStyles.priceNew}>
                  {config.newPrice} {config.currency}*
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          {config.showSocialProof && (
            <div 
              className="my-5 text-xs space-y-1.5"
              style={themeStyles.socialProof}
            >
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ 
                    backgroundColor: config.theme === "neon" ? "#00d4ff" : "#007bff",
                    ...themeStyles.socialDot,
                  }}
                />
                <span style={{ color: config.theme === "neon" ? "#ccc" : "#6c757d" }}>
                  {lang.socialProofText} <span className="font-semibold" style={{ color: config.theme === "neon" ? "#fff" : "#212529" }}>{config.viewingCount}</span> {lang.socialProofOnline}
                </span>
                <span 
                  className="ml-auto animate-pulse"
                  style={{ color: "#28a745", ...themeStyles.socialDot }}
                >● online</span>
              </div>
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ 
                    backgroundColor: "#28a745",
                    ...themeStyles.socialDot,
                  }}
                />
                <span style={{ color: config.theme === "neon" ? "#ccc" : "#6c757d" }}>
                  <span className="font-semibold" style={{ color: config.theme === "neon" ? "#fff" : "#212529" }}>{config.salesLastHour}</span> {lang.salesText}
                </span>
                <span 
                  className="ml-auto animate-pulse"
                  style={{ color: "#28a745", ...themeStyles.socialDot }}
                >● online</span>
              </div>
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-4 my-4">
            <input
              type="text"
              placeholder={config.namePlaceholder}
              className="w-full h-11 px-4 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              style={themeStyles.input}
              readOnly
            />
            <input
              type="tel"
              placeholder={config.phonePlaceholder}
              className="w-full h-11 px-4 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              style={themeStyles.input}
              readOnly
            />
            
            {/* Country Select */}
            {config.showCountrySelect && (
              <select
                className="w-full h-11 px-4 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                style={themeStyles.input}
                disabled
              >
                <option value={config.defaultCountry}>{lang.flag} {config.defaultCountry}</option>
              </select>
            )}
          </div>

          {/* Hidden Fields Info */}
          <div 
            className="my-3 p-2 rounded-lg text-xs"
            style={themeStyles.hiddenFields}
          >
            <div className="font-medium mb-1" style={{ color: config.theme === "premium" ? "#f4e4bc" : config.theme === "neon" ? "#fff" : "#7c3aed" }}>Campos Ocultos (Netvork API):</div>
            <div>offer_id: {config.offerId || 'OFFER_ID_AQUI'}</div>
            <div>country: {config.defaultCountry}</div>
            <div>lang: {config.lang}</div>
            <div>utm_source: {config.utmSource || '(vazio)'}</div>
            <div>utm_medium: {config.utmMedium || '(vazio)'}</div>
            <div>utm_campaign: {config.utmCampaign || '(vazio)'}</div>
          </div>

          {/* CTA Button */}
          <button
            className={`${config.buttonWidth === 'full' ? 'w-full' : 'px-8'} mt-5 mb-4 text-white font-bold uppercase tracking-wide transition-all hover:opacity-90 hover:-translate-y-0.5`}
            style={{
              ...themeStyles.button,
              borderRadius: getButtonRadius(),
              height: getButtonHeight(),
              fontSize: config.buttonSize === 'large' ? '18px' : config.buttonSize === 'medium' ? '16px' : '14px',
            }}
          >
            ✓ {config.ctaText}
          </button>

          {/* Footer */}
          <div className="text-center my-4">
            <span className="text-sm" style={themeStyles.footerText}>
              {config.securityEmoji} {config.buttonSubText}
            </span>
          </div>

          <div className="text-center text-xs mt-2" style={{ color: config.theme === "neon" ? "#666" : "#adb5bd" }}>
            {config.disclaimerText}
          </div>
        </div>
      </div>
    </div>
  );
}
