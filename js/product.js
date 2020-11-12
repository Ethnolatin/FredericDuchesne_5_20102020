const id = location.search.substring(4);
const request = "http://localhost:3000/api/furniture/"+id;
const productImage = document.getElementsByTagName("img")[0];
const productName = document.getElementById("name");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");
const varnish = document.getElementById("varnish");
const varnishMissing = document.getElementById("varnishMissing");
const addToCartBtn = document.getElementById("addToCart");
const cartContent = JSON.parse(localStorage.getItem("cart")) || [];

// n'affiche pas le message concernant l'option manquante
varnishMissing.style.display = "none";

ajaxGet(request)
  .then((productElt) => {
    productImage.src = productElt.imageUrl;
    productName.textContent = productElt.name;
    productPrice.textContent = (productElt.price / 100).toFixed(2) + "€";
    productDescription.textContent = productElt.description;
    const varnishes = productElt.varnish;
    varnishes.forEach((varnishOption) => {
      const varnishElt = document.createElement("option");
      varnishElt.setAttribute("value", varnishOption);
      varnishElt.textContent = varnishOption;
      varnish.appendChild(varnishElt);
    });
    addToCartBtn.addEventListener("click", () => {
      if (varnish.value == "choisissez...") {
        varnishMissing.style.display = "block";
      } else {
        varnishMissing.style.display = "none";
        const addedProduct = {
          key: Date.now(),
          id: id,
          image: productElt.imageUrl,
          name: productElt.name,
          price: productElt.price / 100,
          option: varnish.value
        };
      cartContent.push(addedProduct);
      localStorage.setItem("cart", JSON.stringify(cartContent));
      alert("Produit ajouté au panier");
      };
    });
  })
  .catch((err) => {
		console.error("Erreur réseau");
    alert("Erreur réseau");
  });
  



