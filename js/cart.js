// déclaration des variables
const cartContent = JSON.parse(localStorage.getItem("cart"));
const cartTable = document.getElementById("cartTable");
const emptyCart = document.getElementById("emptyCart");
let tr;
let totalPrice = 0;

// crée un td et l'intègre au tr
const generateTd = function(data) {
  const td = document.createElement("td");
  td.textContent = data;
  tr.appendChild(td);
}

// crée un bouton pour supprimer un article
function generateTdDelete(key) {
  const tdDeleteBtn = document.createElement("td");
  const deleteBtn = document.createElement("a");
  deleteBtn.className = "btn btn-warning";
  deleteBtn.textContent = "Delete";
  deleteBtn.href = "../html/cart.html";
  deleteBtn.role = "button";
  deleteBtn.id = key;
  tdDeleteBtn.appendChild(deleteBtn);
  tr.appendChild(tdDeleteBtn);
  deleteBtn.addEventListener("click", function(){
    const newCartContent = cartContent.filter(item => item.key != deleteBtn.id);
    localStorage.setItem("cart", JSON.stringify(newCartContent));
  })
}


// si existant, prend chaque élément du panier un par un
if (cartContent) {
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

    // crée une td avec un bouton delete et l'intègre au tr
    generateTdDelete(product.key);

    // intègre le tr au tableau
    cartTable.appendChild(tr);

  });
}

// indique le prix total
tr = document.createElement("tr");
generateTd("Total");
generateTd("");
generateTd("€ "+totalPrice.toFixed(2));
cartTable.appendChild(tr);


// crée un bouton pour vider le panier
const emptyCartBtn = document.createElement("a");
emptyCartBtn.className = "btn btn-danger";
emptyCartBtn.textContent = "Empty cart";
emptyCartBtn.href = "../html/cart.html";
emptyCartBtn.role = "button";
emptyCartBtn.addEventListener("click", function(){
  localStorage.removeItem("cart");
});
emptyCart.appendChild(emptyCartBtn);

// crée un bouton pour aller au formulaire de commande
const orderBtn = document.createElement("a");
orderBtn.className = "btn btn-success";
orderBtn.textContent = "Order";
orderBtn.href = "#order";
orderBtn.role = "button";
orderBtn.addEventListener("click", function(){});
if(totalPrice) {order.appendChild(orderBtn)};

