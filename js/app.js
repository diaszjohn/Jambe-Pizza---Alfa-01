"use strict";

let carrinho = JSON.parse(localStorage.getItem("jambe_carrinho")) || [];

function adicionarAoCarrinho(id, quantidade, temExtra1, temExtra2) {
    const produtoBase = configuracao.produtos.find(p => p.id === id) || configuracao.bebidas.find(b => b.id === id);

    if (!produtoBase) {
        console.error("Produto não encontrado:", id);
        return;
    }

    let precoUnitario = produtoBase.preco;
    let descExtras = [];

    if (temExtra1) {
        precoUnitario += configuracao.precoExtra1;
        descExtras.push(configuracao.nomeExtra1);
    }
    if (temExtra2) {
        precoUnitario += configuracao.precoExtra2;
        descExtras.push(configuracao.nomeExtra2);
    }

    const itemCarrinho = {
        idUnico: `${id}-${Date.now()}`,
        id: produtoBase.id,
        nome: produtoBase.nome,
        precoBase: produtoBase.preco,
        precoUnitario: precoUnitario,
        quantidade: quantidade,
        extras: descExtras
    };

    carrinho.push(itemCarrinho);
    salvarCarrinho();
    atualizarContadorCarrinho();
}

function salvarCarrinho() {
    try {
        localStorage.setItem("jambe_carrinho", JSON.stringify(carrinho));
    } catch (e) {
        console.error("Erro ao salvar no localStorage", e);
    }
}

function atualizarContadorCarrinho() {
    const contadores = document.querySelectorAll("[data-contador]");
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    
    contadores.forEach(contador => {
        contador.textContent = totalItens;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    atualizarContadorCarrinho();
});