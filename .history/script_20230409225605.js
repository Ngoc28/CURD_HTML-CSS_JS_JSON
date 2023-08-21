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
    var product = document.querySelector('.product');

    var htmls = `
    <h3 class="product-name">${products.title}</h3>
    <img src="https://cdn.tgdd.vn/Products/Images/2947/190310/bhx/sua-trai-cay-nutriboost-huong-cam-297ml-202202122134380628.jpg" alt="" class="product-img">
    <spam class="product-price">18.000</spam>
    <span class="product-description">Nutriboost là thức uống dinh dưỡng kết hợp sữa và nước trái cây thơm ngon, giúp bạn luôn tràn năng lượng cho một ngày làm việc hiệu quả.</span>
    `
}