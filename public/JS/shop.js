const gridDiv = document.querySelector('.grid')

window.addEventListener('DOMContentLoaded', loadProducts);

async function loadProducts(e) {
    try {
        // getiing all prodcts from db
        let result = await axios.get('http://localhost:3000/shop/allProducts');

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
        ${product.title}
    </h1>
</header>
<div class="card__image">
    <img src="${product.imageUrl}" alt="${product.title}">
</div>
<div class="card__content">
    <h2 class="product__price">$
        ${product.price}
    </h2>
    <p class="product__description">
        ${product.description}
    </p>
</div>
<div class="card__actions">
    <a href="shop/product/${product._id}" class="btn">Details</a>
</div>`

    return artcl
}