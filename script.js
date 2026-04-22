const display = document.querySelector('.display');
const botoes = document.querySelectorAll('.tecla');

let valorAtual = '0';
let operacaoAnterior = null;
let proximoValorNovo = true;

function atualizarDisplay() {
    display.textContent = valorAtual;
}

function limpar() {
    valorAtual = '0';
    operacaoAnterior = null;
    proximoValorNovo = true;
    atualizarDisplay();
}

function deletarUltimo() {
    if (valorAtual.length > 1) {
        valorAtual = valorAtual.slice(0, -1);
    } else {
        valorAtual = '0';
    }
    atualizarDisplay();
}

function calcular() {
    if (operacaoAnterior === null) {
        return;
    }

    const valor1 = parseFloat(operacaoAnterior.valor);
    const valor2 = parseFloat(valorAtual);
    let resultado;

    switch (operacaoAnterior.operacao) {
        case '+':
            resultado = valor1 + valor2;
            break;
        case '-':
            resultado = valor1 - valor2;
            break;
        case '*':
            resultado = valor1 * valor2;
            break;
        case '/':
            resultado = valor2 !== 0 ? valor1 / valor2 : 0;
            break;
        default:
            return;
    }

    valorAtual = resultado.toString();
    operacaoAnterior = null;
    proximoValorNovo = true;
    atualizarDisplay();
}

botoes.forEach((botao) => {
    botao.addEventListener('click', () => {
        const valor = botao.value;

        if (!isNaN(valor) || valor === '.') {
            // Números e ponto
            if (proximoValorNovo) {
                valorAtual = valor === '.' ? '0.' : valor;
                proximoValorNovo = false;
            } else {
                if (valor === '.' && valorAtual.includes('.')) {
                    return;
                }
                valorAtual += valor;
            }
            atualizarDisplay();
        } else if (valor === 'AC') {
            limpar();
        } else if (valor === 'DEL') {
            deletarUltimo();
        } else if (valor === '=') {
            calcular();
        } else if (['+', '-', '*', '/'].includes(valor)) {
            // Operações
            if (operacaoAnterior !== null) {
                calcular();
            }
            operacaoAnterior = {
                valor: valorAtual,
                operacao: valor,
            };
            proximoValorNovo = true;
        }
    });
});

atualizarDisplay();
