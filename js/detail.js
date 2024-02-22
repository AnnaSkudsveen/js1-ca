const movieDetailDiv = document.querySelector(".movie-detail-div");

function displayMovies(movie) {
  const movieDiv = document.createElement("div");
  if (movie.onSale) {
    movieDiv.innerHTML += `
    <img src="${movie.image}" alt="picture of movie cover" class="movie-poster">
    <h3>${movie.title}</h3>
    <p class="movie-description">${movie.description}</p>
    <h4><span class="old-price">${movie.price}</span><span class="discounted-price">${movie.discountedPrice}</span> per month</h4>
    <button class="see-more-btn">See more</button>
    `;
  } else {
    movieDiv.innerHTML += `
    <img src="${movie.image}" alt="picture of movie cover" class="movie-poster">
    <h3>${movie.title}</h3>
    <p class="movie-description">${movie.description}</p>
    <h4 class="price">${movie.price} per month</h4>
    <button class="see-more-btn">See more</button>
    `;
  }
  movieDetailDiv.appendChild(movieDiv);
}

localStorage.getItem("movie", JSON.parse());

let movieData = [];

fetch("https://api.noroff.dev/api/v1/square-eyes")
  .then((response) => {
    return response.json();
  })
  .then((result) => {
    movieData = result;
  });
