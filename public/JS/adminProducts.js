const gridDiv = document.querySelector('.grid')

window.addEventListener('DOMContentLoaded', loadProducts);

async function loadProducts(e) {
    try {
        let token = localStorage.getItem('token')
        // getiing prodcts from db(created by admin)
        let result = await axios.get('http://localhost:3000/admin/adminProducts', { headers: { 'Authorization': token } });

        if (result.data.success) {
            // showing them on display
            result.data.products.forEach((prod) => {
                let article =  makeArticle(prod)
                gridDiv.appendChild(article)
            })
        }

    }
    catch (err) {
        console.log(err)
    }
}


//---------------------------------------------------//

function makeArticle(product) {
    let artcl = document.createElement('article');
    artcl.className = 'card product-item'
    artcl.innerHTML = `<header class="card__header">
    <h1 class="product__title">
        ${product.productId.title}
    </h1>
</header>
<div class="card__image">
    <img src="${product.productId.imageUrl}" alt="${product.productId.title}">
</div>
<div class="card__content">
    <h2 class="product__price">$
        ${product.productId.price}
    </h2>
    <p class="product__description">
        ${product.productId.description}
    </p>
</div>
<div class="card__actions">
    <a href="/admin/edit-product/${product.productId._id}" class="btn">Edit</a>
    <form action="/admin/delete-product" method="POST">
        <input type="hidden" value="${product.productId._id}" name="productId">
        <button class="btn" type="submit">Delete</button>
    </form>

</div>`

    return artcl
}