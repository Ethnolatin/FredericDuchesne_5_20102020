var listeElt = document.getElementById("furnitures");

ajaxGet("http://localhost:3000/api/furniture", function (reponse) {
    // Transforme la réponse en tableau d'objets JavaScript
    var furnitures = JSON.parse(reponse);
    // Affiche le nom de chaque meuble
    furnitures.forEach(function (furniture) {
        console.log(furniture.name);
        var furnitureElt = document.createElement("li");
        furnitureElt.textContent = furniture.name;
        listeElt.appendChild(furnitureElt);
    })
});