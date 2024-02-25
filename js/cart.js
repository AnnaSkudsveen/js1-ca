const movieListDiv = document.querySelector(".movie-list");
const itemsInCart = JSON.parse(localStorage.getItem("moviesInCart"));
const payBtn = document.querySelector(".pay-btn");
const loadingBar = document.getElementById("loading-bar");
const totalSum = document.getElementById("total");

function displayMovies(movie) {
  const movieDiv = document.createElement("div");
  movieDiv.classList = "movieDiv";
  if (movie.onSale) {
    movieDiv.innerHTML += `
      <img src="${movie.image}" alt="picture of movie cover" class="movie-poster">
      <h3>${movie.title}</h3>
      <h4><span class="old-price">${movie.price}</span>Sale: <span class="discounted-price">${movie.discountedPrice}</span>,-</h4>
      <button class="remove-from-cart-btn">Remove from cart</button>
      `;
  } else {
    movieDiv.innerHTML += `
      <img src="${movie.image}" alt="picture of movie cover" class="movie-poster">
      <h3>${movie.title}</h3>
      <h4 class="price">${movie.price},-</h4>
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

      if (itemsInCart) {
        for (const movie of itemsInCart) {
          displayMovies(movie);
        }

        sumOfAll();

        loadingBar.style.display = "none";
      } else {
        loadingBar.innerText = "Your cart is empty";
      }
    });
} catch (error) {
  alert(error);
}

function sumOfAll() {
  sum = 0;
  for (let i = 0; i < itemsInCart.length; i++) {
    if (itemsInCart[i].sale) {
      sum += itemsInCart[i].discountedPrice;
    } else {
      sum += itemsInCart[i].price;
    }
  }

  sum = Math.round(sum * 100) / 100;

  totalSum.innerText = `Total: 
  ${sum},-`;
}
