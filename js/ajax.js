// Exécute un appel AJAX GET

function ajaxGet(url) {
	return new Promise(function(resolve, reject){
		const request = new XMLHttpRequest();
		request.open("GET", url);
		request.addEventListener("load", function() {
			if (request.status >= 200 && request.status < 400) {
				resolve(JSON.parse(request.responseText));
			} else {
				reject(request.status + " " + request.statusText + " " + url);
			}
		});
		request.send(null);
	})
}