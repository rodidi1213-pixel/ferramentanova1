import { LemonadConfig } from "@/types/lemonad";

interface LemonadThankYouPreviewProps {
  config: LemonadConfig;
}

export function LemonadThankYouPreview({ config }: LemonadThankYouPreviewProps) {
  return (
    <div 
      className="h-full overflow-auto custom-scrollbar flex items-center justify-center p-4"
      style={{ backgroundColor: config.thankYouBackgroundColor }}
    >
      <div 
        className="rounded-xl shadow-lg p-8 max-w-xl w-full text-center"
        style={{ backgroundColor: config.thankYouCardColor }}
      >
        {/* Success Icon */}
        <div 
          className="w-20 h-20 rounded-full flex items-center justify-center text-4xl text-white mx-auto mb-8"
          style={{ backgroundColor: config.thankYouTitleColor }}
        >
          ✓
        </div>

        {/* Title */}
        <h1 
          className="text-2xl font-semibold mb-5"
          style={{ color: config.thankYouTitleColor }}
        >
          {config.thankYouTitle}
        </h1>

        {/* Message */}
        <p 
          className="text-base leading-relaxed mb-5"
          style={{ color: config.thankYouMessageColor }}
        >
          {config.thankYouMessage}
        </p>

        {/* Product Image */}
        {config.showThankYouProductImage && config.productImage && (
          <img 
            src={config.productImage} 
            alt="Product" 
            className="max-w-[200px] h-auto mx-auto rounded-lg shadow my-5"
          />
        )}

        {/* Order Details */}
        {config.showOrderDetails && (
          <div className="bg-gray-100 p-5 rounded-lg my-8 text-left">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{config.orderDetailsTitle}</h3>
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
                <span className="font-semibold text-green-500">{config.statusConfirmedText}</span>
              </div>
            </div>
          </div>
        )}

        {/* Upsell */}
        {config.showUpsell && (
          <div 
            className="text-white p-8 rounded-xl my-8 relative overflow-hidden"
            style={{ backgroundColor: config.upsellBackgroundColor }}
          >
            <div className="relative z-10">
              <div className="text-2xl font-bold mb-4">{config.upsellTitle}</div>
              <p className="text-base mb-5 leading-relaxed">{config.upsellMessage}</p>
              
              {config.showUpsellImage && config.upsellImage && (
                <img 
                  src={config.upsellImage} 
                  alt="Upsell" 
                  className="max-w-[150px] h-auto mx-auto rounded-lg shadow my-4"
                />
              )}
              
              <div className="text-3xl font-bold my-4">{config.upsellPrice}</div>
              <a 
                href={config.upsellButtonUrl || '#'}
                className="inline-block text-white py-4 px-10 rounded-full font-bold text-lg uppercase tracking-wide shadow-lg transition-transform hover:-translate-y-1"
                style={{ backgroundColor: config.upsellButtonColor }}
              >
                {config.upsellButtonText}
              </a>
            </div>
          </div>
        )}

        {/* Main Button */}
        <a 
          href={config.thankYouButtonUrl}
          className="inline-block text-white py-4 px-8 rounded-lg font-semibold text-base my-5 transition-all hover:opacity-90 hover:-translate-y-0.5"
          style={{ backgroundColor: config.thankYouTitleColor }}
        >
          {config.thankYouButtonText}
        </a>

        {/* Contact Info */}
        <div 
          className="mt-8 pt-5 border-t border-gray-200 text-sm whitespace-pre-line"
          style={{ color: config.thankYouMessageColor }}
        >
          {config.finalText}
          {"\n\nDúvidas?\nEntre em contato: " + config.contactEmail}
        </div>
      </div>
    </div>
  );
}
