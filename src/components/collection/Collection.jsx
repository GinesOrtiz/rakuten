import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

import { RakutenContext } from '../../context/rakuten.context'
import { getCollection } from './collection.service'
import Media from '../media/Media'

import './collection.styles.scss'

const appShell = new Array(20).fill({}).map((e, i) => ({ id: i }))

const Collection = ({ id }) => {
  const { state, dispatch } = useContext(RakutenContext)
  const sliderElement = useRef(null)
  const currentSliderItem = state.collectionPos[id] || 0
  const [sliderItemsVisible, setSliderItemsVisible] = useState(0)
  const collection = state.collections.find(
    (collection) => collection.id === id
  )
  const totalCollection = collection?.contents?.length || 0
  const prevButton = currentSliderItem > 0
  const nextButton = currentSliderItem + sliderItemsVisible <= totalCollection

  const onGetCollection = useCallback(async () => {
    const collection = await getCollection(id)

    dispatch({ type: 'collection', collection })
  }, [id, dispatch])

  const onMoveSlider = (amount, behavior = 'smooth') => {
    if (sliderElement.current) {
      let newIndex = currentSliderItem + amount
      const mediaWidth = sliderElement.current.querySelector('div').offsetWidth
      const left = mediaWidth * newIndex

      newIndex = newIndex < 0 ? 0 : newIndex
      newIndex = newIndex > totalCollection ? totalCollection : newIndex

      sliderElement.current.scrollTo({ top: 0, left, behavior })
      dispatch({ type: 'collectionPos', id, pos: newIndex })
    }
  }

  const onWindowResize = () => {
    if (sliderElement.current) {
      const mediaWidth = sliderElement.current.querySelector('div').offsetWidth
      const collectionWidth = sliderElement.current.offsetWidth

      onMoveSlider(0)
      setSliderItemsVisible(Math.floor(collectionWidth / mediaWidth))
    }
  }

  useEffect(() => {
    onMoveSlider(0, 'auto')

    if (!collection) {
      onGetCollection()
    }
  }, [collection, onGetCollection])

  useEffect(() => {
    window.addEventListener('resize', onWindowResize)
    onWindowResize()

    return () => window.removeEventListener('resize', onWindowResize)
  }, [])

  return (
    <div className={'collection'}>
      <div className={'collection-title'}>{collection?.name}</div>
      <div className={'collection-wrapper'}>
        <div className={'collection-slider'} ref={sliderElement}>
          {(collection?.contents || appShell).map((media) => (
            <Media key={media.id} content={media} />
          ))}
        </div>
        {prevButton && (
          <button
            className={'collection-button prev'}
            onClick={() => onMoveSlider(-sliderItemsVisible)}
          />
        )}
        {nextButton && (
          <button
            className={'collection-button next'}
            onClick={() => onMoveSlider(sliderItemsVisible)}
          />
        )}
      </div>
    </div>
  )
}

export default Collection
