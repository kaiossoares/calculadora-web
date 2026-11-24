const visor = document.getElementById('visor');

let anterior = null; 
let operacao = null; 
let atual = '';      

function atualizarVisor() {
  const partes = [anterior, operacao, atual].filter(p => p !== null && p !== '');
  visor.textContent = partes.join(' ') || '0';
}

function digitar(valor) {

  if (operacao === null) anterior = null;

  if (valor === '.') {
    if (atual.includes('.')) return; 
    if (atual === '') atual = '0';
  } else if (atual === '0') {
    atual = ''; 
  }

  atual += valor;
  atualizarVisor();
}

function escolherOperacao(op) {
  if (atual !== '') {
    if (operacao !== null) {
      if (!calcular()) return;
    } else {
      anterior = Number(atual);
      atual = '';
    }
  }

  if (anterior === null) return; 

  operacao = op;
  atualizarVisor();
}

function calcular() {
  if (anterior === null || operacao === null || atual === '') return false;

  const a = anterior;
  const b = Number(atual);
  let resultado;

  switch (operacao) {
    case '+': resultado = a + b; break;
    case '−': resultado = a - b; break;
    case '×': resultado = a * b; break;
    case '÷':
      if (b === 0) {
        limpar();
        visor.textContent = 'Erro: divisão por zero';
        return false;
      }
      resultado = a / b;
      break;
  }

  anterior = Number(resultado.toFixed(10));
  operacao = null;
  atual = '';
  atualizarVisor();
  return true;
}

function limpar() {
  anterior = null;
  operacao = null;
  atual = '';
  atualizarVisor();
}
