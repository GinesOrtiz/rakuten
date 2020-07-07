import React, { useContext, useEffect } from 'react'

import { RakutenContext } from '../../context/rakuten.context'

import Popular from '../../components/popular/Popular'
import Collection from '../../components/collection/Collection'

import './home.styles.scss'

const HomePage = () => {
  const { state, dispatch } = useContext(RakutenContext)

  useEffect(() => {
    dispatch({ type: 'section', section: { name: 'Inicio' } })
  }, [dispatch])

  return (
    <div className={'home main-section'}>
      <Popular />
      {state.collectionsList.map((collection) => (
        <Collection key={collection} id={collection} />
      ))}
    </div>
  )
}

export default HomePage
