export function genre() {
  let url = 'https://api.themoviedb.org/3/genre/movie/list?language=en'
  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDI5Y2ZiMjdkNGQwNWFmYjVkMjQwMWM1NTVkZWFkZSIsInN1YiI6IjY0ZGE5NTY5ZjQ5NWVlMDI5MWEwN2Q2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h0QaQYJO5sSJCGMlXO2TnXQffvp_YbbnhON9fK4ySRM',
    },
  })
    .then((response) => response.json())
    .then((result) => {
      return {
        genre: result.genres,
      }
    })
}
