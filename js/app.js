const movieListDiv = document.querySelector(".movie-list");
const filterDiv = document.querySelector(".filter");
// const checkboxDiv = document.querySelector(".form-checkboxes");
const selectMenu = document.getElementById("select-menu");
const filterBtn = document.getElementById("filter-btn");
const seeMoreBtn = document.getElementsByClassName("see-more-btn");

console.log(seeMoreBtn);

let movieData = [];

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

    filterBtn.addEventListener("click", () => {
      event.preventDefault();
      filterByGenre(selectMenu.value);
      console.log(selectMenu.value);
    });
  });

// async function fetchMovies(url) {
//   try {
//     const response = await fetch(url);
//     movieData = await response.json();

//     const genres = [];

//     //genre filtering
//     for (const movie of movieData) {
//       displayMovies(movie);
//       const movieGenre = movie.genre;
//       genres.push(movieGenre);
//     }

//     const uniqeGenres = [...new Set(genres)];

//     for (let i = 0; i < uniqeGenres.length; i++) {
//       genresIntoDropdown(uniqeGenres[i]);
//     }
//   } catch (error) {
//     console.log(error);
//     console.error("error fetching data: ", error);
//   }
// }

// let filteredResult = movieData.filter((movie) => movie.genre === "action");

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
  movieListDiv.appendChild(movieDiv);
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

  console.log(filteredResult);
  movieListDiv.innerHTML = "";

  if (selectMenu.value === "all") {
    for (const movie of movieData) {
      displayMovies(movie);
    }
  } else {
    for (const movie of filteredResult) {
      displayMovies(movie);
    }
  }
}

// function genreIntoCheckbox(genre) {
//   checkboxDiv.innerHTML += `
//   <label for="${genre}">${genre}</label>
//     <input type="checkbox" name="${genre}" id="${genre}" value="${genre}">
//     `;
// }

//I used v1, not v2 of the API as it was most similar to the one we used in class
//I created a fetch request for v2 as well, but I found v1 to be easier to understand
// fetchMovies("https://api.noroff.dev/api/v1/square-eyes");
