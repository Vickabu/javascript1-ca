
export function createCart() {
    const cart = getCart();
    if (!cart) {
        localStorage.setItem('cart', JSON.stringify([]));
    } 
}

export function getCart() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    return cart
}

export function getTotalItemsInCart () {
    const cart = getCart()
    const totalItemsInCart = cart.reduce((total, item) => {
        total += item.quantity;
        return total;
    }, 0);
    return totalItemsInCart;
}

export function displayCartCounter() {
    const cartCounter = document.getElementById('cart-count');
    const totalItemsInCart = getTotalItemsInCart();
    const cart = getCart();  
    cartCounter.textContent = totalItemsInCart;
}


export function addToCart(game) {
    const cart = getCart();
    const itemIndex = cart.findIndex(function(currentItem){
        if (game.id === currentItem.id) {
            return true;
        }
        return false;
    });

    if (itemIndex === -1) {
        cart.push({ ...game, quantity: 1 });
      } 

    localStorage.setItem('cart', JSON.stringify(cart));
}


export function removeItemFromCart(game) {
    const cart = getCart();
    const gameIdToRemove = game.id;
    const idInCart = cart.findIndex((currentItem) => {
        if (currentItem.id === gameIdToRemove) {
            return true;
        } 
        return false;
    });
    if (cart[idInCart].quantity > 1) {
        cart[idInCart].quantity -= 1;
        localStorage.setItem('cart', JSON.stringify(cart));   
    } else {
        const newCart = cart.filter((_, index) => {
            if (idInCart === index) {
                return false;
            } return true;
        });
        localStorage.setItem('cart', JSON.stringify(newCart));
    }    
}


export function clearCart() {
    localStorage.setItem('cart', JSON.stringify([]));
}

export function formatTotal(amount) {
    return amount.toFixed(2);
}