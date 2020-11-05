// déclaration des variables
const cartContent = JSON.parse(localStorage.getItem("cart"));
const cartTable = document.getElementById("cartTable");
let tr;
let totalPrice = 0;

// crée un td et l'intègre au tr
const generateTd = function(data) {
  const td = document.createElement("td");
  td.textContent = data;
  tr.appendChild(td);
}


// prend chaque élément du panier un par un
cartContent.forEach(product => {
  // crée une ligne (tr)
  tr = document.createElement("tr");

  // calcule le prix total
  totalPrice += product.price;
  // crée une td avec l'image et l'intègre au tr
  const tdImage = document.createElement("td");
  const productImage = document.createElement("img");
  productImage.src = product.image;
  productImage.width = 50;
  tdImage.appendChild(productImage);
  tr.appendChild(tdImage);

  // crée une td avec le nom et l'intègre au tr
  generateTd(product.name);

  // crée une td avec le prix et l'intègre au tr
  generateTd("€ "+(product.price).toFixed(2));

  // intègre le tr au tableau
  cartTable.appendChild(tr);

});

// indique le prix total
tr = document.createElement("tr");
generateTd("Total");
generateTd("");
generateTd("€ "+totalPrice.toFixed(2));
cartTable.appendChild(tr);

