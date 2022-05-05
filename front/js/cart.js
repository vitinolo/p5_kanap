
if (!localStorage.getItem('products'))
{
    document.querySelector('#cart__items').innerHTML = "<h1>Le panier est vide</h1>"      
} else 
{
    fetch("http://localhost:3000/api/products/")
    .then(reponse => reponse.json())
    .then(canapes => 
    {   
        const list = buildCompleteList(canapes)

        list.forEach(canap =>{ display(canap) })

        list.forEach(canap =>{ listenForQtyChange(canap) })

        updateTotal(list);

        listenForCardSubmit();
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
                <p>${format(canap.price)}</p>
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

function listenForQtyChange(canap)
{   
    let input = document.querySelector(`article[data-id="${canap._id}-${canap.color}"] .itemQuantity`);
    input.addEventListener('change', (e) =>
    {
        let qty = e.target.value
        console.log('on essaye de changer la qté');

        if( qty < 1){
            alert ("vous devez rentrer une valeur entre 1 et 100");
            return;      
        }

        if( qty > 100){
            alert ("vous devez rentrer une valeur entre 1 et 100");
            return;      
        } 
        const products = JSON.parse(localStorage.getItem('products'));
        const canapInStorage = products.find(item => item.id === canap._id && item.color === canap.color)
        canapInStorage.qty = qty;

        console.log(canapInStorage);
        localStorage.setItem('products', JSON.stringify(products))
        location.reload();       
    })
}

function updateTotal(canapes)
{
    let qty = 0;
    let total = 0;

    canapes.forEach(canap =>{
        qty = qty + Number(canap.qty);
        total = total + (Number(canap.price) * canap.qty);
    })
    document.getElementById('totalQuantity').innerHTML = qty
    document.getElementById('totalPrice').innerHTML = format(total)
}

function listenForCardSubmit() 
{
    const firstNameInput = document.getElementById('firstName');
    firstNameInput.addEventListener('input', (e) =>
    {
       const firstName = e.target.value;
       
       if (firstName.length < 2 )
       {
           document.getElementById('firstNameErrorMsg').innerText = 'Merci de bien remplir le champ prénom';
       } 
       else
       {
        document.getElementById('firstNameErrorMsg').innerText = '';  
       }
    })
}