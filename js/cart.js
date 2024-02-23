const movieListDiv = document.querySelector(".movie-list");
const itemsInCart = JSON.parse(localStorage.getItem("moviesInCart"));
const payBtn = document.querySelector(".pay-btn");
const loadingBar = document.getElementById("loading-bar");

console.log(payBtn);

function displayMovies(movie) {
  const movieDiv = document.createElement("div");
  if (movie.onSale) {
    movieDiv.innerHTML += `
      <img src="${movie.image}" alt="picture of movie cover" class="movie-poster">
      <h3>${movie.title}</h3>
      <h4><span class="old-price">${movie.price}</span><span class="discounted-price">${movie.discountedPrice}</span> per month</h4>
      <button class="remove-from-cart-btn">Remove from cart</button>
      `;
  } else {
    movieDiv.innerHTML += `
      <img src="${movie.image}" alt="picture of movie cover" class="movie-poster">
      <h3>${movie.title}</h3>
      <h4 class="price">${movie.price} per month</h4>
      <button class="remove-from-cart-btn">Remove from cart</button>
      `;
  }
  movieListDiv.appendChild(movieDiv);

  const removeFromCartBtn = movieDiv.querySelector(".remove-from-cart-btn");

  removeFromCartBtn.addEventListener("click", () => {
    removeItemInLocalStorage(movie);
    movieDiv.innerHTML = `
    <p>${movie.title} was removed from your cart</p>
    `;

    //ADD AN ERROR HANDLING FOR DUPLICATE OBJECTS
  });
}

function removeItemInLocalStorage(item) {
  const removeIndex = itemsInCart.indexOf(item);
  if (removeIndex !== -1) {
    itemsInCart.splice(removeIndex, 1);
    localStorage.setItem("moviesInCart", JSON.stringify(itemsInCart));
  }
}

let movieData = [];
try {
  fetch("https://api.noroff.dev/api/v1/square-eyes")
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      movieData = result;

      for (const movie of itemsInCart) {
        displayMovies(movie);
      }

      loadingBar.style.display = "none";
    });
} catch (error) {
  console.log(error);
  alert(error);
}
