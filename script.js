function generateBarcode() {
    let lastBarcode = localStorage.getItem("lastBarcode"); // Recupera o último código gerado
    let baseNumber = lastBarcode ? Number(lastBarcode) + 1 : 789000000000; // Começa com prefixo do Brasil (789)
    
    let checkDigit = calculateCheckDigit(baseNumber); // Calcula o dígito verificador
    let barcode = baseNumber.toString().padStart(12, '0') + checkDigit; // Monta o código completo

    localStorage.setItem("lastBarcode", baseNumber); // Salva o último código gerado
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
