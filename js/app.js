const movieListDiv = document.querySelector(".movie-list");
const filterDiv = document.querySelector(".filter");
const selectMenu = document.getElementById("select-menu");
const filterBtn = document.getElementById("filter-btn");
const seeMoreBtn = document.getElementsByClassName("see-more-btn");
const loadingBar = document.getElementById("loading-bar");

let movieData = [];

let itemsInCart = JSON.parse(localStorage.getItem("moviesInCart")) || [];

try {
  fetch("https://api.noroff.dev/api/v1/square-eyes")
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      movieData = result;

      const genres = [];
      let filteredResult = [];

      for (const movie of movieData) {
        displayMovies(movie);

        //genre filtering
        const movieGenre = movie.genre;
        genres.push(movieGenre);
      }
      //get only uniqe genres into a separate array
      const uniqeGenres = [...new Set(genres)];

      for (let i = 0; i < uniqeGenres.length; i++) {
        genresIntoDropdown(uniqeGenres[i]);
      }

      for (let i = 0; i < seeMoreBtn.length; i++) {
        const movie = movieData[i];
        seeMoreBtn[i].addEventListener("click", () => {
          localStorage.setItem("movie", JSON.stringify(movie));
          window.location.href = "http://127.0.0.1:5501/html/details.html";
        });
      }

      filterBtn.addEventListener("click", () => {
        event.preventDefault();
        filterByGenre(selectMenu.value);
      });

      loadingBar.style.display = "none";
    });
} catch (error) {
  alert(error);
}

// let filteredResult = movieData.filter((movie) => movie.genre === "action");

function displayMovies(movie) {
  const movieDiv = document.createElement("div");
  movieDiv.classList = "movieDiv";
  if (movie.onSale) {
    movieDiv.innerHTML += `
  <img src="${movie.image}" alt="picture of movie cover" class="movie-poster">
  <h3>${movie.title}</h3>
  <h4><span class="old-price">${movie.price}</span>Sale:<span class="discounted-price">${movie.discountedPrice}</span>,-</h4>
  <div class="buttons">
  <button class="see-more-btn">See more</button>
  <button class="add-to-cart-btn">Add to cart</button>
  </div>
  `;
  } else {
    movieDiv.innerHTML += `
  <img src="${movie.image}" alt="picture of movie cover" class="movie-poster">
  <h3>${movie.title}</h3>
  <h4 class="price">${movie.price},-</h4>
  <div class="buttons">
  <button class="see-more-btn">See more</button>
  <button class="add-to-cart-btn">Add to cart</button>
  </div>
  `;
  }
  movieListDiv.appendChild(movieDiv);

  const addToCartBtn = movieDiv.querySelector(".add-to-cart-btn");

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

function genresIntoDropdown(genre) {
  const genreOption = document.createElement("option");
  genreOption.innerText = genre;
  genreOption.value = genre;
  selectMenu.appendChild(genreOption);
}

function filterByGenre(genreToFilterBy) {
  let filteredResult = [];
  for (const movie of movieData) {
    if (movie.genre === genreToFilterBy) {
      filteredResult.push(movie);
    }
  }

  movieListDiv.innerHTML = "";

  if (selectMenu.value === "all") {
    for (const movie of movieData) {
      displayMovies(movie);

      for (let i = 0; i < seeMoreBtn.length; i++) {
        const movieLink = movieData[i];
        seeMoreBtn[i].addEventListener("click", () => {
          localStorage.setItem("movie", JSON.stringify(movieLink));
          window.location.href = "http://127.0.0.1:5501/html/details.html";
        });
      }
    }
  } else {
    for (const movie of filteredResult) {
      displayMovies(movie);
      for (let i = 0; i < seeMoreBtn.length; i++) {
        const movieLink = filteredResult[i];
        seeMoreBtn[i].addEventListener("click", () => {
          localStorage.setItem("movie", JSON.stringify(movieLink));
          window.location.href = "http://127.0.0.1:5501/html/details.html";
        });
      }
    }
  }
}

//I used v1, not v2 of the API as it was most similar to the one we used in class
//I created a fetch request for v2 as well, but I found v1 to be easier to understand
// fetchMovies("https://api.noroff.dev/api/v1/square-eyes");

//I startet with the async request, but I found it a bit troubling. It worked,
//but I struggled a bit with getting filtering to work,
//so I decied to try fetch.then and that worked better for me.
