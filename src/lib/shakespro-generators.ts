import { ShakesProConfig, SHAKESPRO_LANGUAGES } from "@/types/shakespro";

export const generateShakesProIndexHtml = (config: ShakesProConfig): string => {
  const lang = SHAKESPRO_LANGUAGES[config.country] || SHAKESPRO_LANGUAGES.RO;
  
  const borderRadiusMap = {
    small: "4px",
    medium: "8px",
    large: "12px",
    full: "25px",
  };
  
  const buttonHeight = {
    small: "40px",
    medium: "50px",
    large: "60px",
  };

  const socialProofOnline = lang.socialProofOnline.replace("{count}", String(config.viewingCount));
  const socialProofSales = lang.socialProofSales.replace("{count}", String(config.salesLastHour));

  return `<!doctype html>
<html lang="${config.country.toLowerCase()}">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>${config.title}</title>
  <style>
    /* Shakes.pro Form Styles */
    :root{--bg:${config.backgroundColor}; --card:#fff; --border:#e9ecef; --green:#28a745; --primary:${config.primaryColor}; --muted:#6c757d; --input-bg:#fff; --input-bd:#ced4da; --text-dark:#212529; --text-light:#6c757d;}
    *{box-sizing:border-box}
    html,body{margin:0}
    body{background:var(--bg); color:var(--text-dark); font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif}
    .frame{width:100%; max-width: ${config.formWidth}px; margin:20px auto; padding:0; background:transparent;}
    .card{background:var(--card); border:1px solid var(--border); border-radius:12px; padding:20px; position:relative; box-shadow:0 2px 10px rgba(0,0,0,0.1);}
    .header{text-align:center; margin:10px 0 20px; padding-top:10px;}
    .header h2{margin:0; font-weight:600; font-size:20px; color:var(--text-dark);}
    ${config.showProductImage && config.productImage ? `
    .product-image{display:block; max-width:200px; height:auto; margin:0 auto 20px; border-radius:8px; box-shadow:0 2px 10px rgba(0,0,0,0.1);}
    ` : ''}
    .timer{display:${config.showCountdown ? 'flex' : 'none'}; justify-content:center; align-items:center; gap:8px; margin:15px 0 20px; font-weight:600; font-size:14px;}
    .timer-box{background:${config.countdownColor}; color:#fff; padding:8px 10px; border-radius:4px; min-width:35px; text-align:center; font-weight:700; font-size:16px;}
    .price-container{margin:20px 0; padding:0 10px;}
    .price-content{display:flex; justify-content:space-between; align-items:center; flex:1;}
    .price-old{text-align:left;}
    .price-old .label{color:var(--muted); font-size:12px; margin-bottom:2px;}
    .price-old .amount{color:var(--muted); text-decoration:line-through; font-size:16px;}
    .price-new{text-align:right;}
    .price-new .label{color:var(--muted); font-size:12px; margin-bottom:2px;}
    .price-new .amount{color:var(--text-dark); font-weight:700; font-size:24px;}
    .social-proof{display:${config.showSocialProof ? 'block' : 'none'}; margin:20px 0; font-size:12px; color:var(--muted);}
    .social-item{display:flex; align-items:center; margin:4px 0;}
    .social-icon{width:12px; height:12px; margin-right:6px; border-radius:50%;}
    .icon-people{ background:#007bff; }
    .icon-time{ background:#28a745; }
    .social-number{ color:var(--text-dark); font-weight:600; }
    .online-dot{color:#28a745; margin-left:auto; animation: pulse 2s infinite;}
    @keyframes pulse {0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; }}
    .form-group{margin:15px 0;}
    input[type="text"], input[type="tel"]{width:100%; height:50px; padding:12px 16px; background:var(--input-bg); border:1px solid var(--input-bd); border-radius:6px; font-size:16px; outline:none; color:var(--muted);}
    input::placeholder{ color:#adb5bd; }
    input:focus{ border-color:#80bdff; box-shadow:0 0 0 0.2rem rgba(0,123,255,.25); }
    .btn{width:${config.buttonWidth === 'full' ? '100%' : 'auto'}; height:${buttonHeight[config.buttonSize]}; margin:20px 0 15px; border:none; border-radius:${borderRadiusMap[config.buttonBorderRadius]}; background:${config.buttonColor}; color:#fff; font-size:16px; font-weight:700; cursor:pointer; text-transform:uppercase; letter-spacing:0.5px; padding:0 30px;}
    .btn:hover{ background:color-mix(in srgb, ${config.buttonColor} 90%, black); }
    .btn:active{ transform:translateY(1px); }
    .footer-note{text-align:center; margin:15px 0 5px;}
    .footer-text{color:var(--muted); font-size:11px; line-height:1.4;}
    .footer-disclaimer{color:var(--muted); font-size:10px; text-align:center; margin-top:10px; line-height:1.3;}
    @media (max-width: 340px){.card{ padding:15px; } .price-container{ padding:0 5px; }}
  </style>
</head>
<body>

  <div class="frame">
    <div class="card">

      <div class="header"><h2>${config.title}</h2></div>
      
      ${config.showProductImage && config.productImage ? `<img src="${config.productImage}" alt="Product" class="product-image" onerror="this.style.display='none'"/>` : ''}
      
      <div class="timer">
        <span class="timer-box" id="hours">${String(config.countdownHours).padStart(2, '0')}</span>
        <span class="timer-box" id="minutes">${String(config.countdownMinutes).padStart(2, '0')}</span>
        <span class="timer-box" id="seconds">${String(config.countdownSeconds).padStart(2, '0')}</span>
      </div>
      
      <div class="price-container">
        <div class="price-content">
          <div class="price-old">
            <div class="label">${lang.oldPriceLabel}</div>
            <div class="amount">${config.oldPrice}</div>
          </div>
          <div class="price-new">
            <div class="label">${lang.newPriceLabel}</div>
            <div class="amount">${config.newPrice}*</div>
          </div>
        </div>
      </div>

      <div class="social-proof">
        <div class="social-item">
          <div class="social-icon icon-people"></div>
          <span>${socialProofOnline}</span>
          <span class="online-dot">● online</span>
        </div>
        <div class="social-item">
          <div class="social-icon icon-time"></div>
          <span>${socialProofSales}</span>
          <span class="online-dot">● online</span>
        </div>
      </div>

      <form class="orderForm" id="orderForm" action="https://${config.domain}/order.php" method="POST">
        
        <div class="form-group">
          <input id="name" name="name" type="text" placeholder="${config.namePlaceholder}" required>
        </div>

        <div class="form-group">
          <input id="phone" name="phone" type="tel" inputmode="tel" placeholder="${config.phonePlaceholder}" required>
        </div>

        <input type="hidden" name="offer_id" value="${config.offerId}">
        
        <input type="hidden" name="country" value="${config.country}">

        <input type="hidden" name="landing_id" value="${config.landingId}">

        <input type="hidden" name="sub1" id="sub1">
        <input type="hidden" name="sub2" id="sub2">
        <input type="hidden" name="sub3" id="sub3">
        <input type="hidden" name="sub4" id="sub4">
        <input type="hidden" name="sub5" id="sub5">

        <button type="submit" class="btn" id="submitBtn">${config.ctaText}</button>

        <div class="footer-note">
          ${config.securityEmoji} <span class="footer-text">${config.securityText}</span>
        </div>

        <div class="footer-disclaimer">
          ${config.disclaimerText}
        </div>
      </form>

    </div>
  </div>

  <script>
    // Fill subs from URL
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

    // Countdown Timer
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
        if (remaining<=0) return;
        remaining--; 
        setTimeout(tick,1000);
      };
      tick();
    })();
  </script>
</body>
</html>`;
};

export const generateShakesProSuccessHtml = (config: ShakesProConfig): string => {
  const lang = SHAKESPRO_LANGUAGES[config.country] || SHAKESPRO_LANGUAGES.RO;

  return `<!DOCTYPE html>
<html lang="${config.country.toLowerCase()}">
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
        .order-details {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 30px 0;
            text-align: left;
            display: ${config.showOrderDetails ? 'block' : 'none'};
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
            display: ${config.showUpsell ? 'block' : 'none'};
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
        
        ${config.showThankYouProductImage && config.productImage ? `<img src="${config.productImage}" alt="Product" class="product-image" onerror="this.style.display='none'"/>` : ''}
        
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
        
        <div class="upsell-container">
            <div class="upsell-content">
                <h2 class="upsell-title">${config.upsellTitle}</h2>
                <p class="upsell-message">${config.upsellMessage}</p>
                ${config.showUpsellImage && config.upsellImage ? `<img src="${config.upsellImage}" alt="Upsell" class="upsell-image" onerror="this.style.display='none'"/>` : ''}
                <div class="upsell-price">${config.upsellPrice}</div>
                <a href="${config.upsellButtonUrl}" class="upsell-button">${config.upsellButtonText}</a>
            </div>
        </div>
        
        <a href="${config.thankYouButtonUrl}" class="main-button">${config.thankYouButtonText}</a>
        
        <div class="contact-info">
            ${config.finalText}

${lang.thankYou.contactText}${config.contactEmail}
        </div>
    </div>
</body>
</html>`;
};

export const generateShakesProOrderPhp = (config: ShakesProConfig): string => {
  return `<?php
// Shakes.pro Order Processing Script
// This script handles form submissions and redirects to success page

header('Content-Type: application/json');

// --- Configuration ---
$domain = '${config.domain}'; // Your domain name
$successPage = 'success.html'; // Your success page URL

// --- Get form data ---
$name = $_POST['name'] ?? '';
$phone = $_POST['phone'] ?? '';
$offerId = $_POST['offer_id'] ?? '${config.offerId}';
$country = $_POST['country'] ?? '${config.country}';
$landingId = $_POST['landing_id'] ?? '${config.landingId}';

// Sub IDs for tracking
$sub1 = $_POST['sub1'] ?? '';
$sub2 = $_POST['sub2'] ?? '';
$sub3 = $_POST['sub3'] ?? '';
$sub4 = $_POST['sub4'] ?? '';
$sub5 = $_POST['sub5'] ?? '';

// --- Basic Validation ---
if (empty($name) || empty($phone)) {
    // Return error or redirect to error page
    header("Location: error.html"); 
    exit;
}

// --- Prepare data for Shakes.pro API ---
$postData = [
    'name' => $name,
    'phone' => $phone,
    'offer_id' => $offerId,
    'country' => $country,
    'landing_id' => $landingId,
    'sub1' => $sub1,
    'sub2' => $sub2,
    'sub3' => $sub3,
    'sub4' => $sub4,
    'sub5' => $sub5,
    'ip' => $_SERVER['REMOTE_ADDR'] ?? '',
    'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
];

// --- Send to Shakes.pro API ---
// Uncomment and configure the API endpoint when ready
/*
$apiUrl = 'https://api.shakes.pro/v1/order';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/x-www-form-urlencoded',
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Log response for debugging
file_put_contents('shakespro_log.txt', date('Y-m-d H:i:s') . " - Response: " . $response . "\\n", FILE_APPEND);
*/

// --- Logging (Optional) ---
$logData = [
    'name' => $name,
    'phone' => $phone,
    'offer_id' => $offerId,
    'country' => $country,
    'landing_id' => $landingId,
    'sub1' => $sub1,
    'sub2' => $sub2,
    'sub3' => $sub3,
    'sub4' => $sub4,
    'sub5' => $sub5,
    'ip_address' => $_SERVER['REMOTE_ADDR'] ?? 'N/A',
    'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'N/A',
    'timestamp' => date('Y-m-d H:i:s')
];
// file_put_contents('shakespro_orders.log', json_encode($logData) . PHP_EOL, FILE_APPEND);

// --- Redirect to success page ---
header("Location: " . $successPage);
exit;

?>`;
};
