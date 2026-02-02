import { AdComboConfig, ADCOMBO_LANGUAGES } from "@/types/adcombo";

function getButtonBorderRadius(style: AdComboConfig["buttonBorderRadius"]): string {
  const radiusMap = {
    small: "4px",
    medium: "8px",
    large: "12px",
    full: "50px",
  };
  return radiusMap[style] || "12px";
}

function getButtonHeight(size: AdComboConfig["buttonSize"]): string {
  const sizeMap = {
    small: "40px",
    medium: "50px",
    large: "60px",
  };
  return sizeMap[size] || "50px";
}

export function generateAdComboFormHTML(config: AdComboConfig, languageCode: string): string {
  const buttonRadius = getButtonBorderRadius(config.buttonBorderRadius);
  const buttonHeight = getButtonHeight(config.buttonSize);
  const buttonWidth = config.buttonWidth === "full" ? "100%" : "auto";
  const lang = ADCOMBO_LANGUAGES[languageCode] || ADCOMBO_LANGUAGES.RO;

  return `<!DOCTYPE html>
<html lang="${languageCode.toLowerCase()}">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>${config.title}</title>
  <style>
    :root{
      --bg: ${config.backgroundColor};
      --card: #fff;
      --border: #e9ecef;
      --green: #28a745;
      --green-d: #1e7e34;
      --primary: ${config.primaryColor};
      --button-bg: ${config.buttonColor};
      --button-bg-hover: color-mix(in srgb, ${config.buttonColor} 90%, black);
      --countdown-color: ${config.countdownColor};
      --muted: #6c757d;
      --input-bg: #fff;
      --input-bd: #ced4da;
      --text-dark: #212529;
      --text-light: #6c757d;
      --frame-max-width: ${config.formWidth}px;
      --frame-max-width-responsive: ${config.formMaxWidth};
      --input-h: 44px;
      --btn-h: ${buttonHeight};
      --fs-base: 15px;
    }
    
    * { box-sizing: border-box; }
    html, body { margin: 0; }
    
    body {
      background: var(--bg);
      color: var(--text-dark);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: var(--fs-base);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px 0;
    }
    
    .frame {
      width: 100%;
      max-width: var(--frame-max-width);
      margin: 16px auto;
      padding: 0;
      background: transparent;
      min-height: auto;
    }
    
    @media (max-width: 420px) {
      .frame {
        max-width: var(--frame-max-width-responsive);
        margin: 10px auto;
        padding: 0 10px;
      }
    }
    
    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 20px;
      position: relative;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      min-height: auto;
    }
    
    .header {
      text-align: center;
      margin: 10px 0 20px;
      padding-top: 10px;
    }
    
    .header h2 {
      margin: 0;
      font-weight: 600;
      font-size: 22px;
      color: var(--text-dark);
      line-height: 1.3;
    }
    
    .timer {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      margin: 15px 0 20px;
      font-weight: 600;
      font-size: 14px;
    }
    
    .timer-box {
      background: var(--countdown-color);
      color: #fff;
      padding: 8px 10px;
      border-radius: 6px;
      min-width: 35px;
      text-align: center;
      font-weight: 700;
      font-size: 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }
    
    .product-image-top {
      display: flex;
      justify-content: center;
      margin: 20px 0;
    }
    .product-image-top img {
      max-width: 200px;
      max-height: 200px;
      object-fit: contain;
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }
    
    .price-container {
      margin: 20px 0;
      padding: 0 10px;
    }
    .price-container.with-side-image {
      display: flex;
      align-items: center;
      gap: 15px;
    }
    .price-side-image {
      width: 100px;
      height: 100px;
      object-fit: contain;
      border-radius: 6px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      flex-shrink: 0;
    }
    .price-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex: 1;
    }
    
    .price-old .label,
    .price-new .label {
      color: var(--muted);
      font-size: 12px;
      margin-bottom: 4px;
      font-weight: 500;
    }
    
    .price-old .amount {
      color: var(--muted);
      text-decoration: line-through;
      font-size: 16px;
      font-weight: 500;
    }
    
    .price-new .amount {
      color: var(--primary);
      font-weight: 700;
      font-size: 24px;
    }
    
    .social-proof {
      margin: 20px 0;
      font-size: 12px;
      color: var(--muted);
    }
    
    .social-item {
      display: flex;
      align-items: center;
      margin: 6px 0;
    }
    
    .social-icon {
      width: 12px;
      height: 12px;
      margin-right: 8px;
      border-radius: 50%;
    }
    
    .icon-people { background: #007bff; }
    .icon-time { background: #28a745; }
    
    .social-number {
      color: var(--text-dark);
      font-weight: 600;
    }
    
    .online-dot {
      color: #28a745;
      margin-left: auto;
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.5; }
      100% { opacity: 1; }
    }
    
    .form-group {
      margin: 15px 0;
    }
    
    input[type="text"],
    input[type="tel"] {
      width: 100%;
      height: var(--input-h);
      padding: 12px 16px;
      background: var(--input-bg);
      border: 1px solid var(--input-bd);
      border-radius: 8px;
      font-size: 15px;
      outline: none;
      color: var(--text-dark);
      transition: all 0.3s ease;
    }
    
    input::placeholder {
      color: #adb5bd;
    }
    
    input:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
    }
    
    .btn {
      width: ${buttonWidth};
      border: none;
      background: var(--button-bg);
      color: #fff;
      font-weight: 700;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      margin: 20px 0 15px;
      border-radius: ${buttonRadius};
      height: ${buttonHeight};
      font-size: 16px;
      padding: 12px 24px;
    }
    
    .btn:hover {
      background: var(--button-bg-hover);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0,0,0,0.3);
    }
    
    .btn:active {
      transform: translateY(0);
    }
    
    .btn:disabled {
      background: #ccc;
      cursor: not-allowed;
      transform: none;
    }
    
    .footer-note {
      text-align: center;
      margin: 15px 0 8px;
      font-size: 13px;
    }
    
    .footer-text {
      color: var(--muted);
      font-weight: 500;
    }
    
    .footer-disclaimer {
      color: var(--muted);
      font-size: 11px;
      text-align: center;
      margin-top: 10px;
      line-height: 1.4;
    }
    
    #statusMsg {
      min-height: 14px;
      color: var(--primary);
      font-weight: 600;
      font-size: 12px;
    }
    
    .card {
      animation: slideInUp 0.6s ease-out;
    }
    
    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @media (max-width: 480px) {
      .card {
        padding: 16px;
      }
      
      .header h2 {
        font-size: 20px;
      }
      
      .price-new .amount {
        font-size: 22px;
      }
      
      .timer-box {
        padding: 6px 8px;
        font-size: 14px;
        min-width: 30px;
      }
      
      .price-container.with-side-image {
        gap: 10px;
      }
      
      .price-side-image {
        width: 80px;
        height: 80px;
      }
    }
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

      <form action="${config.baseUrl}/sendorder.php" method="post">
        <div class="form-group">
          <input name="name" type="text" placeholder="${config.namePlaceholder}" required/>
        </div>

        <div class="form-group">
          <input class="only_number" name="phone" type="text" placeholder="${config.phonePlaceholder}" required/>
        </div>

        <!-- AdCombo Hidden Fields -->
        <input type='hidden' name='country_code' value='${config.countryCode}'>
        <input type='hidden' name='offer_id' value='${config.offerId}'>
        <input type='hidden' name='base_url' value='${config.baseUrl}'>
        <input type='hidden' name='price' value='${config.newPrice}'>
        <input type='hidden' name='success_page' value='${config.successPage}'>

        <button class="btn submit-form" type="submit">${config.ctaText}</button>

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
    ${config.showCountdown ? `
    function startCountdown() {
      const hoursEl = document.getElementById('hours');
      const minutesEl = document.getElementById('minutes');
      const secondsEl = document.getElementById('seconds');
      
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
    }
    
    document.addEventListener('DOMContentLoaded', startCountdown);
    ` : ''}
    
    // Form validation and formatting
    document.querySelector('form').addEventListener('submit', function(e) {
      const nameInput = document.querySelector('input[name="name"]');
      const phoneInput = document.querySelector('input[name="phone"]');
      
      if (!nameInput.value.trim()) {
        e.preventDefault();
        alert('Por favor, preencha seu nome.');
        nameInput.focus();
        return;
      }
      
      if (!phoneInput.value.trim()) {
        e.preventDefault();
        alert('Por favor, preencha seu telefone.');
        phoneInput.focus();
        return;
      }
      
      document.getElementById('statusMsg').textContent = 'Processando...';
      document.querySelectorAll('.btn').forEach(btn => btn.disabled = true);
    });
    
    // Phone formatting based on country
    document.querySelector('input[name="phone"]') && document.querySelector('input[name="phone"]').addEventListener('input', function(e) {
      let value = e.target.value.replace(/\\D/g, '');
      
      if ('${config.countryCode}' === 'BR' && value.length <= 11) {
        if (value.length <= 10) {
          value = value.replace(/(\\d{2})(\\d{4})(\\d{4})/,'($1) $2-$3');
        } else {
          value = value.replace(/(\\d{2})(\\d{5})(\\d{4})/,'($1) $2-$3');
        }
      } else if ('${config.countryCode}' === 'MX' && value.length <= 10) {
        value = value.replace(/(\\d{3})(\\d{3})(\\d{4})/,'$1 $2 $3');
      }
      
      e.target.value = value;
    });
  </script>
</body>
</html>`;
}

export function generateAdComboThankYouHTML(config: AdComboConfig): string {
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

Dúvidas?
Entre em contato: ${config.contactEmail}
        </div>
    </div>
</body>
</html>`;
}

export function generateAdComboSendOrderPHP(config: AdComboConfig): string {
  return `<?php
/**
 * AdCombo SendOrder Script
 * Integração com API AdCombo para envio de pedidos
 * 
 * INSTRUÇÕES:
 * 1. Substitua YOUR_API_KEY_HERE pela sua chave de API da AdCombo
 * 2. Faça upload deste arquivo para seu servidor como sendorder.php
 * 3. Configure o formulário HTML para enviar para este arquivo
 */

const API_URL = "https://api.adcombo.com/api/v2/order/create/";
const API_KEY = "${config.apiKey || 'YOUR_API_KEY_HERE'}";

// Recebe os dados do formulário
$args = [
    'api_key' => API_KEY,
    'name' => $_POST['name'],
    'phone' => $_POST['phone'],
    'offer_id' => $_POST['offer_id'],
    'country_code' => $_POST['country_code'],
    'price' => $_POST['price'],
    'base_url' => $_POST['base_url'],
    'ip' => $_SERVER['REMOTE_ADDR'],
];

// Monta a URL com os parâmetros
$url = API_URL . '?' . http_build_query($args);

// Inicializa cURL
$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_SSL_VERIFYPEER => true
));

// Executa a requisição
$res = curl_exec($curl);
$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
curl_close($curl);

// Processa a resposta
$res = json_decode($res, true);

if ($res['code'] == 'ok') {
    // Sucesso - redireciona para página de obrigado
    header('Location: ' . $_POST['success_page']);
    exit;
} else {
    // Erro - exibe mensagem
    echo "Erro ao processar pedido: " . ($res['error'] ?? 'Erro desconhecido');
    echo "<br><br><a href='javascript:history.back()'>Voltar e tentar novamente</a>";
}

?>`;
}
