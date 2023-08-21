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
        var title = document.querySelector('input[name="title"]').value;
        var image = document.querySelector('input[name="image"]').value;
        var price = document.querySelector('input[name="price"]').value;
        var description = document.querySelector('input[name="description"]').value;
        
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
function handleUpdateProduct(id, name, description) {    
    //click vao updateBtn de lay ra formUpdate
    var formUpdate = document.querySelector('.form-update');
    var updateIcon = document.querySelector('.update-icon')
    // console.log(updateIcon)

    //Show and hide form
    formUpdate.classList.add('open');
    updateIcon.onclick = function hideFormUpdate() {
        formUpdate.classList.remove('open');
    }

    var titleEdit = document.querySelector('input[name="titleEdit"]');
    titleEdit.value = document.querySelector(`product-item-${id} h3`).innerHTML;

    var imageEdit = document.querySelector('input[name="imageEdit"]');
    imageEdit.value = document.querySelector(`product-item-${id} img`).innerHTML;
    
    var priceEdit = document.querySelector('input[name="priceEdit"]');
    priceEdit.value = document.querySelector(`product-item-${id} span`).innerHTML;

    var descriptionEdit = document.querySelector('input[name="descriptionEdit"]');
    descriptionEdit.value = document.querySelector(`product-item-${id} span`).innerHTML;

    var updateBtn = document.querySelector('#update');
    updateBtn = function() {
        let data = {
            titleEdit: titleEdit.value,
            imageEdit: imageEdit.value,
            priceEdit: priceEdit.value,
            descriptionEdit: descriptionEdit.value,
        };
        var options = {
            method: 'PUT',
            body: JSON.stringify(data),
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
                titleEdit.value = document.querySelector(`product-item-${product.id} h3`).innerHTML;
                imageEdit.value = document.querySelector(`product-item-${product.id} img`).innerHTML;
                priceEdit.value = document.querySelector(`product-item-${product.id} span`).innerHTML;
                descriptionEdit.value = document.querySelector(`product-item-${product.id} span`).innerHTML;
                formUpdate.getElementsByClassName.display = "none";
            });
        }
}


// handleUpdateProduct()


