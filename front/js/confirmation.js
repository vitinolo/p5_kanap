let queryStringUrlId = window.location.search;
let urlSearchParams = new URLSearchParams(queryStringUrlId);
document.getElementById('orderId').innerText = urlSearchParams.get('order_id');   
