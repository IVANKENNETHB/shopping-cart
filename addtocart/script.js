let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCardsContainer = document.querySelector('.listcard'); 
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantityDisplay = document.querySelector('.quantity'); 

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    { id: 1, name: 'White Lavender Scent', image: 'tide1.jpg', price: 560 },
    { id: 2, name: 'Hyglenic Clean', image: 'tide2.jpg', price: 550 },
    { id: 3, name: 'Spring & Renewal', image: 'tide3.jpg', price: 530 },
    { id: 4, name: 'Clean Breez Scent', image: 'tide4.jpg', price: 530 },
    { id: 5, name: 'Simply Pods + Odor Defence', image: 'tide5.jpg', price: 530 },
    { id: 6, name: 'Botanical Rain', image: 'tide6.jpg', price: 500 },
    { id: 7, name: 'Ocean Mist Scent', image: 'tide7.jpg', price: 509 },
];

let listCards = {};

function initApp() {
    products.forEach((product, index) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="img/${product.image}" alt="${product.name}"/>
            <div class="title">${product.name}</div>
            <div class="price">${product.price.toLocaleString()}</div>
            <button onclick="addToCard(${index})">Add to Cart</button>
        `;
        list.appendChild(newDiv);
    });
}

initApp();

function addToCard(index) {
    if (!listCards[index]) {
        listCards[index] = { ...products[index], quantity: 1 };
    } else {
        listCards[index].quantity++;
    }
    reloadCard();
}

function reloadCard() {
    listCardsContainer.innerHTML = ''; 
    let count = 0;
    let totalPrice = 0;

    for (const key in listCards) {
        const item = listCards[key];
        if (item) {
            totalPrice += item.price * item.quantity;
            count += item.quantity;

            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="img/${item.image}" alt="${item.name}"/></div>
                <div>${item.name}</div>
                <div>${item.price.toLocaleString()}</div>
                <div>${item.quantity}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${item.quantity - 1})">-</button>
                    <div class="count">${item.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${item.quantity + 1})">+</button>
                </div>
            `;
            listCardsContainer.appendChild(newDiv);
        }
    }

    total.innerText = totalPrice.toLocaleString(); 
    quantityDisplay.innerText = count;
}

function changeQuantity(key, newQuantity) {
    if (newQuantity <= 0) {
        delete listCards[key];
    } else if (listCards[key]) {
        listCards[key].quantity = newQuantity; 
    }
    reloadCard(); 
}
