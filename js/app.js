const movieListDiv = document.querySelector(".movie-list");
const filterDiv = document.querySelector(".filter");

function displayMovies(movie) {
  const movieDiv = document.createElement("div");
  movieDiv.innerHTML += `
  <img src="${movie.image.url}" alt="${movie.image.alt}" class="movie-poster">
  <h3>${movie.title}</h3>
  <p>${movie.description}</p>
  <button>See more</button>
  `;
  movieListDiv.appendChild(movieDiv);
}

async function fetchMovies(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const movieData = data.data;

    for (let i = 0; i < movieData.length; i++) {
      displayMovies(movieData[i]);
    }
  } catch (error) {
    console.log(error);
    console.error("error fetching data: ", error);
  }
}

fetchMovies("https://v2.api.noroff.dev/square-eyes");
