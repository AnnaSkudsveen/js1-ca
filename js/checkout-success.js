const movieListDiv = document.querySelector(".movie-list");
const itemsInCart = JSON.parse(localStorage.getItem("moviesInCart"));
const payBtn = document.querySelector(".pay-btn");
const homepageLinkText = document.getElementById("homepage-link-text");
const navImgBtn = document.querySelector(".nav-image-div");

function displayMovies(movie) {
  const movieDiv = document.createElement("div");
  movieDiv.classList = "movieDiv";
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
homepageLinkText.addEventListener("click", () => {
  localStorage.clear();
});

navImgBtn.addEventListener("click", () => {
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
  alert(error);
}
