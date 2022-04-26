
let id = recupId();
let name = recupName();

fetch("http://localhost:3000/api/products/")
.then(reponse => reponse.json())
.then(canapes => {
    canapes.forEach(canap =>{
        
        return console.log(canap)      
    })
});
//vérifier si il y des produits dans le localStorage
let products = JSON.parse(localStorage.getItem('products'));


//récupèrer les produits par l'id + la couleur + la quantité
let product = products.find(el => el.id == id && el.color == color && el.qty == qty);


//afficher les produits dans le panier avec l'image, le nom, la couleur, le prix et la quantité
if (product.id === canap.id){
    let productChosen = {
        id : canap.id,
        imageUrl : canap.imageUrl,
        name : canap.name,
        color : color,
        price : price
    };
    
    display(productChosen)
}

function display(canap){  
    document.querySelector('.cart__items').innerHTML = ` 
    <article class="cart__item" data-id="${canap.id}" data-color="${color}">
        <div class="cart__item__img">
            <img src="${imageUrl}" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${canap.name}</h2>
                <p>${color}</p>
                <p>${price}</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : ${qty}</p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
    </article>`
}    

function recupId () {
    let queryStringUrlId = window.location.search;
    let urlSearchParams = new URLSearchParams(queryStringUrlId);
    return urlSearchParams.get('id');   
} 
function recupName () {
    let queryStringUrlName = window.location.search;
    let urlSearchParams = new URLSearchParams(queryStringUrlName);
    return urlSearchParams.get('name'); 
}