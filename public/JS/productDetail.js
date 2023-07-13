const main = document.querySelector('.centered');


window.addEventListener('DOMContentLoaded',loadInfo);

async function loadInfo(e){
    try{
        let token = localStorage.getItem('token')
        // getting product id from url
        const prodId = window.location.href.split('/')[window.location.href.split('/').length -1]
    
        // getting product
        let result = await axios.get(`http://localhost:3000/shop/product/${prodId}`,{headers: { 'Authorization': token } });
        if(result.data.success){
            let product = result.data.product
            // displaying product
            main.innerHTML = `<h1>${product.title}</h1>
            <hr>
            <div class="image">
                <img src="${product.imageUrl}" alt="${product.title}">
            </div>
            <h2>${product.price}</h2>
            <p>${product.description}</p>
            <button class="addToCart btn" id="${product._id}" type="button">Add to Cart</button>`
        }
    }
    catch(err){
        console.log(err)
    }
}


//-------- for addtocart option -------//
main.addEventListener('click',async(e)=>{
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