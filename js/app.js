function displayMovies(movie) {
  console.log("Movie");
}

// console.log("what is going on?");

async function doFetch(url) {
  try {
    const response = await fetch(url);
    console.log(response);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

doFetch("https://v2.api.noroff.dev/square-eyes");
