
//récupération des données du serveur et placement des données dans la page index 
fetch("http://localhost:3000/api/products/")
    .then(reponse => reponse.json())
    .then(canapes => 
    {
        let html = "";
        
        canapes.forEach(canap =>
        {
            html += buildHtml(canap)
        })

        document.getElementById("items").innerHTML = html;
    });

//construction du html
function buildHtml(canap)
{  
    return    `
    <a href="./product.html?id=${canap._id}">
        <article>
            <img src="${canap.imageUrl}" alt="photos de différents canapés">
            <h3 class="productName">${canap.name}</h3>
            <p class="productDescription">${canap.description}</p>
        </article>
    </a> `   
}
