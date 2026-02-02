import { FormConfig } from "@/types/form-config";

export function generateFormHTML(config: FormConfig): string {
  const currencySymbol = getCurrencySymbol(config.currency);
  
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.productName}</title>
    <style>
        :root {
            --primary: ${config.primaryColor};
            --bg: ${config.backgroundColor};
            --frame-max-width: ${config.formWidth}px;
            --frame-max-width-responsive: ${config.formMaxWidth};
        }
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: var(--bg);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .form-container {
            width: 100%;
            max-width: var(--frame-max-width);
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .form-header {
            background: var(--primary);
            color: white;
            padding: 20px;
            text-align: center;
        }
        
        .headline {
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 8px;
            opacity: 0.9;
        }
        
        .product-name {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 16px;
        }
        
        ${config.productImage ? `.product-image {
            width: 120px;
            height: 120px;
            object-fit: contain;
            margin: 0 auto 16px;
            display: block;
            background: white;
            border-radius: 12px;
            padding: 8px;
        }` : ''}
        
        .price-box {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        
        .old-price {
            font-size: 14px;
            opacity: 0.8;
        }
        
        .old-price span {
            text-decoration: line-through;
        }
        
        .new-price {
            font-size: 32px;
            font-weight: 800;
        }
        
        ${config.showCountdown ? `.countdown {
            display: flex;
            justify-content: center;
            gap: 8px;
            margin-top: 16px;
        }
        
        .countdown-item {
            background: rgba(255,255,255,0.2);
            padding: 8px 12px;
            border-radius: 8px;
            text-align: center;
            min-width: 50px;
        }
        
        .countdown-value {
            font-size: 24px;
            font-weight: 700;
            display: block;
        }
        
        .countdown-label {
            font-size: 10px;
            text-transform: uppercase;
            opacity: 0.8;
        }` : ''}
        
        .form-body {
            padding: 24px;
        }
        
        ${config.showAvailability ? `.availability {
            background: #fef3c7;
            border: 1px solid #fcd34d;
            border-radius: 8px;
            padding: 12px;
            text-align: center;
            margin-bottom: 20px;
            font-size: 14px;
            color: #92400e;
        }
        
        .availability-count {
            font-weight: 700;
            color: #dc2626;
        }` : ''}
        
        .form-group {
            margin-bottom: 16px;
        }
        
        .form-input {
            width: 100%;
            padding: 14px 16px;
            border: 2px solid #e5e7eb;
            border-radius: 10px;
            font-size: 16px;
            transition: border-color 0.2s;
        }
        
        .form-input:focus {
            outline: none;
            border-color: var(--primary);
        }
        
        .submit-btn {
            width: 100%;
            padding: 16px;
            background: var(--primary);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 18px;
            font-weight: 700;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        
        .security-text {
            text-align: center;
            font-size: 13px;
            color: #6b7280;
            margin-top: 16px;
        }
    </style>
</head>
<body>
    <div class="form-container">
        <div class="form-header">
            <div class="headline">${config.headline}</div>
            ${config.productImage ? `<img src="${config.productImage}" alt="${config.productName}" class="product-image">` : ''}
            <div class="product-name">${config.productName}</div>
            <div class="price-box">
                <div class="old-price">${config.oldPriceLabel} <span>${currencySymbol} ${config.oldPrice}</span></div>
                <div class="new-price">${config.newPriceLabel} ${currencySymbol} ${config.newPrice}</div>
            </div>
            ${config.showCountdown ? `
            <div class="countdown" id="countdown">
                <div class="countdown-item">
                    <span class="countdown-value" id="hours">${String(config.countdownHours).padStart(2, '0')}</span>
                    <span class="countdown-label">Horas</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-value" id="minutes">${String(config.countdownMinutes).padStart(2, '0')}</span>
                    <span class="countdown-label">Min</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-value" id="seconds">${String(config.countdownSeconds).padStart(2, '0')}</span>
                    <span class="countdown-label">Seg</span>
                </div>
            </div>` : ''}
        </div>
        
        <form class="form-body" action="${config.formAction}" method="POST">
            ${config.showAvailability ? `
            <div class="availability">
                🔥 <span class="availability-count">${config.availabilityCount}</span> ${config.availabilityText}
            </div>` : ''}
            
            <div class="form-group">
                <input type="text" name="name" class="form-input" placeholder="${config.namePlaceholder}" required>
            </div>
            
            <div class="form-group">
                <input type="tel" name="phone" class="form-input" placeholder="${config.phonePlaceholder}" required>
            </div>
            
            <div class="form-group">
                <input type="text" name="address" class="form-input" placeholder="${config.addressPlaceholder}" required>
            </div>
            
            <div class="form-group">
                <input type="text" name="city" class="form-input" placeholder="${config.cityPlaceholder}" required>
            </div>
            
            <input type="hidden" name="product" value="${config.productName}">
            <input type="hidden" name="price" value="${config.newPrice}">
            
            <button type="submit" class="submit-btn">${config.ctaText}</button>
            
            <div class="security-text">${config.securityText}</div>
        </form>
    </div>
    
    ${config.showCountdown ? `
    <script>
        (function() {
            let hours = ${config.countdownHours};
            let minutes = ${config.countdownMinutes};
            let seconds = ${config.countdownSeconds};
            
            function updateCountdown() {
                if (seconds > 0) {
                    seconds--;
                } else if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                }
                
                document.getElementById('hours').textContent = String(hours).padStart(2, '0');
                document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
                document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
            }
            
            setInterval(updateCountdown, 1000);
        })();
    </script>` : ''}
</body>
</html>`;
}

export function generateThankYouPage(config: FormConfig): string {
  const currencySymbol = getCurrencySymbol(config.currency);
  const { thankYou } = config;
  
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${thankYou.title}</title>
    <style>
        :root {
            --primary: ${thankYou.buttonColor};
            --bg: ${thankYou.backgroundColor};
            --card: ${thankYou.cardColor};
        }
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: var(--bg);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            color: white;
        }
        
        .container {
            max-width: 500px;
            width: 100%;
            text-align: center;
        }
        
        .success-icon {
            width: 80px;
            height: 80px;
            background: var(--primary);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px;
            font-size: 40px;
        }
        
        h1 {
            font-size: 28px;
            margin-bottom: 16px;
        }
        
        .message {
            font-size: 16px;
            opacity: 0.9;
            line-height: 1.6;
            margin-bottom: 32px;
        }
        
        ${thankYou.showOrderDetails ? `.order-card {
            background: var(--card);
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 24px;
            text-align: left;
        }
        
        .order-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 16px;
            padding-bottom: 12px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        
        .order-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            font-size: 14px;
        }
        
        .order-label {
            opacity: 0.7;
        }
        
        .order-value {
            font-weight: 600;
        }
        
        .status-confirmed {
            color: #22c55e;
        }` : ''}
        
        .btn {
            display: inline-block;
            padding: 14px 32px;
            background: var(--primary);
            color: white;
            text-decoration: none;
            border-radius: 10px;
            font-weight: 600;
            font-size: 16px;
            transition: transform 0.2s;
        }
        
        .btn:hover {
            transform: translateY(-2px);
        }
        
        .final-text {
            margin-top: 24px;
            font-size: 14px;
            opacity: 0.8;
            line-height: 1.6;
        }
        
        ${thankYou.showUpsell ? `.upsell-card {
            background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
            border-radius: 12px;
            padding: 24px;
            margin: 24px 0;
        }
        
        .upsell-title {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 12px;
        }
        
        .upsell-message {
            font-size: 14px;
            opacity: 0.9;
            margin-bottom: 16px;
        }
        
        .upsell-btn {
            display: inline-block;
            padding: 12px 24px;
            background: white;
            color: #7c3aed;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 14px;
        }` : ''}
    </style>
</head>
<body>
    <div class="container">
        <div class="success-icon">✓</div>
        <h1>${thankYou.title}</h1>
        <p class="message">${thankYou.message}</p>
        
        ${thankYou.showOrderDetails ? `
        <div class="order-card">
            <div class="order-title">${thankYou.orderDetailsTitle}</div>
            <div class="order-row">
                <span class="order-label">${thankYou.productLabel}</span>
                <span class="order-value">${config.productName}</span>
            </div>
            <div class="order-row">
                <span class="order-label">${thankYou.priceLabel}</span>
                <span class="order-value">${currencySymbol} ${config.newPrice}</span>
            </div>
            <div class="order-row">
                <span class="order-label">${thankYou.statusLabel}</span>
                <span class="order-value status-confirmed">${thankYou.statusConfirmed}</span>
            </div>
        </div>` : ''}
        
        ${thankYou.showUpsell ? `
        <div class="upsell-card">
            <div class="upsell-title">${thankYou.upsellTitle}</div>
            <p class="upsell-message">${thankYou.upsellMessage}</p>
            <a href="${thankYou.upsellButtonUrl}" class="upsell-btn">${thankYou.upsellButtonText}</a>
        </div>` : ''}
        
        <a href="${thankYou.buttonUrl}" class="btn">${thankYou.buttonText}</a>
        
        <p class="final-text">${thankYou.finalText}</p>
    </div>
</body>
</html>`;
}

export function generateSendOrderPHP(config: FormConfig): string {
  return `<?php
// send-order.php - Backend para processar pedidos COD
// Configure suas credenciais abaixo

// Configurações
$telegram_bot_token = "SEU_BOT_TOKEN_AQUI";
$telegram_chat_id = "SEU_CHAT_ID_AQUI";
$success_redirect = "${config.successRedirect}";

// Recebe os dados do formulário
$name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : '';
$phone = isset($_POST['phone']) ? htmlspecialchars($_POST['phone']) : '';
$address = isset($_POST['address']) ? htmlspecialchars($_POST['address']) : '';
$city = isset($_POST['city']) ? htmlspecialchars($_POST['city']) : '';
$product = isset($_POST['product']) ? htmlspecialchars($_POST['product']) : '${config.productName}';
$price = isset($_POST['price']) ? htmlspecialchars($_POST['price']) : '${config.newPrice}';

// Valida campos obrigatórios
if (empty($name) || empty($phone) || empty($address) || empty($city)) {
    die("Erro: Todos os campos são obrigatórios.");
}

// Formata a mensagem para o Telegram
$message = "🛒 *NOVO PEDIDO COD*\\n\\n";
$message .= "📦 *Produto:* $product\\n";
$message .= "💰 *Valor:* ${getCurrencySymbol(config.currency)} $price\\n\\n";
$message .= "👤 *Nome:* $name\\n";
$message .= "📱 *Telefone:* $phone\\n";
$message .= "📍 *Endereço:* $address\\n";
$message .= "🏙️ *Cidade:* $city\\n\\n";
$message .= "⏰ *Data/Hora:* " . date("d/m/Y H:i:s");

// Envia para o Telegram
$telegram_url = "https://api.telegram.org/bot$telegram_bot_token/sendMessage";
$telegram_data = [
    'chat_id' => $telegram_chat_id,
    'text' => $message,
    'parse_mode' => 'Markdown'
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $telegram_url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $telegram_data);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$response = curl_exec($ch);
curl_close($ch);

// Redireciona para a página de obrigado
header("Location: $success_redirect");
exit;
?>`;
}

function getCurrencySymbol(currency: string): string {
  const symbols: Record<string, string> = {
    BRL: "R$",
    EUR: "€",
    USD: "$",
    PLN: "zł",
    RON: "lei",
    BGN: "лв",
    CZK: "Kč",
    HUF: "Ft",
  };
  return symbols[currency] || currency;
}

export { getCurrencySymbol };
