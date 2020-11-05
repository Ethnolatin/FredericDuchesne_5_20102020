// déclaration des variables
const cartContent = JSON.parse(localStorage.getItem("cart"));
const cartTable = document.getElementById("cartTable");
console.log(cartContent)

// prend chaque élément du panier un par un
cartContent.forEach(product => {

  // crée une row du tableau (tr)
  const tr = document.createElement("tr");

  // crée une td avec l'image et l'intègre au tr
  const tdImage = document.createElement("td");
  const productImage = document.createElement("img");
  productImage.src = product.image;
  productImage.width = 50;
  tdImage.appendChild(productImage);
  tr.appendChild(tdImage);

  // crée une td avec le nom et l'intègre au tr
  const tdName = document.createElement("td");
  tdName.textContent = product.name;
  tr.appendChild(tdName);

  // crée une td avec le prix et l'intègre au tr
  const tdPrice = document.createElement("td");
  tdPrice.textContent = "€ "+(product.price).toFixed(2);
  tr.appendChild(tdPrice);

  // intègre le tr au tableau
  cartTable.appendChild(tr);

});
