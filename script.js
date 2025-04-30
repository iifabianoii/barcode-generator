function generateBarcode() {
    let baseNumber = Math.floor(Math.random() * 999999999999); // Gera um número de 12 dígitos
    let checkDigit = calculateCheckDigit(baseNumber); // Calcula o dígito verificador
    let barcode = baseNumber.toString().padStart(12, '0') + checkDigit; // Monta o código completo
    document.getElementById("barcode").textContent = barcode;
}

function calculateCheckDigit(number) {
    let digits = number.toString().split("").map(Number);
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
        sum += (i % 2 === 0) ? digits[i] : digits[i] * 3;
    }
    return (10 - (sum % 10)) % 10;
}

function copyToClipboard() {
    let barcodeText = document.getElementById("barcode").textContent;
    navigator.clipboard.writeText(barcodeText).then(() => {
        alert("Código copiado!");
    }).catch(err => console.error("Erro ao copiar:", err));
}
