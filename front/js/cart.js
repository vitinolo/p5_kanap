//rechercher si il y a quelque chose dans le local storage
if (localStorage.getItem("products"))
{
    //recuperer les produits
    fetch("http://localhost:3000/api/products/")
    .then(reponse => reponse.json())
    .then(products => {
        let html = "";
        products.forEach(product =>{
            
            html += buildHtml(product)
        })
    document.getElementById("cart__items").innerHTML = html;
    });
}
else
{
document.querySelector('h1').style.display = 'none';
document.querySelector('.cart__price').style.display = 'none';
document.querySelector('.cart__order').style.display = 'none'; 
document.getElementById("cart__items").innerHTML = '<h1>votre panier est vide</h1>'
}


//construction du html

function buildHtml(product) {
    return  `
    <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
        <div class="cart__item__img">
            <img src="${product.imageUrl}" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${product.name}</h2>
                <p>${product.color}</p>
                <p>${product.price}</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
    </article>`
}
 