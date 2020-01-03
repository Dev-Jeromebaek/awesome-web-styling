const order = document.querySelector(".order");

function handleOrderClick() {
  if (!order.classList.contains("animate")) {
    order.classList.add("animate");
    setTimeout(function() {
      order.classList.remove("animate");
    }, 10000);
  }
}

function init() {
  order.addEventListener("click", handleOrderClick);
}

init();
