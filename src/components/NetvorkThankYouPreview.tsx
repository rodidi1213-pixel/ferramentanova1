import { NetvorkConfig } from "@/types/netvork";

interface NetvorkThankYouPreviewProps {
  config: NetvorkConfig;
}

export function NetvorkThankYouPreview({ config }: NetvorkThankYouPreviewProps) {
  return (
    <div
      className="min-h-full flex items-center justify-center p-8"
      style={{ backgroundColor: config.thankYouBackgroundColor }}
    >
      <div 
        className="text-center rounded-xl p-8 shadow-lg max-w-xl w-full"
        style={{ backgroundColor: config.thankYouCardColor }}
      >
        {/* Success Icon */}
        <div 
          className="w-20 h-20 rounded-full flex items-center justify-center text-4xl text-white mx-auto mb-6"
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
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        )}

        {/* Order Details */}
        {config.showOrderDetails && (
          <div className="bg-gray-50 rounded-lg p-5 my-6 text-left">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {config.orderDetailsTitle}
            </h3>
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

        {/* Upsell Section */}
        {config.showUpsell && (
          <div 
            className="text-white rounded-xl p-6 my-6 relative overflow-hidden"
            style={{ backgroundColor: config.upsellBackgroundColor }}
          >
            <div className="relative z-10">
              <div className="text-xl font-bold mb-3 drop-shadow-md">
                {config.upsellTitle}
              </div>
              <p className="text-sm opacity-90 mb-4">
                {config.upsellMessage}
              </p>
              
              {config.showUpsellImage && config.upsellImage && (
                <img 
                  src={config.upsellImage} 
                  alt="Upsell"
                  className="max-w-[150px] h-auto mx-auto my-4 rounded-lg shadow-md"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
              
              <div className="text-3xl font-bold my-4 drop-shadow-md">
                {config.upsellPrice}
              </div>
              <button
                className="inline-block px-8 py-4 rounded-full font-bold uppercase tracking-wide shadow-lg transition-all hover:opacity-90 hover:-translate-y-0.5 text-white"
                style={{ backgroundColor: config.upsellButtonColor }}
              >
                {config.upsellButtonText}
              </button>
            </div>
          </div>
        )}

        {/* Main Button */}
        <a
          href={config.thankYouButtonUrl}
          className="inline-block px-8 py-4 text-white font-semibold rounded-lg my-5 transition-all hover:opacity-90 hover:-translate-y-0.5"
          style={{ backgroundColor: config.thankYouTitleColor }}
        >
          {config.thankYouButtonText}
        </a>

        {/* Final Text */}
        <div className="mt-6 pt-5 border-t border-gray-200 text-sm text-gray-600 whitespace-pre-line">
          {config.finalText}
          {"\n\n"}Dúvidas?{"\n"}Entre em contato: {config.contactEmail}
        </div>
      </div>
    </div>
  );
}
