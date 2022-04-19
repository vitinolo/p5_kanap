
localStorage.getItem("products",JSON.stringify("id"));
document.getElementById("cart_items").innerHTML = displayProduct();

function displayProduct (canap) {
    return  `
    <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
        <div class="cart__item__img">
            <img src="${canap.imageUrl}" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${canap.name}</h2>
                <p>${canap.color}</p>
                <p>${canap.price}</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>${quantity.value} : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
    </article>`
 }