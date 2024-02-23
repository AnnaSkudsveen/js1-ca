const movieListDiv = document.querySelector(".movie-list");
const itemsInCart = JSON.parse(localStorage.getItem("moviesInCart"));
const payBtn = document.querySelector(".pay-btn");
const homepageLink = document.getElementById("homepage-link");

function displayMovies(movie) {
  const movieDiv = document.createElement("div");
  if (movie.onSale) {
    movieDiv.innerHTML += `
      <img src="${movie.image}" alt="picture of movie cover" class="movie-poster">
      <h3>${movie.title}</h3>
      `;
  } else {
    movieDiv.innerHTML += `
      <img src="${movie.image}" alt="picture of movie cover" class="movie-poster">
      <h3>${movie.title}</h3>
      `;
  }
  movieListDiv.appendChild(movieDiv);
}

let movieData = [];
homepageLink.addEventListener("click", () => {
  localStorage.clear();
});

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
    });
} catch (error) {
  console.log(error);
  alert(error);
}
