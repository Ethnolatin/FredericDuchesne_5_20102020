// déclaration des variables
const cartStatus = document.getElementById("cartStatus");
const cartTable = document.getElementById("cartTable");
const orderFormContainer = document.getElementById("orderFormContainer");
const orderForm = document.getElementById("orderForm");
const submitBtn = document.getElementById("submitBtn");
let totalPrice;
let tr;

// crée un bouton
const generateBtn = (txt, color, key) => {
  const btn = document.createElement("a");
  btn.className = "btn btn-"+color+" float-right";
  btn.textContent = txt;
  btn.role = "button";
  btn.id = key;
  return btn;
}

// crée un bouton pour supprimer un article
const generateTdDelete = (key) => {
  const tdDeleteBtn = document.createElement("td");
  const deleteBtn = generateBtn("Supprimer", "warning", key)
  tdDeleteBtn.appendChild(deleteBtn);
  tr.appendChild(tdDeleteBtn);
  deleteBtn.addEventListener("click", () => {
    let cartContent = JSON.parse(localStorage.getItem("cart"))||[];
    const newCartContent = cartContent.filter(item => item.key != key);
    localStorage.setItem("cart", JSON.stringify(newCartContent));
    displayCartContent();
    displayLastRow();
  });
}

// crée un bouton pour vider le panier
const generateTdEmptyCart = () => {
  const tdEmptyCartBtn = document.createElement("td");
  const emptyCartBtn = generateBtn("Vider le panier", "danger")
  tdEmptyCartBtn.appendChild(emptyCartBtn);
  if(totalPrice) {
    tr.appendChild(tdEmptyCartBtn);
    emptyCartBtn.addEventListener("click", () => {
      localStorage.setItem("cart", "[]");
      displayCartContent();
    });
  }
}

// crée un bouton pour afficher le formulaire de commande
const createOrderBtn = () => {
  const orderBtn = generateBtn("Commander", "success");
  orderBtn.href = "#orderFormContainer";
  orderBtn.addEventListener("click", () => {
    orderFormContainer.style.display = "block";
  });
  order.appendChild(orderBtn)
  // si le panier n'est pas vide, affiche le bouton de commande
  if(totalPrice) {
    order.style.display = "block";
  }
}

// crée une cellule et l'intègre à la ligne
const generateTd = (data, align) => {
  const td = document.createElement("td");
  td.textContent = data;
  td.className = "text-" + align;
  tr.appendChild(td);
}

// s'il n'est pas vide, affiche le panier et adapte le titre
const displayCartContent = () => {
  totalPrice = 0;
  let cartContent = JSON.parse(localStorage.getItem("cart"))||[];
  console.log(cartContent)
  // réinitialise l'affichage de la liste des produits dans le panier
  while (cartTable.firstChild) {
    cartTable.removeChild(cartTable.lastChild);
  }
  // si le panier n'est pas vide
  if (cartContent.length > 0) {
    cartStatus.textContent = "Contenu de votre panier :";
    // crée une ligne pour chaque produit du panier
    cartContent.forEach(product => {
      tr = document.createElement("tr");
      // crée une cellule avec l'image et l'intègre à la ligne
      const tdImage = document.createElement("td");
      const productImage = document.createElement("img");
      productImage.src = product.image;
      productImage.width = 50;
      tdImage.appendChild(productImage);
      tr.appendChild(tdImage);
      // crée une cellule avec le nom et l'option et l'intègre à la ligne
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
    // si le panier est vide, adapte le message et n'affiche pas le bouton de commande
    cartStatus.textContent = "Votre panier est vide";
    order.style.display = "none";
  };
}

// si le panier n'est pas vide, affiche le total et le bouton pour vider le panier
const displayLastRow = () => {
  console.log(totalPrice)
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
const products = () => {
  const productList = []
  let cartContent = JSON.parse(localStorage.getItem("cart"))||[];
  cartContent.forEach((product) => {
    productList.push(product.id);
  });
  return productList
}

// génère le corps de la requête au serveur
const orderData = {
  contact: contact,
  products: products()
};

// validation du formulaire de commande
const validateOrder = () => {
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
      // alert("fin de if");
    };
  });
};

function pageLayout() {
  displayCartContent();
  displayLastRow();
  createOrderBtn();
  validateOrder();
};

pageLayout()
