var listElt = document.getElementById("furnitures");

ajaxGet("http://localhost:3000/api/furniture", function (response) {
    // Transforme la réponse en tableau d'objets JavaScript
    var furnitures = JSON.parse(response);
    // Affiche le nom de chaque meuble
    furnitures.forEach(function (furniture) {
        var furnitureElt = document.createElement("li");
        var linkAddress = "./html/product.html?id="+furniture._id;
        var linkElt = document.createElement("a");
        linkElt.textContent = furniture.name;
        linkElt.href = linkAddress;
        furnitureElt.appendChild(linkElt);
        listElt.appendChild(furnitureElt);
        console.log()
    })
});