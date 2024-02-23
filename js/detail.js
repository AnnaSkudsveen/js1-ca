const movieDetailDiv = document.querySelector(".movie-detail-div");
const selectedMovie = JSON.parse(localStorage.getItem("movie"));

let itemsInCart = JSON.parse(localStorage.getItem("moviesInCart")) || [];

function displayMovies(movie) {
  const movieDiv = document.createElement("div");
  if (movie.onSale) {
    movieDiv.innerHTML += `
    <img src="${movie.image}" alt="picture of movie cover" class="movie-poster">
    <h3>${movie.title}</h3>
    <p class="movie-description">${movie.description}</p>
    <h4><span class="old-price">${movie.price}</span><span class="discounted-price">${movie.discountedPrice}</span> per month</h4>
    <button class="add-to-cart-btn">Add to cart</button>
    `;
  } else {
    movieDiv.innerHTML += `
    <img src="${movie.image}" alt="picture of movie cover" class="movie-poster">
    <h3>${movie.title}</h3>
    <p class="movie-description">${movie.description}</p>
    <h4 class="price">${movie.price} per month</h4>
    <button class="add-to-cart-btn">Add to cart</button>
    `;
  }
  movieDetailDiv.appendChild(movieDiv);

  const addToCartBtn = document.querySelector(".add-to-cart-btn");

  addToCartBtn.addEventListener("click", () => {
    storeItemInLocalStorage(movie);
    movieDiv.innerHTML += `
    <p>${movie.title} was added to your cart</p>
    `;

    //ADD AN ERROR HANDLING FOR DUPLICATE OBJECTS
  });
}

function storeItemInLocalStorage(item) {
  itemsInCart.push(item);
  localStorage.setItem("moviesInCart", JSON.stringify(itemsInCart));
}

let movieData = [];

fetch("https://api.noroff.dev/api/v1/square-eyes")
  .then((response) => {
    return response.json();
  })
  .then((result) => {
    movieData = result;

    displayMovies(selectedMovie);
  });
