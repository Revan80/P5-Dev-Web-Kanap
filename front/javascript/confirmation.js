(async () => {
    // Fonction pour obtenir des paramètres depuis l'URL
    function getURLParameter(name) {
        return new URLSearchParams(window.location.search).get(name);
    }

    let orderElement = document.querySelector('#orderId');


    if (orderElement) {

        orderElement.textContent = getURLParameter('orderId');
    }

    localStorage.clear();
})();

