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

    createBtn.onclick
}