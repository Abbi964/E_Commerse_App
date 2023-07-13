const gridDiv = document.querySelector('.grid')

window.addEventListener('DOMContentLoaded', loadProducts);

async function loadProducts(e) {
    try {
        let token = localStorage.getItem('token')
        // getiing prodcts from db(created by admin)
        let result = await axios.get('http://localhost:3000/shop/AllProducts');

        if (result.data.success) {
            // showing them on display
            result.data.products.forEach((prod) => {
                let article = makeArticle(prod)
                gridDiv.appendChild(article)
            })
        }

    }
    catch (err) {
        console.log(err)
    }
}

//-------- for addtocart option
gridDiv.addEventListener('click',async(e)=>{
    try{
        let token = localStorage.getItem('token')
        // if add to cart btn is clicked 
        if(e.target.className == 'addToCart btn'){
            let prodId = e.target.id
            let result = await axios.post('http://localhost:3000/shop/addToCart',{productId : prodId},{headers : {'Authorization' : token}})

            if(result.data.success){
                window.location.href = '/shop/cart'
            }
            else{
                alert(result.data.msg)
            }
        }

    }
    catch(err){
        console.log(err)
    }
})


//-------------------------------------------------------------------//

function makeArticle(product) {
    let token = localStorage.getItem('token')

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
    <button class="addToCart btn" id="${product._id}" type="button">Add to Cart</button>
</div>`

    return artcl
}