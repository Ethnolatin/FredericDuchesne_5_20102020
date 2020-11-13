// déclaration des variables
const cartStatus = document.getElementById("cartStatus");
const cartTable = document.getElementById("cartTable");
const orderFormContainer = document.getElementById("orderFormContainer");
const orderForm = document.getElementById("orderForm");
const submitBtn = document.getElementById("submitBtn");
let tr;
let totalPrice = 0;

// crée une cellule et l'intègre à la ligne
const generateTd = (data, align) => {
  const td = document.createElement("td");
  td.textContent = data;
  td.className = "text-" + align;
  tr.appendChild(td);
}

// crée un bouton pour supprimer un article
const generateTdDelete = (key) => {
  const tdDeleteBtn = document.createElement("td");
  const deleteBtn = document.createElement("a");
  deleteBtn.className = "btn btn-warning float-right";
  deleteBtn.textContent = "Supprimer";
  deleteBtn.role = "button";
  deleteBtn.id = key;
  tdDeleteBtn.appendChild(deleteBtn);
  tr.appendChild(tdDeleteBtn);
  deleteBtn.addEventListener("click", () => {
    const newCartContent = cartContent.filter(item => item.key != key);
    localStorage.setItem("cart", JSON.stringify(newCartContent));
    displayCartContent();
  });
}

// crée un bouton pour vider le panier
const generateTdEmptyCart = () => {
  const tdEmptyCartBtn = document.createElement("td");
  const emptyCartBtn = document.createElement("a");
  emptyCartBtn.className = "btn btn-danger float-right";
  emptyCartBtn.textContent = "Vider le panier";
  emptyCartBtn.role = "button";
  tdEmptyCartBtn.appendChild(emptyCartBtn);
  if(totalPrice) {
    tr.appendChild(tdEmptyCartBtn);
    emptyCartBtn.addEventListener("click", () => {
      localStorage.setItem("cart", "[]");
      displayCartContent();

    });
  }
}

// s'il n'est pas vide, affiche le panier et adapte le titre
const displayCartContent = () => {
  let cartContent = JSON.parse(localStorage.getItem("cart"));
  console.log(cartContent)
  // réinitialise l'affichage de la liste des produits dans le panier
  while (cartTable.firstChild) {
    cartTable.removeChild(cartTable.lastChild);
  }
  if (cartContent.length > 0) {
    cartStatus.textContent = "Contenu de votre panier :";
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
  } else {
    cartStatus.textContent = "Votre panier est vide";
    order.style.display = "none";
  };
}

// crée un bouton pour afficher le formulaire de commande
const createOrderBtn = () => {
  const orderBtn = document.createElement("a");
  orderBtn.className = "btn btn-success";
  orderBtn.textContent = "Commander";
  orderBtn.href = "#orderFormContainer";
  orderBtn.role = "button";
  orderBtn.addEventListener("click", () => {
    orderFormContainer.style.display = "block";
  });
  order.appendChild(orderBtn)
}

// si le panier n'est pas vide affiche le total, le bouton pour vider le panier et le bouton de commande
const displayOtherElements = () => {
  if(totalPrice) {
    // génère le total
    tr = document.createElement("tr");
    generateTd("Total");
    generateTd("");
    generateTd(totalPrice.toFixed(2)+"€", "right");
    // crée le bouton pour vider le panier
    generateTdEmptyCart();
    // affiche la ligne avec le total et le bouton pour vider le panier
    cartTable.appendChild(tr);
    // affiche le bouton de commande
    order.style.display = "block";
  };
}

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
let cartContent = JSON.parse(localStorage.getItem("cart"));
cartContent.forEach((product) => {
  products.push(product.id);
});

// génère le corps de la requête au serveur
const orderData = {
  contact: contact,
  products: products
};

// validation du formulaire de commande
const orderValidation = () => {
  submitBtn.addEventListener("click", () => {
    // si les champs sont validés, envoyer la requête au serveur
    if (orderForm.checkValidity()) {
      ajaxPost("http://localhost:3000/api/furniture/order", orderData)
        .then((response) => {
          // efface le contenu du panier
          localStorage.setItem("cart", "[]");
          // affiche la page confirmation
          location = "../html/confirmation.html?id=" + response.orderId + "&price=" + totalPrice;
        })
        .catch((err) => {
          alert(err);
        });
      alert("fin de if");
    };
  })
}

function pageLayout() {
  displayCartContent();
  displayOtherElements();
  createOrderBtn();
  orderValidation();
}

pageLayout()
