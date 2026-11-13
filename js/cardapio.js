"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const catalogoDiv = document.getElementById("catalogo");
    
    if (!catalogoDiv) return;

    catalogoDiv.innerHTML = "";

    function atualizarBotaoFlutuante() {
        let botaoFlutuante = document.getElementById("botao-flutuante-carrinho");
        const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

        if (totalItens > 0) {
            if (!botaoFlutuante) {
                botaoFlutuante = document.createElement("a");
                botaoFlutuante.id = "botao-flutuante-carrinho";
                botaoFlutuante.href = "carrinho.html";
                botaoFlutuante.className = "botao botao-flutuante";
                botaoFlutuante.innerHTML = `Ver Carrinho 🛒 (<span id="contador-flutuante">${totalItens}</span>)`;
                document.body.appendChild(botaoFlutuante);
            } else {
                const contadorFlutuante = document.getElementById("contador-flutuante");
                if (contadorFlutuante) contadorFlutuante.textContent = totalItens;
                botaoFlutuante.style.display = "inline-block";
            }
        } else {
            if (botaoFlutuante) {
                botaoFlutuante.style.display = "none";
            }
        }
    }

    const funcaoAdicionarAntiga = window.adicionarAoCarrinho;
    window.adicionarAoCarrinho = function(id, quantidade, temExtra1, temExtra2) {
        if (typeof funcaoAdicionarAntiga === "function") {
            funcaoAdicionarAntiga(id, quantidade, temExtra1, temExtra2);
        }
        atualizarBotaoFlutuante();
    };

    // 1. SEÇÃO DE PIZZAS & SOBREMESAS
    const tituloPizzas = document.createElement("h3");
    tituloPizzas.textContent = "🍕 Nossas Pizzas & Sobremesas";
    tituloPizzas.style.cssText = "grid-column: 1 / -1; color: var(--cor-destaque); font-size: 1.5rem; margin-top: 10px; border-bottom: 1px solid var(--cor-borda); padding-bottom: 8px;";
    catalogoDiv.appendChild(tituloPizzas);

    configuracao.produtos.forEach(produto => {
        const card = document.createElement("div");
        card.className = "card";
        
        card.innerHTML = `
            <div class="card-img-container">
                <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
            </div>
            <div>
                <h3>${produto.nome}</h3>
                <p class="desc">${produto.descricao}</p>
                <div class="preco">R$ ${produto.preco.toFixed(2).replace('.', ',')}</div>
            </div>
            
            <div class="controles-produto">
                <div class="input-qtd-container">
                    <label for="qtd-${produto.id}">Quantidade:</label>
                    <input type="number" id="qtd-${produto.id}" value="1" min="1" max="99">
                </div>
                
                <div class="grupo-extra">
                    <label class="check-label">
                        <input type="checkbox" id="extra1-${produto.id}"> ${configuracao.nomeExtra1} (+ R$ ${configuracao.precoExtra1.toFixed(2).replace('.', ',')})
                    </label>
                    <label class="check-label">
                        <input type="checkbox" id="extra2-${produto.id}"> ${configuracao.nomeExtra2} (+ R$ ${configuracao.precoExtra2.toFixed(2).replace('.', ',')})
                    </label>
                </div>
            </div>

            <button type="button" class="botao" data-id="${produto.id}">Adicionar ao Carrinho</button>
        `;

        catalogoDiv.appendChild(card);

        const btnAdicionar = card.querySelector("button");
        btnAdicionar.addEventListener("click", () => {
            const qtdInput = card.querySelector(`#qtd-${produto.id}`);
            const extra1Check = card.querySelector(`#extra1-${produto.id}`);
            const extra2Check = card.querySelector(`#extra2-${produto.id}`);

            const quantidade = parseInt(qtdInput.value) || 1;
            const temExtra1 = extra1Check ? extra1Check.checked : false;
            const temExtra2 = extra2Check ? extra2Check.checked : false;

            adicionarAoCarrinho(produto.id, quantidade, temExtra1, temExtra2);
            atualizarBotaoFlutuante();
        });
    });

    // 2. SEÇÃO DE BEBIDAS GELADAS
    if (configuracao.bebidas && configuracao.bebidas.length > 0) {
        const tituloBebidas = document.createElement("h3");
        tituloBebidas.textContent = "🥤 Bebidas Geladas";
        tituloBebidas.style.cssText = "grid-column: 1 / -1; color: var(--cor-destaque); font-size: 1.5rem; margin-top: 30px; border-bottom: 1px solid var(--cor-borda); padding-bottom: 8px;";
        catalogoDiv.appendChild(tituloBebidas);

        configuracao.bebidas.forEach(bebida => {
            const cardBebida = document.createElement("div");
            cardBebida.className = "card";
            
            cardBebida.innerHTML = `
                <div class="card-img-container">
                    <img src="${bebida.imagem}" alt="${bebida.nome}" loading="lazy">
                </div>
                <div>
                    <h3>${bebida.nome}</h3>
                    <p class="desc">${bebida.descricao}</p>
                    <div class="preco">R$ ${bebida.preco.toFixed(2).replace('.', ',')}</div>
                </div>
                
                <div class="controles-produto">
                    <div class="input-qtd-container">
                        <label for="qtd-${bebida.id}">Quantidade:</label>
                        <input type="number" id="qtd-${bebida.id}" value="1" min="1" max="99">
                    </div>
                </div>

                <button type="button" class="botao" data-id="${bebida.id}">Adicionar ao Carrinho</button>
            `;

            catalogoDiv.appendChild(cardBebida);

            const btnAdicionarBebida = cardBebida.querySelector("button");
            btnAdicionarBebida.addEventListener("click", () => {
                const qtdInput = cardBebida.querySelector(`#qtd-${bebida.id}`);
                const quantidade = parseInt(qtdInput.value) || 1;

                adicionarAoCarrinho(bebida.id, quantidade, false, false);
                atualizarBotaoFlutuante();
            });
        });
    }

    atualizarContadorCarrinho();
    atualizarBotaoFlutuante();
});