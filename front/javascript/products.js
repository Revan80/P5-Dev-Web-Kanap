(async () => {
   let parametreURL = window.location.search;
   const urlParam = new URLSearchParams(parametreURL);
   const productID = urlParam.get('id');

   let reponse = await fetch("http://localhost:3000/api/products/" + productID);
   data = await reponse.json(); //ajouter try

   let title = document.querySelector("#title");
   title.innerHTML = data.name;
   let price = document.querySelector("#price")
   price.innerHTML = data.price;
   let description = document.querySelector("#description");
   description.innerHTML = data.description;
   let colorsViseur = document.querySelector("#colors");

   data.colors.forEach(element => {
       let createOption = document.createElement("option");
       createOption.value = element;
       createOption.textContent = element;
       colorsViseur.appendChild(createOption);
   });

   let img = document.createElement("img");

   img.src = data.imageUrl;

   img.alt = "Description de l'image";

   document.querySelector(".item__img").appendChild(img);

   let btnAddToCart = document.querySelector("#addToCart");
   btnAddToCart.addEventListener("click", () => {
       let selectedColor = colorsViseur.value;
       let quantity = document.querySelector("#quantity").value;
       quantity = parseInt(quantity);
       if (quantity === 0) {
           return;
       }
       let cartItemKey = productID + "-" + selectedColor;
       let existingQuantity = localStorage.getItem(cartItemKey)
       existingQuantity = parseInt(existingQuantity);
       if (existingQuantity > 0) {
           quantity += existingQuantity;
       }
       localStorage.setItem(cartItemKey, quantity);
       window.location.href = "cart.html";
   })
})();