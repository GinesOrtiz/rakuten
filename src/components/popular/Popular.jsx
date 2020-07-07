import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { RakutenContext } from '../../context/rakuten.context'
import { getPopular } from './popular.service'
import { getImage } from '../../services/images'

import './popular.styles.scss'

const Popular = () => {
  const { state, dispatch } = useContext(RakutenContext)
  const [list, setList] = useState([])
  const [position, setPosition] = useState(0)
  const { popular } = state

  const onGetPopular = useCallback(async () => {
    const popular = await getPopular()

    dispatch({ type: 'popular', data: popular })
    setList([popular[0]])
  }, [dispatch])

  const onMoveSlider = (amount, exact = false) => {
    let newPosition = position + amount
    const newList = [...list]

    newPosition = newPosition < 0 ? popular.length - 1 : newPosition
    newPosition = newPosition > popular.length - 1 ? 0 : newPosition
    newPosition = exact ? amount : newPosition

    setPosition(newPosition)

    if (newList.length > 1) {
      newList.shift()
    }

    newList.push(popular[newPosition])
    setList(newList)
  }

  useEffect(() => {
    if (!popular) {
      onGetPopular()
    } else {
      setList([popular[0]])
    }
  }, [onGetPopular, popular])

  if (!popular) {
    return (
      <div className={'popular'}>
        <div className={'popular-artwork'} />
      </div>
    )
  }

  return (
    <div className={'popular'}>
      <div className={'popular-artwork'} />
      <div className={'artwork-content'}>
        {list.map((media, pos) => (
          <div
            key={`${media.id}-${pos}`}
            className={`artwork-image ${pos > 0 ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${getImage(media.images.snapshot, 1000)})`,
            }}
          >
            <div className={'content-info'}>
              <h1 className={'info-title'}>{media.title}</h1>
              <Link to={`/movie/${media.id}`} className={'button'}>
                Ver ahora gratis
              </Link>
            </div>
          </div>
        ))}
        <button
          className={'actions-button prev'}
          onClick={() => onMoveSlider(-1)}
        />
        <button
          className={'actions-button next'}
          onClick={() => onMoveSlider(1)}
        />
        <div className={'actions-steps'}>
          {popular.map((step, pos) => (
            <div
              className={'steps-wrapper'}
              key={step.id}
              onClick={() => onMoveSlider(pos, true)}
            >
              <div className={'steps-button'} />{' '}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Popular
