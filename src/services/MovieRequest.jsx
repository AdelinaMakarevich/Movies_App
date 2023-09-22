export function request(search, page) {
  let movie = {
    items: [],
    error: undefined,
  }

  let url = `https://api.themoviedb.org/3/trending/movie/day?api_key=b029cfb27d4d05afb5d2401c555deade&page=${page}`
  if (search != /^\s+$/ && search != 0) {
    url = 'https://api.themoviedb.org/3/search/movie?query=' + search + '&include_adult=false&language=en-US' + page
  }
  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDI5Y2ZiMjdkNGQwNWFmYjVkMjQwMWM1NTVkZWFkZSIsInN1YiI6IjY0ZGE5NTY5ZjQ5NWVlMDI5MWEwN2Q2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h0QaQYJO5sSJCGMlXO2TnXQffvp_YbbnhON9fK4ySRM',
    },
  })
    .then((response) => response.json())
    .then((result) => {
      movie.isLoaded = true
      movie.items = result.results
    })
    .then(() => {
      return movie
    })
    .catch((error) => {
      movie.isLoaded = true
      movie.error = error
    })
}
