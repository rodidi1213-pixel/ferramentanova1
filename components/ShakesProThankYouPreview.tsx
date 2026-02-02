import { ShakesProConfig, SHAKESPRO_LANGUAGES } from "@/types/shakespro";

interface ShakesProThankYouPreviewProps {
  config: ShakesProConfig;
}

export function ShakesProThankYouPreview({ config }: ShakesProThankYouPreviewProps) {
  const lang = SHAKESPRO_LANGUAGES[config.country] || SHAKESPRO_LANGUAGES.RO;

  return (
    <div
      className="h-full flex items-start justify-center p-4 overflow-y-auto custom-scrollbar"
      style={{ backgroundColor: config.thankYouBackgroundColor }}
    >
      <div
        className="w-full max-w-lg rounded-xl shadow-lg p-8 text-center"
        style={{ backgroundColor: config.thankYouCardColor }}
      >
        {/* Success Icon */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 text-white"
          style={{ backgroundColor: config.thankYouTitleColor }}
        >
          ✓
        </div>

        {/* Title */}
        <h1
          className="text-2xl font-semibold mb-4"
          style={{ color: config.thankYouTitleColor }}
        >
          {config.thankYouTitle}
        </h1>

        {/* Message */}
        <p
          className="text-base leading-relaxed mb-6"
          style={{ color: config.thankYouMessageColor }}
        >
          {config.thankYouMessage}
        </p>

        {/* Product Image */}
        {config.showThankYouProductImage && config.productImage && (
          <img
            src={config.productImage}
            alt="Product"
            className="max-w-[200px] h-auto mx-auto my-5 rounded-lg shadow-md"
          />
        )}

        {/* Order Details */}
        {config.showOrderDetails && (
          <div className="bg-gray-100 rounded-lg p-5 mb-6 text-left">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-3 border-b border-gray-200">
              {config.orderDetailsTitle}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">{config.productLabel}</span>
                <span className="font-semibold text-gray-800">{config.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{config.priceLabel}</span>
                <span className="font-semibold text-gray-800">{config.newPrice} {config.currency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{config.discountLabel}</span>
                <span className="font-semibold text-gray-800">-{config.discountPercent}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{config.statusLabel}</span>
                <span className="font-semibold text-green-600">{config.statusConfirmedText}</span>
              </div>
            </div>
          </div>
        )}

        {/* Upsell */}
        {config.showUpsell && (
          <div
            className="rounded-xl p-6 mb-6 text-white relative overflow-hidden"
            style={{ backgroundColor: config.upsellBackgroundColor }}
          >
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-3">{config.upsellTitle}</h2>
              <p className="text-sm opacity-90 mb-4">{config.upsellMessage}</p>
              
              {config.showUpsellImage && config.upsellImage && (
                <img
                  src={config.upsellImage}
                  alt="Upsell Product"
                  className="max-w-[150px] h-auto mx-auto my-4 rounded-lg shadow-md"
                />
              )}
              
              <div className="text-2xl font-bold mb-4">{config.upsellPrice}</div>
              <button
                className="px-8 py-3 rounded-full font-bold text-base uppercase tracking-wide transition-all hover:scale-105"
                style={{ backgroundColor: config.upsellButtonColor }}
              >
                {config.upsellButtonText}
              </button>
            </div>
          </div>
        )}

        {/* Main Button */}
        <button
          className="px-8 py-4 text-white font-semibold rounded-lg transition-all hover:opacity-90"
          style={{ backgroundColor: config.thankYouTitleColor }}
        >
          {config.thankYouButtonText}
        </button>

        {/* Final Text */}
        <div className="mt-6 pt-5 border-t border-gray-200 text-sm text-gray-500 whitespace-pre-line">
          <p>{config.finalText}</p>
          <p className="mt-3">
            {lang.thankYou.contactText}{config.contactEmail}
          </p>
        </div>
      </div>
    </div>
  );
}
