

function displayConfirmationPage() {
    const confirmationContainer = document.getElementById('confirmation-container');
    confirmationContainer.innerHTML = ''; 

    const heading = document.createElement('h2');
    heading.textContent = 'Thank You For Your Order!';

    const message1 = document.createElement('p');
    message1.textContent = 'Your order has been successfully placed, and we appreciate your business.';

    const message2 = document.createElement('p');
    message2.textContent = 'We will send you a confirmation email shortly with these details.';

    const orderedProductsContainer = document.createElement('div');
    orderedProductsContainer.id = 'ordered-products';

    const message3 = document.createElement('p');
    message3.textContent = "If you have any questions or need further assistance, please don't hesitate to contact us! And thank you for choosing Game Hub for your purchase.";

    const browseGamesLink = document.createElement('a');
    browseGamesLink.href = '../../index.html';
    browseGamesLink.textContent = '<-BACK TO HOME PAGE';

    confirmationContainer.append(heading, message1, message2, orderedProductsContainer, message3, browseGamesLink);
}

function main () {
    displayConfirmationPage();
}

main()
