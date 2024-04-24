// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
const products = [
    {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]

// => Reminder, it's extremely important that you debug your code. 
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster. 
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

// Exercise 1
function buy(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array

    let productToAdd = products.find(product => product.id === id);

    if (productToAdd) {
    
        let existingProduct = cart.find(item => item.id === id);

        if (existingProduct) {
            
            existingProduct.quantity++;
        } else {
   
            cart.push({
                id: productToAdd.id,
                name: productToAdd.name,
                price: productToAdd.price,
                quantity: 1
            });
        }

        total += productToAdd.price;

        updateCartCount()
        calculateTotal()
        applyPromotionsCart()
        

        return cart;
    } else {
        return null;
    }
}

// Exercise 2
function cleanCart() {

    cart = [];
    total = 0;
    window.alert('Cart cleaned!');
    window.location.reload();

    console.log(cart); // Debugging

    return cart;

}

// Exercise 3
function calculateTotal() {

    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
    });

    console.log(totalPrice); // Debugging

    return totalPrice;
}

// Exercise 4
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"
    
    cart.forEach(item => {
     
        const product = products.find(p => p.id === item.id);
        
        if (product && product.offer) {
            
            if (product.offer.number && item.quantity >= product.offer.number) {
               
                const discountPercent = product.offer.percent / 100;
                item.subtotalWithDiscount = (item.price * item.quantity) * (1 - discountPercent);
            }
        }
    });
}

// Exercise 5
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom

    const cartList = document.getElementById('cart_list');
    const totalPriceElement = document.getElementById('total_price');
    let totalPrice = 0; 

    cartList.innerHTML = '';

    cart.forEach(item => {
        const row = document.createElement('tr');

     
        const nameCell = document.createElement('th');
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

 
        const priceCell = document.createElement('td');
        priceCell.textContent = `$${item.price.toFixed(2)}`;
        row.appendChild(priceCell);

   
        const quantityCell = document.createElement('td');
        quantityCell.textContent = item.quantity;
        row.appendChild(quantityCell);

        let subtotal;
        if (item.subtotalWithDiscount) {
            subtotal = item.subtotalWithDiscount;
        } else {
            subtotal = item.price * item.quantity;
        }
      
        const subtotalCell = document.createElement('td');
        subtotalCell.textContent = `$${subtotal.toFixed(2)}`;
        row.appendChild(subtotalCell);
 
        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.onclick = removeFromCart.bind(null, item.id);
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);
    
        totalPrice += subtotal;

        cartList.appendChild(row);
    });

    totalPriceElement.textContent = `${totalPrice.toFixed(2)}`;
}



//BONUS 

function updateCartCount() {
    const countElement = document.getElementById('count_product');
    let totalCount = 0;
    cart.forEach(item => {
        totalCount += item.quantity;
    });
    countElement.textContent = totalCount.toString();
}


// ** Nivell II **

// Exercise 7
function removeFromCart(id) {

    const index = cart.findIndex(item => item.id === id);

    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }

        total -= products.find(product => product.id === id).price;

        applyPromotionsCart();
        printCart();
    }

}

function open_modal() {
    printCart();

    if (cart.length === 0) {
        document.getElementById('empty_cart_message').style.display = 'block';
    } else {
        document.getElementById('empty_cart_message').style.display = 'none';
    }

    $('#cartModal').modal('show');
}