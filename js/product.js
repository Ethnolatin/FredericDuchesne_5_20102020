const params = new URLSearchParams(document.location.search);
const id = params.get("id");
const request = "http://localhost:3000/api/furniture/"+id;
const productImage = document.getElementsByTagName("img")[0];
const productName = document.getElementById("name");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");

ajaxGet(request, function (response) {
  const productElt = JSON.parse(response);
  productImage.src = productElt.imageUrl;
  productName.textContent = productElt.name;
  productPrice.textContent = "€ "+(productElt.price/100).toFixed(2);
  productDescription.textContent = productElt.description;
});
