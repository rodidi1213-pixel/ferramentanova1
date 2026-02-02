import { WebvorkConfig, WEBVORK_LANGUAGES } from "@/types/webvork";

export const generateWebvorkFormHTML = (config: WebvorkConfig, language: string): string => {
  const lang = WEBVORK_LANGUAGES[language] || WEBVORK_LANGUAGES.RO;
  
  const productImageTopHTML = config.showProductImage && config.productImagePosition === "top" && config.productImage
    ? `
      <div class="product-image-top">
        <img src="${config.productImage}" alt="Product" onerror="this.style.display='none'">
      </div>`
    : "";

  const productImageSideHTML = config.showProductImage && config.productImagePosition === "side" && config.productImage
    ? `<img class="price-side-image" src="${config.productImage}" alt="Product" onerror="this.style.display='none'">`
    : "";

  const countdownHTML = config.showCountdown
    ? `
      <div class="timer">
        <span class="timer-box" id="hours">${String(config.countdownHours).padStart(2, "0")}</span>
        <span class="timer-box" id="minutes">${String(config.countdownMinutes).padStart(2, "0")}</span>
        <span class="timer-box" id="seconds">${String(config.countdownSeconds).padStart(2, "0")}</span>
      </div>`
    : "";

  const socialProofHTML = config.showSocialProof
    ? `
      <div class="social-proof">
        <div class="social-item">
          <div class="social-icon icon-people"></div>
          <span>${lang.socialProofText} <span class="social-number">${config.viewingCount}</span> ${language === "RO" ? "persoane" : language === "PL" ? "osób" : language === "RU" ? "человек" : "pessoas"}</span>
          <span class="online-dot">● online</span>
        </div>
        <div class="social-item">
          <div class="social-icon icon-time"></div>
          <span><span class="social-number">${config.salesLastHour}</span> ${lang.salesText}</span>
          <span class="online-dot">● online</span>
        </div>
      </div>`
    : "";

  const countdownScript = config.showCountdown
    ? `
    // Script do contador regressivo
    (function startCountdown(){
      const hoursEl = document.getElementById('hours');
      const minutesEl = document.getElementById('minutes');
      const secondsEl = document.getElementById('seconds');
      
      let remaining = ${config.countdownHours}*3600 + ${config.countdownMinutes}*60 + ${config.countdownSeconds}; 
      
      const tick = () => {
        const h = Math.floor(remaining/3600);
        const m = Math.floor((remaining%3600)/60);
        const s = remaining%60;
        
        hoursEl.textContent = String(h).padStart(2,'0');
        minutesEl.textContent = String(m).padStart(2,'0');
        secondsEl.textContent = String(s).padStart(2,'0');
        
        if (remaining<=0){ return; }
        remaining--; 
        setTimeout(tick,1000);
      };
      tick();
    })();`
    : "";

  const priceContainerClass = config.showProductImage && config.productImagePosition === "side" && config.productImage
    ? "price-container with-side-image"
    : "price-container";

  return `<!doctype html>
<html lang="${language.toLowerCase()}">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>${config.title}</title>
  <style>
    :root{--bg:${config.backgroundColor}; --card:#fff; --border:#e9ecef; --green:#28a745; --green-d:#1e7e34;--red:${config.buttonColor};--red-d:color-mix(in srgb, ${config.buttonColor} 90%, black); --muted:#6c757d; --input-bg:#fff; --input-bd:#ced4da;--text-dark:#212529;--text-light:#6c757d;}
    *{box-sizing:border-box}
    body{background:var(--bg); color:var(--text-dark); font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif}
    .frame{width:100%; max-width:${config.formWidth}px; margin:20px auto; padding:0; background:transparent;}
    .card{background:var(--card); border:1px solid var(--border); border-radius:12px; padding:20px; position:relative; box-shadow:0 2px 10px rgba(0,0,0,0.1);}
    .header{text-align:center; margin:10px 0 20px; padding-top:10px;}
    .header h2{margin:0; font-weight:600; font-size:20px; color:var(--text-dark);}
    .timer{display:flex; justify-content:center; align-items:center; gap:8px; margin:15px 0 20px; font-weight:600; font-size:14px;}
    .timer-box{background:${config.countdownColor}; color:#fff; padding:8px 10px; border-radius:4px; min-width:35px; text-align:center; font-weight:700; font-size:16px;}
    .price-container{margin:20px 0; padding:0 10px;}
    .price-container.with-side-image{display:flex; align-items:center; gap:15px;}
    .price-side-image{width:100px; height:100px; object-fit:contain; border-radius:6px; box-shadow:0 2px 8px rgba(0,0,0,0.1); flex-shrink:0;}
    .price-content{display:flex; justify-content:space-between; align-items:center; flex:1;}
    .price-old .label{color:var(--muted); font-size:12px; margin-bottom:2px;}
    .price-old .amount{color:var(--muted); text-decoration:line-through; font-size:16px;}
    .price-new .label{color:var(--muted); font-size:12px; margin-bottom:2px;}
    .price-new .amount{color:var(--text-dark); font-weight:700; font-size:24px;}
    .social-proof{margin:20px 0; font-size:12px; color:var(--muted);}
    .social-item{display:flex; align-items:center; margin:4px 0;}
    .social-icon{width:12px; height:12px; margin-right:6px; border-radius:50%;}
    .icon-people{background:#007bff;}
    .icon-time{background:#28a745;}
    .social-number{color:var(--text-dark); font-weight:600;}
    .online-dot{color:#28a745; margin-left:auto; animation:pulse 2s infinite;}
    @keyframes pulse{0%{opacity:1;}50%{opacity:0.5;}100%{opacity:1;}}
    .form-group{margin:15px 0;}
    input[type="text"],input[type="tel"]{width:100%; height:50px; padding:12px 16px; background:var(--input-bg); border:1px solid var(--input-bd); border-radius:6px; font-size:16px; outline:none; color:var(--muted);}
    input::placeholder{color:#adb5bd;}
    input:focus{border-color:#80bdff; box-shadow:0 0 0 0.2rem rgba(0,123,255,.25);}
    .btn{width:100%; height:50px; margin:20px 0 15px; border:none; border-radius:25px; background:${config.buttonColor}; color:#fff; font-size:16px; font-weight:700; cursor:pointer; text-transform:uppercase; letter-spacing:0.5px;}
    .btn:hover{background:color-mix(in srgb, ${config.buttonColor} 90%, black);}
    .btn:active{transform:translateY(1px);}
    .footer-note{text-align:center; margin:15px 0 5px;}
    .footer-text{color:var(--muted); font-size:11px; line-height:1.4;}
    .footer-disclaimer{color:var(--muted); font-size:10px; text-align:center; margin-top:10px; line-height:1.3;}
    .product-image-top{display:flex; justify-content:center; margin:20px 0;}
    .product-image-top img{max-width:200px; max-height:200px; object-fit:contain; border-radius:8px; box-shadow:0 4px 15px rgba(0,0,0,0.1);}
    @media(max-width:340px){.card{padding:15px;}.price-container{padding:0 5px;}}
  </style>
</head>
<body>

  <div class="frame">
    <div class="card">
      <div class="header">
        <h2>${config.title}</h2>
      </div>
      ${countdownHTML}
      ${productImageTopHTML}
      <div class="${priceContainerClass}">
        ${productImageSideHTML}
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
      ${socialProofHTML}
      
      <form class="orderForm" id="orderForm" action="/order.php" method="post">
        
        <div class="form-group">
          <input id="name" name="name" type="text" placeholder="${config.namePlaceholder}" required>
        </div>
        <div class="form-group">
          <input id="phone" name="phone" type="tel" inputmode="tel" placeholder="${config.phonePlaceholder}" required>
        </div>
        
        <input type="hidden" name="country" value="${config.country}">
        
        <button type="submit" class="btn" id="submitBtn">${config.ctaText}</button>

        <div class="footer-note">
          ${config.securityEmoji} <span class="footer-text">${config.buttonSubText}</span>
        </div>
        <div class="footer-disclaimer">
          ${config.disclaimerText}
        </div>
      </form>
    </div>
  </div>
  
  <script>
    // Script para preencher os campos ocultos a partir da URL
    (function fillSubsFromURL(){
      const url = new URL(window.location.href);
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(k=>{
        const v = url.searchParams.get(k);
        if (v) {
          const el = document.querySelector(\`input[name="\${k}"]\`);
          if (el) el.value = v;
        }
      });
    })();
    ${countdownScript}
  </script>
</body>
</html>`;
};

export const generateWebvorkOrderPHP = (config: WebvorkConfig): string => {
  return `<?php
const TOKEN = '${config.apiToken || "SUA_API_TOKEN_AQUI"}';
const ENDPOINT1 = 'https://api.webvork.com/v1/new-lead';
const ENDPOINT2 = 'https://api2.webvork.com/v1/new-lead';

function getIp() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) return $_SERVER['HTTP_CLIENT_IP'];
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) return $_SERVER['HTTP_X_FORWARDED_FOR'];
    return $_SERVER['REMOTE_ADDR'] ?? '';
}

function apiWebvorkV1NewLead($data) {
    $ch = curl_init(ENDPOINT1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $result = curl_exec($ch);
    curl_close($ch);

    if ($result) {
        $r = json_decode($result, true);
        // DEBUG: grava resposta para fins de análise
        file_put_contents('retorno_api.txt', $result);

        if ((isset($r['success']) && $r['success']) ||
           (isset($r['status']) && ($r['status']=='ok' || $r['status']===true))) {
            return true;
        }
    }
    // Só tenta endpoint 2 se o primeiro falhar
    $ch = curl_init(ENDPOINT2);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $result = curl_exec($ch);
    curl_close($ch);

    if ($result) {
        $r = json_decode($result, true);
        // DEBUG: grava resposta do endpoint 2
        file_put_contents('retorno_api.txt', $result);

        if ((isset($r['success']) && $r['success']) ||
           (isset($r['status']) && ($r['status']=='ok' || $r['status']===true))) {
            return true;
        }
    }
    return false;
}

if (!empty($_POST)) {
    $data = [
        'token' => TOKEN,
        'offer_id' => '${config.offerId}',
        'name' => !empty($_POST['name']) ? trim($_POST['name']) : '',
        'phone' => !empty($_POST['phone']) ? trim($_POST['phone']) : '',
        'country' => !empty($_POST['country']) ? trim($_POST['country']) : '${config.country}',
        'lang' => '${config.lang}',
        'utm_source' => $_POST['utm_source'] ?? '',
        'utm_medium' => $_POST['utm_medium'] ?? '',
        'utm_campaign' => $_POST['utm_campaign'] ?? '',
        'utm_content' => $_POST['utm_content'] ?? '',
        'utm_term' => $_POST['utm_term'] ?? '',
        'ip' => getIp()
    ];
    if (apiWebvorkV1NewLead($data)) {
        header("Location: success.html");
        exit;
    } else {
        header("Location: error.html");
        exit;
    }
}

if (isset($_GET['health'])) {
    echo "OK";
}
?>`;
};

export const generateWebvorkSuccessHTML = (config: WebvorkConfig): string => {
  const productImageHTML = config.showThankYouProductImage && config.productImage
    ? `<img class="product-image" src="${config.productImage}" alt="Product" onerror="this.parentElement.innerHTML='<div class=\\'product-image-error\\'><span>📷</span><span>Imagem não encontrada</span></div>'">`
    : "";

  const orderDetailsHTML = config.showOrderDetails
    ? `
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
        </div>`
    : "";

  const upsellImageHTML = config.showUpsellImage && config.upsellImage
    ? `<img class="upsell-image" src="${config.upsellImage}" alt="Upsell Product" onerror="this.parentElement.innerHTML='<div class=\\'upsell-image-error\\'><span>📷</span><span>Imagem não encontrada</span></div>'">`
    : "";

  const upsellHTML = config.showUpsell
    ? `
        <div class="upsell-container" style="background: ${config.upsellBackgroundColor};">
            <div class="upsell-content">
                <div class="upsell-title">${config.upsellTitle}</div>
                ${upsellImageHTML}
                <p class="upsell-message">${config.upsellMessage}</p>
                <div class="upsell-price">${config.upsellPrice}</div>
                <a href="${config.upsellButtonUrl}" class="upsell-button" style="background-color: ${config.upsellButtonColor};">${config.upsellButtonText}</a>
            </div>
        </div>`
    : "";

  return `<!DOCTYPE html>
<html lang="${config.lang}">
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
            padding: 15px 30px;
            font-size: 16px;
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
        .product-image-error {
            max-width: 200px;
            height: 150px;
            margin: 20px auto;
            border-radius: 8px;
            background: #f8f9fa;
            border: 2px dashed #dee2e6;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #6c757d;
            font-size: 14px;
            flex-direction: column;
            gap: 8px;
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
        .upsell-image-error {
            max-width: 150px;
            height: 100px;
            margin: 15px auto;
            border-radius: 8px;
            background: rgba(255,255,255,0.2);
            border: 2px dashed rgba(255,255,255,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgba(255,255,255,0.8);
            font-size: 12px;
            flex-direction: column;
            gap: 5px;
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
        
        ${productImageHTML}
        
        ${orderDetailsHTML}
        
        ${upsellHTML}
        
        <a href="${config.thankYouButtonUrl}" class="main-button">${config.thankYouButtonText}</a>
        
        <div class="contact-info">
            ${config.finalText}

${config.contactEmail ? `Dúvidas?
Entre em contato: ${config.contactEmail}` : ""}
        </div>
    </div>
</body>
</html>`;
};
