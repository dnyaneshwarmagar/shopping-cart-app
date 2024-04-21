let current_user = JSON.parse(localStorage.getItem("current_user"));
console.log('current_user:', current_user)
if(!current_user){
    window.location.href = "./../index.html";
   alert("kindly login or signup!");
}

let cartArray = []

function getCartItems(){
    let productsArray = JSON.parse(localStorage.getItem("products"));

    let cartItems = JSON.parse(localStorage.getItem("cart"));
    console.log('cartItems:', cartItems)

    if(cartItems.length === 0){
        let cart_div = document.getElementById("cart_div");
        cart_div.innerHTML = "<h1>No items added In the cart</h1>";
        return;
    }
    cartItems.forEach(item => {
        let product = productsArray.filter((product)=> product.id === item.id);
        cartArray.push(product[0]);
    });  

    renderCartItems(cartArray)
    renderList(cartArray)
}

getCartItems();

function renderCartItems(cartArray){
    let cart_div = document.getElementById("cart_div");
    cart_div.innerHTML = "";
    cartArray.forEach((product)=>{
        let div = document.createElement("div");
        div.innerHTML = `
        <img src="${product.image}" alt="img">
        <div>Title: <span>${product.title.substring(0,60)}</span></div>
        <div>Price: <span>$${product.price}</span></div>
        <button onclick="handleRemoveFromCart(${product.id})">Remove From Cart</button>
        `
        cart_div.append(div);
    });
    
}

function handleRemoveFromCart(id){
    console.log("click handle",id);
     cartArray = cartArray.filter((product)=> product.id !== id);
     renderCartItems(cartArray);
     renderList(cartArray);
     localStorage.setItem("cart",JSON.stringify(cartArray))
}

function renderList(cartArray){
    let list_div = document.getElementById("list_div");
    list_div.innerHTML = "";
    let total = 0;
    cartArray.forEach((product,index)=>{
        let div = document.createElement("div");
        div.innerHTML = `
        <span>${index+1}. ${product.title.length> 24?product.title.substring(0,24) +"...": product.title}</span>
        <span>$${product.price}</span>
        `

        list_div.append(div);
        total += product.price;
    });

    let total_div = document.getElementById("total_div");

    total_div.innerHTML = `
    <span>Total:</span>
        <span>$${total}</span>`;

    localStorage.setItem("total_cart_value",JSON.stringify(total))
}

document.getElementById("checkout_btn").addEventListener("click",()=>{
    window.location.href = "/razorpay/index.html"
})