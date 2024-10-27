(async () => { // EXPLICATION
    let data;
    try { // EXPLICATION
        let reponse = await fetch("http://localhost:3000/api/products"); // EXPLICATION
        data = await reponse.json(); // EXPLICATION
    } catch (e) {
        console.error(e.message)
        return;
    }

    let viseur = document.getElementById("items");

    data.forEach(element => { // EXPLICATION
        let link = document.createElement("a");
        link.href = `./product.html?id=${element._id}`;
        viseur.appendChild(link);
      
        let article = document.createElement("article");
        link.appendChild(article);
        
        let image = document.createElement("img");
        image.src = element.imageUrl; // EXPLICATION
        image.alt = element.altTxt;
        article.appendChild(image);
     
        let titre = document.createElement("h3");
        titre.textContent = element.name;
        article.appendChild(titre);
    
        let texte = document.createElement("p");
        texte.innerHTML = element.description;
        article.appendChild(texte);

    });
})();