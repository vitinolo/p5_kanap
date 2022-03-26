let allCanape = [];

const fetchCanap = async () => {
    await fetch("http://localhost:3000/api/products")
    .then(reponse => reponse.json())
    .then((promise) => {
        allCanape = promise;
        console.table(allCanape);
    });
};
 
const canapeDisplay = async () => {
    await fetchCanap();
    document.getElementById("items")
    .innerHTML = ` <div id="item"><a href="./product.html?id=42">
                    <article>
                    <img src="${allCanape[0].imageUrl}" alt="photos de différents canapés">
                    <h3 class="productName">${allCanape[0].name}</h3>
                    <p class="productDescription">${allCanape[0].description}</p>
                    </article>
                    </a></div> `+
                    ` <div id="item"><a href="./product.html?id=42">
                    <article>
                    <img src="${allCanape[1].imageUrl}" alt="photos de différents canapés">
                    <h3 class="productName">${allCanape[1].name}</h3>
                    <p class="productDescription">${allCanape[1].description}</p>
                    </article>
                    </a></div> `+
                    ` <div id="item"><a href="./product.html?id=42">
                    <article>
                    <img src="${allCanape[2].imageUrl}" alt="photos de différents canapés">
                    <h3 class="productName">${allCanape[2].name}</h3>
                    <p class="productDescription">${allCanape[2].description}</p>
                    </article>
                    </a></div> `+
                    ` <div id="item"><a href="./product.html?id=42">
                    <article>
                    <img src="${allCanape[3].imageUrl}" alt="photos de différents canapés">
                    <h3 class="productName">${allCanape[3].name}</h3>
                    <p class="productDescription">${allCanape[3].description}</p>
                    </article>
                    </a></div> `+
                    ` <div id="item"><a href="./product.html?id=42">
                    <article>
                    <img src="${allCanape[4].imageUrl}" alt="photos de différents canapés">
                    <h3 class="productName">${allCanape[4].name}</h3>
                    <p class="productDescription">${allCanape[4].description}</p>
                    </article>
                    </a></div> `+
                    ` <div id="item"><a href="./product.html?id=42">
                    <article>
                    <img src="${allCanape[5].imageUrl}" alt="photos de différents canapés">
                    <h3 class="productName">${allCanape[5].name}</h3>
                    <p class="productDescription">${allCanape[5].description}</p>
                    </article>
                    </a></div> `+
                    ` <div id="item"><a href="./product.html?id=42">
                    <article>
                    <img src="${allCanape[6].imageUrl}" alt="photos de différents canapés">
                    <h3 class="productName">${allCanape[6].name}</h3>
                    <p class="productDescription">${allCanape[6].description}</p>
                    </article>
                    </a></div> `+
                    ` <div id="item"><a href="./product.html?id=42">
                    <article>
                    <img src="${allCanape[7].imageUrl}" alt="photos de différents canapés">
                    <h3 class="productName">${allCanape[7].name}</h3>
                    <p class="productDescription">${allCanape[7].description}</p>
                    </article>
                    </a></div> `                 
};
canapeDisplay();

