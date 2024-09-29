(async () =>{
    let cartSection = document.querySelector('#cart__items');
 
     let prices = {
         
     }
 
     for (let i = 0; i < localStorage.length; i++) {
         let key = localStorage.key(i);
         let quantity = parseInt(localStorage.getItem(key));
         let parts = key.split('-');
         let id = parts[0];
         let color = parts[1];
 
         let data;
         let response
 
         try{
             response = await fetch(`http://localhost:3000/api/products/` + id);
             data = await response.json();
         }catch(e){
             console.log("Erreur lors de la recupération du produit")
             cartSection.innerHTML = "Une erreur est survenue";
             return;
         }
 
         prices[key] = data.price;
 
 
         let article = document.createElement("article");
         article.classList = "cart__item";
         article.dataset.id = id;
         article.dataset.color = color;
 
         cartSection.appendChild(article);
 
         article.innerHTML = `
         <div class="cart__item__img">
             <img src="${data.imageUrl}" alt="Photographie de ${data.name}">
         </div>
         <div class="cart__item__content">
             <div class="cart__item__content__description">
                 <h2>${data.name}</h2>
                 <p>${color}</p>
                 <p>${data.price} €</p>
             </div>
             <div class="cart__item__content__settings">
                 <div class="cart__item__content__settings__quantity">
                     <p>Qté : </p>
                     <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
                 </div>
                 <div class="cart__item__content__settings__delete">
                     <p class="deleteItem">Supprimer</p>
                 </div>
             </div>
         </div>
     `;
     
     let deleteButton = article.querySelector(".deleteItem");
     deleteButton.addEventListener("click", function() {
         article.remove();
         localStorage.removeItem(key);
         refreshCart();
     });
 
     let itemQuantityBtn = article.querySelector(".itemQuantity");
 
     itemQuantityBtn.addEventListener("click", function() {
         updateQuantity(itemQuantityBtn,key);
     });
 
      itemQuantityBtn.addEventListener("keyup", function() {
         updateQuantity(itemQuantityBtn,key);
         
         
     });
     }
     console.log(prices);
     refreshCart();    
 
     function updateQuantity(itemQuantityBtn,key){
         let newQuantity = itemQuantityBtn.value;
         localStorage.setItem(key,newQuantity);
         refreshCart();
     }


     function refreshCart(){
         let totalQuantity = 0;
         let totalPrice = 0;
         let keys = Object.keys(localStorage);
         console.log(keys);
         for(i of keys){
          let quantityItem = localStorage.getItem(i);
         totalQuantity += parseInt(quantityItem);
         totalPrice += quantityItem * prices[i];
         }
 
         let totalQuantityElement = document.querySelector("#totalQuantity");
         let totalPriceElement = document.querySelector("#totalPrice");
         totalQuantityElement.innerHTML = totalQuantity;
         totalPriceElement.innerHTML = totalPrice;
     }



    
     let orderBtn = document.querySelector("#order");
     

     orderBtn.addEventListener("click", function(event) {
         event.preventDefault();
         let contact = {
             firstName: document.querySelector("#firstName").value,
             lastName: document.querySelector("#lastName").value,
             address: document.querySelector("#address").value,
             city: document.querySelector("#city").value,
             email: document.querySelector("#email").value
         };

         const regexAlpha = new RegExp("[a-zàâçéèêëîïôûùüÿñæœ' .-]+","i");
         const regexEmail = new RegExp("[A-Za-z\-\._0-9]+@[A-Za-z\-\.0-9]+\.[a-z]+");

         if(!regexAlpha.test(contact.firstName)){
            let errorFirstName = document.querySelector("#firstNameErrorMsg");
            errorFirstName.innerHTML = "Format incorrect"
            
         }
         if(!regexAlpha.test(contact.lastName)){
            let errorName = document.querySelector("#lastNameErrorMsg");
            errorName.innerHTML = "Format incorrect"
            
         }
         if(!regexAlpha.test(contact.city)){
            let errorCity = document.querySelector("#cityErrorMsg");
            errorCity.innerHTML = "Format incorrect"
         }

         if(!regexAlpha.test(contact.address)){
            let errorAdress = document.querySelector("#addressErrorMsg");
            errorAdress.innerHTML = "Format incorrect"
         }

         if(!regexEmail.test(contact.email)){
            let errorEmail = document.querySelector("#emailErrorMsg");
            errorEmail.innerHTML = "Format incorrect"
            return;
        }
        let productsTable = [];
        

         for(productKey of Object.keys(localStorage)){
            let id = productKey.split("-")[0];
            productsTable.push(id);       
         }
        fetch("http://localhost:3000/api/products/order", {
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({contact:contact,products:productsTable})
        })
        
        .then(response => response.json())  
        .then(data => {
            console.log(data.orderId); 
            window.location.href = `confirmation.html?orderId=${data.orderId}`;
        })
        .catch(error => {
            console.error("Erreur lors de la commande :", error);
        });
     });
     console.log("test")
 })();
 