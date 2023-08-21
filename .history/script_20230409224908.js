let productsApi = 'http://localhost:3000/products';

function start() {
    getProducts()
}

start();

//lay ra san pham

function getProducts() {
    var product = document.querySelector('.product');
     
    fetch(productsApi)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            
        })
}