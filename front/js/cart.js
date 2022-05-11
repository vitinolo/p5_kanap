//si panier vide
if (!localStorage.getItem('products'))
{
    document.querySelector('#cart__items').innerHTML = "<h1>Le panier est vide</h1>" 
    
} else 
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
        updateTotal(list);

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

function listenForFormChange() 
{   
    //écouter champ prénom 
    const firstNameInput = document.getElementById('firstName');
    firstNameInput.addEventListener('input', (e) =>
    {
        const firstName = e.target.value;
        
        //si moins de 2 lettres
        if (firstName.length < 2 )
        {
            document.getElementById('firstNameErrorMsg').innerText = 'Merci de bien remplir le champ prénom';   
        } 
        else
        {
            let firstNameValided = document.getElementById('firstNameErrorMsg').innerText = '';
            console.log(firstNameValided); 
        }
    })

    const lastNameInput = document.getElementById('lastName');
    lastNameInput.addEventListener('input', (e) =>
    {
        const lastName = e.target.value;

        if (lastName.length < 2 )
        {
            document.getElementById('lastNameErrorMsg').innerText = 'Merci de bien remplir le champ nom';
        } 
        else
        {
            document.getElementById('lastNameErrorMsg').innerText = '';  
        }
    })
    
    const addressInput = document.getElementById('address');
    addressInput.addEventListener('input', (e) =>
    {
        const address = e.target.value;
       
        if (address.length < 6 )
        {
            document.getElementById('addressErrorMsg').innerText = 'Merci de bien remplir le champ adresse';
        } 
        else
        {
            document.getElementById('addressErrorMsg').innerText = '';  
        }
    })

    const cityInput = document.getElementById('city');
    cityInput.addEventListener('input', (e) =>
    {
        const city = e.target.value;
        
        if (city.length < 3 )
        {
            document.getElementById('cityErrorMsg').innerText = 'Merci de bien remplir le champ ville';
        } 
        else
        {
            document.getElementById('cityErrorMsg').innerText = '';  
        }
    })

    const emailInput = document.getElementById('email');
    emailInput.addEventListener('input', (e) =>
    {
        const email = e.target.value;
        
        if (validateEmail(email)) 
        {
            document.getElementById('emailErrorMsg').innerText = 'Merci de bien remplir le champ email';
        } 
        else
        {
            document.getElementById('emailErrorMsg').innerText = '';  
        }
    })
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
       location.reload();                       
    })
}

function updateTotal(canapes)
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

function validateEmail (email) 
{
    return !String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
}

function listenFormSubmit()
{
    document.getElementById('order').addEventListener('click', (e) =>
    {
        e.preventDefault();
        
        const products = JSON.parse(localStorage.getItem('products'));
        let productIds = [];

        products.forEach(product =>
            {
                productIds.push(product.id)
            })

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
        console.log(payload)
        
        fetch("http://localhost:3000/api/products/order", {
            method:  'POST' ,
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify(payload) 
        })
            .then(reponse => reponse.json())
            .then(data =>{ console.log(data) })        
    })
}
