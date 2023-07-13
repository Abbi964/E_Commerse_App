const cartItemUl = document.querySelector('.cart__item-list');

window.addEventListener('DOMContentLoaded',loadCart);

async function loadCart (e){
    let token = localStorage.getItem('token')
    // getting cart items
    let result = await axios.get('http://localhost:3000/shop/cartItems',
    {headers: { 'Authorization': token } });

    result.data.cartItems.forEach((item)=>{
        // making a li and appending to UL
        let itemLi = makeItemLi(item);
        cartItemUl.appendChild(itemLi);
    })
}

cartItemUl.addEventListener('click',async(e)=>{
    try{
        let token = localStorage.getItem('token')
        // if delete clicked removing item from cart
        if(e.target.className == 'btn danger delete'){
            let productId = e.target.id;
            let result = await axios.post('http://localhost:3000/shop/cart-delete-item',{productId},
            {headers: { 'Authorization': token } });
    
            if(result.data.success){
                // removing from DOM
                let li =  e.target.parentElement;
                li.remove()
            }
        }
    }
    catch(err){
        console.log(err)
    }
})




///////-----------------------------------------------------////

function makeItemLi(item){
    let itemLi = document.createElement('li')
    itemLi.innerHTML = `<h1>${item.productId.title}</h1>
    <h2>Quantity: ${item.quantity}</h2>
    <button class="btn danger delete" id="${item.productId._id}" type="button">Delete</button>`

    return itemLi
}