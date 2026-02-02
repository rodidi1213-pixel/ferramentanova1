import { WebvorkConfig } from "@/types/webvork";

interface WebvorkThankYouPreviewProps {
  config: WebvorkConfig;
}

export function WebvorkThankYouPreview({ config }: WebvorkThankYouPreviewProps) {
  return (
    <div
      className="min-h-full flex items-center justify-center p-4 overflow-auto custom-scrollbar"
      style={{ backgroundColor: config.thankYouBackgroundColor }}
    >
      <div
        className="w-full max-w-[600px] p-8 text-center rounded-xl shadow-lg"
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
          className="text-base leading-relaxed mb-5"
          style={{ color: config.thankYouMessageColor }}
        >
          {config.thankYouMessage}
        </p>

        {/* Product Image */}
        {config.showThankYouProductImage && config.productImage && (
          <div className="my-5">
            <img
              src={config.productImage}
              alt="Product"
              className="max-w-[200px] h-auto mx-auto rounded-lg shadow-md"
            />
          </div>
        )}

        {/* Order Details */}
        {config.showOrderDetails && (
          <div className="bg-gray-100 p-5 rounded-lg my-6 text-left">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {config.orderDetailsTitle}
            </h3>
            <div className="flex justify-between my-2 text-sm">
              <span className="text-gray-600">{config.productLabel}</span>
              <span className="font-semibold text-gray-800">{config.title}</span>
            </div>
            <div className="flex justify-between my-2 text-sm">
              <span className="text-gray-600">{config.priceLabel}</span>
              <span className="font-semibold text-gray-800">
                {config.newPrice} {config.currency}
              </span>
            </div>
            <div className="flex justify-between my-2 text-sm">
              <span className="text-gray-600">{config.discountLabel}</span>
              <span className="font-semibold text-gray-800">-{config.discountPercent}%</span>
            </div>
            <div className="flex justify-between my-2 text-sm">
              <span className="text-gray-600">{config.statusLabel}</span>
              <span className="font-semibold text-green-600">{config.statusConfirmedText}</span>
            </div>
          </div>
        )}

        {/* Upsell */}
        {config.showUpsell && (
          <div
            className="p-6 rounded-xl my-6 text-white relative overflow-hidden"
            style={{ backgroundColor: config.upsellBackgroundColor }}
          >
            <div className="relative z-10">
              <div className="text-xl font-bold mb-3 drop-shadow-md">
                {config.upsellTitle}
              </div>
              {config.showUpsellImage && config.upsellImage && (
                <img
                  src={config.upsellImage}
                  alt="Upsell"
                  className="max-w-[150px] h-auto mx-auto my-3 rounded-lg shadow-md"
                />
              )}
              <p className="text-base mb-4 leading-relaxed">{config.upsellMessage}</p>
              <div className="text-3xl font-bold my-3 drop-shadow-md">{config.upsellPrice}</div>
              <button
                className="inline-block px-8 py-4 rounded-full font-bold text-lg uppercase tracking-wide text-white shadow-lg transition-all hover:scale-105"
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
          className="inline-block px-8 py-4 text-base font-semibold text-white rounded-lg my-5 transition-all hover:brightness-90"
          style={{ backgroundColor: config.thankYouTitleColor }}
        >
          {config.thankYouButtonText}
        </a>

        {/* Contact Info */}
        <div className="mt-6 pt-5 border-t border-gray-200 text-sm text-gray-600 whitespace-pre-line">
          {config.finalText}
          {config.contactEmail && (
            <>
              {"\n\n"}Dúvidas?{"\n"}Entre em contato: {config.contactEmail}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
