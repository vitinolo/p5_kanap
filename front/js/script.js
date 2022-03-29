

const getData = async () => {
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
 getData();
function buildHtml(canap){
    return    `<a href="./product.html?id=42">
        <article>
            <img src="${canap.imageUrl}" alt="photos de différents canapés">
            <h3 class="productName">${canap.name}</h3>
            <p class="productDescription">${canap.description}</p>
        </article>
    </a> `

}
   
