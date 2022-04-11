
let canap = [];

//chercher les data du canap
const DataProduct = async () => {
    await fetch("http://localhost:3000/api/products/")
    .then(reponse => reponse.json())
    .then(canapes =>{
        let html = "";
        canapes.forEach(canap =>{
            console.log(canap)
            html += buildHtml(canap)
        })     
    });           
};
//appel fonction DataProduct
DataProduct()

//récupèrer la chaine de requête dans l'url
function RecupId () {
    let queryStringUrlId = window.location.search;
    console.log(queryStringUrlId);
    
    // extraire l'id (clé,valeur)
    let urlSearchParams = new URLSearchParams(queryStringUrlId);
    
    // urlSearchParams = id (valeur)
    let id = urlSearchParams.get('id');
    console.log(id);     
    id = canap._id;
}; 

//appel fonction RecupId
RecupId ()
 
//création du html
function buildHtml(canap){
     
    document.querySelector('.item__img')
    .innerHTML = `<img src="${canap.imageUrl}" alt="Photographie d'un canapé"/> `
    document.querySelector('#title')
    .innerHTML = `<h1 id="title">${canap.name}</h1>`
    document.querySelector('#price')
    .innerHTML = `<p>${canap.price}</p>`
    document.querySelector('#description')
    .innerHTML = `<p id="description">${canap.description}</p>` 
    document.querySelector('#colors')
    .innerHTML = `
                    <option value="">--SVP, choisissez une couleur --</option>
                    <option value="${colors}">${colors}</option>
                    <option value="${colors}">${colors}</option>                
                 `                                    
}

//écoute des choix dans liste déroulante
document.getElementById('addToCart')
.addEventListener('click', () =>{
    
    const color = document.querySelector('#colors').value;
    if (color.length === 0)
    {
        alert('attention, vous devez choisir impérativement une couleur !');
        return;
    }
    const qty = document.querySelector("#quantity").value;
    if (qty < 1)
    {
        alert('vous devez sélectionner au moins 1 produit');
        return;
    }
})
        




   
