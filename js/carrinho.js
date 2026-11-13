"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const listaItensDiv = document.getElementById("itens-carrinho");
    const carrinhoVazioMsg = document.getElementById("carrinho-vazio");
    const btnEsvaziar = document.getElementById("esvaziar");
    const subtotalEl = document.getElementById("subtotal");
    const taxaEl = document.getElementById("taxa");
    const totalEl = document.getElementById("total");
    const selectBairro = document.getElementById("bairro");
    const selectPagamento = document.getElementById("pagamento");
    const campoTroco = document.getElementById("campo-troco");
    const inputTroco = document.getElementById("troco");
    const formulario = document.getElementById("formulario");
    const erroEl = document.getElementById("erro");
    const areaRevisao = document.getElementById("area-revisao");
    const preMensagem = document.getElementById("mensagem");
    const btnRevisar = document.getElementById("revisar");

    let taxaAtual = 0;

    function renderizarCarrinho() {
        if (!listaItensDiv) return;

        listaItensDiv.innerHTML = "";

        if (carrinho.length === 0) {
            carrinhoVazioMsg.style.display = "block";
            if (btnEsvaziar) btnEsvaziar.style.display = "none";
            if (subtotalEl) subtotalEl.textContent = "—";
            if (totalEl) totalEl.textContent = "—";
            if (btnRevisar) btnRevisar.disabled = true;
            return;
        }

        carrinhoVazioMsg.style.display = "none";
        if (btnEsvaziar) btnEsvaziar.style.display = "inline-block";
        if (btnRevisar) btnRevisar.disabled = false;

        let subtotal = 0;

        carrinho.forEach((item, index) => {
            const totalItem = item.precoUnitario * item.quantidade;
            subtotal += totalItem;

            const divItem = document.createElement("div");
            divItem.className = "item-carrinho";
            
            let extrasTexto = item.extras && item.extras.length > 0 ? `<p>Extras: ${item.extras.join(", ")}</p>` : "";

            divItem.innerHTML = `
                <h4>${item.quantidade}x ${item.nome}</h4>
                ${extrasTexto}
                <p class="valor-item">R$ ${totalItem.toFixed(2).replace('.', ',')}</p>
                <button type="button" class="botao botao-secundario" style="padding: 4px 10px; font-size: 0.8rem; margin-top: 5px;" data-index="${index}">Remover</button>
            `;

            listaItensDiv.appendChild(divItem);
        });

        listaItensDiv.querySelectorAll("button[data-index]").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const idx = parseInt(e.target.getAttribute("data-index"));
                carrinho.splice(idx, 1);
                salvarCarrinho();
                atualizarContadorCarrinho();
                renderizarCarrinho();
            });
        });

        if (subtotalEl) subtotalEl.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        atualizarTotalGeral(subtotal);
    }

    function atualizarTotalGeral(subtotalCalc) {
        const subtotal = subtotalCalc !== undefined ? subtotalCalc : carrinho.reduce((acc, item) => acc + (item.precoUnitario * item.quantidade), 0);
        const totalGeral = subtotal + taxaAtual;

        if (totalEl) {
            totalEl.textContent = carrinho.length > 0 ? `R$ ${totalGeral.toFixed(2).replace('.', ',')}` : "—";
        }
    }

    const taxasBairros = {
        "pindorama": 5.00,
        "sao-judas": 8.00,
        "centro": 10.00,
        "ilha-grande": 18.00,
        "nassau": 14.00,
        "demais": 6.00,
        "retirada": 0.00
    };

    if (selectBairro) {
        selectBairro.addEventListener("change", () => {
            const bairroVal = selectBairro.value;
            taxaAtual = taxasBairros[bairroVal] !== undefined ? taxasBairros[bairroVal] : 0;

            if (taxaEl) {
                taxaEl.textContent = bairroVal ? `R$ ${taxaAtual.toFixed(2).replace('.', ',')}` : "Escolha o bairro";
            }
            atualizarTotalGeral();
        });
    }

    if (selectPagamento && campoTroco) {
        selectPagamento.addEventListener("change", () => {
            if (selectPagamento.value === "dinheiro") {
                campoTroco.hidden = false;
            } else {
                campoTroco.hidden = true;
                if (inputTroco) inputTroco.value = "";
            }
        });
    }

    if (btnEsvaziar) {
        btnEsvaziar.addEventListener("click", () => {
            carrinho = [];
            salvarCarrinho();
            atualizarContadorCarrinho();
            renderizarCarrinho();
            if (areaRevisao) areaRevisao.style.display = "none";
        });
    }

    if (formulario) {
        formulario.addEventListener("submit", (e) => {
            e.preventDefault();

            const nome = document.getElementById("nome").value.trim();
            const bairro = selectBairro.options[selectBairro.selectedIndex].text;
            const endereco = document.getElementById("endereco").value.trim();
            const pagamento = selectPagamento.value;
            const troco = inputTroco ? inputTroco.value.trim() : "";

            if (!nome || !selectBairro.value || !endereco || !pagamento) {
                if (erroEl) {
                    erroEl.textContent = "Por favor, preencha todos os campos de entrega e pagamento.";
                    erroEl.focus();
                }
                return;
            }

            if (erroEl) erroEl.textContent = "";

            let subtotal = carrinho.reduce((acc, item) => acc + (item.precoUnitario * item.quantidade), 0);
            let totalGeral = subtotal + taxaAtual;

            let textoMensagem = `*Novo Pedido - ${configuracao.nomeLoja}* 🍕\n\n`;
            textoMensagem += `*Cliente:* ${nome}\n`;
            textoMensagem += `*Endereço:* ${endereco} (${bairro})\n`;
            textoMensagem += `*Pagamento:* ${pagamento.toUpperCase()}${troco ? ` (Troco para R$ ${troco})` : ""}\n\n`;
            textoMensagem += `*Itens do Pedido:*\n`;

            carrinho.forEach(item => {
                let extrasStr = item.extras && item.extras.length > 0 ? ` [${item.extras.join(", ")}]` : "";
                textoMensagem += `- ${item.quantidade}x ${item.nome}${extrasStr} — R$ ${(item.precoUnitario * item.quantidade).toFixed(2).replace('.', ',')}\n`;
            });

            textoMensagem += `\nSubtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
            textoMensagem += `Taxa de Entrega: R$ ${taxaAtual.toFixed(2).replace('.', ',')}\n`;
            textoMensagem += `*Total a Pagar: R$ ${totalGeral.toFixed(2).replace('.', ',')}*`;

            if (preMensagem) preMensagem.textContent = textoMensagem;
            if (areaRevisao) areaRevisao.style.display = "block";

            const url = `https://api.whatsapp.com/send?phone=${configuracao.whatsapp}&text=${encodeURIComponent(textoMensagem)}`;
            window.open(url, '_blank');
        });
    }

    renderizarCarrinho();
});