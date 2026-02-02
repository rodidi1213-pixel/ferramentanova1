export type ShakesProTheme = "classic" | "neon" | "minimal" | "premium";

export interface ShakesProConfig {
  // Theme
  theme: ShakesProTheme;
  
  // API Configuration
  offerId: string;
  landingId: string;
  domain: string;
  country: string;
  // Form Visual
  title: string;
  oldPrice: string;
  newPrice: string;
  currency: string;
  discountPercent: number;
  ctaText: string;
  namePlaceholder: string;
  phonePlaceholder: string;
  securityText: string;
  securityEmoji: string;
  disclaimerText: string;
  
  // Colors
  primaryColor: string;
  buttonColor: string;
  backgroundColor: string;
  countdownColor: string;
  
  // Button Configuration
  buttonBorderRadius: "small" | "medium" | "large" | "full";
  buttonSize: "small" | "medium" | "large";
  buttonWidth: "auto" | "full";
  
  // Form Dimensions
  formWidth: number;
  formMaxWidth: string;
  
  // Product Image
  showProductImage: boolean;
  productImage: string;
  productImagePosition: "top" | "side";
  
  // Countdown
  showCountdown: boolean;
  countdownHours: number;
  countdownMinutes: number;
  countdownSeconds: number;
  
  // Social Proof
  showSocialProof: boolean;
  viewingCount: number;
  salesLastHour: number;
  
  // Thank You Page
  showThankYouPage: boolean;
  thankYouTitle: string;
  thankYouMessage: string;
  thankYouButtonText: string;
  thankYouButtonUrl: string;
  thankYouBackgroundColor: string;
  thankYouCardColor: string;
  thankYouTitleColor: string;
  thankYouMessageColor: string;
  showThankYouProductImage: boolean;
  
  // Order Details
  showOrderDetails: boolean;
  orderDetailsTitle: string;
  productLabel: string;
  priceLabel: string;
  discountLabel: string;
  statusLabel: string;
  statusConfirmedText: string;
  
  // Upsell
  showUpsell: boolean;
  upsellTitle: string;
  upsellMessage: string;
  upsellButtonText: string;
  upsellButtonUrl: string;
  upsellPrice: string;
  upsellButtonColor: string;
  upsellBackgroundColor: string;
  showUpsellImage: boolean;
  upsellImage: string;
  
  // Final Text
  finalText: string;
  contactEmail: string;
}

export interface ShakesProLanguage {
  code: string;
  name: string;
  flag: string;
  title: string;
  oldPriceLabel: string;
  newPriceLabel: string;
  namePlaceholder: string;
  phonePlaceholder: string;
  ctaText: string;
  securityText: string;
  disclaimerText: string;
  socialProofOnline: string;
  socialProofSales: string;
  thankYou: {
    title: string;
    message: string;
    buttonText: string;
    orderDetailsTitle: string;
    productLabel: string;
    priceLabel: string;
    discountLabel: string;
    statusLabel: string;
    statusConfirmedText: string;
    upsellTitle: string;
    upsellMessage: string;
    upsellButtonText: string;
    finalText: string;
    contactText: string;
  };
}

export const SHAKESPRO_LANGUAGES: Record<string, ShakesProLanguage> = {
  RO: {
    code: "RO",
    name: "Română",
    flag: "🇷🇴",
    title: "Doar astăzi",
    oldPriceLabel: "Prețul vechi",
    newPriceLabel: "Prețul nou",
    namePlaceholder: "Numele",
    phonePlaceholder: "+40 123 456 789",
    ctaText: "COMANDAȚI CU REDUCERE",
    securityText: "Datele dvs. sunt protejate!",
    disclaimerText: "* Funcționează asupra mărturiilor în limitele unui canal de distribuție",
    socialProofOnline: "Acum pe site sunt {count} persoane",
    socialProofSales: "{count} vânzări în ultima oră",
    thankYou: {
      title: "Vă mulțumim pentru achiziție!",
      message: "Comanda dumneavoastră a fost procesată cu succes. În curând vă vom contacta pentru a confirma detaliile.",
      buttonText: "Înapoi la Site",
      orderDetailsTitle: "Detalii comandă:",
      productLabel: "Produs:",
      priceLabel: "Preț:",
      discountLabel: "Reducere:",
      statusLabel: "Status:",
      statusConfirmedText: "✓ Confirmat",
      upsellTitle: "Ofertă Specială!",
      upsellMessage: "Profită de această ofertă exclusivă pe timp limitat!",
      upsellButtonText: "VREAU SĂ PROFIT",
      finalText: "Important: Țineți telefonul aproape. Vă vom contacta în următoarele 24 de ore pentru a confirma achiziția.",
      contactText: "Întrebări?\nContactează-ne: ",
    },
  },
  PL: {
    code: "PL",
    name: "Polski",
    flag: "🇵🇱",
    title: "Tylko dzisiaj",
    oldPriceLabel: "Stara cena",
    newPriceLabel: "Nowa cena",
    namePlaceholder: "Imię i nazwisko",
    phonePlaceholder: "+48 123 456 789",
    ctaText: "ZAMÓW ZE ZNIŻKĄ",
    securityText: "Twoje dane są chronione!",
    disclaimerText: "* Działa na świadectwach w ramach kanału dystrybucji",
    socialProofOnline: "Obecnie na stronie jest {count} osób",
    socialProofSales: "{count} sprzedaży w ostatniej godzinie",
    thankYou: {
      title: "Dziękujemy za zakup!",
      message: "Twoje zamówienie zostało pomyślnie przetworzone. Wkrótce skontaktujemy się z Tobą, aby potwierdzić szczegóły.",
      buttonText: "Wróć na stronę",
      orderDetailsTitle: "Szczegóły zamówienia:",
      productLabel: "Produkt:",
      priceLabel: "Cena:",
      discountLabel: "Rabat:",
      statusLabel: "Status:",
      statusConfirmedText: "✓ Potwierdzone",
      upsellTitle: "Oferta Specjalna!",
      upsellMessage: "Skorzystaj z tej ekskluzywnej oferty przez ograniczony czas!",
      upsellButtonText: "CHCĘ SKORZYSTAĆ",
      finalText: "Ważne: Trzymaj telefon w pobliżu. Skontaktujemy się z Tobą w ciągu 24 godzin, aby potwierdzić zakup.",
      contactText: "Pytania?\nSkontaktuj się: ",
    },
  },
  BR: {
    code: "BR",
    name: "Português (BR)",
    flag: "🇧🇷",
    title: "Somente Hoje",
    oldPriceLabel: "Preço antigo",
    newPriceLabel: "Preço novo",
    namePlaceholder: "Nome completo",
    phonePlaceholder: "+55 11 99999-9999",
    ctaText: "COMPRAR COM DESCONTO",
    securityText: "Seus dados estão protegidos!",
    disclaimerText: "* Funciona sobre os depoimentos nos limites de um canal de distribuição",
    socialProofOnline: "Atualmente no site estão {count} pessoas",
    socialProofSales: "{count} vendas na última hora",
    thankYou: {
      title: "Obrigado pela sua compra!",
      message: "Sua compra foi processada com sucesso. Em breve entraremos em contato para confirmar os detalhes.",
      buttonText: "Voltar ao Site",
      orderDetailsTitle: "Detalhes do pedido:",
      productLabel: "Produto:",
      priceLabel: "Preço:",
      discountLabel: "Desconto:",
      statusLabel: "Status:",
      statusConfirmedText: "✓ Confirmado",
      upsellTitle: "Oferta Especial!",
      upsellMessage: "Aproveite esta oferta exclusiva por tempo limitado!",
      upsellButtonText: "QUERO APROVEITAR",
      finalText: "Importante: Mantenha seu telefone por perto. Entraremos em contato em até 24 horas para confirmar sua compra.",
      contactText: "Dúvidas?\nEntre em contato: ",
    },
  },
  IT: {
    code: "IT",
    name: "Italiano",
    flag: "🇮🇹",
    title: "Solo Oggi",
    oldPriceLabel: "Prezzo vecchio",
    newPriceLabel: "Prezzo nuovo",
    namePlaceholder: "Nome completo",
    phonePlaceholder: "+39 123 456 789",
    ctaText: "ORDINA CON SCONTO",
    securityText: "I tuoi dati sono protetti!",
    disclaimerText: "* Funziona sulle testimonianze entro i limiti di un canale di distribuzione",
    socialProofOnline: "Attualmente sul sito ci sono {count} persone",
    socialProofSales: "{count} vendite nell'ultima ora",
    thankYou: {
      title: "Grazie per il tuo acquisto!",
      message: "Il tuo ordine è stato elaborato con successo. Ti contatteremo presto per confermare i dettagli.",
      buttonText: "Torna al Sito",
      orderDetailsTitle: "Dettagli ordine:",
      productLabel: "Prodotto:",
      priceLabel: "Prezzo:",
      discountLabel: "Sconto:",
      statusLabel: "Stato:",
      statusConfirmedText: "✓ Confermato",
      upsellTitle: "Offerta Speciale!",
      upsellMessage: "Approfitta di questa offerta esclusiva per un tempo limitato!",
      upsellButtonText: "VOGLIO APPROFITTARE",
      finalText: "Importante: Tieni il telefono vicino. Ti contatteremo entro 24 ore per confermare l'acquisto.",
      contactText: "Domande?\nContattaci: ",
    },
  },
  FR: {
    code: "FR",
    name: "Français",
    flag: "🇫🇷",
    title: "Aujourd'hui Seulement",
    oldPriceLabel: "Ancien prix",
    newPriceLabel: "Nouveau prix",
    namePlaceholder: "Nom complet",
    phonePlaceholder: "+33 1 23 45 67 89",
    ctaText: "COMMANDER AVEC RÉDUCTION",
    securityText: "Vos données sont protégées!",
    disclaimerText: "* Fonctionne sur les témoignages dans les limites d'un canal de distribution",
    socialProofOnline: "Actuellement sur le site il y a {count} personnes",
    socialProofSales: "{count} ventes dans la dernière heure",
    thankYou: {
      title: "Merci pour votre achat!",
      message: "Votre commande a été traitée avec succès. Nous vous contacterons bientôt pour confirmer les détails.",
      buttonText: "Retour au Site",
      orderDetailsTitle: "Détails de la commande:",
      productLabel: "Produit:",
      priceLabel: "Prix:",
      discountLabel: "Réduction:",
      statusLabel: "Statut:",
      statusConfirmedText: "✓ Confirmé",
      upsellTitle: "Offre Spéciale!",
      upsellMessage: "Profitez de cette offre exclusive pour un temps limité!",
      upsellButtonText: "JE VEUX EN PROFITER",
      finalText: "Important: Gardez votre téléphone à proximité. Nous vous contacterons dans les 24 heures pour confirmer votre achat.",
      contactText: "Questions?\nContactez-nous: ",
    },
  },
  RU: {
    code: "RU",
    name: "Русский",
    flag: "🇷🇺",
    title: "Только сегодня",
    oldPriceLabel: "Старая цена",
    newPriceLabel: "Новая цена",
    namePlaceholder: "Ваше имя",
    phonePlaceholder: "+7 999 123 45 67",
    ctaText: "ЗАКАЗАТЬ СО СКИДКОЙ",
    securityText: "Ваши данные защищены!",
    disclaimerText: "* Действует на свидетельства в рамках канала распространения",
    socialProofOnline: "Сейчас на сайте {count} человек",
    socialProofSales: "{count} продаж за последний час",
    thankYou: {
      title: "Спасибо за покупку!",
      message: "Ваш заказ успешно обработан. Мы свяжемся с вами в ближайшее время для подтверждения деталей.",
      buttonText: "Вернуться на сайт",
      orderDetailsTitle: "Детали заказа:",
      productLabel: "Продукт:",
      priceLabel: "Цена:",
      discountLabel: "Скидка:",
      statusLabel: "Статус:",
      statusConfirmedText: "✓ Подтверждено",
      upsellTitle: "Специальное предложение!",
      upsellMessage: "Воспользуйтесь этим эксклюзивным предложением ограниченное время!",
      upsellButtonText: "ХОЧУ ВОСПОЛЬЗОВАТЬСЯ",
      finalText: "Важно: Держите телефон под рукой. Мы свяжемся с вами в течение 24 часов для подтверждения покупки.",
      contactText: "Вопросы?\nСвяжитесь с нами: ",
    },
  },
};

export const getDefaultShakesProConfig = (languageCode: string = "RO"): ShakesProConfig => {
  const lang = SHAKESPRO_LANGUAGES[languageCode] || SHAKESPRO_LANGUAGES.RO;
  
  const currencyMap: Record<string, string> = {
    RO: "RON",
    PL: "PLN",
    BR: "BRL",
    IT: "EUR",
    FR: "EUR",
    RU: "RUB",
  };

  return {
    theme: "classic",
    offerId: "",
    landingId: "",
    domain: "your-domain.com",
    country: languageCode,
    
    title: lang.title,
    oldPrice: "298",
    newPrice: "149",
    currency: currencyMap[languageCode] || "EUR",
    discountPercent: 50,
    ctaText: lang.ctaText,
    namePlaceholder: lang.namePlaceholder,
    phonePlaceholder: lang.phonePlaceholder,
    securityText: lang.securityText,
    securityEmoji: "🔒",
    disclaimerText: lang.disclaimerText,
    
    primaryColor: "#dc3545",
    buttonColor: "#dc3545",
    backgroundColor: "#f8f9fa",
    countdownColor: "#dc3545",
    
    buttonBorderRadius: "full",
    buttonSize: "medium",
    buttonWidth: "full",
    
    formWidth: 380,
    formMaxWidth: "95%",
    
    showProductImage: false,
    productImage: "",
    productImagePosition: "top",
    
    showCountdown: true,
    countdownHours: 3,
    countdownMinutes: 58,
    countdownSeconds: 23,
    
    showSocialProof: true,
    viewingCount: 29,
    salesLastHour: 16,
    
    showThankYouPage: true,
    thankYouTitle: lang.thankYou.title,
    thankYouMessage: lang.thankYou.message,
    thankYouButtonText: lang.thankYou.buttonText,
    thankYouButtonUrl: "/",
    thankYouBackgroundColor: "#f4f4f4",
    thankYouCardColor: "#ffffff",
    thankYouTitleColor: "#4CAF50",
    thankYouMessageColor: "#666666",
    showThankYouProductImage: false,
    
    showOrderDetails: true,
    orderDetailsTitle: lang.thankYou.orderDetailsTitle,
    productLabel: lang.thankYou.productLabel,
    priceLabel: lang.thankYou.priceLabel,
    discountLabel: lang.thankYou.discountLabel,
    statusLabel: lang.thankYou.statusLabel,
    statusConfirmedText: lang.thankYou.statusConfirmedText,
    
    showUpsell: false,
    upsellTitle: lang.thankYou.upsellTitle,
    upsellMessage: lang.thankYou.upsellMessage,
    upsellButtonText: lang.thankYou.upsellButtonText,
    upsellButtonUrl: "",
    upsellPrice: "R$ 97",
    upsellButtonColor: "#ff6b35",
    upsellBackgroundColor: "#ff6b35",
    showUpsellImage: false,
    upsellImage: "",
    
    finalText: lang.thankYou.finalText,
    contactEmail: "suporte@seusite.com",
  };
};
