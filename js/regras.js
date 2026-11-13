"use strict";

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function obterProdutoPorId(id) {
    return configuracao.produtos.find(p => p.id === id);
}

function calcularSubtotalItem(item) {
    const produto = obterProdutoPorId(item.id);
    if (!produto || item.quantidade < 1 || item.quantidade > 10) {
        throw new Error("Produto ou quantidade inválida.");
    }
    
    let precoUnidade = produto.preco;
    if (item.extra1) precoUnidade += configuracao.precoExtra1;
    if (item.extra2) precoUnidade += configuracao.precoExtra2;
    
    return Math.round(precoUnidade * item.quantidade * 100) / 100;
}

function calcularTotalCarrinho(itens) {
    return itens.reduce((soma, item) => soma + Math.round(calcularSubtotalItem(item) * 100), 0) / 100;
}

function obterTaxaEntrega(bairro) {
    const taxas = {
        "pindorama": 5.00,
        "sao-judas": 8.00,
        "centro": 10.00,
        "ilha-grande": 18.00,
        "nassau": 14.00,
        "demais": 6.00,
        "retirada": 0.00
    };
    return taxas[bairro] !== undefined ? taxas[bairro] : null;
}