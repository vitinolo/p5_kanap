
if (!localStorage.getItem('products'))
{
    document.querySelector('#ccart__items').innerHTML = "<h1>Le panier est vide</h1>"      
} else 
{
    fetch("http://localhost:3000/api/products/")
    .then(reponse => reponse.json())
    .then(canapes => 
    {
        
        const list = buildCompleteList(canapes)

        list.forEach(canap =>
            {
                display(canap)
            })

        list.forEach(canap =>
            {
                listenForQtyChange(canap)
            })
    });  
}
function buildCompleteList(canapes)
{
    const list = [];
    const products = JSON.parse(localStorage.getItem('products'));
    products.forEach(element => 
        {
        const canap = canapes.find(el => el._id === element.id)
        const canapFull = {
            altTxt: canap.altTxt,
            description: canap.description,
            imageUrl: canap.imageUrl,
            name: canap.name,
            price: canap.price,
            _id: canap._id,
            qty: element.qty,
            color: element.color
        }
        list.push(canapFull)
        return console.log(canapFull);     
    });
    return list;
}

function display(canap)
{  
    document.querySelector('#cart__items').innerHTML += ` 
    <article class="cart__item" data-id="${canap._id}-${canap.color}">
    <div class="cart__item__img">
    <img src="${canap.imageUrl}" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__description">
    <h2>${canap.name}</h2>
    <p>${canap.price} €</p>
    </div>
    <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
    <p>Color : ${canap.color}</p>
    <p>Qté : ${canap.qty}</p>
    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${canap.qty}>
    </div>
    <div class="cart__item__content__settings__delete">
    <p class="deleteItem">Supprimer</p>
    </div>
    </div>
    </div>
    </article>`
}    

function listenForQtyChange(canapFull)
{   
    let newList = [];
    let input = document.querySelector(`article[data-id="${canapFull._id}-${canapFull.color}"] .itemQuantity`);
    input.addEventListener('change', (e) =>
    {
        let newQuantity = e.target.value
        console.log('on essaye de changer la qté');
        if( newQuantity < 1){
            alert ("vous devez rentrer une valeur entre 1 et 100");
            return;      
        }
        if( newQuantity > 100){
            alert ("vous devez rentrer une valeur entre 1 et 100");
            return;      
        }  
        newList.forEach(newProduct =>
        {
            newProduct = {
                _id: canapFull._id,
                qty: newQuantity,
                color: canapFull.color
            }     
            newList.push(newProduct)
            return newList;
            
        })
        console.log(newList)

        if(canapFull.qty !== newQuantity)
        {
            localStorage.clear();  

            localStorage.setItem('newProducts', JSON.stringify(newList))
        }                
        
    })
}
/*
function displayTotal(newList)
{
    let quantity = newList.find( el=> el.qty === element.qty)
    let price = newList.find(el => el.price === element.price)
    let totalQuantity = quantity
    let totalPrice = price
    document.querySelector('#totalQuantity').innerHTML=`${totalQuantity}`
    document.querySelector('#totalPrice').innerHTML=`${totalPrice}`
}
*/