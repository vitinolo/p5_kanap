const id = recupId();

fetch("http://localhost:3000/api/products/" + id)
    .then(reponse => reponse.json())
    .then(canape =>
        {    
         display(canape)           
        });           

//écoute des sélecteurs de couleur et quantité
document.getElementById('addToCart').addEventListener('click', () =>
{  
    const color = document.querySelector('#colors').value;
    const qty = document.querySelector("#quantity").value;
    if (color.length === 0)
    {
        alert('attention, vous devez choisir impérativement une couleur !');
        return;
    }
    if (qty < 1)
    {
        alert('vous devez sélectionner au moins 1 produit');
        return;
    }

    // verifier l'existence des produits dans le local storage
    let  products = [];
    let productsAlreadyPresentInStorage = localStorage.getItem('products');
    if(productsAlreadyPresentInStorage)
    {
        products = JSON.parse(localStorage.getItem('products'));
        let existsAlready = products.find(el => el.id == id && el.color == color);
        if (existsAlready)
        {
            // si oui => verifier que le produit selectionné (id & color) existe deja dans le local storage
            let product = products.find(el => el.id == id && el.color == color);
            product.qty = Number(product.qty) + Number(qty);
        }
        else
        {
            // si non => ajouter le produit dans le local storage
            let product = {
                id : id,
                color : color,
                qty : qty
            };
            products.push(product);
        }
    }
    else
    {
        // si aucun produit , ajouter le produit dans le local storage
        let product = {
            id : id,
            color : color,
            qty : qty
        };
        products.push(product);
    }
    localStorage.setItem('products', JSON.stringify(products))
    alert('Votre produit à bien été ajouté, nous vous redirigerons vers la page accueil ')
    window.location.href ="http://127.0.0.1:5500/front/html/";
})

//affichage du canapé
function display(canap)
{ 
    document.querySelector('title').innerHTML = canap.name
    document.querySelector('.item__img').innerHTML = `<img src="${canap.imageUrl}" alt="Photographie d'un canapé"/> `
    document.querySelector('#title').innerHTML = `<h1 id="title">${canap.name}</h1>`
    document.querySelector('#price').innerHTML = format(canap.price)
    document.querySelector('#description').innerHTML = canap.description 
    
    canap.colors.forEach(color => 
        {
            document.querySelector('#colors').innerHTML += `<option value="${color}">${color}</option>`    
        });
} 

//récupèrer id
function recupId () 
{
    let queryStringUrlId = window.location.search;
    let urlSearchParams = new URLSearchParams(queryStringUrlId);
    return urlSearchParams.get('id');   
} 

