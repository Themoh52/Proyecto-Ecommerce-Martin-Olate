const socket = io();
const button = document.getElementById("newProduct");

button.addEventListener('click',e=>{
    e.preventDefault(e);
    const newProduct = {
        title:document.querySelector('#inputTitle').value,
        description:document.querySelector('#inputDescription').value,
        price:document.querySelector('#inputPrice').value,
        code:document.querySelector('#inputCode').value,
        stock:document.querySelector('#inputStock').value,
        category:document.querySelector('#inputCategory').value
    }
    socket.emit('NewProduct',newProduct);
})

socket.on('update',newProduct =>{
    const newProducts = document.querySelector('#addProducts');
    newProducts.innerHTML = JSON.stringify(newProduct);
    
})

function listOfProducts (products){
    return JSON.stringify(products, null, 2);
}

socket.emit('showProduct')