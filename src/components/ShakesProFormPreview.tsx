import { ShakesProConfig, SHAKESPRO_LANGUAGES, ShakesProTheme } from "@/types/shakespro";
import { useEffect, useState } from "react";

interface ShakesProFormPreviewProps {
  config: ShakesProConfig;
}

// Theme-specific styles
const getThemeStyles = (theme: ShakesProTheme, config: ShakesProConfig) => {
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
          textShadow: `0 0 10px #00d4ff, 0 0 20px #00d4ff80`,
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
          textShadow: `0 0 10px #00d4ff`,
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
        priceNew: { color: "#212529" },
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
      };
  }
};

export function ShakesProFormPreview({ config }: ShakesProFormPreviewProps) {
  const [countdown, setCountdown] = useState({
    hours: config.countdownHours,
    minutes: config.countdownMinutes,
    seconds: config.countdownSeconds,
  });

  const themeStyles = getThemeStyles(config.theme, config);
  const lang = SHAKESPRO_LANGUAGES[config.country] || SHAKESPRO_LANGUAGES.RO;

  const borderRadiusMap = {
    small: "4px",
    medium: "8px",
    large: "12px",
    full: "25px",
  };

  const buttonHeight = {
    small: "40px",
    medium: "50px",
    large: "60px",
  };

  const socialProofOnline = lang.socialProofOnline.replace("{count}", String(config.viewingCount));
  const socialProofSales = lang.socialProofSales.replace("{count}", String(config.salesLastHour));

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

  return (
    <div
      className="h-full flex items-start justify-center p-4 overflow-y-auto custom-scrollbar transition-colors"
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
        className="w-full rounded-xl p-5 transition-all duration-300"
        style={{ 
          maxWidth: `${config.formWidth}px`,
          ...themeStyles.card,
        }}
      >
        {/* Header */}
        <div className="text-center mb-5 pt-2">
          <h2 
            className="text-xl font-semibold"
            style={themeStyles.title}
          >
            {config.title}
          </h2>
        </div>

        {/* Product Image */}
        {config.showProductImage && config.productImage && (
          <img
            src={config.productImage}
            alt="Product"
            className="block max-w-[200px] h-auto mx-auto mb-5 rounded-lg shadow-md"
          />
        )}

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
                className="px-3 py-2 rounded font-bold text-lg min-w-[40px] text-center transition-all"
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

        {/* Prices */}
        <div className="flex justify-between items-center px-2 mb-5">
          <div className="text-left">
            <div className="text-xs mb-1" style={themeStyles.priceOld}>{lang.oldPriceLabel}</div>
            <div className="line-through" style={themeStyles.priceOld}>{config.oldPrice}</div>
          </div>
          <div className="text-right">
            <div className="text-xs mb-1" style={themeStyles.priceOld}>{lang.newPriceLabel}</div>
            <div className="text-2xl font-bold" style={themeStyles.priceNew}>{config.newPrice}*</div>
          </div>
        </div>

        {/* Social Proof */}
        {config.showSocialProof && (
          <div 
            className="mb-5 text-xs"
            style={themeStyles.socialProof}
          >
            <div className="flex items-center mb-1">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ 
                  backgroundColor: config.theme === "neon" ? "#00d4ff" : "#007bff",
                  ...themeStyles.socialDot,
                }}
              />
              <span style={{ color: config.theme === "neon" ? "#ccc" : "#6c757d" }}>{socialProofOnline}</span>
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
              <span style={{ color: config.theme === "neon" ? "#ccc" : "#6c757d" }}>{socialProofSales}</span>
              <span 
                className="ml-auto animate-pulse"
                style={{ color: "#28a745", ...themeStyles.socialDot }}
              >● online</span>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder={config.namePlaceholder}
            className="w-full h-[50px] px-4 rounded-md text-base outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            style={themeStyles.input}
            readOnly
          />
          <input
            type="tel"
            placeholder={config.phonePlaceholder}
            className="w-full h-[50px] px-4 rounded-md text-base outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            style={themeStyles.input}
            readOnly
          />

          <button
            className="text-white font-bold text-base uppercase tracking-wide cursor-pointer transition-all hover:opacity-90"
            style={{
              ...themeStyles.button,
              width: config.buttonWidth === "full" ? "100%" : "auto",
              height: buttonHeight[config.buttonSize],
              borderRadius: borderRadiusMap[config.buttonBorderRadius],
              padding: config.buttonWidth === "auto" ? "0 30px" : undefined,
            }}
          >
            {config.ctaText}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-4">
          <p className="text-xs" style={themeStyles.footerText}>
            {config.securityEmoji} {config.securityText}
          </p>
        </div>

        <div className="text-center mt-3">
          <p className="text-[10px] leading-tight" style={{ color: config.theme === "neon" ? "#666" : "#adb5bd" }}>{config.disclaimerText}</p>
        </div>
      </div>
    </div>
  );
}
