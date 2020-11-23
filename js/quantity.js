const quantity = () => {
  const cartContent = JSON.parse(localStorage.getItem("cart"))||[];
  const navItemCart = document.getElementById("navItemCart");
  navItemCart.textContent = " "+ cartContent.length;
}

quantity();
