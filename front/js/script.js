
/*récupération des données du serveur et placement des données dans la page index*/ 
const DataProducts = async () => {
    await fetch("http://localhost:3000/api/products")
    .then(reponse => reponse.json())
    .then(canapes => {
        let html = "";
        canapes.forEach(canap =>{
            html += buildHtml(canap)
        })
    document.getElementById("items")
    .innerHTML = html;
    });
};
 DataProducts();

function buildHtml(canap){
    return    `<a href="./product.html?id=42">
        <article>
            <img src="${canap.imageUrl}" alt="photos de différents canapés">
            <h3 class="productName">${canap.name}</h3>
            <p class="productDescription">${canap.description}</p>
        </article>
    </a> `
}

/*===============================================================*/
window.addEventListener('items', () => {
    let canape = JSON.parse(canapes);
    let searchParams = new URLSearchParams(window.location.search);

    if(searchParams.has('_id')){
        let canapeId = searchParams.get('_id');
        console.log(canapeId);
    } else {
        window.location.pathname = 'index.html'
    }
})
/*===================================================================*/
/* récupération produit et affichage sur page produit*/
const url = new URL("http://localhost:3000/api/products");
    
const getData = async () => {
    let response = await fetch(url)
    if (response.ok){
        let data = await response.json()
        console.log(data)
    };}
getData()


const writeHtml = async (data) => {
    let img = document.createElement('img');
    img.src = data.imageUrl;
    img.innerHTML = data.img;
    
    let title = document.getElementById('title');
    title.innerHTML = data.name;
    
    let price = document.getElementById('price');
    price.innerHTML = data.price;
    
    let description = document.getElementById('description');
    description.innerHTML = data.description;
    
    
    let option = document.createElement('option');
    option.value = data.colors;
    option.innerHTML = data.colors;
    
    let colors = document.getElementById('colors');
    colors.appendChild(option);
    r
}
writeHtml(data)

/*============================================================*/
/* bouton commander*/
    const clickButton = document.querySelector("#addToCart");

    clickButton.addEventListener('click', () =>{
        ajouteAuPanier
    })

    function ajouteAuPanier(){
        for (let product = 0;; product++){
            let totalProduct = product.length;
            document.getDocumentById("totalQuantity")
                totalProduct.innerHTML = totalProduct; 
               
        }
    
    }
