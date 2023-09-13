export function postRating(id, genre, guestSession) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({
      value: genre,
    }),
  }
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/rating?api_key=b029cfb27d4d05afb5d2401c555deade&guest_session_id=${guestSession}`,
    options
  ).catch((error) => {
    return { ratingError: error }
  })
}
