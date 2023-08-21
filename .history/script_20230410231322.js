let productsApi = 'http://localhost:3000/products';

function start() {
    getProducts(renderProducts);

    handleCreateForm(createProduct)
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

// POST request to create a new product
function createProduct(product, callback) {
    fetch(productsApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
    .then(function(response) {
      return response.json();
    })
    .then(callback);
  }
  
  // Handle form submission to create a new product
  function handleCreateForm() {
    var createForm = document.querySelector('#create-form');
    console.log(createForm)

  
    createForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      // Get input values
      var title = document.querySelector('input[name="title"]').value;
      var image = document.querySelector('input[name="image"]').value;
      var price = document.querySelector('input[name="price"]').value;
      var description = document.querySelector('textarea[name="description"]').value;
  
      // Create new product object
      var newProduct = {
        title: title,
        image: image,
        price: price,
        description: description
      };
  
      // Send POST request to create new product
      createProduct(newProduct, function() {
        // Refresh the product list
        getProducts(renderProducts);
        
        // Clear form inputs
        createForm.reset();
      });
    });
  }