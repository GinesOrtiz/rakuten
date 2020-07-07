import React, { createContext, useReducer } from 'react'

import rakutenReducer from './rakuten.reducer'

export const RakutenContext = createContext({})

const initialState = {
  currentSection: '',
  popular: null,
  collections: [],
  collectionsList: [
    'estrenos-para-toda-la-familia',
    'estrenos-imprescindibles-en-taquilla',
    'estrenos-espanoles',
    'si-te-perdiste',
    'nuestras-preferidas-de-la-semana',
  ],
  media: {},
  collectionPos: {},
}

const RakutenWrapper = ({ children }) => {
  const [state, dispatch] = useReducer(rakutenReducer, initialState)

  return (
    <RakutenContext.Provider value={{ state, dispatch }}>
      {children}
    </RakutenContext.Provider>
  )
}

export default RakutenWrapper
