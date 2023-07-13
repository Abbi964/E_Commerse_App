const orderUl = document.querySelector('.orders');

// loading orders

window.addEventListener('DOMContentLoaded', loadOrders)

async function loadOrders(e) {
    try {
        // getting all orders of user
        let token = localStorage.getItem('token');

        let result = await axios.get('http://localhost:3000/shop/getAllOrders',
            { headers: { 'Authorization': token } });

        if (result.data.success) {
            // showing orders on display
            result.data.orders.forEach((order) => {
                let li = makeOrderLi(order)
                orderUl.appendChild(li)
            })
        }


    }
    catch (err) {
        console.log(err)
    }
}



//-------------------------------------------------------//

function makeOrderLi(order) {
    let odrLi = document.createElement('li');
    odrLi.className = 'orders__item'
    // making a ul inside odrLi
    let prodUl = document.createElement('ul');
    prodUl.className = 'orders__products'

    // appending product info for each product
    order.products.forEach((product)=>{
        let li = document.createElement('li');
        li.className = 'orders__products-item'
        li.innerHTML = `${product.productId.title} ( ${product.quantity} )`
        prodUl.appendChild(li)
    })

    // appending ul to odrLi
        // but before that appending heading to it
        let h1 = document.createElement('h1');
        h1.innerHTML = `Order - #  ${order._id} `
        odrLi.appendChild(h1)
    odrLi.appendChild(prodUl);

    return odrLi;
}