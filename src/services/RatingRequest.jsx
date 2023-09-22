export function ratingRequest(guestSession, page) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  }

  return fetch(
    `https://api.themoviedb.org/3/guest_session/${guestSession}/rated/movies?api_key=b029cfb27d4d05afb5d2401c555deade&language=en-US&page=${page}&sort_by=created_at.asc`,
    options
  )
    .then((response) => response.json())
    .then((result) => {
      return {
        rating: result.results,
        ratingLoaded: true,
        totalPages: result.total_pages,
      }
    })
    .catch((error) => {
      return {
        ratingLoaded: true,
        ratingError: error,
      }
    })
}
