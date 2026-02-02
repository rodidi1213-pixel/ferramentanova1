import { TerraLeadsConfig } from "@/types/terraleads";

interface TerraLeadsThankYouPreviewProps {
  config: TerraLeadsConfig;
}

export function TerraLeadsThankYouPreview({ config }: TerraLeadsThankYouPreviewProps) {
  return (
    <div
      className="h-full overflow-auto custom-scrollbar flex items-center justify-center p-4"
      style={{ backgroundColor: config.thankYouBackgroundColor }}
    >
      <div
        className="rounded-xl shadow-lg p-8 max-w-[600px] w-[90%] text-center"
        style={{ backgroundColor: config.thankYouCardColor }}
      >
        {/* Success Icon */}
        <div
          className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl text-white"
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
            className="max-w-[200px] h-auto mx-auto my-5 rounded-lg shadow-md"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        )}

        {/* Order Details */}
        {config.showOrderDetails && (
          <div className="bg-gray-100 p-5 rounded-lg my-6 text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {config.orderDetailsTitle}
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{config.productLabel}</span>
                <span className="font-semibold text-gray-900">{config.title}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{config.priceLabel}</span>
                <span className="font-semibold text-gray-900">
                  {config.newPrice} {config.currency}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{config.discountLabel}</span>
                <span className="font-semibold text-gray-900">-{config.discountPercent}%</span>
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
            className="text-white p-6 rounded-xl my-6 relative overflow-hidden"
            style={{ backgroundColor: config.upsellBackgroundColor }}
          >
            <div className="relative z-10">
              <div className="text-2xl font-bold mb-3 drop-shadow-md">
                {config.upsellTitle}
              </div>
              <div className="text-base mb-5 opacity-95">
                {config.upsellMessage}
              </div>
              {config.showUpsellImage && config.upsellImage && (
                <img
                  src={config.upsellImage}
                  alt="Upsell Product"
                  className="max-w-[150px] h-auto mx-auto my-4 rounded-lg shadow-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              )}
              <div className="text-3xl font-bold my-4 drop-shadow-md">
                {config.upsellPrice}
              </div>
              <button
                className="inline-block text-white py-4 px-8 rounded-full font-bold text-lg uppercase tracking-wider shadow-lg transition-all hover:opacity-90 hover:-translate-y-1"
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
          className="inline-block text-white py-4 px-8 rounded-lg font-semibold text-base my-5 transition-all hover:opacity-90 hover:-translate-y-1"
          style={{ backgroundColor: config.thankYouTitleColor }}
        >
          {config.thankYouButtonText}
        </a>

        {/* Contact Info */}
        <div className="mt-6 pt-5 border-t border-gray-200 text-sm text-gray-600 whitespace-pre-line">
          {config.finalText}
          {"\n\n"}
          Dúvidas?{"\n"}
          Entre em contato: {config.contactEmail}
        </div>
      </div>
    </div>
  );
}
