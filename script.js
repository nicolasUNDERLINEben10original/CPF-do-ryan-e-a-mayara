function gerarDigito(corpoCpf) {
    let multiplicador = corpoCpf.length + 1;
    let soma = 0;
    for (let numero of corpoCpf) {
        soma += parseInt(numero) * multiplicador;
        multiplicador--;
    }
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
}

function gerarNovoCPF() {
    let cpfBase = "";
    for (let i = 0; i < 9; i++) {
        cpfBase += Math.floor(Math.random() * 10);
    }

    const d1 = gerarDigito(cpfBase);
    const d2 = gerarDigito(cpfBase + d1);
    const cpfFinal = `${cpfBase}${d1}${d2}`;
    
    const cpfFormatado = cpfFinal.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    
    const display = document.getElementById('cpf-resultado');
    display.innerText = cpfFormatado;
    
    // Reset badge text
    document.getElementById('copy-badge').innerText = "Copiar";
}

function copiarCPF() {
    const cpf = document.getElementById('cpf-resultado').innerText;
    navigator.clipboard.writeText(cpf).then(() => {
        const badge = document.getElementById('copy-badge');
        badge.innerText = "Copiado!";
        badge.style.background = "#22c55e"; // Cor verde
        
        setTimeout(() => {
            badge.innerText = "Copiar";
            badge.style.background = "#6366f1";
        }, 2000);
    });
}

// Gerar um inicial ao carregar
window.onload = gerarNovoCPF;