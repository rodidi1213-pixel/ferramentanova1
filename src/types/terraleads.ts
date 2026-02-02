export type TerraLeadsTheme = "classic" | "neon" | "minimal" | "premium";

export interface TerraLeadsConfig {
  // Theme
  theme: TerraLeadsTheme;
  
  // API Configuration
  apiKey: string;
  userId: string; // UNIQUE: Terra Leads requires user_id
  offerId: string;
  country: string;
  domain: string;
  // Form Visual
  title: string;
  formWidth: number;
  backgroundColor: string;
  primaryColor: string;
  buttonColor: string;
  buttonBorderRadius: "small" | "medium" | "large" | "full";
  buttonSize: "small" | "medium" | "large";
  buttonWidth: "auto" | "full";
  
  // Pricing
  oldPrice: string;
  newPrice: string;
  currency: string;
  discountPercent: string;
  
  // Form Fields
  namePlaceholder: string;
  phonePlaceholder: string;
  ctaText: string;
  
  // Security & Disclaimer
  securityEmoji: string;
  securityText: string;
  disclaimerText: string;
  
  // Countdown
  showCountdown: boolean;
  countdownHours: number;
  countdownMinutes: number;
  countdownSeconds: number;
  countdownColor: string;
  
  // Social Proof
  showSocialProof: boolean;
  viewingCount: number;
  salesLastHour: number;
  
  // Product Image
  showProductImage: boolean;
  productImage: string;
  productImagePosition: "top" | "side";
  
  // Thank You Page
  thankYouTitle: string;
  thankYouMessage: string;
  thankYouButtonText: string;
  thankYouButtonUrl: string;
  thankYouBackgroundColor: string;
  thankYouCardColor: string;
  thankYouTitleColor: string;
  thankYouMessageColor: string;
  contactEmail: string;
  finalText: string;
  
  // Thank You - Order Details
  showOrderDetails: boolean;
  orderDetailsTitle: string;
  productLabel: string;
  priceLabel: string;
  discountLabel: string;
  statusLabel: string;
  statusConfirmedText: string;
  
  // Thank You - Product Image
  showThankYouProductImage: boolean;
  
  // Upsell Section
  showUpsell: boolean;
  upsellTitle: string;
  upsellMessage: string;
  upsellPrice: string;
  upsellButtonText: string;
  upsellButtonUrl: string;
  upsellBackgroundColor: string;
  upsellButtonColor: string;
  showUpsellImage: boolean;
  upsellImage: string;
}

export interface TerraLeadsLanguage {
  oldPriceLabel: string;
  newPriceLabel: string;
  socialProofText: string;
  socialProofOnline: string;
  salesText: string;
  thankYou: {
    title: string;
    message: string;
    buttonText: string;
    orderDetailsTitle: string;
    productLabel: string;
    priceLabel: string;
    discountLabel: string;
    statusLabel: string;
    statusConfirmed: string;
    contactText: string;
    finalText: string;
    upsellTitle: string;
    upsellMessage: string;
    upsellButton: string;
  };
}

export const TERRALEADS_LANGUAGES: Record<string, TerraLeadsLanguage> = {
  RO: {
    oldPriceLabel: "Prețul vechi",
    newPriceLabel: "Prețul nou",
    socialProofText: "Acum pe site sunt",
    socialProofOnline: "persoane",
    salesText: "vânzări în ultima oră",
    thankYou: {
      title: "Mulțumim pentru comandă!",
      message: "Comanda dumneavoastră a fost procesată cu succes. Vă vom contacta în curând pentru a confirma detaliile.",
      buttonText: "Înapoi la Site",
      orderDetailsTitle: "Detalii comandă:",
      productLabel: "Produs:",
      priceLabel: "Preț:",
      discountLabel: "Reducere:",
      statusLabel: "Status:",
      statusConfirmed: "✓ Confirmat",
      contactText: "Întrebări?\nContactați-ne: suport@seusite.com",
      finalText: "Important: Păstrați telefonul la îndemână. Vă vom contacta în maxim 24 de ore pentru a confirma comanda.",
      upsellTitle: "🎁 Ofertă Exclusivă!",
      upsellMessage: "Adaugă încă un produs la comandă cu o reducere specială!",
      upsellButton: "ADAUGĂ LA COMANDĂ",
    },
  },
  BR: {
    oldPriceLabel: "Preço antigo",
    newPriceLabel: "Preço novo",
    socialProofText: "Pessoas no site agora:",
    socialProofOnline: "pessoas",
    salesText: "vendas na última hora",
    thankYou: {
      title: "Obrigado pela sua compra!",
      message: "Sua compra foi processada com sucesso. Em breve entraremos em contato para confirmar os detalhes.",
      buttonText: "Voltar ao Site",
      orderDetailsTitle: "Detalhes do pedido:",
      productLabel: "Produto:",
      priceLabel: "Preço:",
      discountLabel: "Desconto:",
      statusLabel: "Status:",
      statusConfirmed: "✓ Confirmado",
      contactText: "Dúvidas?\nEntre em contato: suporte@seusite.com",
      finalText: "Importante: Mantenha seu telefone por perto. Entraremos em contato em até 24 horas para confirmar sua compra.",
      upsellTitle: "🎁 Oferta Exclusiva!",
      upsellMessage: "Adicione mais um produto ao seu pedido com desconto especial!",
      upsellButton: "ADICIONAR AO PEDIDO",
    },
  },
  PL: {
    oldPriceLabel: "Stara cena",
    newPriceLabel: "Nowa cena",
    socialProofText: "Obecnie na stronie jest",
    socialProofOnline: "osób",
    salesText: "sprzedaży w ostatniej godzinie",
    thankYou: {
      title: "Dziękujemy za zamówienie!",
      message: "Twoje zamówienie zostało pomyślnie przetworzone. Wkrótce skontaktujemy się z Tobą, aby potwierdzić szczegóły.",
      buttonText: "Powrót do strony",
      orderDetailsTitle: "Szczegóły zamówienia:",
      productLabel: "Produkt:",
      priceLabel: "Cena:",
      discountLabel: "Rabat:",
      statusLabel: "Status:",
      statusConfirmed: "✓ Potwierdzony",
      contactText: "Pytania?\nSkontaktuj się z nami: support@yoursite.com",
      finalText: "Ważne: Trzymaj telefon przy sobie. Skontaktujemy się w ciągu 24 godzin, aby potwierdzić zamówienie.",
      upsellTitle: "🎁 Ekskluzywna Oferta!",
      upsellMessage: "Dodaj kolejny produkt do zamówienia ze specjalnym rabatem!",
      upsellButton: "DODAJ DO ZAMÓWIENIA",
    },
  },
  IT: {
    oldPriceLabel: "Vecchio prezzo",
    newPriceLabel: "Nuovo prezzo",
    socialProofText: "Attualmente sul sito ci sono",
    socialProofOnline: "persone",
    salesText: "vendite nell'ultima ora",
    thankYou: {
      title: "Grazie per il tuo ordine!",
      message: "Il tuo ordine è stato elaborato con successo. Ti contatteremo presto per confermare i dettagli.",
      buttonText: "Torna al Sito",
      orderDetailsTitle: "Dettagli ordine:",
      productLabel: "Prodotto:",
      priceLabel: "Prezzo:",
      discountLabel: "Sconto:",
      statusLabel: "Stato:",
      statusConfirmed: "✓ Confermato",
      contactText: "Domande?\nContattaci: supporto@tuosito.com",
      finalText: "Importante: Tieni il telefono a portata di mano. Ti contatteremo entro 24 ore per confermare l'ordine.",
      upsellTitle: "🎁 Offerta Esclusiva!",
      upsellMessage: "Aggiungi un altro prodotto al tuo ordine con uno sconto speciale!",
      upsellButton: "AGGIUNGI ALL'ORDINE",
    },
  },
  FR: {
    oldPriceLabel: "Ancien prix",
    newPriceLabel: "Nouveau prix",
    socialProofText: "Actuellement sur le site il y a",
    socialProofOnline: "personnes",
    salesText: "ventes dans la dernière heure",
    thankYou: {
      title: "Merci pour votre commande!",
      message: "Votre commande a été traitée avec succès. Nous vous contacterons bientôt pour confirmer les détails.",
      buttonText: "Retour au Site",
      orderDetailsTitle: "Détails de la commande:",
      productLabel: "Produit:",
      priceLabel: "Prix:",
      discountLabel: "Réduction:",
      statusLabel: "Statut:",
      statusConfirmed: "✓ Confirmé",
      contactText: "Questions?\nContactez-nous: support@votresite.com",
      finalText: "Important: Gardez votre téléphone à proximité. Nous vous contacterons dans les 24 heures pour confirmer la commande.",
      upsellTitle: "🎁 Offre Exclusive!",
      upsellMessage: "Ajoutez un autre produit à votre commande avec une réduction spéciale!",
      upsellButton: "AJOUTER À LA COMMANDE",
    },
  },
  RU: {
    oldPriceLabel: "Старая цена",
    newPriceLabel: "Новая цена",
    socialProofText: "Сейчас на сайте",
    socialProofOnline: "человек",
    salesText: "продаж за последний час",
    thankYou: {
      title: "Спасибо за заказ!",
      message: "Ваш заказ успешно оформлен. Мы свяжемся с вами в ближайшее время для подтверждения деталей.",
      buttonText: "Вернуться на сайт",
      orderDetailsTitle: "Детали заказа:",
      productLabel: "Товар:",
      priceLabel: "Цена:",
      discountLabel: "Скидка:",
      statusLabel: "Статус:",
      statusConfirmed: "✓ Подтверждено",
      contactText: "Вопросы?\nСвяжитесь с нами: support@yoursite.com",
      finalText: "Важно: Держите телефон под рукой. Мы свяжемся с вами в течение 24 часов для подтверждения заказа.",
      upsellTitle: "🎁 Эксклюзивное предложение!",
      upsellMessage: "Добавьте еще один товар к заказу со специальной скидкой!",
      upsellButton: "ДОБАВИТЬ К ЗАКАЗУ",
    },
  },
};

export function getDefaultTerraLeadsConfig(languageCode: string): TerraLeadsConfig {
  const lang = TERRALEADS_LANGUAGES[languageCode] || TERRALEADS_LANGUAGES.RO;
  
  return {
    // Theme
    theme: "classic",
    
    // API Configuration
    apiKey: "",
    userId: "", // UNIQUE FIELD
    offerId: "",
    country: languageCode === "BR" ? "BR" : languageCode === "PL" ? "PL" : languageCode === "IT" ? "IT" : languageCode === "FR" ? "FR" : languageCode === "RU" ? "RU" : "RO",
    domain: "https://seudominio.com",
    
    // Form Visual
    title: "Doar astăzi",
    formWidth: 380,
    backgroundColor: "#f8f9fa",
    primaryColor: "#dc3545",
    buttonColor: "#dc3545",
    buttonBorderRadius: "full",
    buttonSize: "medium",
    buttonWidth: "full",
    
    // Pricing
    oldPrice: "298",
    newPrice: "149",
    currency: languageCode === "BR" ? "R$" : languageCode === "PL" ? "PLN" : languageCode === "IT" || languageCode === "FR" ? "€" : languageCode === "RU" ? "₽" : "RON",
    discountPercent: "50",
    
    // Form Fields
    namePlaceholder: "Numele",
    phonePlaceholder: "+40 123 456 789",
    ctaText: "COMANDAȚI CU REDUCERE",
    
    // Security & Disclaimer
    securityEmoji: "🔒",
    securityText: "Datele dvs. sunt protejate!",
    disclaimerText: "* Funcționează asupra mărturiilor în limitele unui canal de distribuție",
    
    // Countdown
    showCountdown: true,
    countdownHours: 3,
    countdownMinutes: 58,
    countdownSeconds: 23,
    countdownColor: "#dc3545",
    
    // Social Proof
    showSocialProof: true,
    viewingCount: 29,
    salesLastHour: 16,
    
    // Product Image
    showProductImage: false,
    productImage: "",
    productImagePosition: "top",
    
    // Thank You Page
    thankYouTitle: lang.thankYou.title,
    thankYouMessage: lang.thankYou.message,
    thankYouButtonText: lang.thankYou.buttonText,
    thankYouButtonUrl: "/",
    thankYouBackgroundColor: "#f4f4f4",
    thankYouCardColor: "#ffffff",
    thankYouTitleColor: "#4CAF50",
    thankYouMessageColor: "#666666",
    contactEmail: "suporte@seusite.com",
    finalText: lang.thankYou.finalText,
    
    // Thank You - Order Details
    showOrderDetails: true,
    orderDetailsTitle: lang.thankYou.orderDetailsTitle,
    productLabel: lang.thankYou.productLabel,
    priceLabel: lang.thankYou.priceLabel,
    discountLabel: lang.thankYou.discountLabel,
    statusLabel: lang.thankYou.statusLabel,
    statusConfirmedText: lang.thankYou.statusConfirmed,
    
    // Thank You - Product Image
    showThankYouProductImage: false,
    
    // Upsell Section
    showUpsell: false,
    upsellTitle: lang.thankYou.upsellTitle,
    upsellMessage: lang.thankYou.upsellMessage,
    upsellPrice: "99 RON",
    upsellButtonText: lang.thankYou.upsellButton,
    upsellButtonUrl: "#",
    upsellBackgroundColor: "#ff6b35",
    upsellButtonColor: "#ff6b35",
    showUpsellImage: false,
    upsellImage: "",
  };
}
