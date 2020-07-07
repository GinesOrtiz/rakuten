import client from '../../services/client'

export const getMovie = (movie) =>
  client.get(`/movies/${movie}`).then(({ data }) => data.data)
