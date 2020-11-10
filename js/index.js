const listElt = document.getElementById("furnitures");

ajaxGet("http://localhost:3000/api/furniture")
	.then(function (furnitures) {
		// Affiche l'image et le nom de chaque meuble dans une liste
		furnitures.forEach(function (furniture) {
			const furnitureElt = document.createElement("a");
			const furnitureImage = document.createElement("img");
			const furnitureName = document.createElement("span")
			const linkAddress = "./html/product.html?id="+furniture._id;
			furnitureName.textContent = furniture.name;
			furnitureName.className = "h5 pl-2"
			furnitureImage.src = furniture.imageUrl;
			furnitureImage.width = 50;
			furnitureElt.href = linkAddress;
			furnitureElt.className = "list-group-item list-group-item-action";
			furnitureElt.appendChild(furnitureImage);
			furnitureElt.appendChild(furnitureName);
			listElt.appendChild(furnitureElt);
		});
	})
	.catch(function(err) {
		alert(err)
	});
