let productsApi = 'http://localhost:3000/products';

function start() {
    getProducts(renderProducts);

    handleCreateForm();
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

function createProduct(data, callback) {
    var options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          }
    };
    fetch(productsApi, options)
        .then(function(response) {
            response.json();
        })
        .then(callback);

}

function handleDeleteProduct(id) {
    var options = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          }
    };
    fetch(productsApi + '/' + id, options)
        .then(function(response) {
            response.json();
        })
        .then(function() {
           var productItem = document.querySelector('.product-item-' + id);
           if(productItem) {
            productItem.remove();
           }
        });
}


//show du lieu ra man hinh
function renderProducts(products) {
    var listProducts = document.querySelector('.products');

    var htmls = products.map(function(product) {
        return `
        <div class="product product-item-${product.id}">
            <h3 class="product-name">${product.title}</h3>
            <img src="${product.image}" class="product-img">
            <span class="product-price">${product.price}đ</span>
            <span class="product-description">${product.description}</span>
            <div class="btn">
                <button onclick="handleDeleteProduct(${product.id})" class="delete-btn">Delete</button>
                <button onclick="handleUpdateProduct()" class="update-btn" id="update">Update</button>               
            </div>
        </div>`
        
    })

    listProducts.innerHTML = htmls.join('');
}

function handleCreateForm() {
    var createBtn = document.querySelector('#create');

    createBtn.onclick = function() {
        var title = document.querySelector('input[name="title"]');
        var image = document.querySelector('input[name="image"]');
        var price = document.querySelector('input[name="price"]');
        var description = document.querySelector('input[name="description"]');
        
        var formData = {
            title: title,
            image: image,
            price: price,
            description: description
        }

        createProduct(formData, function() {
            getProducts(renderProducts);
        });
        
    }
}

// Update Form
function handleUpdateProduct(id) {    
    //click vao updateBtn de lay ra formUpdate
    var formUpdate = document.querySelector('.form-update');
    var updateIcon = document.querySelector('.update-icon');
    var modal = document.querySelector('.modal')
    // console.log(updateIcon)

    //Show and hide form
    formUpdate.classList.add('open');
    updateIcon.onclick = function hideFormUpdate() {
        formUpdate.classList.remove('open');
    }

    // lauy du lieu va sua form
    var handleUpdate  = function() {
        getProducts()
        var inputTitleEdit = document.querySelector('input[name="titleEdit"]');
        inputTitleEdit.value = document.querySelector(`product-item-${id} .product-name`).innerHTML ;
        
    
        var inputImageEdit = document.querySelector('input[name="imageEdit"]');
        inputImageEdit.value = document.querySelector(`product-item-${id} .product-img`).innerHTML ;
        
        var inputPriceEdit = document.querySelector('input[name="priceEdit"]');
        inputPriceEdit.value = document.querySelector(`product-item-${id} .product-price`).innerHTML;
    
        var inputDescriptionEdit = document.querySelector('input[name="descriptionEdit"]');
        inputDescriptionEdit.value = document.querySelector(`product-item-${id} .product-descriptionEdit`).innerHTML ;
    }
    

    
    // console.log(updateBtn)
    var saveUpdateBtn = document.querySelector('#saveUpdate');
    saveUpdateBtn.onclick = function() {
        let data = new HandleUpdate {
            inputTitleEdit: inputTitleEdit,
            inputImageEdit:inputImageEdit,
            inputPriceEdit:inputPriceEdit,
            inputDescriptionEdit:inputDescriptionEdit
        }
        var options = {
            method: 'PUT',
            
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        };
        fetch(productsApi + '/' + id, options)
            .then(function(response) {
                response.json();
            })
            .then(function() {
                // getProducts()
                var inputTitleEdit = document.querySelector('input[name="titleEdit"]');
                var inputImageEdit = document.querySelector('input[name="imageEdit"]');
                var inputPriceEdit = document.querySelector('input[name="priceEdit"]');
                var inputDescriptionEdit = document.querySelector('input[name="descriptionEdit"]');
            
                
                document.querySelector(`product-item-${id} .product-name`).innerHTML = inputTitleEdit.value;
                document.querySelector(`product-item-${id} .product-name`).innerHTML = inputImageEdit.value;
                document.querySelector(`product-item-${id} .product-price`).innerHTML = inputPriceEdit.value;
                document.querySelector(`product-item-${id} .product-description`).innerHTML = inputDescriptionEdit.value;
            
                formUpdate.style.display = "none";
            })
        }

        // console.log(updateBtn)
}


// handleUpdateProduct()


