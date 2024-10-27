(async () => { 
   let parametreURL = window.location.search; 
   const urlParam = new URLSearchParams(parametreURL); 
   const productID = urlParam.get('id'); 

   try{
       let reponse = await fetch("http://localhost:3000/api/products/" + productID); 
       data = await reponse.json(); 
   }catch(error){
    console.log(error);
    return;
   }

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

   let quantityInput = document.querySelector("#quantity");

    quantityInput.addEventListener("click", function() { 
        let newQuantity = quantityInput.value;
        if(newQuantity <= 0 || newQuantity > 100){
           quantityInput.value = 1;
        }
    });

    quantityInput.addEventListener("keyup", function() {
        let newQuantity = quantityInput.value;
        if(newQuantity <= 0 || newQuantity > 100){
           quantityInput.value = 1;
        }
    });





   let btnAddToCart = document.querySelector("#addToCart");  // EXPLICATION
   btnAddToCart.addEventListener("click", () => {
       let selectedColor = colorsViseur.value;
       let quantity = quantityInput.value;
       quantity = parseInt(quantity);
       if (quantity <= 0) {
        
           return;
       }
       let cartItemKey = productID + "-" + selectedColor;
       let existingQuantity = localStorage.getItem(cartItemKey)
       existingQuantity = parseInt(existingQuantity);
       if (existingQuantity > 0) {
           quantity += existingQuantity;
       }
       localStorage.setItem(cartItemKey, quantity);
       window.location.href = "cart.html"; // EXPLICATION
   })
})();