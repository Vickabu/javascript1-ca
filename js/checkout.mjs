import { getCart, displayCartCounter, removeItemFromCart, clearCart, formatTotal } from "./cart.mjs";

    


function generateHTMLForGame(game) {
    const gameWrapper = document.createElement('div')
    gameWrapper.classList.add('game-wrapper');

    const gameContainer = document.createElement('div');
    gameContainer.classList.add('game-container');

    const gameInfo = document.createElement('div');
    gameInfo.classList.add('game-info');

    const lastChanges = document.createElement('div');
    lastChanges.classList.add('game-last-changes');

    const heading = document.createElement('h3');
    heading.textContent = game.title;

    const gameDescription = document.createElement('p');
    gameDescription.textContent = game.description;

    const gameTotal = document.createElement('div')
    gameTotal.textContent = 'Total: ' + formatTotal(game.price);

    const gameImg = document.createElement('img');
    gameImg.src = game.image.url;
    gameImg.classList.add('game-image');

    gameImg.addEventListener('click', () => {
    localStorage.setItem('game', JSON.stringify(game))
    });
        
    const gameLink = document.createElement('a');
    gameLink.href= `./product.html?id=${game.id}/`;
    
    const removeItem = document.createElement('button');
    removeItem.textContent = 'Remove';
    removeItem.classList.add('remove-btn');
    removeItem.addEventListener('click', () => {
        removeItemFromCart(game);
        displayCartItems();
        displayCartCounter();
    });

    

    lastChanges.append(gameTotal, removeItem)
    gameInfo.append(heading, gameDescription, lastChanges);
    gameLink.appendChild(gameImg); 
    gameWrapper.appendChild(gameContainer);
    gameContainer.append(gameLink, gameInfo)
    return gameWrapper
}



function displayCartItems() {
    const displayContainer = document.getElementById('display-cart-items');
    displayContainer.textContent = '';
    const cart = getCart();

    if (cart.length === 0) {
        const emptyCartMessage = document.createElement('p');
        emptyCartMessage.textContent = 'Your cart is empty.';
        displayContainer.appendChild(emptyCartMessage);
    } else {
        cart.forEach(function (currentItem) {
            const gameHTML = generateHTMLForGame(currentItem);
            displayContainer.appendChild(gameHTML);
        });

        const clearCartbtn = document.getElementById('clear-btn');
        clearCartbtn.addEventListener('click', () => {
            clearCart();
            displayCartItems();
            displayCartCounter();
        }); 

        const totalCost = cart.reduce((acc, curr) => acc + curr.price, 0);
        const totalElement = document.createElement('div');
        totalElement.classList.add('total-cost');
        totalElement.textContent = 'Total Cost: ' + formatTotal(totalCost);
        displayContainer.appendChild(totalElement);
    
        const purchaseForm = document.createElement('form');
        purchaseForm.classList.add('purchase-form');
    
        const nameLabel = document.createElement('label');
        nameLabel.textContent = 'Name:';
        const nameInput = document.createElement('input');
        nameInput.setAttribute('type', 'text');
        nameInput.setAttribute('name', 'name');
        const emailLabel = document.createElement('label');
        emailLabel.textContent = 'Email:';
        const emailInput = document.createElement('input');
        emailInput.setAttribute('type', 'email');
        emailInput.setAttribute('name', 'email');
        const phoneLabel = document.createElement('label');
        phoneLabel.textContent = 'Phonenumber:';
        const phoneInput = document.createElement('input');
        phoneInput.setAttribute('type', 'tel');
        phoneInput.setAttribute('name', 'phone');
    
        const cardNumberLabel = document.createElement('label');
        cardNumberLabel.textContent = 'Card-number:';
        const cardNumberInput = document.createElement('input');
        cardNumberInput.setAttribute('type', 'text');
        cardNumberInput.setAttribute('name', 'cardNumber');
        const expirationLabel = document.createElement('label');
        expirationLabel.textContent = 'Valid Thru (MM/ÅÅ):';
        const expirationMonthInput = document.createElement('input');
        expirationMonthInput.setAttribute('type', 'text');
        expirationMonthInput.setAttribute('name', 'expirationMonth');
        const expirationYearInput = document.createElement('input');
        expirationYearInput.setAttribute('type', 'text');
        expirationYearInput.setAttribute('name', 'expirationYear');
        const cvvLabel = document.createElement('label');
        cvvLabel.textContent = '(CVV):';
        const cvvInput = document.createElement('input');
        cvvInput.setAttribute('type', 'text');
        cvvInput.setAttribute('name', 'cvv');
    
        const confirmPurchaseButton = document.createElement('button');
        confirmPurchaseButton.textContent = 'Complete Checkout';
        confirmPurchaseButton.classList.add('confirm-purchase-btn');
        confirmPurchaseButton.addEventListener('click', (event) => {
            event.preventDefault();
    
            const purchaseData = {
                name: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                cardNumber: cardNumberInput.value,
                expirationMonth: expirationMonthInput.value,
                expirationYear: expirationYearInput.value,
                cvv: cvvInput.value
            };
    
            handlePurchaseConfirmation(purchaseData);
        });

        purchaseForm.append(nameLabel, nameInput, emailLabel, emailInput, phoneLabel, phoneInput, cardNumberLabel, cardNumberInput,
            expirationLabel, expirationMonthInput, expirationYearInput, cvvLabel, cvvInput, confirmPurchaseButton);
        displayContainer.appendChild(purchaseForm);
    }
}


function handlePurchaseConfirmation(purchaseData) {
    alert('Check out Complete!');
    clearCart();
    displayCartItems();
    displayCartCounter();
    window.location.href = "./confirmation/index.html";
}





function main () {
    displayCartItems();
    displayCartCounter();
}

main ();

