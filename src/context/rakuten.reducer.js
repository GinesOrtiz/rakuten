const extractMedia = (currentMedia, contents) => {
  const media = {}

  contents.forEach((mediaData) => {
    if (!currentMedia[mediaData.id]?.full) {
      media[mediaData.id] = mediaData
    }
  })

  return media
}

export default (state, action) => {
  switch (action.type) {
    case 'collection':
      const collections = [...state.collections]
      const collectionExists = collections.find(
        (collection) => collection.id === action.collection.id
      )

      if (!collectionExists) {
        collections.push(action.collection)
      }

      return {
        ...state,
        collections,
        media: {
          ...state.media,
          ...extractMedia(state.media, action.collection.contents),
        },
      }
    case 'popular':
      return {
        ...state,
        popular: action.data,
        media: { ...state.media, ...extractMedia(state.media, action.data) },
      }
    case 'media':
      return {
        ...state,
        media: {
          ...state.media,
          [action.content.id]: { ...action.content, full: true },
        },
      }
    case 'section':
      return { ...state, currentSection: action.section }
    case 'collectionPos':
      return {
        ...state,
        collectionPos: { ...state.collectionPos, [action.id]: action.pos },
      }
    default:
      throw new Error()
  }
}
