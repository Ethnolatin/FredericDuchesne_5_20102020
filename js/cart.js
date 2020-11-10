// déclaration des variables
const cartContent = JSON.parse(localStorage.getItem("cart")) || [];
const cartEmpty = document.getElementById("cartEmpty");
const cartTable = document.getElementById("cartTable");
let tr;
let totalPrice = 0;

// n'affiche pas le formulaire de commande
orderForm.style.display = "none";

// change le titre si panier non vide
if(cartContent.length != 0) {
  cartEmpty.textContent = "Contenu de votre panier :";
}

// crée une td et l'intègre au tr
const generateTd = function(data, align) {
  const td = document.createElement("td");
  td.textContent = data;
  td.className = "text-"+align;
  tr.appendChild(td);
}

// crée un bouton pour supprimer un article
function generateTdDelete(key) {
  const tdDeleteBtn = document.createElement("td");
  const deleteBtn = document.createElement("a");
  deleteBtn.className = "btn btn-warning float-right";
  deleteBtn.textContent = "Supprimer";
  deleteBtn.href = "../html/cart.html";
  deleteBtn.role = "button";
  deleteBtn.id = key;
  tdDeleteBtn.appendChild(deleteBtn);
  tr.appendChild(tdDeleteBtn);
  deleteBtn.addEventListener("click", function(){
    const newCartContent = cartContent.filter(item => item.key != deleteBtn.id);
    localStorage.setItem("cart", JSON.stringify(newCartContent));
  });
}


// crée un bouton pour vider le panier
function generateTdEmptyCart() {
  const tdEmptyCartBtn = document.createElement("td");
  const emptyCartBtn = document.createElement("a");
  emptyCartBtn.className = "btn btn-danger float-right";
  emptyCartBtn.textContent = "Vider le panier";
  emptyCartBtn.href = "../html/cart.html";
  emptyCartBtn.role = "button";
  tdEmptyCartBtn.appendChild(emptyCartBtn);
  if(totalPrice) {
    tr.appendChild(tdEmptyCartBtn);
    emptyCartBtn.addEventListener("click", function(){
      localStorage.removeItem("cart");
    });
  }
}


// si existant, prend chaque élément du panier un par un
if (cartContent) {
  cartContent.forEach(product => {
    // crée une ligne (tr)
    tr = document.createElement("tr");

    // calcule le prix total du panier
    totalPrice += product.price;
    // crée une td avec l'image et l'intègre au tr
    const tdImage = document.createElement("td");
    const productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.width = 50;
    tdImage.appendChild(productImage);
    tr.appendChild(tdImage);

    // crée une td avec le nom et l'intègre au tr
    generateTd(product.name+" ("+product.option+")");

    // crée une td avec le prix et l'intègre au tr
    generateTd((product.price).toFixed(2)+"€", "right");

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
generateTd(totalPrice.toFixed(2)+"€", "right");
generateTdEmptyCart();
// n'affiche cette ligne que si le panier n'est pas vide (prix total > 0)
if(totalPrice) {
  cartTable.appendChild(tr);
}

// crée un bouton pour afficher le formulaire de commande
const orderBtn = document.createElement("a");
orderBtn.className = "btn btn-success";
orderBtn.textContent = "Commander";
orderBtn.href = "#orderForm";
orderBtn.role = "button";
orderBtn.addEventListener("click", function(){
  orderForm.style.display = "block";
});
// n'affiche le bouton de commande que si le panier n'est pas vide (prix total > 0)
if(totalPrice) {order.appendChild(orderBtn)};

