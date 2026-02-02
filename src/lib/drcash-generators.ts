import { DrCashConfig, DrCashTheme, DRCASH_LANGUAGES } from "@/types/platforms";

function getButtonBorderRadius(style: DrCashConfig["buttonBorderRadius"]): string {
  const radiusMap = {
    small: "4px",
    medium: "8px",
    large: "25px",
    full: "50px",
  };
  return radiusMap[style] || "25px";
}

function getButtonHeight(size: DrCashConfig["buttonSize"]): string {
  const sizeMap = {
    small: "40px",
    medium: "50px",
    large: "60px",
  };
  return sizeMap[size] || "50px";
}

function getThemeCSS(theme: DrCashTheme, config: DrCashConfig): string {
  switch (theme) {
    case "neon":
      return `
    /* ===== NEON THEME ===== */
    .card {
      background: linear-gradient(145deg, #1a1a2e 0%, #16213e 100%);
      border: 2px solid ${config.countdownColor};
      box-shadow: 0 0 30px ${config.countdownColor}40, 0 0 60px ${config.countdownColor}20, inset 0 1px 0 rgba(255,255,255,0.1);
    }
    .header h2 {
      color: #fff;
      text-shadow: 0 0 10px ${config.primaryColor}, 0 0 20px ${config.primaryColor}80;
    }
    .timer-box {
      background: transparent;
      border: 2px solid ${config.countdownColor};
      box-shadow: 0 0 15px ${config.countdownColor}60, inset 0 0 10px ${config.countdownColor}30;
      color: ${config.countdownColor};
      animation: neonBorder 2s ease-in-out infinite;
    }
    @keyframes neonBorder {
      0%, 100% { border-color: ${config.countdownColor}; box-shadow: 0 0 15px ${config.countdownColor}60; }
      50% { border-color: ${config.countdownColor}dd; box-shadow: 0 0 25px ${config.countdownColor}80; }
    }
    .price-old .label, .price-old .amount { color: #888; }
    .price-new .label { color: #aaa; }
    .price-new .amount { color: #fff; text-shadow: 0 0 10px ${config.primaryColor}; }
    .social-proof {
      background: rgba(255,255,255,0.05);
      border-radius: 8px;
      padding: 12px;
      border: 1px solid rgba(255,255,255,0.1);
    }
    .social-item { color: #ccc; }
    .social-number { color: #fff; }
    .social-icon { box-shadow: 0 0 10px currentColor; }
    .icon-people { background: #00d4ff; }
    .online-dot { text-shadow: 0 0 10px #28a745; }
    input[type="text"], input[type="tel"] {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.2);
      color: #fff;
    }
    input::placeholder { color: #666; }
    input:focus { border-color: ${config.countdownColor}; box-shadow: 0 0 15px ${config.countdownColor}40; }
    .btn {
      background: linear-gradient(135deg, ${config.buttonColor} 0%, ${config.buttonColor}dd 100%);
      box-shadow: 0 0 20px ${config.buttonColor}80, 0 0 40px ${config.buttonColor}40;
      animation: neonPulse 2s ease-in-out infinite;
    }
    @keyframes neonPulse {
      0%, 100% { box-shadow: 0 0 20px ${config.buttonColor}80, 0 0 40px ${config.buttonColor}40; }
      50% { box-shadow: 0 0 30px ${config.buttonColor}, 0 0 60px ${config.buttonColor}60; }
    }
    .btn:hover { transform: scale(1.02); }
    .footer-text, .footer-disclaimer { color: #aaa; }
`;
    case "minimal":
      return `
    /* ===== MINIMAL THEME ===== */
    .card {
      background: #ffffff;
      border: none;
      box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 8px 30px rgba(0,0,0,0.05);
      border-radius: 8px;
    }
    .header h2 {
      color: #1a1a1a;
      font-weight: 400;
      letter-spacing: 0.05em;
    }
    .timer-box {
      background: #f5f5f5;
      border: none;
      border-radius: 4px;
      color: #333;
      font-weight: 500;
    }
    .price-old .label, .price-old .amount { color: #999; }
    .price-new .amount { color: #1a1a1a; }
    .social-proof {
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      padding: 16px 0;
      margin: 16px 0;
    }
    input[type="text"], input[type="tel"] {
      background: #fafafa;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
    }
    input:focus { border-color: #333; box-shadow: none; }
    .btn {
      background: ${config.buttonColor};
      box-shadow: none;
      border-radius: 4px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .btn:hover { 
      transform: translateY(-2px); 
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .footer-text { color: #888; }
`;
    case "premium":
      return `
    /* ===== PREMIUM THEME ===== */
    .card {
      background: linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
      border: 2px solid;
      border-image: linear-gradient(135deg, #d4af37, #f4e4bc, #d4af37) 1;
      box-shadow: 0 20px 60px rgba(212, 175, 55, 0.15), 0 0 40px rgba(212, 175, 55, 0.1), inset 0 1px 0 rgba(255,255,255,0.1);
      border-radius: 16px;
      position: relative;
      overflow: hidden;
    }
    .card::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(45deg, transparent 30%, rgba(212,175,55,0.03) 50%, transparent 70%);
      animation: premiumShine 4s ease-in-out infinite;
      pointer-events: none;
    }
    @keyframes premiumShine {
      0% { transform: translateX(-100%) rotate(45deg); }
      100% { transform: translateX(100%) rotate(45deg); }
    }
    .header h2 {
      background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 50%, #d4af37 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
    .timer-box {
      background: linear-gradient(145deg, rgba(212,175,55,0.1) 0%, rgba(244,228,188,0.05) 100%);
      border: 1px solid rgba(212,175,55,0.5);
      border-radius: 8px;
      color: #f4e4bc;
      font-weight: 600;
      box-shadow: 0 4px 15px rgba(212,175,55,0.2);
    }
    .price-old .label, .price-old .amount { color: #888; }
    .price-new .label { color: #aaa; }
    .price-new .amount { 
      background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .social-proof {
      background: rgba(212,175,55,0.05);
      border-radius: 8px;
      padding: 12px;
      border: 1px solid rgba(212,175,55,0.2);
    }
    .social-item { color: #ccc; }
    .social-number { color: #f4e4bc; }
    .social-icon { box-shadow: 0 0 8px currentColor; }
    .icon-people { background: #d4af37; }
    .online-dot { text-shadow: 0 0 8px #28a745; }
    input[type="text"], input[type="tel"] {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(212,175,55,0.3);
      border-radius: 8px;
      color: #f4e4bc;
    }
    input::placeholder { color: #666; }
    input:focus { 
      border-color: #d4af37; 
      box-shadow: 0 0 15px rgba(212,175,55,0.3);
      background: rgba(255,255,255,0.05);
    }
    .btn {
      background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 30%, #d4af37 70%, #aa8c2c 100%);
      box-shadow: 0 8px 25px rgba(212,175,55,0.4), inset 0 1px 0 rgba(255,255,255,0.3);
      color: #1a1a1a !important;
      font-weight: 700;
      text-shadow: 0 1px 0 rgba(255,255,255,0.2);
      position: relative;
      overflow: hidden;
    }
    .btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      animation: buttonShine 3s ease-in-out infinite;
    }
    @keyframes buttonShine {
      0% { left: -100%; }
      50%, 100% { left: 100%; }
    }
    .btn:hover { 
      transform: scale(1.02) translateY(-2px);
      box-shadow: 0 12px 35px rgba(212,175,55,0.5);
    }
    .footer-text { color: #d4af37; }
    .footer-disclaimer { color: #666; }
    .btn-secondary { color: #1a1a1a; }
`;
    default: // classic
      return `
    /* ===== CLASSIC THEME ===== */
`;
  }
}

export function generateDrCashFormHTML(config: DrCashConfig, languageCode: string): string {
  const buttonRadius = getButtonBorderRadius(config.buttonBorderRadius);
  const buttonHeight = getButtonHeight(config.buttonSize);
  const buttonWidth = config.buttonWidth === "full" ? "100%" : "auto";
  const themeCSS = getThemeCSS(config.theme, config);
  const lang = DRCASH_LANGUAGES[languageCode] || DRCASH_LANGUAGES.RO;
  const isRTL = languageCode === "AR";

  return `<!doctype html>
<html lang="${languageCode.toLowerCase()}"${isRTL ? ' dir="rtl"' : ''}>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>${config.title}</title>
  <style>
    /* ===== Mobile-first base ===== */
    :root{
      --bg:${config.backgroundColor}; --card:#fff; --border:#e9ecef; --green:#28a745; --green-d:#1e7e34;
      --primary:${config.primaryColor}; --primary-d:color-mix(in srgb, ${config.primaryColor} 90%, black); --muted:#6c757d; --input-bg:#fff; --input-bd:#ced4da;
      --text-dark:#212529; --text-light:#6c757d;
      --countdown-bg:${config.countdownColor};
    }
    *{box-sizing:border-box}
    html,body{margin:0; padding:0; min-height:auto}
    body{background:transparent; color:var(--text-dark); font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif}

    /* Main container */
    .frame{
      width:100%; max-width: ${config.formWidth}px;
      margin:20px auto; padding:0; background:transparent;
    }
    .card{
      background:var(--card); border:1px solid var(--border); border-radius:12px; 
      padding:20px; position:relative; box-shadow:0 2px 10px rgba(0,0,0,0.1);
    }

    /* Header */
    .header{ text-align:center; margin:10px 0 20px; padding-top:10px; }
    .header h2{ margin:0; font-weight:600; font-size:20px; color:var(--text-dark); }

    /* Countdown timer */
    .timer{
      display:flex; justify-content:center; align-items:center; gap:8px;
      margin:15px 0 20px; font-weight:600; font-size:14px;
    }
    .timer-box{
      background:var(--countdown-bg); color:#fff; padding:8px 10px; border-radius:4px;
      min-width:35px; text-align:center; font-weight:700; font-size:16px;
    }

    /* Product image positioning */
    .product-image-top{
      display:flex; justify-content:center; margin:20px 0;
    }
    .product-image-top img{
      max-width:200px; max-height:200px; object-fit:contain; border-radius:8px;
      box-shadow:0 4px 15px rgba(0,0,0,0.1);
    }

    /* Price container with side image support */
    .price-container{
      margin:20px 0; padding:0 10px;
    }
    .price-container.with-side-image{
      display:flex; align-items:center; gap:15px;
    }
    .price-side-image{
      width:100px; height:100px; object-fit:contain; border-radius:6px;
      box-shadow:0 2px 8px rgba(0,0,0,0.1); flex-shrink:0;
    }
    .price-content{
      display:flex; justify-content:space-between; align-items:center; flex:1;
    }
    .price-old{
      text-align:left;
    }
    .price-old .label{
      color:var(--muted); font-size:12px; margin-bottom:2px;
    }
    .price-old .amount{
      color:var(--muted); text-decoration:line-through; font-size:16px;
    }
    .price-new{
      text-align:right;
    }
    .price-new .label{
      color:var(--muted); font-size:12px; margin-bottom:2px;
    }
    .price-new .amount{
      color:var(--text-dark); font-weight:700; font-size:24px;
    }

    /* Social proof */
    .social-proof{
      margin:20px 0; font-size:12px; color:var(--muted);
    }
    .social-item{
      display:flex; align-items:center; margin:4px 0;
    }
    .social-icon{
      width:12px; height:12px; margin-right:6px; border-radius:50%;
    }
    .icon-people{ background:#007bff; }
    .icon-time{ background:#28a745; }
    .social-number{ color:var(--text-dark); font-weight:600; }
    .online-dot{
      color:#28a745; margin-left:auto;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.5; }
      100% { opacity: 1; }
    }

    /* Form elements */
    .form-group{
      margin:15px 0;
    }
    input[type="text"], input[type="tel"]{
      width:100%; height:50px; padding:12px 16px;
      background:var(--input-bg); border:1px solid var(--input-bd); border-radius:6px;
      font-size:16px; outline:none; color:var(--muted);
    }
    input::placeholder{ color:#adb5bd; }
    input:focus{ border-color:#80bdff; box-shadow:0 0 0 0.2rem rgba(0,123,255,.25); }

    /* CTA button */
    .btn{
      width:${buttonWidth}; height:${buttonHeight}; margin:20px 0 15px;
      border:none; border-radius:${buttonRadius};
      background:${config.buttonColor}; color:#fff;
      font-size:16px; font-weight:700; cursor:pointer;
      text-transform:uppercase; letter-spacing:0.5px;
    }
    .btn:hover{ background:color-mix(in srgb, ${config.buttonColor} 90%, black); }
    .btn:active{ transform:translateY(1px); }

    /* Footer note */
    .footer-note{
      text-align:center; margin:15px 0 5px;
    }
    .footer-text{
      color:var(--muted); font-size:11px; line-height:1.4;
    }
    .footer-disclaimer{
      color:var(--muted); font-size:10px; text-align:center; 
      margin-top:10px; line-height:1.3;
    }

    /* Responsive adjustments */
    @media (max-width: 340px){
      .card{ padding:15px; }
      .price-container{ padding:0 5px; }
      .price-container.with-side-image{ gap:10px; }
      .price-side-image{ width:80px; height:80px; }
    }
    ${themeCSS}
  </style>
</head>
<body>

  <div class="frame">
    <div class="card">

      <!-- Header -->
      <div class="header">
        <h2>${config.title}</h2>
      </div>

      ${config.showCountdown ? `
      <!-- Countdown Timer -->
      <div class="timer">
        <span class="timer-box" id="hours">${String(config.countdownHours).padStart(2, '0')}</span>
        <span class="timer-box" id="minutes">${String(config.countdownMinutes).padStart(2, '0')}</span>
        <span class="timer-box" id="seconds">${String(config.countdownSeconds).padStart(2, '0')}</span>
      </div>
      ` : ''}

      ${config.showProductImage && config.productImage && config.productImagePosition === 'top' ? `
      <!-- Product image -->
      <div class="product-image-top">
        <img src="${config.productImage}" alt="Product" />
      </div>
      ` : ''}

      <!-- Prices with side image support -->
      <div class="price-container${config.showProductImage && config.productImage && config.productImagePosition === 'side' ? ' with-side-image' : ''}">
        ${config.showProductImage && config.productImage && config.productImagePosition === 'side' ? `
        <img src="${config.productImage}" alt="Product" class="price-side-image" />
        ` : ''}
        <div class="price-content">
          <div class="price-old">
            <div class="label">${lang.oldPriceLabel}</div>
            <div class="amount">${config.oldPrice} ${config.currency}</div>
          </div>
          <div class="price-new">
            <div class="label">${lang.newPriceLabel}</div>
            <div class="amount">${config.newPrice} ${config.currency}*</div>
          </div>
        </div>
      </div>

      ${config.showSocialProof ? `
      <!-- Social Proof -->
      <div class="social-proof">
        <div class="social-item">
          <div class="social-icon icon-people"></div>
          <span>${lang.socialProofText} <span class="social-number">${config.viewingCount}</span> ${lang.socialProofOnline}</span>
          <span class="online-dot">● online</span>
        </div>
        <div class="social-item">
          <div class="social-icon icon-time"></div>
          <span>${config.availabilityText}</span>
          <span class="online-dot">● online</span>
        </div>
      </div>
      ` : ''}

      <!-- Form -->
      <form class="orderForm" id="orderForm">
        <div class="form-group">
          <input id="name" name="name" type="text" placeholder="${config.namePlaceholder}" required>
        </div>

        <div class="form-group">
          <input id="phone" name="phone" type="tel" inputmode="tel" 
               placeholder="${config.phonePlaceholder}" required>
        </div>

        <!-- Hidden tracking fields -->
        <input type="hidden" name="sub1">
        <input type="hidden" name="sub2">
        <input type="hidden" name="sub3">
        <input type="hidden" name="sub4">
        <input type="hidden" name="sub5">

        <button type="submit" class="btn" id="submitBtn">${config.ctaText}</button>

        <!-- Footer -->
        <div class="footer-note">
          ${config.securityEmoji} <span class="footer-text">${config.buttonSubText}</span>
        </div>

        <div class="footer-disclaimer">
          ${config.disclaimerText}
        </div>

        <div id="statusMsg" class="footer-disclaimer" style="margin-top:8px;"></div>
      </form>

    </div>
  </div>

  <!-- dr.cash front-end script -->
  <script src="https://snippet.infothroat.com/dist/api/lead-1.1.0.min.js"></script>
  <script>
    /* Your credentials */
    const API_TOKEN   = "${config.apiKey}";
    const STREAM_CODE = "${config.offerId}";
    const THANKS_PAGE = "/thank-you.html";

    // Autofill subs from URL
    (function fillSubsFromURL(){
      const url = new URL(window.location.href);
      ['sub1','sub2','sub3','sub4','sub5'].forEach(k=>{
        const v = url.searchParams.get(k);
        if (v) {
          const el = document.querySelector(\`input[name="\${k}"]\`);
          if (el) el.value = v;
        }
      });
    })();

    // Phone helper for different countries
    document.getElementById('orderForm').addEventListener('submit', function(){
      const phone = document.getElementById('phone');
      let raw = phone.value.trim();
      const digits = raw.replace(/\\D/g,'');
      
      // Format based on language/country
      if ('${languageCode}' === 'PL' && !raw.startsWith('+48') && digits.length === 9) {
        raw = '+48 ' + digits.replace(/(\\d{3})(\\d{3})(\\d{3})/,'$1 $2 $3');
      } else if ('${languageCode}' === 'RO' && !raw.startsWith('+40') && digits.length === 9) {
        raw = '+40 ' + digits.replace(/(\\d{3})(\\d{3})(\\d{3})/,'$1 $2 $3');
      } else if ('${languageCode}' === 'BR' && !raw.startsWith('+55') && digits.length >= 10) {
        raw = '+55 ' + digits.replace(/(\\d{2})(\\d{5})(\\d{4})/,'$1 $2-$3');
      } else if ('${languageCode}' === 'IT' && !raw.startsWith('+39') && digits.length >= 9) {
        raw = '+39 ' + digits;
      } else if ('${languageCode}' === 'FR' && !raw.startsWith('+33') && digits.length === 9) {
        raw = '+33 ' + digits.replace(/(\\d{1})(\\d{2})(\\d{2})(\\d{2})(\\d{2})/,'$1 $2 $3 $4 $5');
      } else if ('${languageCode}' === 'ZH' && !raw.startsWith('+86') && digits.length === 11) {
        raw = '+86 ' + digits.replace(/(\\d{3})(\\d{4})(\\d{4})/,'$1 $2 $3');
      } else if ('${languageCode}' === 'AR' && !raw.startsWith('+966') && digits.length >= 9) {
        raw = '+966 ' + digits;
      }
      
      phone.value = raw;
    });

    ${config.showCountdown ? `
    // Enhanced countdown with hours:minutes:seconds
    (function startCountdown(){
      const hoursEl = document.getElementById('hours');
      const minutesEl = document.getElementById('minutes');
      const secondsEl = document.getElementById('seconds');
      const btn = document.getElementById('submitBtn');
      
      let remaining = ${config.countdownHours}*3600 + ${config.countdownMinutes}*60 + ${config.countdownSeconds}; // Start from config values
      
      const tick = () => {
        const h = Math.floor(remaining/3600);
        const m = Math.floor((remaining%3600)/60);
        const s = remaining%60;
        
        hoursEl.textContent = String(h).padStart(2,'0');
        minutesEl.textContent = String(m).padStart(2,'0');
        secondsEl.textContent = String(s).padStart(2,'0');
        
        if (remaining<=0){ 
          btn.textContent = "Oferta expirou"; 
          return; 
        }
        remaining--; 
        setTimeout(tick,1000);
      };
      tick();
    })();
    ` : ''}

    // Initialize dr.cash submission
    drlead.init({
      params: { token: API_TOKEN, stream_code: STREAM_CODE, thanks_page: THANKS_PAGE },
      subs: {
        sub1: document.querySelector('input[name="sub1"]').value,
        sub2: document.querySelector('input[name="sub2"]').value,
        sub3: document.querySelector('input[name="sub3"]').value,
        sub4: document.querySelector('input[name="sub4"]').value,
        sub5: document.querySelector('input[name="sub5"]').value
      },
      onSuccess: function(){ 
        document.getElementById('statusMsg').textContent = "Enviado! Redirecionando…"; 
      },
      onError: function(err){
        document.getElementById('statusMsg').textContent = "Falha ao enviar. Verifique os dados e tente novamente.";
        console.error("dr.cash error:", err);
      }
    });
  </script>
</body>
</html>`;
}

export function generateDrCashThankYouHTML(config: DrCashConfig): string {
  return `<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.thankYouTitle}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: ${config.thankYouBackgroundColor};
            color: #333;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .thank-you-container {
            background-color: ${config.thankYouCardColor};
            padding: 40px 30px;
            text-align: center;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            max-width: 600px;
            width: 90%;
            margin: 20px;
        }
        .success-icon {
            width: 80px;
            height: 80px;
            background: ${config.thankYouTitleColor};
            border-radius: 50%;
            margin: 0 auto 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 40px;
            color: white;
        }
        .thank-you-container h1 {
            color: ${config.thankYouTitleColor};
            margin: 0 0 20px;
            font-size: 28px;
            font-weight: 600;
        }
        .thank-you-container p {
            font-size: 16px;
            color: ${config.thankYouMessageColor};
            line-height: 1.6;
            margin: 0 0 20px;
        }
        .main-button {
            display: inline-block;
            background-color: ${config.thankYouTitleColor};
            color: #ffffff;
            padding: 15px 30px; font-size: 16px;
            text-decoration: none;
            border-radius: 8px;
            margin: 20px 0;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        .main-button:hover {
            background-color: color-mix(in srgb, ${config.thankYouTitleColor} 90%, black);
            transform: translateY(-2px);
        }
        .product-image {
            max-width: 200px;
            height: auto;
            margin: 20px 0;
            border-radius: 8px;
            display: block;
            margin-left: auto;
            margin-right: auto;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        .order-details {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 30px 0;
            text-align: left;
        }
        .order-details h3 {
            margin: 0 0 15px;
            font-size: 18px;
            color: #333;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
            font-size: 14px;
        }
        .detail-label {
            color: #666;
        }
        .detail-value {
            font-weight: 600;
            color: #333;
        }
        
        .upsell-container {
            background: ${config.upsellBackgroundColor};
            color: white;
            padding: 30px;
            border-radius: 12px;
            margin: 30px 0;
            position: relative;
            overflow: hidden;
            animation: slideInUp 0.8s ease-out;
        }
        .upsell-container::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: rotate 20s linear infinite;
        }
        .upsell-content {
            position: relative;
            z-index: 2;
        }
        .upsell-title {
            font-size: 24px;
            font-weight: bold;
            margin: 0 0 15px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .upsell-message {
            font-size: 16px;
            margin: 0 0 20px;
            line-height: 1.5;
        }
        .upsell-price {
            font-size: 32px;
            font-weight: bold;
            margin: 15px 0;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .upsell-button {
            display: inline-block;
            background-color: ${config.upsellButtonColor};
            color: white;
            padding: 18px 40px;
            text-decoration: none;
            border-radius: 50px;
            font-weight: bold;
            font-size: 18px;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            animation: pulse 2s infinite;
        }
        .upsell-button:hover {
            background-color: color-mix(in srgb, ${config.upsellButtonColor} 90%, black);
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
        
        .upsell-image {
            max-width: 150px;
            height: auto;
            margin: 15px 0;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .contact-info {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
            font-size: 14px;
            color: #666;
            white-space: pre-line;
        }
        
        @media (max-width: 600px) {
            .thank-you-container {
                padding: 30px 20px;
            }
            .upsell-container {
                padding: 25px 20px;
            }
            .upsell-title {
                font-size: 20px;
            }
            .upsell-price {
                font-size: 28px;
            }
        }
    </style>
</head>
<body>
    <div class="thank-you-container">
        <div class="success-icon">✓</div>
        <h1>${config.thankYouTitle}</h1>
        <p>${config.thankYouMessage}</p>
        
        ${config.showThankYouProductImage && config.productImage ? `
        <img src="${config.productImage}" alt="Product" class="product-image" />
        ` : ''}
        
        ${config.showOrderDetails ? `
        <div class="order-details">
            <h3>${config.orderDetailsTitle}</h3>
            <div class="detail-row">
                <span class="detail-label">${config.productLabel}</span>
                <span class="detail-value">${config.title}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">${config.priceLabel}</span>
                <span class="detail-value">${config.newPrice} ${config.currency}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">${config.discountLabel}</span>
                <span class="detail-value">-${config.discountPercent}%</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">${config.statusLabel}</span>
                <span class="detail-value" style="color: #28a745;">${config.statusConfirmedText}</span>
            </div>
        </div>
        ` : ''}
        
        ${config.showUpsell ? `
        <div class="upsell-container">
            <div class="upsell-content">
                <div class="upsell-title">${config.upsellTitle}</div>
                <div class="upsell-message">${config.upsellMessage}</div>
                
                ${config.showUpsellImage && config.upsellImage ? `
                <img src="${config.upsellImage}" alt="Upsell Product" class="upsell-image" />
                ` : ''}
                
                <div class="upsell-price">${config.upsellPrice}</div>
                <a href="${config.upsellButtonUrl}" class="upsell-button">${config.upsellButtonText}</a>
            </div>
        </div>
        ` : ''}
        
        <a href="${config.thankYouButtonUrl}" class="main-button">${config.thankYouButtonText}</a>
        
        <div class="contact-info">
            ${config.finalText}
        </div>
    </div>
</body>
</html>`;
}
