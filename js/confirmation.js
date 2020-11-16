const urlData = window.location.search.substring(1);

// extrait les paires nom=valeur de l'url
const getDataFromUrl = (url) => {
  // sépare les paires "nom=valeur"
  const orderDataPairs = urlData.split('&');
  // extrait les deux éléments de chaque paire et affecte la valeur (2e élément) au nom (1er élément)
  let orderData = {};
  orderDataPairs.forEach(pair => {
    let pairElement = pair.split('=');
    orderData[pairElement[0]] = pairElement[1];
  });
  return orderData;
 }
 
 // récupère les infos liées à la commande dans l'URL de la page
 const orderData = getDataFromUrl(urlData);

 // affiche les données sur la page
 const displayData = () => {
  const orderNumber = document.getElementById("orderNumber");
  const orderAmount = document.getElementById("orderAmount");
  orderNumber.textContent += orderData.id;
  orderAmount.textContent += Number(orderData.price).toFixed(2)+"€";
 }

 displayData()