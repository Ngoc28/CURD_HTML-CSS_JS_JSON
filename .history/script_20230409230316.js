let productsApi = 'http://localhost:3000/products';

function start() {
    getProducts(renderProducts)
}

start();

//lay ra san pham

function getProducts(callback) {
    
    fetch(productsApi)
    .then(function(response) {
        return response.json();
    })
    .then(callback);
}



function renderProducts(products) {
    var listProducts = document.querySelector('.products');

    var htmls = products.map(function(product) {
        return `
        <div class="product">
        <h3 class="product-name">${product.title}</h3>
        <img src="${product.image}">
        <spam class="product-price">${product.price}</spam>
        <span class="product-description">${product.description}</span>
        </div>`
        
    })

    listProducts.innerHTML = htmls.join('');
}