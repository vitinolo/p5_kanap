let queryStringUrlId = window.location.search;
let urlSearchParams = new URLSearchParams(queryStringUrlId);
document.getElementById('orderNumber').innerText = urlSearchParams.get('order_id');   
