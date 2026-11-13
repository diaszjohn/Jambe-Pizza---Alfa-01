"use strict";

const configuracao = {
    nomeLoja: "Jambe Pizza",
    whatsapp: "5586995884824",
    
    // Extras padronizados para o modelo de dados
    nomeExtra1: "Borda de Cheddar",
    precoExtra1: 5.00,
    nomeExtra2: "Adicional de Bacon",
    precoExtra2: 5.00,

    produtos: [
        { 
            id: "calabrisa", 
            nome: "Calabrisa", 
            preco: 39.90, 
            descricao: "Pizza de calabresa com cream cheese, bastante orégano e cebola roxa.", 
            imagem: "img/calabrisa.jpg" 
        },
        { 
            id: "cigarro", 
            nome: "Cigarro de Palha", 
            preco: 49.90, 
            descricao: "Pizza de carne de sol com cream cheese e queijo coalho assado.", 
            imagem: "img/cigarrodepalha.jpg" 
        },
        { 
            id: "flor", 
            nome: "Flor da África", 
            preco: 59.90, 
            descricao: "Pizza com carne de cordeiro, queijo e tâmaras.", 
            imagem: "img/flordaafrica.jpg" 
        },
        {
            id: "frango-crocante",
            nome: "Frango Crocante",
            preco: 39.90,
            descricao: "Deliciosa pizza de frango com pedaços de bacon e batata palha.",
            imagem: "img/frangocrocante.jpg"
        },
        {
            id: "camarao-tropical",
            nome: "Camarão Tropical",
            preco: 69.90,
            descricao: "Camarões salteados no alho e azeite, abacaxi caramelizado no forno a lenha, requeijão cremoso e pimenta biquinho.",
            imagem: "img/camarao-tropical.jpg"
        },
        {
            id: "cartola-lenha",
            nome: "Cartola na Lenha",
            preco: 42.90,
            descricao: "A clássica sobremesa nordestina! Doce de leite cremoso, banana assada, queijo coalho tostado.",
            imagem: "img/cartola.jpg"
        },
        { 
            id: "marguerita", 
            nome: "Marguerita", 
            preco: 29.90, 
            descricao: "Clássica marguerita com molho artesanal, muçarela, tomate fresco e manjericão.", 
            imagem: "img/marguerita.jpg" 
        },
        { 
            id: "quatro-queijos", 
            nome: "Quatro Queijos", 
            preco: 29.90, 
            descricao: "Clássica quatro queijos com seleção especial de queijos derretidos na lenha.", 
            imagem: "img/quatroqueijos.jpg" 
        },
        { 
            id: "portuguesa", 
            nome: "Portuguesa", 
            preco: 29.90, 
            descricao: "Clássica portuguesa com presunto, ovos, cebola, azeitonas e cobertura caprichada.", 
            imagem: "img/portuguesa.jpg" 
        }
    ],

    // Bebidas geladas da casa
    bebidas: [
        {
            id: "coca-2l",
            nome: "Coca-Cola 2 Litros",
            preco: 14.90,
            descricao: "Refrigerante Coca-Cola original gelado.",
            imagem: "img/cocacolalitro.jpg"
        },
        {
            id: "guarana-2l",
            nome: "Guaraná Antárctica 2 Litros",
            preco: 12.90,
            descricao: "O clássico sabor do Guaraná bem gelado.",
            imagem: "img/gauranalitro.jpg"
        },
        {
            id: "coca-lata",
            nome: "Coca-Cola Lata 350ml",
            preco: 6.00,
            descricao: "Refrigerante em lata bem gelado.",
            imagem: "img/cocacola.jpg"
        },
        {
            id: "agua-mineral",
            nome: "Água Mineral 500ml",
            preco: 4.00,
            descricao: "Água mineral purificada gelada.",
            imagem: "img/aguamineral.jpg"
        }
    ]
};