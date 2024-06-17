//filtro dentro il campo input
const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", () => {
  const input = searchInput.value.toLowerCase();
  const products = document.querySelectorAll(".card");

  products.forEach((product) => {
    const title = product.querySelector("h3").textContent.toLowerCase();
    product.style.display = title.includes(input) ? "block" : "none";
  });
});
