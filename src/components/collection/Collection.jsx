import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import propTypes from 'prop-types'

import { RakutenContext } from '../../context/rakuten.context'
import { getCollection } from './collection.service'
import Media from '../media/Media'

import './collection.styles.scss'

const appShell = new Array(20).fill({}).map((e, i) => ({ id: i }))

const Collection = ({ id }) => {
  const { state, dispatch } = useContext(RakutenContext)
  const currentSliderItem = state.collectionPos[id] || 0
  const sliderElement = useRef(null)
  const [sliderItemsVisible, setSliderItemsVisible] = useState(0)
  const [firstMovement, setFirstMovement] = useState(true)
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

  const onMoveSlider = useCallback(
    (currentPos, amount, animated = true) => {
      if (sliderElement.current) {
        let newIndex = currentPos + amount
        // Use the size of each Media to calculate the px for translate
        const mediaWidth = sliderElement.current.querySelector('div')
          .offsetWidth
        const left = mediaWidth * newIndex

        newIndex = newIndex < 0 ? 0 : newIndex
        newIndex = newIndex > totalCollection ? totalCollection : newIndex

        // On first load (or coming back to home) we don't want scroll animation
        sliderElement.current.classList.toggle('animated', animated)
        sliderElement.current.style.transform = `translateX(${-left}px)`
        dispatch({ type: 'collectionPos', id, pos: newIndex })
      }
    },
    [dispatch, id, totalCollection]
  )

  // Recalculate the amount of Media that fits on screen
  const onWindowResize = useCallback(
    (ev) => {
      if (sliderElement.current) {
        const mediaWidth = sliderElement.current.querySelector('div')
          .offsetWidth
        const collectionWidth = sliderElement.current.offsetWidth

        // If we have event the source is from the listener, if not, the init call
        if (ev) {
          onMoveSlider(currentSliderItem, 0)
        }

        setSliderItemsVisible(Math.floor(collectionWidth / mediaWidth))
      }
    },
    [onMoveSlider, currentSliderItem]
  )

  useEffect(() => {
    // If its first move, don't animate scroll
    onMoveSlider(currentSliderItem, 0, !firstMovement)
    setFirstMovement(false)
  }, [currentSliderItem, firstMovement, onMoveSlider])

  useEffect(() => {
    // Check if Collection exists on context to avoid requests
    if (!collection) {
      onGetCollection()
    }
  }, [collection, onGetCollection, onMoveSlider])

  useEffect(() => {
    // Recalculate the amount of Media that fits on screen
    window.addEventListener('resize', onWindowResize)
    onWindowResize()

    return () => window.removeEventListener('resize', onWindowResize)
  }, [onWindowResize])

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
            onClick={() => onMoveSlider(currentSliderItem, -sliderItemsVisible)}
          />
        )}
        {nextButton && (
          <button
            className={'collection-button next'}
            onClick={() => onMoveSlider(currentSliderItem, sliderItemsVisible)}
          />
        )}
      </div>
    </div>
  )
}

Collection.propTypes = {
  id: propTypes.string.isRequired,
}

export default Collection
