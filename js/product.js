const params = new URLSearchParams(document.location.search);
const id = params.get("id");
const request = "http://localhost:3000/api/furniture/"+id;
const productImage = document.getElementsByTagName("img")[0];

ajaxGet(request, function (response) {
  const productElt = JSON.parse(response);
  productImage.src = productElt.imageUrl;
  console.log(productImage.src);

});
