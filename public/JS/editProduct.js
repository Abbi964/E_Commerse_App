const title = document.getElementById('title')
const imageUrl = document.getElementById('imageUrl')
const price = document.getElementById('price')
const description = document.getElementById('description')
const productIdInput = document.getElementById('productId')
const form = document.getElementById('form') 

//-------- loading product details to edit ----------------//

window.addEventListener('DOMContentLoaded',loadProductInfo)

async function loadProductInfo(e){
    try{
        let token = localStorage.getItem('token')
        // getting product id from url
        const prodId = window.location.href.split('/')[window.location.href.split('/').length -1]
    
        // first saving this id in productIdInput 
        productIdInput.value = prodId;
    
        // now loading product details
        let result = await axios.get(`http://localhost:3000/shop/product/${prodId}`,
        {headers:{'Authorization':token}})
    
        if(result.data.success){
            let product = result.data.product
            // filling form with info
            title.value = product.title;
            imageUrl.value = product.imageUrl;
            price.value = product.price;
            description.value = product.description;
        }
        else{
            alert('Something went wrong')
        }
    }
    catch(err){
        console.log(err)
    }
}

//------- submitting form ----------------------//

form.addEventListener('submit',submit);

async function submit(e){
    e.preventDefault()
    if(title.value==='' || imageUrl.value==='' || price.value==='' || description.value=== '' ){
        alert('Please fill all the fields')
    }
    else{
        try{
            let token = localStorage.getItem('token')
            // making an object with input
            let bookObj = {
                title : title.value,
                imageUrl : imageUrl.value,
                price : price.value,
                description : description.value,
                productId : productIdInput.value
            }
            // posting obj to server
            let response = await axios.post('http://localhost:3000/admin/edit-product',bookObj,{headers:{'Authorization':token}})

            if(response.data.success){
                window.location.href = '/admin/products'
            }

        }
        catch(err){
            console.log(err)
        }
    }
    
}