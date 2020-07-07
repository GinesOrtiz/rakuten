import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { getTrailer } from './trailer.service'
import { RakutenContext } from '../../context/rakuten.context'
import './trailer.styles.scss'

const TrailerPage = () => {
  const { dispatch } = useContext(RakutenContext)
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [trailer, setTrailer] = useState(null)

  const onRequestTrailer = useCallback(() => {
    getTrailer(id).then((res) => {
      setTrailer(res?.stream_infos[0])
      setLoading(false)
    })
  }, [id])

  useEffect(() => {
    onRequestTrailer()

    dispatch({
      type: 'section',
      section: { name: 'Trailer', title: '' },
    })
  }, [onRequestTrailer, dispatch])

  if (loading) {
    return (
      <div className={'trailer loading'}>
        <div className={'loading-text'}>Cargando...</div>
      </div>
    )
  }

  return (
    <div className={'trailer'}>
      {trailer ? (
        <>
          <Link className={'return-link'} to={`/movie/${id}`}>
            Volver
          </Link>
          <video
            className={'trailer-player'}
            src={trailer.url}
            controls
            autoPlay
          />
        </>
      ) : (
        <div className={'error'}>Trailer no disponible</div>
      )}
    </div>
  )
}

export default TrailerPage
