import React, { useCallback, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { RakutenContext } from '../../context/rakuten.context'
import { getMovie } from './movie.service'

const MoviePage = () => {
  const { id } = useParams()
  const { state, dispatch } = useContext(RakutenContext)
  const movie = state.media[id]

  const onGetMovie = useCallback(async () => {
    const content = await getMovie(id)

    dispatch({ type: 'media', content })
  }, [dispatch, id])

  useEffect(() => {
    if (!movie?.full) {
      onGetMovie()
    }

    if (movie?.title) {
      dispatch({ type: 'section', section: movie.title })
    }
  }, [onGetMovie, movie])

  return (
    <div>
      <pre>{JSON.stringify(movie, null, 2)}</pre>
    </div>
  )
}

export default MoviePage
