// extrait les données de l'url
const getDataFromUrl = (url) => {
  // extrait la partie data de l'url et supprime le "?"
  const urlData = url.search.substring(1);
  // sépare les paires "nom=valeur"
  const orderDataPairs = urlData.split('&');
  let orderData = {};
  // pour chaque paire, extrait les deux éléments et affecte la valeur (2e élément) au nom (1er élément)
  orderDataPairs.forEach(pair => {
    let pairElement = pair.split('=');
    orderData[pairElement[0]] = pairElement[1];
  });
  return orderData;
}

// affiche les données relatives à la commande
const displayData = () => {
  // récupère les données dans l'URL de la page
  const orderData = getDataFromUrl(window.location);
  // affiche les données sur la page
  const orderNumber = document.getElementById("orderNumber");
  const orderAmount = document.getElementById("orderAmount");
  orderNumber.textContent += orderData.id;
  orderAmount.textContent += Number(orderData.price).toFixed(2)+"€";
}

displayData()