import { NetvorkConfig, NETVORK_LANGUAGES } from "@/types/netvork";

function getButtonBorderRadius(style: NetvorkConfig["buttonBorderRadius"]): string {
  const radiusMap = {
    small: "4px",
    medium: "8px",
    large: "12px",
    full: "50px",
  };
  return radiusMap[style] || "12px";
}

function getButtonHeight(size: NetvorkConfig["buttonSize"]): string {
  const sizeMap = {
    small: "40px",
    medium: "50px",
    large: "60px",
  };
  return sizeMap[size] || "50px";
}

export function generateNetvorkFormHTML(config: NetvorkConfig, languageCode: string): string {
  const buttonRadius = getButtonBorderRadius(config.buttonBorderRadius);
  const buttonHeight = getButtonHeight(config.buttonSize);
  const buttonWidth = config.buttonWidth === "full" ? "100%" : "auto";
  const lang = NETVORK_LANGUAGES[languageCode] || NETVORK_LANGUAGES.RO;

  return `<!doctype html>
<html lang="${config.lang}">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>${config.title}</title>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
  <style>
    :root{
      --bg: ${config.backgroundColor};
      --card: #fff;
      --border: #e9ecef;
      --green: #28a745;
      --primary: ${config.primaryColor};
      --button-bg: ${config.buttonColor};
      --countdown-color: ${config.countdownColor};
      --muted: #6c757d;
      --input-bg: #fff;
      --input-bd: #ced4da;
      --text-dark: #212529;
      --text-light: #6c757d;
    }
    *{box-sizing:border-box}
    html,body{margin:0}
    body{background:var(--bg); color:var(--text-dark); font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif}
    .frame{width:100%; max-width: ${config.formWidth}px; margin:20px auto; padding:0; background:transparent;}
    .card{background:var(--card); border:1px solid var(--border); border-radius:12px; padding:20px; position:relative; box-shadow:0 2px 10px rgba(0,0,0,0.1);}
    .header{text-align:center; margin:10px 0 20px; padding-top:10px;}
    .header h2{margin:0; font-weight:600; font-size:20px; color:var(--text-dark);}
    .timer{display:flex; justify-content:center; align-items:center; gap:8px; margin:15px 0 20px; font-weight:600; font-size:14px;}
    .timer-box{background:var(--countdown-color); color:#fff; padding:8px 10px; border-radius:4px; min-width:35px; text-align:center; font-weight:700; font-size:16px;}
    
    .product-image-top{display:flex; justify-content:center; margin:20px 0;}
    .product-image-top img{max-width:200px; max-height:200px; object-fit:contain; border-radius:8px; box-shadow:0 4px 15px rgba(0,0,0,0.1);}
    
    .price-container{margin:20px 0; padding:0 10px;}
    .price-container.with-side-image{display:flex; align-items:center; gap:15px;}
    .price-side-image{width:100px; height:100px; object-fit:contain; border-radius:6px; box-shadow:0 2px 8px rgba(0,0,0,0.1); flex-shrink:0;}
    .price-content{display:flex; justify-content:space-between; align-items:center; flex:1;}
    
    .price-old .label, .price-new .label{color:var(--muted); font-size:12px; margin-bottom:2px;}
    .price-old .amount{color:var(--muted); text-decoration:line-through; font-size:16px;}
    .price-new .amount{color:var(--primary); font-weight:700; font-size:24px;}
    .social-proof{margin:20px 0; font-size:12px; color:var(--muted);}
    .social-item{display:flex; align-items:center; margin:4px 0;}
    .social-icon{width:12px; height:12px; margin-right:6px; border-radius:50%;}
    .icon-people{ background:#007bff; }
    .icon-time{ background:#28a745; }
    .social-number{ color:var(--text-dark); font-weight:600; }
    .online-dot{color:#28a745; margin-left:auto; animation: pulse 2s infinite;}
    @keyframes pulse {0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; }}
    .form-group{margin:15px 0;}
    input[type="text"], input[type="tel"], .form-select {width:100%; height:50px; padding:12px 16px; background:var(--input-bg); border:1px solid var(--input-bd); border-radius:6px; font-size:16px; outline:none; color:var(--muted);}
    input::placeholder{ color:#adb5bd; }
    input:focus, .form-select:focus { border-color:#80bdff; box-shadow:0 0 0 0.2rem rgba(0,123,255,.25); }
    .btn{width:${buttonWidth}; height:${buttonHeight}; margin:20px 0 15px; border:none; border-radius:${buttonRadius}; background:var(--button-bg); color:#fff; font-size:16px; font-weight:700; cursor:pointer; text-transform:uppercase; letter-spacing:0.5px;}
    .btn:hover{ background:color-mix(in srgb, var(--button-bg) 90%, black); }
    .btn:active{ transform:translateY(1px); }
    .footer-note{text-align:center; margin:15px 0 5px;}
    .footer-text{color:var(--muted); font-size:11px; line-height:1.4;}
    .footer-disclaimer{color:var(--muted); font-size:10px; text-align:center; margin-top:10px; line-height:1.3;}
    @media (max-width: 340px){.card{ padding:15px; }.price-container{ padding:0 5px; }.price-container.with-side-image{ gap:10px; }.price-side-image{ width:80px; height:80px; }}
  </style>
</head>
<body>

  <div class="frame">
    <div class="card">

      <div class="header">
        <h2>${config.title}</h2>
      </div>
      
      ${config.showCountdown ? `
      <div class="timer">
        <span class="timer-box" id="hours">${String(config.countdownHours).padStart(2, '0')}</span>
        <span class="timer-box" id="minutes">${String(config.countdownMinutes).padStart(2, '0')}</span>
        <span class="timer-box" id="seconds">${String(config.countdownSeconds).padStart(2, '0')}</span>
      </div>
      ` : ''}
      
      ${config.showProductImage && config.productImage && config.productImagePosition === 'top' ? `
      <div class="product-image-top">
        <img src="${config.productImage}" alt="Product" />
      </div>
      ` : ''}
      
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
      <div class="social-proof">
        <div class="social-item">
          <div class="social-icon icon-people"></div>
          <span>${lang.socialProofText} <span class="social-number">${config.viewingCount}</span> ${lang.socialProofOnline}</span>
          <span class="online-dot">● online</span>
        </div>
        <div class="social-item">
          <div class="social-icon icon-time"></div>
          <span><span class="social-number">${config.salesLastHour}</span> ${lang.salesText}</span>
          <span class="online-dot">● online</span>
        </div>
      </div>
      ` : ''}

      <form action="${config.domain}/order.php" method="POST" autocomplete="on">
        
        <div class="form-group">
          <input required type="text" name="name" placeholder="${config.namePlaceholder}" />
        </div>

        <div class="form-group">
          <input type="tel" name="phone" placeholder="${config.phonePlaceholder}" minlength="5" required />
        </div>
        
        ${config.showCountrySelect ? `
        <div class="form-group">
          <select class="form-select" name="country" required>
            <option value="${config.defaultCountry}" selected>${config.defaultCountry}</option>
            <option value="US">🇺🇸 United States</option>
            <option value="RO">🇷🇴 Romania</option>
            <option value="PL">🇵🇱 Poland</option>
            <option value="BR">🇧🇷 Brazil</option>
            <option value="RU">🇷🇺 Russia</option>
          </select>
        </div>
        ` : `<input type="hidden" name="country" value="${config.defaultCountry}">`}

        <input type="hidden" name="offer_id" value="${config.offerId || 'OFFER_ID_AQUI'}">
        <input type="hidden" name="lang" value="${config.lang}">
        <input type="hidden" name="utm_source" value="${config.utmSource}">
        <input type="hidden" name="utm_medium" value="${config.utmMedium}">
        <input type="hidden" name="utm_campaign" value="${config.utmCampaign}">
        <input type="hidden" name="utm_content" value="${config.utmContent}">
        <input type="hidden" name="utm_term" value="${config.utmTerm}">
        
        <button type="submit" class="btn">
          <i class="fas fa-check-circle"></i> ${config.ctaText}
        </button>

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
  
  <script>
    document.addEventListener('DOMContentLoaded', function() {
        const card = document.querySelector('.card');
        card.style.opacity = '0';
        card.style.transform = 'translateY(15px)';
        setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);

        const inputs = document.querySelectorAll('input[required], select[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim() === '') {
                    this.style.borderColor = '#f44336';
                } else {
                    this.style.borderColor = '#80bdff';
                }
            });
        });

        ${config.showCountdown ? `
        (function startCountdown(){
            const hoursEl = document.getElementById('hours'), minutesEl = document.getElementById('minutes'), secondsEl = document.getElementById('seconds');
            if (!hoursEl || !minutesEl || !secondsEl) return;
            let totalSeconds = ${config.countdownHours} * 3600 + ${config.countdownMinutes} * 60 + ${config.countdownSeconds};
            function updateDisplay() {
                if (totalSeconds <= 0) {
                    hoursEl.textContent = '00';
                    minutesEl.textContent = '00';
                    secondsEl.textContent = '00';
                    return;
                }
                const hours = Math.floor(totalSeconds / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                const seconds = totalSeconds % 60;
                hoursEl.textContent = String(hours).padStart(2, '0');
                minutesEl.textContent = String(minutes).padStart(2, '0');
                secondsEl.textContent = String(seconds).padStart(2, '0');
                totalSeconds--;
                setTimeout(updateDisplay, 1000);
            }
            updateDisplay();
        })();
        ` : ''}
        
    });
  </script>
</body>
</html>`;
}

export function generateNetvorkOrderPHP(config: NetvorkConfig): string {
  return `<?php

const TOKEN = '${config.apiToken || 'SUA API KEY AQUI'}'; // SEU TOKEN
const ENDPOINT_1 = 'https://api.netvork.net/v1/new-lead';
const ENDPOINT_2 = 'https://api2.netvork.net/v1/new-lead';

function getIp()
{
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        return $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $arIp = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
        return $arIp[0];
    } elseif (!empty($_SERVER['REMOTE_ADDR'])) {
        return $_SERVER['REMOTE_ADDR'];
    }
    return '';
}

function checkUserAgent()
{
    if (
        empty($_SERVER['HTTP_USER_AGENT'])
        || !preg_match('/Windows|Mac|Linux|Android|iPad|iPhone/i', $_SERVER['HTTP_USER_AGENT'])
    ) {
        die();
    }
}

function apinetvorkV1NewLead($data)
{
    $endpoints = [
        ENDPOINT_1,
        ENDPOINT_2
    ];
    foreach ($endpoints as $endpoint) {
        $ch = curl_init($endpoint);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 20);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/x-www-form-urlencoded'
        ]);
        $response = curl_exec($ch);
        $error = curl_error($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($response !== false && $http_code == 200) {
            $json = json_decode($response, true);
            if (isset($json['status'])) {
                return true;
            }
        }
    }
    return false;
}

if (!empty($_POST)) {
    checkUserAgent();

    $data = array(
        'token' => TOKEN,
        'offer_id' => !empty($_POST['offer_id']) ? trim($_POST['offer_id']) : '',
        'name' => !empty($_POST['name']) ? trim($_POST['name']) : '',
        'phone' => !empty($_POST['phone']) ? trim($_POST['phone']) : '',
        'country' => !empty($_POST['country']) ? trim($_POST['country']) : '',
        'lang' => !empty($_POST['lang']) ? trim($_POST['lang']) : '',
        'utm_source' => !empty($_POST['utm_source']) ? trim($_POST['utm_source']) : '',
        'utm_medium' => !empty($_POST['utm_medium']) ? trim($_POST['utm_medium']) : '',
        'utm_campaign' => !empty($_POST['utm_campaign']) ? trim($_POST['utm_campaign']) : '',
        'utm_content' => !empty($_POST['utm_content']) ? trim($_POST['utm_content']) : '',
        'utm_term' => !empty($_POST['utm_term']) ? trim($_POST['utm_term']) : '',
        'ip' => getIp(),
    );

    // Basic validation
    if (empty($data['token']) || empty($data['offer_id']) || empty($data['phone']) || empty($data['country'])) {
        header("Location: error.html");
        die();
    }

    $count = 3;
    while ($count--) {
        if (apinetvorkV1NewLead($data)) {
            header("Location: success.html");
            die();
        } else {
            sleep(2);
        }
    }
    
    // If all attempts failed
    header("Location: error.html");
    die();
}

// Health check endpoint (optional)
if (isset($_GET['health'])) {
    echo json_encode(['status' => 'ok']);
    exit;
}

?>`;
}

export function generateNetvorkSuccessHTML(config: NetvorkConfig): string {
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
            opacity: 0.9;
            transform: translateY(-2px);
        }
        ${config.showThankYouProductImage ? `
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
        ` : ''}
        ${config.showOrderDetails ? `
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
        ` : ''}
        ${config.showUpsell ? `
        .upsell-container {
            background: ${config.upsellBackgroundColor};
            color: white;
            padding: 30px;
            border-radius: 12px;
            margin: 30px 0;
            position: relative;
            overflow: hidden;
        }
        .upsell-title {
            font-size: 24px;
            font-weight: bold;
            margin: 0 0 15px;
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
        }
        .upsell-button:hover {
            opacity: 0.9;
            transform: translateY(-3px);
        }
        ${config.showUpsellImage ? `
        .upsell-image {
            max-width: 150px;
            height: auto;
            margin: 15px 0;
            border-radius: 8px;
        }
        ` : ''}
        ` : ''}
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
            ${config.showUpsell ? `
            .upsell-container {
                padding: 25px 20px;
            }
            .upsell-title {
                font-size: 20px;
            }
            .upsell-price {
                font-size: 28px;
            }
            ` : ''}
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
            <div class="upsell-title">${config.upsellTitle}</div>
            <p class="upsell-message">${config.upsellMessage}</p>
            ${config.showUpsellImage && config.upsellImage ? `
            <img src="${config.upsellImage}" alt="Upsell Product" class="upsell-image" />
            ` : ''}
            <div class="upsell-price">${config.upsellPrice}</div>
            <a href="${config.upsellButtonUrl}" class="upsell-button">${config.upsellButtonText}</a>
        </div>
        ` : ''}
        
        <a href="${config.thankYouButtonUrl}" class="main-button">${config.thankYouButtonText}</a>
        
        <div class="contact-info">
            ${config.finalText}

Dúvidas?
Entre em contato: ${config.contactEmail}
        </div>
    </div>
</body>
</html>`;
}
