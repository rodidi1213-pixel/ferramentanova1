import { TrafficLightConfig } from "@/types/trafficlight";

interface TrafficLightThankYouPreviewProps {
  config: TrafficLightConfig;
}

export function TrafficLightThankYouPreview({ config }: TrafficLightThankYouPreviewProps) {
  return (
    <div 
      className="h-full overflow-auto custom-scrollbar flex items-center justify-center p-8"
      style={{ backgroundColor: config.thankYouBackgroundColor }}
    >
      <div 
        className="rounded-xl shadow-lg p-8 text-center max-w-lg w-full"
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
          className="text-2xl font-bold mb-4"
          style={{ color: config.thankYouTitleColor }}
        >
          {config.thankYouTitle}
        </h1>

        {/* Message */}
        <p 
          className="text-base mb-6 leading-relaxed"
          style={{ color: config.thankYouMessageColor }}
        >
          {config.thankYouMessage}
        </p>

        {/* Product Image */}
        {config.showThankYouProductImage && config.productImage && (
          <div className="flex justify-center mb-6">
            <img 
              src={config.productImage} 
              alt="Product" 
              className="max-w-[200px] rounded-lg shadow"
            />
          </div>
        )}

        {/* Order Details */}
        {config.showOrderDetails && (
          <div className="bg-gray-50 rounded-lg p-5 mb-6 text-left">
            <h3 className="font-semibold text-gray-800 mb-4 text-lg">{config.orderDetailsTitle}</h3>
            <div className="space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{config.productLabel}</span>
                <span className="font-semibold text-gray-800">{config.title}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{config.priceLabel}</span>
                <span className="font-semibold text-gray-800">{config.newPrice} {config.currency}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{config.discountLabel}</span>
                <span className="font-semibold text-gray-800">-{config.discountPercent}%</span>
              </div>
              <div className="flex justify-between text-sm">
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
              <h3 className="text-xl font-bold mb-3">{config.upsellTitle}</h3>
              <p className="text-white/90 mb-4">{config.upsellMessage}</p>
              
              {config.showUpsellImage && config.upsellImage && (
                <div className="flex justify-center mb-4">
                  <img 
                    src={config.upsellImage} 
                    alt="Upsell" 
                    className="max-w-[150px] rounded-lg shadow"
                  />
                </div>
              )}
              
              <div className="text-2xl font-bold mb-4">{config.upsellPrice}</div>
              
              <button
                className="px-8 py-3 rounded-full font-bold uppercase text-white shadow-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: config.upsellButtonColor }}
              >
                {config.upsellButtonText}
              </button>
            </div>
          </div>
        )}

        {/* Main Button */}
        <button
          className="px-8 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
          style={{ backgroundColor: config.thankYouTitleColor }}
        >
          {config.thankYouButtonText}
        </button>

        {/* Final Text */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-600 whitespace-pre-line">
          {config.finalText}
          {"\n\n"}
          Dúvidas?{"\n"}
          Entre em contato: {config.contactEmail}
        </div>
      </div>
    </div>
  );
}
