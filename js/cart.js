// déclaration des variables
const cartContent = JSON.parse(localStorage.getItem("cart")) || [];
const cartEmpty = document.getElementById("cartEmpty");
const cartTable = document.getElementById("cartTable");
const orderFormContainer = document.getElementById("orderFormContainer");
const orderForm = document.getElementById("orderForm");
const submitBtn = document.getElementById("submitBtn");
let tr;
let totalPrice = 0;


// n'affiche pas le formulaire de commande
orderFormContainer.style.display = "none";

// change le titre si panier non vide
if(cartContent.length != 0) {
  cartEmpty.textContent = "Contenu de votre panier :";
}

// crée une cellule et l'intègre à la ligne
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

// génère la liste de produits dans le panier
if (cartContent) {
  cartContent.forEach(product => {

    // crée une ligne
    tr = document.createElement("tr");

    // crée une cellule avec l'image et l'intègre à la ligne
    const tdImage = document.createElement("td");
    const productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.width = 50;
    tdImage.appendChild(productImage);
    tr.appendChild(tdImage);

    // crée une cellule avec le nom et l'intègre à la ligne
    generateTd(product.name+" ("+product.option+")");

    // crée une cellule avec le prix et l'intègre à la ligne
    generateTd((product.price).toFixed(2)+"€", "right");

    // crée une cellule avec un bouton delete et l'intègre à la ligne
    generateTdDelete(product.key);

    // intègre la ligne au tableau
    cartTable.appendChild(tr);

    // met à jour le montant du panier
    totalPrice += product.price;

  });
}

// crée la ligne avec le montant du panier
tr = document.createElement("tr");
generateTd("Total");
generateTd("");
generateTd(totalPrice.toFixed(2)+"€", "right");
generateTdEmptyCart();
// n'affiche cette ligne que si le panier n'est pas vide (prix total > 0)
if(totalPrice) {cartTable.appendChild(tr);
}

// crée un bouton pour afficher le formulaire de commande
const orderBtn = document.createElement("a");
orderBtn.className = "btn btn-success";
orderBtn.textContent = "Commander";
orderBtn.href = "#orderFormContainer";
orderBtn.role = "button";
orderBtn.addEventListener("click", function(){
  orderFormContainer.style.display = "block";
});
// n'affiche ce bouton que si le panier n'est pas vide (prix total > 0)
if(totalPrice) {order.appendChild(orderBtn)};

// génère l'objet contact à envoyer au serveur
const contact = {
  firstName: document.getElementById("firstName"),
  lastName: document.getElementById("lastName"),
  address: document.getElementById("address"),
  city: document.getElementById("city"),
  email: document.getElementById("email")
};

// génère le tableau products à envoyer au serveur
const products = []
cartContent.forEach(function(product){
  products.push(product.id)
});

// génère le corps de la requête au serveur
const orderData = {
  contact: contact,
  products: products
};
console.log(orderData)


// validation du formulaire de commande
submitBtn.addEventListener("click", function(){
  // si les champs sont validés, envoyer la requête au serveur
  if(orderForm.reportValidity()) {
    ajaxPost("http://localhost:3000/api/furniture/order", orderData)
      .then(function (response) {
        // efface le contenu du panier
        localStorage.removeItem("cart");
        // affiche la page confirmation
        const redirect = "../html/confirmation.html?id="+response.orderId+"&price="+totalPrice;
        location = redirect;
      })
      .catch(function(err) {
        alert(err)
      });
  };
})
