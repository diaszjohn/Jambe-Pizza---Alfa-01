# Jambe Pizza — Três páginas prontas para personalizar

Projeto de estudo da **Jambe Pizza**, sem framework, instalação, conta ou pagamento online.

## 1. Abrir e experimentar

1. Se recebeu um ZIP, extraia a pasta inteira. Não edite dentro do ZIP.
2. Faça uma cópia da pasta **Projeto pronto** com seu nome.
3. Abra essa pasta no VS Code por **Arquivo → Abrir Pasta…**.
4. No gerenciador de arquivos, abra **index.html** no Chrome. Mantenha `css`, `img` e `js` juntos.
5. Use a navegação: **Principal → Cardápio → Carrinho**.

Há exatamente três páginas do site:

- `index.html`: apresentação da loja e botões **Ver cardápio / Ver carrinho**.
- `cardapio.html`: Pizzas (como Calabrisa, Cigarro de Palha, Flor da África) e Bebidas Geladas, com quantidade e extras independentes.
- `carrinho.html`: todos os itens, alteração de quantidade, remoção, entrega por bairro, pagamento e revisão.

## 2. Montar a simulação

1. No Cardápio, escolha um inteiro de **1 a 10** e marque os extras desejados (Borda de Cheddar ou Adicional de Bacon) nas pizzas. Cada extra é cobrado em **cada unidade**.
2. Clique em **Adicionar ao carrinho**. O contador no topo mostra a soma das unidades. O botão flutuante inteligente "Ver Carrinho" aparece no canto da tela assim que há itens na sacola.
3. Mesmos produto e extras somam uma linha; extras diferentes formam outra linha.
4. Abra o Carrinho. Altere quantidades, remova itens ou esvazie. Carrinho vazio mostra o link para voltar ao cardápio e impede revisar.
5. Use um **nome fictício**, como Ana de Teste. Escolha o bairro de entrega para calcular a taxa ou retirada (`R$ 0,00`).
6. Escolha Dinheiro, Pix ou Cartão. Não há transação ou coleta de cartão.
7. Dinheiro mostra o campo opcional de troco: informe com quanto pagaria. Pix/cartão escondem e limpam o campo.
8. Clique em **Revisar e Enviar Pedido**: a mensagem formatada aparece na tela e o link do WhatsApp é aberto diretamente com o resumo completo.

## 3. Personalizar em um arquivo

Abra `js/configuracao.js`. Mude valores à direita dos dois-pontos, salve no editor e **recarregue o navegador**. São duas ações diferentes.

| Campo | O que muda |
|---|---|
| `nomeLoja` | Nome no topo, apresentação e mensagem do WhatsApp |
| `whatsapp` | Número de destino autorizado para os pedidos |
| `nomeExtra1`, `precoExtra1` | Nome e preço do primeiro extra (Borda de Cheddar) |
| `nomeExtra2`, `precoExtra2` | Nome e preço do segundo extra (Adicional de Bacon) |
| `produtos` | Lista de pizzas e sobremesas com IDs, descrições, imagens e preços |
| `bebidas` | Lista de bebidas geladas com IDs, descrições, imagens e preços |

Textos ficam entre aspas; preços usam ponto, sem `R$` e sem aspas (`39.90`). Preserve vírgulas e chaves. Os preços são sempre recalculados pela configuração, nunca confiados ao armazenamento.

Cores: variáveis no começo de `css/estilo.css`. Imagens: arquivos locais em `img`, caminhos `imagem` no catálogo; a imagem principal fica em `index.html`. Ao trocar, ajuste também descrição e `alt` para combinar. Preserve contraste e nomes/IDs dos campos.

## 4. Onde está cada parte do JavaScript

- `configuracao.js`: uma única fonte dos nomes, produtos, bebidas e preços.
- `app.js`: lógica global da sacola, persistência e atualização do contador.
- `cardapio.js`: renderização dinâmica das pizzas e bebidas, controles de quantidade/extras e exibição do botão flutuante inteligente.
- `carrinho.js`: leitura, cálculo de subtotais, taxas por bairro, validações de formulário e montagem da mensagem para o WhatsApp.

IDs fixos do Carrinho: `nome`, `bairro`, `endereco`, `pagamento`, `troco`, `formulario`, `mensagem`, `whatsapp`, `revisar`, `subtotal`, `taxa`, `total`, `itens-carrinho`, `carrinho-vazio`, `esvaziar`.

## 5. Armazenamento e privacidade

`localStorage` é memória **deste navegador**. A chave atual é `jambe_carrinho`:

```json
[{"idUnico":"calabrisa-1710000000000","id":"calabrisa","nome":"Calabrisa","precoBase":39.90,"precoUnitario":49.90,"quantidade":1,"extras":["Borda de Cheddar","Adicional de Bacon"]}]