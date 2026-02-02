import { FormConfig } from "@/types/form-config";
import { getCurrencySymbol } from "@/lib/code-generators";
import { useEffect, useState } from "react";

interface FormPreviewProps {
  config: FormConfig;
}

export function FormPreview({ config }: FormPreviewProps) {
  const currencySymbol = getCurrencySymbol(config.currency);
  const [countdown, setCountdown] = useState({
    hours: config.countdownHours,
    minutes: config.countdownMinutes,
    seconds: config.countdownSeconds,
  });

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
      className="min-h-full flex items-center justify-center p-4 transition-colors"
      style={{ backgroundColor: config.backgroundColor }}
    >
      <div
        className="w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
        style={{ maxWidth: `${config.formWidth}px` }}
      >
        {/* Header */}
        <div
          className="p-5 text-center text-white"
          style={{ backgroundColor: config.primaryColor }}
        >
          <div className="text-xs uppercase tracking-wider opacity-90 mb-2">
            {config.headline}
          </div>
          
          {config.productImage && (
            <img
              src={config.productImage}
              alt={config.productName}
              className="w-28 h-28 object-contain mx-auto mb-4 bg-white rounded-xl p-2"
            />
          )}
          
          <div className="text-2xl font-bold mb-4">{config.productName}</div>
          
          <div className="space-y-1">
            <div className="text-sm opacity-80">
              {config.oldPriceLabel}{" "}
              <span className="line-through">
                {currencySymbol} {config.oldPrice}
              </span>
            </div>
            <div className="text-3xl font-extrabold">
              {config.newPriceLabel} {currencySymbol} {config.newPrice}
            </div>
          </div>

          {config.showCountdown && (
            <div className="flex justify-center gap-2 mt-4">
              {[
                { value: countdown.hours, label: "Horas" },
                { value: countdown.minutes, label: "Min" },
                { value: countdown.seconds, label: "Seg" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-white/20 px-3 py-2 rounded-lg min-w-[50px]"
                >
                  <div className="text-2xl font-bold">
                    {String(value).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] uppercase opacity-80">{label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form Body */}
        <div className="p-6">
          {config.showAvailability && (
            <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 text-center mb-5 text-sm text-amber-800">
              🔥 <span className="font-bold text-red-600">{config.availabilityCount}</span>{" "}
              {config.availabilityText}
            </div>
          )}

          <div className="space-y-4">
            <input
              type="text"
              placeholder={config.namePlaceholder}
              className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-base focus:outline-none focus:border-current transition-colors"
              style={{ "--tw-border-opacity": 1 } as React.CSSProperties}
              readOnly
            />
            <input
              type="tel"
              placeholder={config.phonePlaceholder}
              className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-base focus:outline-none transition-colors"
              readOnly
            />
            <input
              type="text"
              placeholder={config.addressPlaceholder}
              className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-base focus:outline-none transition-colors"
              readOnly
            />
            <input
              type="text"
              placeholder={config.cityPlaceholder}
              className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-base focus:outline-none transition-colors"
              readOnly
            />

            <button
              type="button"
              className="w-full py-4 text-white font-bold text-lg rounded-xl transition-transform hover:scale-[1.02] shadow-lg"
              style={{ backgroundColor: config.primaryColor }}
            >
              {config.ctaText}
            </button>

            <div className="text-center text-sm text-gray-500">
              {config.securityText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
