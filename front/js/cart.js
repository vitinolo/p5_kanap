//si panier vide
if (!localStorage.getItem('products'))
{   
    document.querySelector('#cart__items').innerHTML = `<h1>Le panier est vide</h1>`
    document.querySelector('.cart__price').remove();
    document.querySelector('.cart__order').remove();
    document.querySelector('h1').remove(); 
} 
else 
{
    fetch("http://localhost:3000/api/products/")
    .then(reponse => reponse.json())
    .then(canapes => 
    {   
        const list = buildCompleteList(canapes);

        //afficher les canapés
        list.forEach(canap =>{ display(canap) });

        //écouter les chgts
        list.forEach(canap =>{ listenForQtyChange(canap) });

        //supprimer canapé
        list.forEach(canap => { listenForDeletion(canap) });
        
        //rafraîchir le total
        calcTotal(list);

        //écoute des champs formulaire
        listenForFormChange();

        //écoute la soumission du formulaire
        listenFormSubmit();
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

function isAddressValid()
{
    const address = document.getElementById('address').value;
    if(!validateAddress(address))
    {
        return false
    }
    return true;
}

function isCityValid()
{
    const city = document.getElementById('city').value;
    if(!validateCity(city))
    {
        return false
    }
    return true;
}

function isEmailValid()
{
    const email = document.getElementById('email').value;
    return String(email)
    .toLowerCase()
    .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

function isFirstNameValid()
{
    const firstName = document.getElementById('firstName').value;
    if(firstName.length < 2 || !validateNoun(firstName))
    {
        return false
    }
    return true;
}

function isLastNameValid()
{
    const lastName = document.getElementById('lastName').value;
    if(lastName.length < 2 || !validateNoun(lastName))
    {
        return false
    }
    return true;
}

function listenForDeletion(canap)
{   
    let removeButton = document.querySelector(`article[data-id="${canap._id}-${canap.color}"] .deleteItem`);
    
    //écoute du bouton supprimer
    removeButton.addEventListener('click', () =>{
        
        products = JSON.parse(localStorage.getItem('products'));
        const canapIndex = products.findIndex(item => item.id === canap._id && item.color === canap.color)
        
        products.splice(canapIndex, 1);
        
        localStorage.setItem('products', JSON.stringify(products))
        alert ( "Ce produit va être supprimé du panier" ) ;
        document.querySelector('.cart__item').remove() ;             
    })
}

function showError(id,text)
{
    document.getElementById(id).innerText = text;   
}

function hideError(id)
{
    document.getElementById(id).innerText = ''; 
}

function listenForFormChange() 
{   
    //écouter champ prénom 
    document.getElementById('firstName').addEventListener('input', () => {
        hideError('firstNameErrorMsg'); 
        if (!isFirstNameValid())
        {
            showError('firstNameErrorMsg', 'Merci de bien remplir le champ prénom');   
        }
    })
    
    //écouter champ nom
    document.getElementById('lastName').addEventListener('input', () => {
        hideError('lastNameErrorMsg');  
        if (!isLastNameValid())
        {
            showError('lastNameErrorMsg', 'Merci de bien remplir le champ nom');
        } 
    })
    
    //écouter champ adresse
    document.getElementById('address').addEventListener('input', () => {
        hideError('addressErrorMsg');  
        if (!isAddressValid())
        {
            showError('addressErrorMsg', 'Merci de bien remplir le champ adresse');
        }  
    })
    
    //écouter champ city
    document.getElementById('city').addEventListener('input', () => {
        hideError('cityErrorMsg');  
        if (!isCityValid())
        {
            showError('cityErrorMsg', 'Merci de bien remplir le champ ville');
        }  
    })
    
    //écouter champ email
    document.getElementById('email').addEventListener('input', () => { 
        hideError('emailErrorMsg');  
        if (!isEmailValid()) 
        {
            showError('emailErrorMsg', 'Merci de bien remplir le champ email');
        }  
    })
}

function listenForQtyChange(canap)
{   
    let input = document.querySelector(`article[data-id="${canap._id}-${canap.color}"] .itemQuantity`);
    input.addEventListener('change', (e) =>
    {
        let qty = e.target.value

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
        
        localStorage.setItem('products', JSON.stringify(products))
        location.reload();       
    })
}

function listenFormSubmit()
{
    //écoute du bouton commander
    document.getElementById('order').addEventListener('click', (e) =>
    {  
        e.preventDefault();
 
        hideError('firstNameErrorMsg'); 
        hideError('lastNameErrorMsg');  
        hideError('addressErrorMsg');  
        hideError('cityErrorMsg');  
        hideError('emailErrorMsg'); 

        if (!isFirstNameValid())
        {
            showError('firstNameErrorMsg', 'Merci de bien remplir le champ prénom');
            return;   
        }
    
        if (!isLastNameValid())
        {
            showError('lastNameErrorMsg', 'Merci de bien remplir le champ nom');
            return;
        } 
    
        if (!isAddressValid())
        {
            showError('addressErrorMsg', 'Merci de bien remplir le champ adresse');
            return;
        }  
    
        if (!isCityValid())
        {
            showError('cityErrorMsg', 'Merci de bien remplir le champ ville');
            return;
        }  
    
        if (!isEmailValid()) 
        {
            showError('emailErrorMsg', 'Merci de bien remplir le champ email');
            return;
        }  

        //récupèration des id
        const products = JSON.parse(localStorage.getItem('products'));
        let productIds = [];
        products.forEach(product => { productIds.push(product.id) })
        
        //préparation du payload
        let payload = {
            contact: {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                email: document.getElementById('email').value
            },
            products: productIds
        }
        
        //envoi des informations au serveur
        fetch("http://localhost:3000/api/products/order", {
            method:  'POST' ,
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify(payload) 
        })
        .then(reponse => reponse.json())
        .then(data => 
        {    
            localStorage.clear();
            window.location.href = `confirmation.html?order_id=${data.orderId}`
        })           
    });
}

function calcTotal(canapes)
{
    let qty = 0;
    let total = 0;

    canapes.forEach(canap =>
        {
        qty = qty + Number(canap.qty);
        total = total + (Number(canap.price) * canap.qty);
        })

    document.getElementById('totalQuantity').innerHTML = qty
    document.getElementById('totalPrice').innerHTML = format(total)
}

function validateAddress(value)
{
    return String(value)
    .toLowerCase()
    .match(
        /^[a-zA-Z0-9\s,'-]*$/) && value.length >= 6;
}

function validateCity(value)
{
    return String(value)
    .toLowerCase()
    .match(
    /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/) && value.length >= 2;
}

function validateNoun(value)
{
    return String(value)
    .toLowerCase()
    .match(
    /^[A-Za-z\5\-]+$/
    );
}










    
    