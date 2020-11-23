// déclaration des variables
const productImage = document.getElementById("image");
const productName = document.getElementById("name");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");
const varnish = document.getElementById("varnish");
const varnishMissing = document.getElementById("varnishMissing");
const addToCartBtn = document.getElementById("addToCart");
let id;

// extrait la partie data de l'url et supprime "?id=" pour ne garder que l'id du produit
const request = () => {
  id = window.location.search.substring(4);
  const requestUrl = "http://localhost:3000/api/furniture/"+id;
  return requestUrl;
}

ajaxGet(request())
  .then((productElt) => {
    // définit chaque élément à afficher (image, nom, prix, description)
    productImage.src = productElt.imageUrl;
    productName.textContent = productElt.name;
    productPrice.textContent = (productElt.price / 100).toFixed(2) + "€";
    productDescription.textContent = productElt.description;
    // menu déroulant pour le choix de l'option (vernis)
    const varnishes = productElt.varnish;
    varnishes.forEach((varnishOption) => {
      const varnishElt = document.createElement("option");
      varnishElt.setAttribute("value", varnishOption);
      varnishElt.textContent = varnishOption;
      varnish.appendChild(varnishElt);
    });
    // bouton d'ajout au panier
    addToCartBtn.addEventListener("click", () => {
      // détecte si l'option a été choisie
      if (varnish.value == "choisissez...") {
        // si non, affiche le message de rappel
        varnishMissing.style.display = "block";
      } else {
        // si oui, génère l'objet à ajouter au panier
        varnishMissing.style.display = "none";
        const addedProduct = {
          key: Date.now(),
          id: id,
          image: productElt.imageUrl,
          name: productElt.name,
          price: productElt.price / 100,
          option: varnish.value
        };
        // ajoute le produit au panier et confirme avec un message
        let cartContent = JSON.parse(localStorage.getItem("cart"))||[];
        cartContent.push(addedProduct);
        localStorage.setItem("cart", JSON.stringify(cartContent));
        quantity();
        alert("Produit ajouté au panier");
      };
    });
  })
  // en cas de problème de liaison avec le serveur, affiche un message
  .catch((err) => {
    alert("Erreur : " + err);
  });