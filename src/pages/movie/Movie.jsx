import React, { useCallback, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { RakutenContext } from '../../context/rakuten.context'
import { getMovie } from './movie.service'
import Cover from '../../components/cover/Cover'
import { getImage } from '../../services/images'

import './movie.styles.scss'

const MoviePage = () => {
  const { state, dispatch } = useContext(RakutenContext)
  const { id } = useParams()
  const movie = state.media[id]

  const onGetMovie = useCallback(async () => {
    const content = await getMovie(id)

    dispatch({ type: 'media', content })
  }, [dispatch, id])

  const details = [
    {
      label: 'Duración',
      value: `${movie?.duration || 0} minutos`,
    },
    {
      label: 'Año',
      value: movie?.year,
    },
    {
      label: 'Puntuación',
      value: `${movie?.rating?.average}/${movie?.rating?.scale}`,
    },
    {
      label: 'Público',
      value: movie?.classification?.name,
    },
    {
      label: 'Precio',
      value: movie?.label || movie?.order_options[0]?.price,
    },
  ]

  const getStreamInformation = (type) =>
    movie.view_options.private.streams[0][type]
      .map((stream) => stream.name)
      .join(', ')

  useEffect(() => {
    document.body.scrollTop = 0

    if (!movie?.full) {
      onGetMovie()
    }

    if (movie?.title) {
      dispatch({
        type: 'section',
        section: { name: 'Película', title: movie.title },
      })
    }
  }, [onGetMovie, movie, dispatch])

  return (
    <div className={'movie main-section'}>
      <Cover media={movie} />
      <div className={'info-section'}>
        {details.map((detail) => (
          <div className={'info-group'} key={detail.label}>
            <div className={'info-label'}>{detail.label}</div>
            <div className={'info-value'}>{detail.value}</div>
          </div>
        ))}
      </div>
      {movie?.full && (
        <>
          <div className={'detail-section'}>
            <h3 className={'detail-title'}>Sinopsis:</h3>
            <p className={'detail-value'}>{movie.plot}</p>
          </div>

          <div className={'detail-stream'}>
            <div className={'detail-column'}>
              <h3 className={'section-title'}>Audio:</h3>
              <p>{getStreamInformation('audio_languages')}</p>
            </div>
            <div className={'detail-column'}>
              <h3 className={'section-title'}>Subtítulos:</h3>
              <p>{getStreamInformation('subtitle_languages')}</p>
            </div>
          </div>

          <div className={'detail-section'}>
            <h3 className={'section-title'}>Dirección y reparto:</h3>
            <div className={'actors-section'}>
              {movie.actors.map((actor) => (
                <div className={'actors-profile'} key={actor.id}>
                  <div
                    className={'actors-photo'}
                    style={{
                      backgroundImage: `url(${getImage(actor.photo, 100)}`,
                    }}
                  />
                  <div className={'actors-name'}>{actor.name}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default MoviePage
