import { API_GAMES_URL } from "./constants.mjs";
import { doFetch } from "./doFetch.mjs";
import { addToCart, createCart, displayCartCounter } from "./cart.mjs";

document.addEventListener('DOMContentLoaded', async function () {
    const gameId = getGameIdFromUrl();
    await loadGameDetails(gameId);
    createCart();
    displayCartCounter();
});

async function loadGameDetails(gameId) {
    try {
        const game = await getGameById(gameId);
        generateGameHtml(game);
    } catch (error) {
        console.error("Error loading game details:", error);
    }
}

function getGameIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

async function getGameById(gameId) {
    const response = await doFetch(`${API_GAMES_URL}/${gameId}`);
    return response.data;
}

function generateGameHtml(game) {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';

    const gameImage = document.createElement('img');
    gameImage.classList.add('product-image');
    gameImage.src = game.image.url;
    gameImage.alt = game.image.alt;

    const gameTitle = document.createElement('h1');
    gameTitle.textContent = game.title;

    const gameInfoContainer = document.createElement('div');
    gameInfoContainer.classList.add('info-container');

    const gameDescription = document.createElement('p');
    gameDescription.textContent = game.description;

    const gamePrice = document.createElement('p');
    gamePrice.textContent = 'Price: ' + game.price;

    const gameBuyButton = document.createElement('button');
    gameBuyButton.textContent = 'Add To Cart';
    gameBuyButton.classList.add('buy-button');
    gameBuyButton.addEventListener('click', () => {
        addToCart(game);
        displayCartCounter();
    });

    gameInfoContainer.append(gameTitle, gameDescription, gamePrice, gameBuyButton)
    gameContainer.appendChild(gameImage);
    gameContainer.appendChild(gameInfoContainer);
    if (game.onSale) {
        const discountedPrice = document.createElement('p');
        discountedPrice.textContent = `Discounted Price: ${game.discountedPrice}`;
        gameContainer.appendChild(discountedPrice);
    }
    
}