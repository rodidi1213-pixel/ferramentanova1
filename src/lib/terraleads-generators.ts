import { TerraLeadsConfig, TERRALEADS_LANGUAGES } from "@/types/terraleads";

function getButtonBorderRadius(style: TerraLeadsConfig["buttonBorderRadius"]): string {
  const radiusMap = {
    small: "4px",
    medium: "8px",
    large: "12px",
    full: "50px",
  };
  return radiusMap[style] || "12px";
}

function getButtonHeight(size: TerraLeadsConfig["buttonSize"]): string {
  const sizeMap = {
    small: "40px",
    medium: "50px",
    large: "60px",
  };
  return sizeMap[size] || "50px";
}

export function generateTerraLeadsFormHTML(config: TerraLeadsConfig, languageCode: string): string {
  const buttonRadius = getButtonBorderRadius(config.buttonBorderRadius);
  const buttonHeight = getButtonHeight(config.buttonSize);
  const buttonWidth = config.buttonWidth === "full" ? "100%" : "auto";
  const lang = TERRALEADS_LANGUAGES[languageCode] || TERRALEADS_LANGUAGES.RO;

  return `<!doctype html>
<html lang="${languageCode.toLowerCase()}">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>${config.title}</title>
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
    input[type="text"], input[type="tel"]{width:100%; height:50px; padding:12px 16px; background:var(--input-bg); border:1px solid var(--input-bd); border-radius:6px; font-size:16px; outline:none; color:var(--muted);}
    input::placeholder{ color:#adb5bd; }
    input:focus{ border-color:#80bdff; box-shadow:0 0 0 0.2rem rgba(0,123,255,.25); }
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

      <form class="orderForm" id="orderForm" action="${config.domain}/order.php" method="POST">
        
        <div class="form-group">
          <input id="name" name="name" type="text" placeholder="${config.namePlaceholder}" required maxlength="100">
        </div>

        <div class="form-group">
          <input id="phone" name="phone" type="tel" inputmode="tel" placeholder="${config.phonePlaceholder}" required maxlength="20">
        </div>

        <input type="hidden" name="offer_id" value="${config.offerId || 'SEUOFFERIDAQUI'}">
        <input type="hidden" name="country" value="${config.country}">
        <input type="hidden" name="user_agent" id="user_agent" value="">
        <input type="hidden" name="referer" id="referer" value="">
        <input type="hidden" name="utm_source" id="utm_source" value="">
        <input type="hidden" name="utm_medium" id="utm_medium" value="">
        <input type="hidden" name="utm_campaign" id="utm_campaign" value="">
        <input type="hidden" name="utm_content" id="utm_content" value="">
        <input type="hidden" name="utm_term" id="utm_term" value="">
        <input type="hidden" name="sub_id" id="sub_id" value="">
        <input type="hidden" name="sub_id_1" id="sub_id_1" value="">
        <input type="hidden" name="sub_id_2" id="sub_id_2" value="">
        <input type="hidden" name="sub_id_3" id="sub_id_3" value="">
        <input type="hidden" name="sub_id_4" id="sub_id_4" value="">
        
        <button type="submit" class="btn" id="submitBtn">${config.ctaText}</button>

        <div class="footer-note">${config.securityEmoji} <span class="footer-text">${config.securityText}</span></div>
        <div class="footer-disclaimer">${config.disclaimerText}</div>
      </form>
    </div>
  </div>

  <script>
    // Fill hidden tracking fields
    (function fillHiddenFields() {
      try {
        document.getElementById('user_agent').value = navigator.userAgent;
        document.getElementById('referer').value = document.referrer;
        
        const urlParams = new URLSearchParams(window.location.search);
        document.getElementById('utm_source').value = urlParams.get('utm_source') || '';
        document.getElementById('utm_medium').value = urlParams.get('utm_medium') || '';
        document.getElementById('utm_campaign').value = urlParams.get('utm_campaign') || '';
        document.getElementById('utm_content').value = urlParams.get('utm_content') || '';
        document.getElementById('utm_term').value = urlParams.get('utm_term') || '';
        document.getElementById('sub_id').value = urlParams.get('sub_id') || '';
        document.getElementById('sub_id_1').value = urlParams.get('sub_id_1') || '';
        document.getElementById('sub_id_2').value = urlParams.get('sub_id_2') || '';
        document.getElementById('sub_id_3').value = urlParams.get('sub_id_3') || '';
        document.getElementById('sub_id_4').value = urlParams.get('sub_id_4') || '';
      } catch(e) {
        console.error("Error filling hidden fields:", e);
      }
    })();
    
    ${config.showCountdown ? `
    (function startCountdown(){
      const el = {
        h: document.getElementById('hours'),
        m: document.getElementById('minutes'),
        s: document.getElementById('seconds')
      };
      if (!el.h || !el.m || !el.s) return;
      let remaining = ${config.countdownHours}*3600 + ${config.countdownMinutes}*60 + ${config.countdownSeconds}; 
      const tick = () => {
        if (remaining <= 0) return;
        const h = Math.floor(remaining/3600);
        const m = Math.floor((remaining%3600)/60);
        const s = remaining%60;
        el.h.textContent = String(h).padStart(2,'0');
        el.m.textContent = String(m).padStart(2,'0');
        el.s.textContent = String(s).padStart(2,'0');
        remaining--; 
        setTimeout(tick,1000);
      };
      tick();
    })();
    ` : ''}
  </script>
</body>
</html>`;
}

export function generateTerraLeadsOrderPHP(config: TerraLeadsConfig): string {
  return `<?php
// order.php - Terra Leads API Integration
// IMPORTANTE: Esta plataforma requer API Key E User ID

ob_start();

// =======================================================
// 1. CONFIGURAÇÃO (PREENCHA SEUS DADOS AQUI)
// =======================================================

// Sua Chave API secreta (do seu perfil TerraLeads)
$api_key = '${config.apiKey || 'SUA CHAVE API AQUI'}';

// Seu ID de Usuário (do seu perfil TerraLeads)
// CAMPO EXCLUSIVO TERRALEADS - OBRIGATÓRIO
$user_id = '${config.userId || 'SEU USER ID AQUI'}'; // Deve ser um número (integer)

// Sua página de "Obrigado"
$success_page = '${config.domain}/success.html';

// URL da API (não mude)
$api_domain = 'https://t-api.org';
$model = 'lead';
$method = 'create';

// =======================================================
// 2. VERIFICAÇÃO E COLETA DE DADOS
// =======================================================

// Apenas executa se for um POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die('Acesso não autorizado.');
}

// Função para pegar o IP (funciona com Cloudflare)
function get_ip() {
    if (isset($_SERVER["HTTP_CF_CONNECTING_IP"])) {
      return $_SERVER["HTTP_CF_CONNECTING_IP"];
    }
    if(isset($_SERVER['REMOTE_ADDR'])) {
      return $_SERVER['REMOTE_ADDR'];
    }
    return '127.0.0.1';
}

// =======================================================
// 3. MONTAGEM DOS DADOS (JSON)
// =======================================================

// Monta o array 'data' interno, conforme a documentação
$data_payload = [
    'name' => $_POST['name'] ?? 'Cliente',
    'phone' => $_POST['phone'] ?? '',
    'offer_id' => (int)($_POST['offer_id'] ?? 0),
    'country' => $_POST['country'] ?? '${config.country}',
    'user_agent' => $_POST['user_agent'] ?? $_SERVER['HTTP_USER_AGENT'],
    'referer' => $_POST['referer'] ?? '',
    'utm_source' => $_POST['utm_source'] ?? null,
    'utm_medium' => $_POST['utm_medium'] ?? null,
    'utm_campaign' => $_POST['utm_campaign'] ?? null,
    'utm_content' => $_POST['utm_content'] ?? null,
    'utm_term' => $_POST['utm_term'] ?? null,
    'sub_id' => $_POST['sub_id'] ?? null,
    'sub_id_1' => $_POST['sub_id_1'] ?? null,
    'sub_id_2' => $_POST['sub_id_2'] ?? null,
    'sub_id_3' => $_POST['sub_id_3'] ?? null,
    'sub_id_4' => $_POST['sub_id_4'] ?? null,
    'ip_address' => get_ip()
];

// Monta o corpo (body) completo da requisição
// NOTA: user_id é EXCLUSIVO da TerraLeads e vai no corpo principal
$request_body = [
    'user_id' => (int)$user_id,
    'data' => $data_payload
];

// Converte o corpo para JSON
$json_data = json_encode($request_body);

// =======================================================
// 4. AUTENTICAÇÃO E ENVIO (cURL)
// =======================================================

// Cria o check_sum (sha1 do JSON + sua api_key)
$check_sum = sha1($json_data . $api_key);

// Monta a URL final da API com o check_sum
$api_url = $api_domain . '/api/' . $model . '/' . $method . '?check_sum=' . $check_sum;

// Inicia o cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $api_url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Content-Length: ' . strlen($json_data)
]);

$result = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curl_error = curl_error($ch);
curl_close($ch);

// =======================================================
// 5. RESPOSTA E REDIRECIONAMENTO
// =======================================================

// Salva um log para depuração
$log = "Data: " . $json_data . "\\n";
$log .= "Resposta API: " . $result . "\\n";
$log .= "HTTP Code: " . $http_code . "\\n";
$log .= "Curl Error: " . $curl_error . "\\n";
$log .= "-----------------\\n";
file_put_contents('terraleads_log.txt', $log, FILE_APPEND);

// Decodifica a resposta
$response = json_decode($result, true);

// Verifica se o lead foi aceito
if ($http_code == 200 && isset($response['status']) && $response['status'] == 'ok') {
    header('Location: ' . $success_page);
    ob_end_flush();
    exit;
} else {
    header('Location: index.html?error=1');
    ob_end_flush();
    exit;
}
?>`;
}

export function generateTerraLeadsSuccessHTML(config: TerraLeadsConfig, languageCode: string): string {
  const lang = TERRALEADS_LANGUAGES[languageCode] || TERRALEADS_LANGUAGES.RO;
  
  return `<!DOCTYPE html>
<html lang="${languageCode.toLowerCase()}">
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
            opacity: 0.9;
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
        ${config.showUpsellImage ? `
        .upsell-image {
            max-width: 150px;
            height: auto;
            margin: 15px 0;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        ` : ''}
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
            <div class="upsell-content">
                <div class="upsell-title">${config.upsellTitle}</div>
                <div class="upsell-message">${config.upsellMessage}</div>
                ${config.showUpsellImage && config.upsellImage ? `
                <img src="${config.upsellImage}" alt="Upsell Product" class="upsell-image" />
                ` : ''}
                <div class="upsell-price">${config.upsellPrice}</div>
                <a href="${config.upsellButtonUrl || '#'}" class="upsell-button">${config.upsellButtonText}</a>
            </div>
        </div>
        ` : ''}
        
        <a href="${config.thankYouButtonUrl}" class="main-button">${config.thankYouButtonText}</a>
        
        <div class="contact-info">
            ${config.finalText}

${lang.thankYou.contactText.replace('suport@seusite.com', config.contactEmail)}
        </div>
    </div>
</body>
</html>`;
}
