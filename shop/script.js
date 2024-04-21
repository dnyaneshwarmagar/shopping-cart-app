let current_user = JSON.parse(localStorage.getItem("current_user"));

let productsArray = [];

if (current_user) {
  
  if (JSON.parse(localStorage.getItem("products"))) {

    let products = JSON.parse(localStorage.getItem("products"));
    productsArray = [...products];
    console.log('productsArray:', productsArray)
    renderProducts(productsArray)

  } else {
    fetch("https://fakestoreapi.com/products").then((response) => response.json()).then((data) => {
      console.log('products:', data);
      let products = modifyData(data);
      console.log('products:', products);
      productsArray = [...products];
      renderProducts(productsArray)
      localStorage.setItem("products", JSON.stringify(products));
    }).catch((error) => {
      console.log(error)
    })

  }
}
else {
  window.location.href = "./../login"
}

function renderProducts(products){
 
  let mens_products_div = document.getElementById("mens_products_div");
  mens_products_div.innerHTML = "";
  let womens_products_div = document.getElementById("womens_products_div");
  womens_products_div.innerHTML = "";
  let jewellary_products_div = document.getElementById("jewellary_products_div");
  jewellary_products_div.innerHTML = "";
  let electronics_products_div = document.getElementById("electronics_products_div");
  electronics_products_div.innerHTML = "";
  
  products.forEach((product)=>{
    if(product.category === "men's clothing"){
      let div = document.createElement("div");
      div.setAttribute("class","item");
      div.innerHTML = `
      <img src="${product.image}" alt="Item" />
      <div class="product_title">${product.title}</div>
              <div class="info">
                <div class="row">                 
                  <div class="price">$${product.price}</div>
                  <div class="sized">${product.sizes.reverse().join(",")}</div>
                </div>
                <div class="colors">
                  Colors:
                  ${getColors(product.colors)}
                </div>
                <div class="row1">Rating:${getStars(product.rating.rate)}</div>
              </div>
              <button id="addBtn" onclick="handleAddToCart(${product.id})">Add to Cart</button>
      `
      mens_products_div.append(div)
    }
    else if(product.category === "women's clothing"){
      let div = document.createElement("div");
      div.setAttribute("class","item");
      div.innerHTML = `
      <img src="${product.image}" alt="Item" />
      <div class="product_title">${product.title}</div>
              <div class="info">
                <div class="row">
                  <div class="price">$${product.price}</div>
                  <div class="sized">${product.sizes.reverse().join(",")}</div>
                </div>
                <div class="colors">
                  Colors:
                  ${getColors(product.colors)}
                </div>
                <div class="row1">Rating:${getStars(product.rating.rate)}</div>
              </div>
              <button id="addBtn" onclick="handleAddToCart(${product.id})">Add to Cart</button>
      `
      womens_products_div.append(div);
    }
    else if(product.category === "jewelery"){
      let div = document.createElement("div");
      div.setAttribute("class","item");
      div.innerHTML = `
      <img src="${product.image}" alt="Item" />
      <div class="product_title">${product.title}</div>
              <div class="info">
                <div class="row">
                  <div class="price">$${product.price}</div>
                  <div class="sized">${product.sizes.reverse().join(",")}</div>
                </div>
                <div class="colors">
                  Colors:
                  ${getColors(product.colors)}
                </div>
                <div class="row1">Rating:${getStars(product.rating.rate)}</div>
              </div>
              <button id="addBtn" onclick="handleAddToCart(${product.id})">Add to Cart</button>
      `
      jewellary_products_div.append(div);
    }
    else if(product.category === "electronics"){
      let div = document.createElement("div");
      div.setAttribute("class","item");
      div.innerHTML = `
      <img src="${product.image}" alt="Item" />
      <div class="product_title">${product.title}</div>
              <div class="info">
                <div class="row">
                  <div class="price">$${product.price}</div>
                  <div class="sized">${product.sizes.reverse().join(",")}</div>
                </div>
                <div class="colors">
                  Colors:
                  ${getColors(product.colors)}
                </div>
                <div class="row1">Rating:${getStars(product.rating.rate)}</div>
              </div>
            <button id="addBtn" onclick="handleAddToCart(${product.id})">Add to Cart</button>
      `
      electronics_products_div.append(div)
    }
  });
}


function handleAddToCart(id){
  console.log('id:', id);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({id})
  // console.log('cart:', cart)
  localStorage.setItem("cart",JSON.stringify(cart));
  alert("ITEM ADDED TO CART!")
}
document.getElementById("search_input").addEventListener("blur",()=>{
  document.getElementById("search_input").value = "";
})
document.getElementById("search_input").addEventListener("input",()=>{
  let searchStr = document.getElementById("search_input").value;
  debouncedSearch(searchStr)
});
function performSearch(searchStr){ 
  let newArray = productsArray.filter((product)=> product.title.toLowerCase().includes(searchStr.toLowerCase()));
  renderProducts(newArray)
  // console.log("hit");
}
const debouncedSearch = debounce(performSearch, 1000);

function debounce(func, delay) {
  let timeout=null
  return (...args) => {
      if(timeout) clearTimeout(timeout)

      timeout = setTimeout(() => {
          func(...args)
          timeout=null
      }, delay)
  }
}

let filterElements = document.querySelectorAll(".filter");

filterElements.forEach((element)=>{
  element.addEventListener("click",()=>{

    let filterElements = document.querySelectorAll(".filter");
    filterElements.forEach((element)=>{
    element.classList.remove("active");
    })

    element.classList.add("active")
    if(element.getAttribute("value") === "all"){
      renderProducts(productsArray);

    }else{
      let newArray = productsArray.filter((product)=> product.category === element.getAttribute("value"));
      renderProducts(newArray);
    }
  })
})


function modifyData(array) {
  let colors = ["red", "green","black", "white","blue"];
  let sizes = ["XL", "L", "M", "S"];

  let newData = array.map((product) => {
    product.colors = colors.slice(Math.random() * colors.length);
    product.sizes = sizes.slice(Math.random() * sizes.length);
    return product;
  });

  return newData;
}

function getColors(colorsArray){
  let div1 = document.createElement("div");
  let div = document.createElement("div");
  div.innerHTML = ``;
  div.setAttribute("class","row")
  for(let i=0; i< colorsArray.length; i++){
    div.innerHTML += `<div class="circle" style="background-color:${colorsArray[i]}"></div>`
  }
  div1.append(div);
  return div1.innerHTML;
}

function getStars(rating){
  let div1 = document.createElement("div");
  let div = document.createElement("div");
  div.innerHTML = ``;
  // div.setAttribute("class","row1")
  for(let i=0; i< Math.ceil(rating); i++){
    div.innerHTML += `<img class="img1" src="./star.png" alt="star_img">`
  }
  div1.append(div);
  return div1.innerHTML;
}

let filterArray = [];
let ratingValue = null;
document.getElementById("range").addEventListener("input",(e)=>{
  let value = Number(e.target.value);
    ratingValue = value;
})

var inputCheckboxElements = document.querySelectorAll('input[type="checkbox"]');

inputCheckboxElements.forEach((element)=>{

  element.addEventListener("click",(e)=>{
    console.log("clicked checkbox",e.target.checked,e.target.value);
    let flag = e.target.checked;  
    if(flag){
      filterArray.push(e.target.value);
    }
    else{
      filterArray = filterArray.filter((item)=> item !== e.target.value)
    }
  });
});

document.getElementById("aside_filter_btn").addEventListener("click",applyFilters)

function applyFilters(){
  let newArray = [];
  console.log('newArray:', newArray)

  function checkIfPresentAlready(filteredArray){
    filteredArray.forEach((product)=>{
      let arr = newArray.filter((obj)=> obj.id === product.id);
      console.log('arr:', arr)
      if(arr.length === 0){
        newArray.push(product)
      }
    })
  }

  if(ratingValue === 5){
    let filteredArray = productsArray.filter((product)=> Math.ceil(product.rating.rate) <= 5);
    checkIfPresentAlready(filteredArray);
  };
  if(ratingValue === 4 ){
    let filteredArray = productsArray.filter((product)=> Math.ceil(product.rating.rate) <= 4);
    checkIfPresentAlready(filteredArray);

  };
  if(ratingValue === 3 ){
    let filteredArray = productsArray.filter((product)=> Math.ceil(product.rating.rate) <= 3);
    checkIfPresentAlready(filteredArray);

  };
  if(ratingValue === 2 ){
    let filteredArray = productsArray.filter((product)=> Math.ceil(product.rating.rate) <= 2);
    checkIfPresentAlready(filteredArray);

  };
  if(ratingValue === 1 ){
    let filteredArray = productsArray.filter((product)=> Math.ceil(product.rating.rate) <= 1);
    checkIfPresentAlready(filteredArray);

  };

  console.log("dfsdaf",filterArray);
  filterArray.forEach((item)=>{
    console.log('item:', item)
    if(item === "red"){
      let filteredArray = productsArray.filter((product)=> product.colors.includes("red"));
      checkIfPresentAlready(filteredArray);
    }
    if(item === "green"){
      let filteredArray = productsArray.filter((product)=> product.colors.includes("green"));
      console.log('filteredArray:', filteredArray)
      checkIfPresentAlready(filteredArray);
    }
    if(item === "black"){
      let filteredArray = productsArray.filter((product)=> product.colors.includes("black"));
      checkIfPresentAlready(filteredArray);
    }
    if(item === "white"){
      let filteredArray = productsArray.filter((product)=> product.colors.includes("white"));
      checkIfPresentAlready(filteredArray);
    }
    if(item === "blue"){
      let filteredArray = productsArray.filter((product)=> product.colors.includes("blue"));
      checkIfPresentAlready(filteredArray);
    }

    if(item === "S"){
      let filteredArray = productsArray.filter((product)=> product.sizes.includes("S"));
      checkIfPresentAlready(filteredArray);
    }
    if(item === "M"){
      let filteredArray = productsArray.filter((product)=> product.sizes.includes("M"));
      checkIfPresentAlready(filteredArray);
    }
    if(item === "L"){
      let filteredArray = productsArray.filter((product)=> product.sizes.includes("L"));
      checkIfPresentAlready(filteredArray);
    }
    if(item === "XL"){
      let filteredArray = productsArray.filter((product)=> product.sizes.includes("XL"));
      checkIfPresentAlready(filteredArray);
    }
    if(item === "0-25"){
      let filteredArray = productsArray.filter((product)=> product.price >= 0 && product.price < 25);
      checkIfPresentAlready(filteredArray);
    }
    if(item === "25-50"){
      let filteredArray = productsArray.filter((product)=> product.price >= 25 && product.price < 50);
      checkIfPresentAlready(filteredArray);
    }
    if(item === "50-100"){
      let filteredArray = productsArray.filter((product)=> product.price >= 50 && product.price < 100);
      checkIfPresentAlready(filteredArray);
    }
    if(item === "100on"){
      let filteredArray = productsArray.filter((product)=> product.price >= 100 );
      checkIfPresentAlready(filteredArray);
    }
    
  })
  console.log('newArray:', newArray)

  renderProducts(newArray)

}



