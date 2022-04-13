const id = recupId();
console.log(id)


//chercher les data du canap
fetch("http://localhost:3000/api/products/" + id)
    .then(reponse => reponse.json())
    .then(canape =>{    
         display(canape)           
    });           

//écoute des choix dans liste déroulante
document.getElementById('addToCart').addEventListener('click', () =>{  
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
})
/***************fonctions***************************/

function display(canap){  
    document.querySelector('.item__img').innerHTML = `<img src="${canap.imageUrl}" alt="Photographie d'un canapé"/> `
    document.querySelector('#title').innerHTML = `<h1 id="title">${canap.name}</h1>`
    document.querySelector('#price').innerHTML = canap.price
    document.querySelector('#description').innerHTML = canap.description 
    canap.colors.forEach(color => {
        document.querySelector('#colors').innerHTML += `<option value="${color}">${color}</option>`    
   });
}    

function recupId () {
    let queryStringUrlId = window.location.search;
    let urlSearchParams = new URLSearchParams(queryStringUrlId);
    return urlSearchParams.get('id');   
} 

   
