import React, { useCallback, useContext, useEffect, useState } from 'react'

import { RakutenContext } from '../../context/rakuten.context'
import { getPopular } from './popular.service'

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

  const onMoveSlider = (amount) => {
    let newPosition = position + amount
    const newList = [...list]

    newPosition = newPosition < 0 ? popular.length - 1 : newPosition
    newPosition = newPosition > popular.length - 1 ? 0 : newPosition

    setPosition(newPosition)

    if (newList.length > 1) {
      newList.shift()
    }

    newList.push(popular[newPosition])
    setList(newList)
  }

  const getImage = (artwork) =>
    artwork.replace('.jpeg', '-width1000-quality80.jpeg')

  useEffect(() => {
    if (!popular) {
      onGetPopular()
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
            key={media.id}
            className={`artwork-image ${pos > 0 ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${getImage(media.images.snapshot)})`,
            }}
          />
        ))}
        <div className={'artwork-actions'}>
          <button onClick={() => onMoveSlider(-1)}>-</button>
          <button onClick={() => onMoveSlider(1)}>+</button>
        </div>
      </div>
    </div>
  )
}

export default Popular
