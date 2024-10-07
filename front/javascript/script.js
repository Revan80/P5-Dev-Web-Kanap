(async () => {
    let data;
    try {
        let reponse = await fetch("http://localhost:3000/api/products");
        data = await reponse.json();
    } catch (e) {
        console.error(e.message)
        return;
    }

    let viseur = document.getElementById("items");

    data.forEach(element => {
        let link = document.createElement("a");
        link.href = `./product.html?id=${element._id}`;
        viseur.appendChild(link);
        // Création de la balise article
        let article = document.createElement("article");
        link.appendChild(article);
        // Ajouter une image (<img>) pour chaque produit
        let image = document.createElement("img");
        image.src = element.imageUrl;
        image.alt = element.altTxt;
        article.appendChild(image);
        // Ajouter un titre h3 pour chaque produit
        let titre = document.createElement("h3");
        titre.textContent = element.name;
        article.appendChild(titre);
        // Ajouter une description p pour chaque produit
        let texte = document.createElement("p");
        texte.innerHTML = element.description;
        article.appendChild(texte);

    });
})();