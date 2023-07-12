const title = document.getElementById('title')
const imageUrl = document.getElementById('imageUrl')
const price = document.getElementById('price')
const description = document.getElementById('description') 
const form = document.getElementById('form') 

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
                description : description.value
            }
            // posting obj to server
            let response = await axios.post('http://localhost:3000/admin/add-product',bookObj,{headers:{'Authorization':token}})

            if(response.data.success){
                window.location.href = '/admin/products'
            }

        }
        catch(err){
            console.log(err)
        }
    }
    
}