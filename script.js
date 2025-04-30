function generateBarcode() {
    let lastBarcode = localStorage.getItem("lastBarcode"); // Recupera o último gerado
    let baseNumber = lastBarcode ? Number(lastBarcode) + 1 : 9999110000001; // Segue a sequência correta

    let checkDigit = calculateCheckDigit(baseNumber); // Calcula o dígito verificador
    let nextBarcode = baseNumber.toString() + checkDigit; // Monta o código completo

    localStorage.setItem("lastBarcode", baseNumber); // Salva o último código gerado
    document.getElementById("barcode").textContent = nextBarcode;
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
