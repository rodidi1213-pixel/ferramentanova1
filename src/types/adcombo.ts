export type AdComboTheme = "classic" | "neon" | "minimal" | "premium";

export interface AdComboConfig {
  // Theme
  theme: AdComboTheme;
  
  // API Configuration
  apiKey: string;
  offerId: string;
  countryCode: string;
  baseUrl: string;
  successPage: string;
  
  // Form Visual
  title: string;
  oldPrice: string;
  newPrice: string;
  currency: string;
  discountPercent: number;
  ctaText: string;
  namePlaceholder: string;
  phonePlaceholder: string;
  availabilityText: string;
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
  buttonSubText: string;
  
  // Form Dimensions
  formWidth: number;
  formMaxWidth: string;
  formHeight: string;
  
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

export interface AdComboLanguage {
  code: string;
  name: string;
  flag: string;
  countryCode: string;
  title: string;
  oldPriceLabel: string;
  newPriceLabel: string;
  namePlaceholder: string;
  phonePlaceholder: string;
  ctaText: string;
  securityText: string;
  disclaimerText: string;
  availabilityText: string;
  socialProofText: string;
  socialProofOnline: string;
  salesText: string;
  buttonSubText: string;
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

export const ADCOMBO_LANGUAGES: Record<string, AdComboLanguage> = {
  RO: {
    code: "RO",
    name: "Română",
    flag: "🇷🇴",
    countryCode: "RO",
    title: "Doar astăzi",
    oldPriceLabel: "Prețul vechi",
    newPriceLabel: "Prețul nou",
    namePlaceholder: "Numele",
    phonePlaceholder: "+40 123 456 789",
    ctaText: "COMANDAȚI CU REDUCERE",
    securityText: "Datele dvs. sunt protejate!",
    disclaimerText: "* Funcționează asupra mărturiilor în limitele unui canal de distribuție",
    availabilityText: "Au rămas 80 de pachete",
    socialProofText: "Acum pe site sunt",
    socialProofOnline: "persoane",
    salesText: "vânzări în ultima oră",
    buttonSubText: "Dados 100% seguros",
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
      contactText: "Întrebări?\nContactați-ne: suport@seusite.com",
    },
  },
  PL: {
    code: "PL",
    name: "Polski",
    flag: "🇵🇱",
    countryCode: "PL",
    title: "Tylko dzisiaj",
    oldPriceLabel: "Stara cena",
    newPriceLabel: "Nowa cena",
    namePlaceholder: "Imię i nazwisko",
    phonePlaceholder: "+48 123 456 789",
    ctaText: "ZAMÓW ZE ZNIŻKĄ",
    securityText: "Twoje dane są chronione!",
    disclaimerText: "* Działa na świadectwach w ramach kanału dystrybucji",
    availabilityText: "Zostało 80 opakowań",
    socialProofText: "Obecnie na stronie jest",
    socialProofOnline: "osób",
    salesText: "sprzedaży w ostatniej godzinie",
    buttonSubText: "Dane 100% bezpieczne",
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
      contactText: "Pytania?\nSkontaktuj się: suport@seusite.com",
    },
  },
  BR: {
    code: "BR",
    name: "Português (BR)",
    flag: "🇧🇷",
    countryCode: "BR",
    title: "Somente Hoje",
    oldPriceLabel: "Preço antigo",
    newPriceLabel: "Preço novo",
    namePlaceholder: "Nome completo",
    phonePlaceholder: "+55 11 99999-9999",
    ctaText: "COMPRAR COM DESCONTO",
    securityText: "Seus dados estão protegidos!",
    disclaimerText: "* Funciona sobre os depoimentos nos limites de um canal de distribuição",
    availabilityText: "Restam 80 pacotes",
    socialProofText: "Atualmente no site estão",
    socialProofOnline: "pessoas",
    salesText: "vendas na última hora",
    buttonSubText: "Dados 100% seguros",
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
      contactText: "Dúvidas?\nEntre em contato: suporte@seusite.com",
    },
  },
  MX: {
    code: "MX",
    name: "Español (MX)",
    flag: "🇲🇽",
    countryCode: "MX",
    title: "Solo Hoy",
    oldPriceLabel: "Precio anterior",
    newPriceLabel: "Precio nuevo",
    namePlaceholder: "Nombre completo",
    phonePlaceholder: "+52 55 1234 5678",
    ctaText: "COMPRAR CON DESCUENTO",
    securityText: "¡Tus datos están protegidos!",
    disclaimerText: "* Funciona sobre los testimonios dentro de los límites de un canal de distribución",
    availabilityText: "Quedan 80 paquetes",
    socialProofText: "Actualmente en el sitio hay",
    socialProofOnline: "personas",
    salesText: "ventas en la última hora",
    buttonSubText: "Datos 100% seguros",
    thankYou: {
      title: "¡Gracias por tu compra!",
      message: "Tu pedido ha sido procesado con éxito. En breve nos pondremos en contacto para confirmar los detalles.",
      buttonText: "Volver al Sitio",
      orderDetailsTitle: "Detalles del pedido:",
      productLabel: "Producto:",
      priceLabel: "Precio:",
      discountLabel: "Descuento:",
      statusLabel: "Estado:",
      statusConfirmedText: "✓ Confirmado",
      upsellTitle: "¡Oferta Especial!",
      upsellMessage: "¡Aprovecha esta oferta exclusiva por tiempo limitado!",
      upsellButtonText: "QUIERO APROVECHAR",
      finalText: "Importante: Mantén tu teléfono cerca. Te contactaremos en las próximas 24 horas para confirmar tu compra.",
      contactText: "¿Preguntas?\nContáctanos: soporte@seusite.com",
    },
  },
  IT: {
    code: "IT",
    name: "Italiano",
    flag: "🇮🇹",
    countryCode: "IT",
    title: "Solo Oggi",
    oldPriceLabel: "Prezzo vecchio",
    newPriceLabel: "Prezzo nuovo",
    namePlaceholder: "Nome completo",
    phonePlaceholder: "+39 123 456 789",
    ctaText: "ORDINA CON SCONTO",
    securityText: "I tuoi dati sono protetti!",
    disclaimerText: "* Funziona sulle testimonianze entro i limiti di un canale di distribuzione",
    availabilityText: "Rimangono 80 pacchetti",
    socialProofText: "Attualmente sul sito ci sono",
    socialProofOnline: "persone",
    salesText: "vendite nell'ultima ora",
    buttonSubText: "Dati 100% sicuri",
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
      contactText: "Domande?\nContattaci: supporto@seusite.com",
    },
  },
  FR: {
    code: "FR",
    name: "Français",
    flag: "🇫🇷",
    countryCode: "FR",
    title: "Aujourd'hui Seulement",
    oldPriceLabel: "Ancien prix",
    newPriceLabel: "Nouveau prix",
    namePlaceholder: "Nom complet",
    phonePlaceholder: "+33 1 23 45 67 89",
    ctaText: "COMMANDER AVEC RÉDUCTION",
    securityText: "Vos données sont protégées!",
    disclaimerText: "* Fonctionne sur les témoignages dans les limites d'un canal de distribution",
    availabilityText: "Il reste 80 paquets",
    socialProofText: "Actuellement sur le site il y a",
    socialProofOnline: "personnes",
    salesText: "ventes dans la dernière heure",
    buttonSubText: "Données 100% sécurisées",
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
      contactText: "Questions?\nContactez-nous: support@seusite.com",
    },
  },
};

export const getDefaultAdComboConfig = (languageCode: string = "RO"): AdComboConfig => {
  const lang = ADCOMBO_LANGUAGES[languageCode] || ADCOMBO_LANGUAGES.RO;
  
  const currencyMap: Record<string, string> = {
    RO: "RON",
    PL: "PLN",
    BR: "BRL",
    MX: "MXN",
    IT: "EUR",
    FR: "EUR",
  };

  return {
    theme: "classic",
    apiKey: "",
    offerId: "",
    countryCode: lang.countryCode,
    baseUrl: "https://SEU_DOMINIO_AQUI",
    successPage: "https://SEU_DOMINIO_AQUI/success.html",
    
    title: lang.title,
    oldPrice: "298",
    newPrice: "149",
    currency: currencyMap[languageCode] || "EUR",
    discountPercent: 50,
    ctaText: lang.ctaText,
    namePlaceholder: lang.namePlaceholder,
    phonePlaceholder: lang.phonePlaceholder,
    availabilityText: lang.availabilityText,
    securityText: lang.securityText,
    securityEmoji: "🔒",
    disclaimerText: lang.disclaimerText,
    
    primaryColor: "#dc3545",
    buttonColor: "#dc3545",
    backgroundColor: "#f8f9fa",
    countdownColor: "#dc3545",
    
    buttonBorderRadius: "large",
    buttonSize: "medium",
    buttonWidth: "full",
    buttonSubText: lang.buttonSubText,
    
    formWidth: 380,
    formMaxWidth: "95%",
    formHeight: "auto",
    
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
