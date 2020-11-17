// déclaration des variables
const cartStatus = document.getElementById("cartStatus");
const cartTable = document.getElementById("cartTable");
const order = document.getElementById("order");
const orderFormContainer = document.getElementById("orderFormContainer");
const orderForm = document.getElementById("orderForm");
const submitBtn = document.getElementById("submitBtn");
let totalPrice;
let tableRow;

// crée un bouton
const generateBtn = (txt, color, side, key) => {
  const btn = document.createElement("a");
  btn.className = "btn btn-" + color + " float-" + side;
  btn.textContent = txt;
  btn.role = "button";
  btn.id = key;
  return btn;
}

// crée un bouton pour supprimer un article
const generateCellDelete = (key) => {
  const deleteBtnCell = document.createElement("div");
  deleteBtnCell.className = "col-5 col-sm-3";
  const deleteBtn = generateBtn("Supprimer", "warning", "right", key)
  deleteBtnCell.appendChild(deleteBtn);
  tableRow.appendChild(deleteBtnCell);
  deleteBtn.addEventListener("click", () => {
    let cartContent = JSON.parse(localStorage.getItem("cart"))||[];
    const newCartContent = cartContent.filter(item => item.key != key);
    localStorage.setItem("cart", JSON.stringify(newCartContent));
    displayCartContent();
    displayLastRow();
  });
}

// crée un bouton pour vider le panier
const generateCellEmptyCart = () => {
  const emptyCartBtnCell = document.createElement("div");
  emptyCartBtnCell.className = ("col-5 col-sm-3")
  const emptyCartBtn = generateBtn("Vider le panier", "danger", "right")
  emptyCartBtnCell.appendChild(emptyCartBtn);
  if(totalPrice) {
    tableRow.appendChild(emptyCartBtnCell);
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
  // affiche le bouton si le panier n'est pas vide
  if(totalPrice) {
    order.style.display = "block";
  }
}

// crée une cellule et l'intègre à la ligne
const generateCell = (data, size, align) => {
  const tableCell = document.createElement("div");
  tableCell.textContent = data;
  tableCell.className = "col-" + size +" text-" + align;
  tableRow.appendChild(tableCell);
}

// si le panier n'est pas vide, affiche son contenu
const displayCartContent = () => {
  // réinitialise l'affichage
  while (cartTable.firstChild) {
    cartTable.removeChild(cartTable.lastChild);
  }
  totalPrice = 0;
  // récupère le contenu du panier
  let cartContent = JSON.parse(localStorage.getItem("cart"))||[];
  // si le panier n'est pas vide
  if (cartContent.length > 0) {
    cartStatus.textContent = "Contenu de votre panier";
    // crée une ligne pour chaque produit du panier
    cartContent.forEach(product => {
      tableRow = document.createElement("div");
      tableRow.className = "row border-top py-2";
      // crée une cellule avec l'image et l'intègre à la ligne
      const imageCell = document.createElement("div");
      imageCell.className = "col-3 col-sm-2";
      const productImage = document.createElement("img");
      productImage.src = product.image;
      productImage.width = 60;
      imageCell.appendChild(productImage);
      tableRow.appendChild(imageCell);
      // crée une cellule avec le nom et l'option et l'intègre à la ligne
      generateCell(product.name+" ("+product.option+")", "9 col-sm-5");
      // génère un retour à la ligne, sauf pour les écrans plus grands que sm
      const breakLine = document.createElement("div");
      breakLine.className = "w-100 d-none d-sm-block";
      // crée une cellule avec le prix et l'intègre à la ligne
      generateCell((product.price).toFixed(2)+"€", "7 col-sm-2", "right");
      // crée une cellule avec un bouton delete et l'intègre à la ligne
      generateCellDelete(product.key);
      // intègre la ligne au tableau
      cartTable.appendChild(breakLine);
      cartTable.appendChild(tableRow);
      // met à jour le montant du panier
      totalPrice += product.price;
    });
  } else {
    // si le panier est vide, adapte le message et n'affiche pas le bouton de commande
    cartStatus.textContent = "Votre panier est vide";
    order.style.display = "none";
  };
}

// si le panier n'est pas vide, affiche en dernière ligne le total et le bouton pour le vider
const displayLastRow = () => {
  if(totalPrice) {
    // génère le total
    tableRow = document.createElement("div");
    tableRow.className = "row border-top py-2";
    generateCell("Total", "3");
    generateCell(totalPrice.toFixed(2)+"€","4 col-sm-6", "right");
    // crée le bouton pour vider le panier
    generateCellEmptyCart();
    // affiche la ligne avec le total et le bouton pour vider le panier
    cartTable.appendChild(tableRow);
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
  // récupère les produits dans localStorage et ajoute leur id à la liste
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
  submitBtn.addEventListener("click", (event) => {
    // au click, si les champs sont validés, envoyer la requête au serveur
    if (orderForm.checkValidity()) {
      ajaxPost("http://localhost:3000/api/furniture/order", orderData)
        .then((response) => {
          // efface le contenu du panier
          localStorage.setItem("cart", "[]");
          // affiche la page confirmation
          location = "../html/confirmation.html?id=" + response.orderId + "&price=" + totalPrice;
        })
        // en cas de problème de liaison avec le serveur, affiche un message
        .catch((err) => {
          alert(err);
        });
      // annule l'envoi du formulaire par défaut
      event.preventDefault();
    };
  });
};

// génère la page
function pageLayout() {
  displayCartContent();
  displayLastRow();
  createOrderBtn();
  validateOrder();
};

pageLayout()
