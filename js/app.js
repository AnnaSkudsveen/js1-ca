const movieListDiv = document.querySelector(".movie-list");
const filterDiv = document.querySelector(".filter");
const checkboxDiv = document.querySelector(".form-checkboxes");

function displayMovies(movie) {
  const movieDiv = document.createElement("div");
  movieDiv.innerHTML += `
  <img src="${movie.image.url}" alt="${movie.image.alt}" class="movie-poster">
  <h3>${movie.title}</h3>
  <p class="movie-description">${movie.description}</p>
  <button>See more</button>
  `;
  movieListDiv.appendChild(movieDiv);
}

function genreIntoCheckbox(genre) {
  checkboxDiv.innerHTML += `
  <label for="${genre}">${genre}</label>
    <input type="checkbox" name="${genre}" id="${genre}">
    

    `;
}

async function fetchMovies(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const movieData = data.data;
    const genres = [];

    for (let i = 0; i < movieData.length; i++) {
      displayMovies(movieData[i]);

      const movieGenre = movieData[i].genre;
      genres.push(movieGenre);
    }

    const uniqeGenres = [...new Set(genres)];

    for (const genre of uniqeGenres) {
      genreIntoCheckbox(genre);
    }
  } catch (error) {
    console.log(error);
    console.error("error fetching data: ", error);
  }
}

fetchMovies("https://v2.api.noroff.dev/square-eyes");
