const balance = document.getElementById('saldo');
const add_dinheiro = document.getElementById('add-dinheiro');
const remov_dinheiro = document.getElementById('remov-dinheiro');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const saldo = document.getElementById('saldo');
const ganhoText = document.getElementById('ganho-text');
const gastoText = document.getElementById('gasto-text');

const localStorageTransactions = JSON.parse(
    localStorage.getItem('transacoes')
);

let transacoes = localStorage.getItem('transacoes') !== null ? localStorageTransactions : [];

function addTransacao(e){
    e.preventDefault();

    if (ganhoText.value.trim() !== ""){
        const ganhoTransacao = {
            id : generateId(),
            text : 'Ganho',
            saldo : +ganhoText.value
        };
        transacoes.push(ganhoTransacao);
        addTransacaoDOM(ganhoTransacao);
    }

    if (gastoText.value.trim() !== ""){
        const gastoTransacao = {
            id : generateId(),
            text : 'Gasto',
            saldo : -gastoText.value
        };
        transacoes.push(gastoTransacao);
        addTransacaoDOM(gastoTransacao);
    }

    updateValues();
    updateLocalStorage();

    ganhoText.value = "";
    gastoText.value = "";
    document.getElementById('text').value = "";
};

function generateId(){
    return Math.floor(Math.random() * 100000000);
};

function addTransacaoDOM(transacao){
    const sign = transacao.saldo < 0 ? '-':'+';

    const item = document.createElement('li');
    item.classList.add(transacao.saldo < 0 ? 'gasto' : 'ganho');

    item.innerHTML = `
    ${transacao.text} <span>${sign}${Math.abs(transacao.saldo)}</span>;
    <button class = "delete-button" onclick = "removeTransacao(${transacao.id})">x</button>
    `;

    list.appendChild(item);
};

function updateValues(){
    const valores = transacoes.map(transacao => transacao.saldo);

    const total = valores.reduce((acc, item) => (acc+=item),0).toFixed(2);

    const ganho = valores
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

    const gasto = valores
    .filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

    balance.innerText = `$${total}`;
    add_dinheiro.innerText = `$${ganho}`;
    remov_dinheiro.innerText = `$${gasto}`;
};

function removeTransacao(id){
    transacoes = transacoes.filter(transacao => transacao.id !== id);

    updateLocalStorage();
    init();
};

function updateLocalStorage(){
    localStorage.setItem("transacoes", JSON.stringify(transacoes));
};

function init(){
    list.innerHTML = "";

    transacoes.forEach(addTransacaoDOM);
    updateValues();
};

function resetarTransacoes(){
    transacoes = [];
    updateLocalStorage();
    init();
}

init();

/* document.addEventListener('DOMContentLoaded', function(){
    form.addEventListener("submit", function(e){
        e.preventDefault();

        addTransacao();

        ganhoText.value = "";
        gastoText.value = "";
    });
}); */

form.addEventListener('submit', addTransacao);