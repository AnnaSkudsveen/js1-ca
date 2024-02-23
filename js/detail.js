const movieDetailDiv = document.querySelector(".movie-detail-div");
const selectedMovie = JSON.parse(localStorage.getItem("movie"));
const loadingBar = document.getElementById("loading-bar");

let itemsInCart = JSON.parse(localStorage.getItem("moviesInCart")) || [];

function displayMovies(movie) {
  const movieDiv = document.createElement("div");
  movieDiv.classList = "movieDiv";
  if (movie.onSale) {
    movieDiv.innerHTML += `
    <img src="${movie.image}" alt="picture of movie cover" class="movie-poster-detail">
    <div class="movie-information">
    <h3>${movie.title}</h3>
    <p class="movie-description">${movie.description}</p>
    <h4><span class="old-price">${movie.price},-</span>Sale:<span class="discounted-price"> ${movie.discountedPrice}</span>,-</h4>
    <button class="add-to-cart-btn">Add to cart</button>
    </div>
    `;
  } else {
    movieDiv.innerHTML += `
    <img src="${movie.image}" alt="picture of movie cover" class="movie-poster-detail">
    <div class="movie-information">
    <h3>${movie.title}</h3>
    <p class="movie-description">${movie.description}</p>
    <h4 class="price">${movie.price},-</h4>
    <button class="add-to-cart-btn">Add to cart</button>
    </div>
    `;
  }
  movieDetailDiv.appendChild(movieDiv);

  const addToCartBtn = document.querySelector(".add-to-cart-btn");

  addToCartBtn.addEventListener("click", () => {
    const duplicates = itemsInCart.filter((item) => item.title === movie.title);

    if (duplicates.length > 0) {
      alert("This movie is already in your cart");
    } else {
      storeItemInLocalStorage(movie);
      movieDiv.innerHTML += `
      <p>${movie.title} was added to your cart</p>
      `;
    }
  });
}

function storeItemInLocalStorage(item) {
  itemsInCart.push(item);
  localStorage.setItem("moviesInCart", JSON.stringify(itemsInCart));
}

let movieData = [];

try {
  fetch("https://api.noroff.dev/api/v1/square-eyes")
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      movieData = result;

      displayMovies(selectedMovie);

      loadingBar.style.display = "none";
    });
} catch (error) {
  alert(error);
}
