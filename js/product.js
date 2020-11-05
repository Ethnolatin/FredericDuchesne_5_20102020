const param = window.location.search;
const id = param.substring(4);
const request = "http://localhost:3000/api/furniture/"+id;
const productImage = document.getElementsByTagName("img")[0];
const productName = document.getElementById("name");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");
const varnish = document.getElementById("varnish");
const addToCartBtn = document.getElementById("addToCart");
var cartContent = JSON.parse(localStorage.getItem("cart")) || [];

ajaxGet(request, function (response) {
  const productElt = JSON.parse(response);
  productImage.src = productElt.imageUrl;
  productName.textContent = productElt.name;
  productPrice.textContent = "€ "+(productElt.price/100).toFixed(2);
  productDescription.textContent = productElt.description;
  const varnishes = productElt.varnish;
  varnishes.forEach(function (varnishOption) {
    const varnishElt = document.createElement("option");
    varnishElt.setAttribute("value", varnishOption);
    varnishElt.textContent = varnishOption;
    varnish.appendChild(varnishElt);
  })

  addToCartBtn.addEventListener("click", function(){
    const addedProduct = {
      key: Date.now(),
      id: id,
      image: productElt.imageUrl,
      name: productElt.name,
      price: productElt.price/100}
    cartContent.push(addedProduct);
    localStorage.setItem("cart", JSON.stringify(cartContent));
    alert("Product added to cart");
  })

});


