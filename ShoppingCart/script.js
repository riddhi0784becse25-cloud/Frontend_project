const products = [
    { name: "Aesthetic Bag", price: 1500, image: "https://i.pinimg.com/736x/fd/e5/8a/fde58a375f5611a79e3c301799d9ce95.jpg" },
    { name: "Celine Glasses", price: 2500, image: "https://i.pinimg.com/736x/2c/cb/46/2ccb46207e33635925e5ec934a35428c.jpg" },
    { name: "Stanley Tumbler", price: 3200, image: "https://i.pinimg.com/736x/ff/35/82/ff35823cb6f006ebec5fdd8121a190f9.jpg" },
    { name: "Men Loafers", price: 4500, image: "https://i.pinimg.com/1200x/d3/ed/81/d3ed811c28ac2920a994cd1fb6a3a1bf.jpg" },
    { name: "Women Slides", price: 1799, image: "https://i.pinimg.com/736x/a2/38/73/a23873ad6e2a59cf3e9b6f97d8f72f6d.jpg" },
    { name: "Men Jacket", price: 2999, image: "https://i.pinimg.com/736x/a0/da/0b/a0da0b2f4719c4f9c01bbd55a76995d5.jpg" }
];

let cart = [];
let gameChances = 2;
let flippedCards = [];
let reward = false;

/* PAGE SWITCH */
function showPage(id){
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');

    if(id === 'cart-page'){
        renderCart();
    }
}

/* PRODUCTS */
function renderProducts(list=products){
    document.getElementById("products-display").innerHTML =
    list.map((p,i)=>`
    <div class="product-item">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${i})">Add</button>
    </div>`).join('');
}

/* ADD TO CART */
function addToCart(index) {
    const item = products[index];
    const found = cart.find(c => c.name === item.name);

    if(found) {
        found.quantity++;
    } else {
        cart.push({...item, quantity: 1});
    }

    updateCartCount();
}

/* COUNT */
function updateCartCount() {
    document.getElementById("cart-count").innerText =
        cart.reduce((sum, item) => sum + item.quantity, 0);
}

/* CART */
function renderCart() {
    const display = document.getElementById("cart-display");

    if(cart.length === 0) {
        display.innerHTML = "Your cart is empty.";
        document.getElementById("summary-box").innerHTML = "";
        return;
    }

    display.innerHTML = cart.map((item, i) => `
        <div class="cart-row">
            <span>${item.name}</span>

            ${item.price === 0 ? `
                <span style="color:green;">🎁 Gift</span>
            ` : `
                <div>
                    <button onclick="changeQty(${i}, -1)">-</button>
                    ${item.quantity}
                    <button onclick="changeQty(${i}, 1)">+</button>
                </div>
            `}
        </div>
    `).join('');

    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    let discount = 0;
    if(total >= 4000) discount = 20;
    else if(total >= 3000) discount = 15;
    else if(total >= 2000) discount = 10;
    else if(total >= 1000) discount = 5;

    let discountAmount = (total * discount) / 100;
    let finalTotal = total - discountAmount;

    document.getElementById("summary-box").innerHTML = `
        <h3>Total: ₹${total}</h3>

        ${total < 5000 && discount > 0 ? `
            <p style="color:green;">Discount ${discount}% (-₹${discountAmount})</p>
            <h2>Final: ₹${finalTotal}</h2>
        ` : `<h2>Total Payable: ₹${total}</h2>`}

        <button onclick="handleCheckout(${finalTotal}, ${total})">Checkout</button>
    `;
}

/* QTY */
function changeQty(i,val){
    cart[i].quantity+=val;
    if(cart[i].quantity<=0) cart.splice(i,1);
    renderCart();
    updateCartCount();
}

/* CHECKOUT */
function handleCheckout(finalTotal, total) {

    if(cart.length === 0){
        alert("Cart is empty!");
        return;
    }

    if(total >= 5000 && !reward){
        showPage('game-page');
        setupGame();
    } 
    else {
        alert("✅ Order Placed!");
    }
}

/* GAME SETUP */
function setupGame() {
    gameChances = 2;
    flippedCards = [];

    document.getElementById("chance-text").innerText = "Chances: 2";

    const board = document.getElementById("game-board");
    board.innerHTML = "";

    let items = cart.slice(0, 2);

    while(items.length < 2) {
        let random = products[Math.floor(Math.random() * products.length)];
        if(!items.find(i => i.name === random.name)) {
            items.push(random);
        }
    }

    let deck = [...items, ...items].sort(() => Math.random() - 0.5);

    deck.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.name = item.name;

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">?</div>
                <div class="card-back">
                    <img src="${item.image}">
                </div>
            </div>
        `;

        card.onclick = () => flipCard(card, item);
        board.appendChild(card);
    });
}

/* FLIP CARD */
function flipCard(card, item) {
    if(flippedCards.length < 2 && !card.classList.contains("flipped")) {

        card.querySelector(".card-inner").classList.add("flip");
        card.classList.add("flipped");

        flippedCards.push({card, item});

        if(flippedCards.length === 2) {
            setTimeout(checkMatch, 700);
        }
    }
}

/* CHECK MATCH */
function checkMatch() {
    const [c1, c2] = flippedCards;

    if(c1.item.name === c2.item.name) {

        if(!reward) {
            alert("🎉 You won a Chocolate!");

            cart.push({
                name: "Chocolate",
                price: 0,
                quantity: 1
            });

            reward = true;
        }

        showPage('cart-page');
        renderCart();

    } else {
        gameChances--;

        document.getElementById("chance-text").innerText =
            "Chances: " + gameChances;

        c1.card.querySelector(".card-inner").classList.remove("flip");
        c2.card.querySelector(".card-inner").classList.remove("flip");

        c1.card.classList.remove("flipped");
        c2.card.classList.remove("flipped");

        if(gameChances === 0) {
            alert("😢 Better luck next time!");
            showPage('cart-page');
        }
    }

    flippedCards = [];
}

/* SEARCH */
function searchProduct(){
    let q=document.getElementById("search-box").value.toLowerCase();
    renderProducts(products.filter(p=>p.name.toLowerCase().includes(q)));
}

/* INIT */
renderProducts();
