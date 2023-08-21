let productsApi = 'http://localhost:3000/products';

function start() {
    getProducts(renderProducts);

    handleCreateForm()
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

function createProduct(data) {
    var options = {
        method: 'POST',
        body: JSON.stringify(data)
    }
    fetch(productsApi, options)
        .then(function(response) {
            response.json();
        })
        
}


//show du lieu ra man hinh
function renderProducts(products) {
    var listProducts = document.querySelector('.products');

    var htmls = products.map(function(product) {
        return `
        <div class="product">
            <h3 class="product-name">${product.title}</h3>
            <img src="${product.image}" class="product-img">
            <spam class="product-price">${product.price}đ</spam>
            <span class="product-description">${product.description}</span>
        </div>`
        
    })

    listProducts.innerHTML = htmls.join('');
}

function handleCreateForm() {
    var createBtn = document.querySelector('#create');

    createBtn.onclick = function() {
        var title = document.querySelector('input[name="title"]').value;
        var image = document.querySelector('input[name="image"]').value;
        var price = document.querySelector('input[name="price"]').value;
        var description = document.querySelector('input[name="description"]').value;
        
        
    }
}