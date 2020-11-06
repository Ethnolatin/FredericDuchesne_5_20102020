const listElt = document.getElementById("furnitures");

ajaxGet("http://localhost:3000/api/furniture")
	.then(function (furnitures) {
		// Affiche le nom de chaque meuble
		furnitures.forEach(function (furniture) {
			const furnitureElt = document.createElement("li");
			const linkAddress = "./html/product.html?id="+furniture._id;
			const linkElt = document.createElement("a");
			linkElt.textContent = furniture.name;
			linkElt.href = linkAddress;
			furnitureElt.appendChild(linkElt);
			listElt.appendChild(furnitureElt);
		});
	})
	.catch(function(err) {
		console.error("Erreur réseau");
		alert("Erreur réseau")
	});
