// O código abaixo tem alguns erros e não funciona como deveria. Você pode identificar quais são e corrigi-los em um arquivo TS?

let botaoAtualizar = document.getElementById('atualizar-saldo') as HTMLButtonElement;
let botaoLimpar = document.getElementById('limpar-saldo') as HTMLButtonElement;
let campoValorAdd = document.getElementById('campo-valor-add') as HTMLInputElement;
let campoSaldo = document.getElementById('campo-saldo') as HTMLSpanElement;

let saldo: number = Number(campoSaldo.innerHTML);

function somarAoSaldo(): void {
	let valorAdd: number = Number(campoValorAdd.value);
    saldo += valorAdd;
	campoValorAdd.innerHTML = '';
	campoSaldo.innerHTML = String(saldo);
}

function limparSaldo(): void {
	saldo = 0;
    campoSaldo.innerHTML = '';
}

botaoAtualizar.addEventListener('click', () => {
	somarAoSaldo()
});

botaoLimpar.addEventListener('click', () => {
    limparSaldo();
});

/**
    <h4>Valor a ser adicionado: <input id="campo-valor-add"> </h4>
    <button id="atualizar-saldo">Atualizar saldo</button>
    <button id="limpar-saldo">Limpar seu saldo</button>
    <h1>Seu saldo é: <span id="campo-saldo"></span></h1>
 */