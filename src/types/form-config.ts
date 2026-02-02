export interface ThankYouConfig {
  title: string;
  message: string;
  buttonText: string;
  buttonUrl: string;
  finalText: string;
  orderDetailsTitle: string;
  productLabel: string;
  priceLabel: string;
  discountLabel: string;
  statusLabel: string;
  statusConfirmed: string;
  contactTitle: string;
  showOrderDetails: boolean;
  showUpsell: boolean;
  upsellTitle: string;
  upsellMessage: string;
  upsellButtonText: string;
  upsellButtonUrl: string;
  upsellImage: string;
  backgroundColor: string;
  cardColor: string;
  buttonColor: string;
}

export interface FormConfig {
  // Basic info
  country: string;
  productName: string;
  oldPrice: string;
  newPrice: string;
  currency: string;
  
  // Appearance
  primaryColor: string;
  backgroundColor: string;
  formWidth: number;
  formMaxWidth: string;
  
  // Labels
  headline: string;
  oldPriceLabel: string;
  newPriceLabel: string;
  namePlaceholder: string;
  phonePlaceholder: string;
  addressPlaceholder: string;
  cityPlaceholder: string;
  ctaText: string;
  securityText: string;
  
  // Features
  showCountdown: boolean;
  countdownHours: number;
  countdownMinutes: number;
  countdownSeconds: number;
  showAvailability: boolean;
  availabilityText: string;
  availabilityCount: number;
  
  // Images
  productImage: string;
  
  // Advanced
  formAction: string;
  successRedirect: string;
  
  // Thank You Page
  thankYou: ThankYouConfig;
}

export interface CountryConfig {
  code: string;
  name: string;
  flag: string;
  currency: string;
  phonePrefix: string;
  phoneFormat: string;
  language: {
    headline: string;
    oldPriceLabel: string;
    newPriceLabel: string;
    namePlaceholder: string;
    phonePlaceholder: string;
    addressPlaceholder: string;
    cityPlaceholder: string;
    availabilityText: string;
    ctaText: string;
    securityText: string;
    thankYou: Partial<ThankYouConfig>;
  };
}

export const COUNTRIES: Record<string, CountryConfig> = {
  BR: {
    code: "BR",
    name: "Brasil",
    flag: "🇧🇷",
    currency: "BRL",
    phonePrefix: "+55",
    phoneFormat: "+55 (11) 99999-9999",
    language: {
      headline: "Somente Hoje",
      oldPriceLabel: "De:",
      newPriceLabel: "Por apenas:",
      namePlaceholder: "Seu nome completo",
      phonePlaceholder: "Seu WhatsApp",
      addressPlaceholder: "Endereço completo",
      cityPlaceholder: "Cidade",
      availabilityText: "Restam apenas 80 unidades!",
      ctaText: "QUERO COMPRAR AGORA",
      securityText: "🔒 Seus dados estão seguros!",
      thankYou: {
        title: "Obrigado pela sua compra!",
        message: "Seu pedido foi processado com sucesso. Em breve você será contactado por um de nossos representantes para confirmar os detalhes.",
        buttonText: "Voltar ao Site",
        finalText: "Importante: Mantenha seu celular por perto. Entraremos em contato em até 24 horas.",
        upsellTitle: "Oferta Especial!",
        upsellMessage: "Aproveite esta oferta exclusiva...",
        upsellButtonText: "QUERO APROVEITAR",
      },
    },
  },
  PT: {
    code: "PT",
    name: "Portugal",
    flag: "🇵🇹",
    currency: "EUR",
    phonePrefix: "+351",
    phoneFormat: "+351 912 345 678",
    language: {
      headline: "Apenas Hoje",
      oldPriceLabel: "De:",
      newPriceLabel: "Por apenas:",
      namePlaceholder: "O seu nome completo",
      phonePlaceholder: "O seu telefone",
      addressPlaceholder: "Morada completa",
      cityPlaceholder: "Cidade",
      availabilityText: "Restam apenas 80 unidades!",
      ctaText: "QUERO COMPRAR AGORA",
      securityText: "🔒 Os seus dados estão seguros!",
      thankYou: {
        title: "Obrigado pela sua compra!",
        message: "O seu pedido foi processado com sucesso.",
        buttonText: "Voltar ao Site",
        finalText: "Importante: Iremos contactá-lo em breve.",
        upsellTitle: "Oferta Especial!",
        upsellMessage: "Aproveite esta oferta exclusiva...",
        upsellButtonText: "QUERO APROVEITAR",
      },
    },
  },
  ES: {
    code: "ES",
    name: "España",
    flag: "🇪🇸",
    currency: "EUR",
    phonePrefix: "+34",
    phoneFormat: "+34 612 345 678",
    language: {
      headline: "Solo Hoy",
      oldPriceLabel: "Antes:",
      newPriceLabel: "Ahora solo:",
      namePlaceholder: "Tu nombre completo",
      phonePlaceholder: "Tu teléfono",
      addressPlaceholder: "Dirección completa",
      cityPlaceholder: "Ciudad",
      availabilityText: "¡Solo quedan 80 unidades!",
      ctaText: "COMPRAR AHORA",
      securityText: "🔒 ¡Tus datos están seguros!",
      thankYou: {
        title: "¡Gracias por tu compra!",
        message: "Tu pedido ha sido procesado exitosamente.",
        buttonText: "Volver al Sitio",
        finalText: "Importante: Te contactaremos pronto.",
        upsellTitle: "¡Oferta Especial!",
        upsellMessage: "Aprovecha esta oferta exclusiva...",
        upsellButtonText: "LO QUIERO",
      },
    },
  },
  IT: {
    code: "IT",
    name: "Italia",
    flag: "🇮🇹",
    currency: "EUR",
    phonePrefix: "+39",
    phoneFormat: "+39 312 345 6789",
    language: {
      headline: "Solo Oggi",
      oldPriceLabel: "Prima:",
      newPriceLabel: "Ora solo:",
      namePlaceholder: "Il tuo nome completo",
      phonePlaceholder: "Il tuo telefono",
      addressPlaceholder: "Indirizzo completo",
      cityPlaceholder: "Città",
      availabilityText: "Rimangono solo 80 unità!",
      ctaText: "ACQUISTA ORA",
      securityText: "🔒 I tuoi dati sono al sicuro!",
      thankYou: {
        title: "Grazie per il tuo acquisto!",
        message: "Il tuo ordine è stato elaborato con successo.",
        buttonText: "Torna al Sito",
        finalText: "Importante: Ti contatteremo presto.",
        upsellTitle: "Offerta Speciale!",
        upsellMessage: "Approfitta di questa offerta esclusiva...",
        upsellButtonText: "LO VOGLIO",
      },
    },
  },
  DE: {
    code: "DE",
    name: "Deutschland",
    flag: "🇩🇪",
    currency: "EUR",
    phonePrefix: "+49",
    phoneFormat: "+49 151 12345678",
    language: {
      headline: "Nur Heute",
      oldPriceLabel: "Vorher:",
      newPriceLabel: "Jetzt nur:",
      namePlaceholder: "Ihr vollständiger Name",
      phonePlaceholder: "Ihre Telefonnummer",
      addressPlaceholder: "Vollständige Adresse",
      cityPlaceholder: "Stadt",
      availabilityText: "Nur noch 80 Stück verfügbar!",
      ctaText: "JETZT KAUFEN",
      securityText: "🔒 Ihre Daten sind sicher!",
      thankYou: {
        title: "Vielen Dank für Ihren Kauf!",
        message: "Ihre Bestellung wurde erfolgreich bearbeitet.",
        buttonText: "Zurück zur Website",
        finalText: "Wichtig: Wir werden Sie bald kontaktieren.",
        upsellTitle: "Sonderangebot!",
        upsellMessage: "Nutzen Sie dieses exklusive Angebot...",
        upsellButtonText: "ICH WILL ES",
      },
    },
  },
  FR: {
    code: "FR",
    name: "France",
    flag: "🇫🇷",
    currency: "EUR",
    phonePrefix: "+33",
    phoneFormat: "+33 6 12 34 56 78",
    language: {
      headline: "Aujourd'hui Seulement",
      oldPriceLabel: "Avant:",
      newPriceLabel: "Maintenant:",
      namePlaceholder: "Votre nom complet",
      phonePlaceholder: "Votre téléphone",
      addressPlaceholder: "Adresse complète",
      cityPlaceholder: "Ville",
      availabilityText: "Plus que 80 unités disponibles!",
      ctaText: "ACHETER MAINTENANT",
      securityText: "🔒 Vos données sont sécurisées!",
      thankYou: {
        title: "Merci pour votre achat!",
        message: "Votre commande a été traitée avec succès.",
        buttonText: "Retour au Site",
        finalText: "Important: Nous vous contacterons bientôt.",
        upsellTitle: "Offre Spéciale!",
        upsellMessage: "Profitez de cette offre exclusive...",
        upsellButtonText: "JE VEUX",
      },
    },
  },
  PL: {
    code: "PL",
    name: "Polska",
    flag: "🇵🇱",
    currency: "PLN",
    phonePrefix: "+48",
    phoneFormat: "+48 512 345 678",
    language: {
      headline: "Tylko Dzisiaj",
      oldPriceLabel: "Przed:",
      newPriceLabel: "Teraz tylko:",
      namePlaceholder: "Twoje pełne imię i nazwisko",
      phonePlaceholder: "Twój telefon",
      addressPlaceholder: "Pełny adres",
      cityPlaceholder: "Miasto",
      availabilityText: "Zostało tylko 80 sztuk!",
      ctaText: "KUP TERAZ",
      securityText: "🔒 Twoje dane są bezpieczne!",
      thankYou: {
        title: "Dziękujemy za zakup!",
        message: "Twoje zamówienie zostało pomyślnie przetworzone.",
        buttonText: "Wróć do Strony",
        finalText: "Ważne: Wkrótce się z Tobą skontaktujemy.",
        upsellTitle: "Oferta Specjalna!",
        upsellMessage: "Skorzystaj z tej ekskluzywnej oferty...",
        upsellButtonText: "CHCĘ TO",
      },
    },
  },
  RO: {
    code: "RO",
    name: "România",
    flag: "🇷🇴",
    currency: "RON",
    phonePrefix: "+40",
    phoneFormat: "+40 712 345 678",
    language: {
      headline: "Doar Astăzi",
      oldPriceLabel: "Înainte:",
      newPriceLabel: "Acum doar:",
      namePlaceholder: "Numele tău complet",
      phonePlaceholder: "Telefonul tău",
      addressPlaceholder: "Adresa completă",
      cityPlaceholder: "Oraș",
      availabilityText: "Au mai rămas doar 80 de unități!",
      ctaText: "CUMPĂRĂ ACUM",
      securityText: "🔒 Datele tale sunt în siguranță!",
      thankYou: {
        title: "Vă mulțumim pentru achiziție!",
        message: "Comanda dumneavoastră a fost procesată cu succes.",
        buttonText: "Înapoi la Site",
        finalText: "Important: Vă vom contacta în curând.",
        upsellTitle: "Ofertă Specială!",
        upsellMessage: "Profită de această ofertă exclusivă...",
        upsellButtonText: "VREAU",
      },
    },
  },
};

export const getDefaultConfig = (countryCode: string = "BR"): FormConfig => {
  const country = COUNTRIES[countryCode] || COUNTRIES.BR;
  
  return {
    country: countryCode,
    productName: "Produto Exemplo",
    oldPrice: "199.90",
    newPrice: "99.90",
    currency: country.currency,
    
    primaryColor: "#22c55e",
    backgroundColor: "#f8fafc",
    formWidth: 380,
    formMaxWidth: "95%",
    
    headline: country.language.headline,
    oldPriceLabel: country.language.oldPriceLabel,
    newPriceLabel: country.language.newPriceLabel,
    namePlaceholder: country.language.namePlaceholder,
    phonePlaceholder: country.language.phonePlaceholder,
    addressPlaceholder: country.language.addressPlaceholder,
    cityPlaceholder: country.language.cityPlaceholder,
    ctaText: country.language.ctaText,
    securityText: country.language.securityText,
    
    showCountdown: true,
    countdownHours: 2,
    countdownMinutes: 30,
    countdownSeconds: 0,
    showAvailability: true,
    availabilityText: country.language.availabilityText,
    availabilityCount: 80,
    
    productImage: "",
    
    formAction: "send-order.php",
    successRedirect: "obrigado.html",
    
    thankYou: {
      title: country.language.thankYou?.title || "Obrigado!",
      message: country.language.thankYou?.message || "Seu pedido foi processado.",
      buttonText: country.language.thankYou?.buttonText || "Voltar",
      buttonUrl: "#",
      finalText: country.language.thankYou?.finalText || "",
      orderDetailsTitle: "Detalhes do Pedido",
      productLabel: "Produto",
      priceLabel: "Preço",
      discountLabel: "Desconto",
      statusLabel: "Status",
      statusConfirmed: "Confirmado",
      contactTitle: "Dúvidas?",
      showOrderDetails: true,
      showUpsell: false,
      upsellTitle: country.language.thankYou?.upsellTitle || "Oferta Especial!",
      upsellMessage: country.language.thankYou?.upsellMessage || "",
      upsellButtonText: country.language.thankYou?.upsellButtonText || "QUERO",
      upsellButtonUrl: "#",
      upsellImage: "",
      backgroundColor: "#1e293b",
      cardColor: "#334155",
      buttonColor: "#22c55e",
    },
  };
};
