(async () => {
    // Fonction pour obtenir des paramètres depuis l'URL
    function getURLParameter(name) {
        return new URLSearchParams(window.location.search).get(name);
    }

    // Attendre que le DOM soit entièrement chargé
    document.addEventListener('DOMContentLoaded', () => {
        // Sélectionner l'élément par son ID
        let orderElement = document.querySelector('#orderId');

        // Vérifier si l'élément existe pour éviter des erreurs
        if (orderElement) {
            // Insérer l'orderId dans l'élément
            orderElement.textContent = getURLParameter('orderId');
        }
    });
})();
