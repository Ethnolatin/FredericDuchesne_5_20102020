// récupère les données depuis l'API
ajaxGet("http://localhost:3000/api/furniture")
	.then((furnitures) => {
		const listElt = document.getElementById("furnitures");
    // crée un élément de liste pour chaque produit disponible avec un lien vers sa page produit
		furnitures.forEach((furniture) => {
			const furnitureElt = document.createElement("a");
			furnitureElt.href = "./html/product.html?id=" + furniture._id;
			furnitureElt.className = "list-group-item list-group-item-action";
			// génère l'image du produit et l'intègre à l'élément de liste
			const furnitureImage = document.createElement("img");
			furnitureImage.src = furniture.imageUrl;
			furnitureImage.width = 50;
			furnitureElt.appendChild(furnitureImage);
			// génère le nom du produit et l'intègre à l'élément de liste
			const furnitureName = document.createElement("span");
			furnitureName.textContent = furniture.name;
			furnitureName.className = "h5 pl-2";
			furnitureElt.appendChild(furnitureName);
			// intègre l'élément à la liste
			listElt.appendChild(furnitureElt);
		});
	})
	// en cas de problème de liaison avec le serveur, affiche un message
	.catch((err) => {
			alert("Erreur : " + err);
	});