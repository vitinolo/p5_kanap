let array = [];

const fetchCanap = async () => {
    await fetch("http://localhost:3000/api/products")
    .then(reponse => reponse.json(array))
    .then(promise => {
        array = promise;
        console.log(array);
    });
};
 
const canapeDisplay = async () => {
    await fetchCanap();
   
        document.getElementById("items")
            .innerHTML = `<div id="item"><a href="./product.html?id=42">
            <article>
            <img src="${array[0].imageUrl}" alt="photos de différents canapés">
            <h3 class="productName">${array[0].name}</h3>
            <p class="productDescription">${array[0].description}</p>
            </article>
            </a></div> `+
            `<div id="item"><a href="./product.html?id=42">
            <article>
            <img src="${array[1].imageUrl}" alt="photos de différents canapés">
            <h3 class="productName">${array[1].name}</h3>
            <p class="productDescription">${array[1].description}</p>
            </article>
            </a></div> `+
            `<div id="item"><a href="./product.html?id=42">
            <article>
            <img src="${array[2].imageUrl}" alt="photos de différents canapés">
            <h3 class="productName">${array[2].name}</h3>
            <p class="productDescription">${array[2].description}</p>
            </article>
            </a></div> ` +
            `<div id="item"><a href="./product.html?id=42">
            <article>
            <img src="${array[3].imageUrl}" alt="photos de différents canapés">
            <h3 class="productName">${array[3].name}</h3>
            <p class="productDescription">${array[3].description}</p>
            </article>
            </a></div> `+
            `<div id="item"><a href="./product.html?id=42">
            <article>
            <img src="${array[4].imageUrl}" alt="photos de différents canapés">
            <h3 class="productName">${array[4].name}</h3>
            <p class="productDescription">${array[4].description}</p>
            </article>
            </a></div> `+
            `<div id="item"><a href="./product.html?id=42">
            <article>
            <img src="${array[5].imageUrl}" alt="photos de différents canapés">
            <h3 class="productName">${array[5].name}</h3>
            <p class="productDescription">${array[5].description}</p>
            </article>
            </a></div> `+
            `<div id="item"><a href="./product.html?id=42">
            <article>
            <img src="${array[6].imageUrl}" alt="photos de différents canapés">
            <h3 class="productName">${array[6].name}</h3>
            <p class="productDescription">${array[6].description}</p>
            </article>
            </a></div> `+
            `<div id="item"><a href="./product.html?id=42">
            <article>
            <img src="${array[7].imageUrl}" alt="photos de différents canapés">
            <h3 class="productName">${array[7].name}</h3>
            <p class="productDescription">${array[7].description}</p>
            </article>
            </a></div> `

}
   
canapeDisplay();

