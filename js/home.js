
import { API_GAMES_URL } from "./constants.mjs";
import { doFetch } from "./doFetch.mjs";
import { addToCart, createCart, displayCartCounter } from "./cart.mjs";


function displayGames(games) {
    const displayContainer = document.getElementById('display-container');
    displayContainer.textContent = '';

    games.filter(game => game.genre === chosenGenre || chosenGenre === '')
         .forEach(game => {
             const gameHtml = generateGameHtml(game);
             displayContainer.appendChild(gameHtml);
         });
}


const viewAllGenreBtn = document.getElementById('genre-all')
const actionGenreBtn = document.getElementById('genre-action')
const adventureGenreBtn = document.getElementById('genre-adventure')
const sportsGenreBtn = document.getElementById('genre-sports')
const horrorGenreBtn = document.getElementById('genre-horror')

let chosenGenre = '';

viewAllGenreBtn.addEventListener('click', () => {
    chosenGenre = '';
    renderHomePage();
});

actionGenreBtn.addEventListener('click', () => {
    chosenGenre = 'Action';
    renderHomePage();
});

adventureGenreBtn.addEventListener('click', () => {
    chosenGenre = 'Adventure';
    renderHomePage();
});

sportsGenreBtn.addEventListener('click', () => {
    chosenGenre = 'Sports';
    renderHomePage();
});


horrorGenreBtn.addEventListener('click', () => {
    chosenGenre = 'Horror';
    renderHomePage();
});




function generateGameHtml(game) {
    const gameWrapper = document.createElement('div');
    gameWrapper.classList.add('game-wrapper');

    const gameContainer = document.createElement('div');
    gameContainer.classList.add('game-container');

    const heading = document.createElement('h3');
    heading.textContent = game.title;

    const gameImg = document.createElement('img');
    gameImg.src = game.image.url;
    gameImg.classList.add('game-image');

    gameImg.addEventListener('click', () => {
        localStorage.setItem('gameId', game.id);
    });    
        
    const gameLink = document.createElement('a');
    gameLink.href= `./product/index.html?id=${game.id}/`;

    const gamePriceContainer = document.createElement('div');
    gamePriceContainer.classList.add('game-price-container')

    const gamePrice = document.createElement('div');
    gamePrice.textContent = 'Price: ' + game.price;

    const gameDicountedPrice = document.createElement('div');
    gameDicountedPrice.textContent = 'Disconted Price: ' + game.discountedPrice;

    const gameBuyButton = document.createElement('button');
    gameBuyButton.textContent = 'Add To Cart';
    gameBuyButton.classList.add('buy-button');
    gameBuyButton.addEventListener('click', () => {
        addToCart(game);
        displayCartCounter();
    });

    gameLink.append(gameImg);
    gameWrapper.appendChild(gameContainer);
    gameContainer.append(gameLink, heading, gamePriceContainer, gameBuyButton);
    gamePriceContainer.append(gamePrice, gameDicountedPrice);
    return gameWrapper;
}





async function renderHomePage() {
    try {
        const responseData = await doFetch(API_GAMES_URL);
        const games = responseData.data;
        displayGames(games);
        displayCartCounter();
    } catch (error) {
        console.error('Error rendering home page:', error);
    }
}

async function main() {
    try {
        createCart();
        await renderHomePage();
    } catch (error) {
        console.error('Main error:', error);
    }
}

main();