import React from 'react'
import { Link } from 'react-router-dom'

import './media.styles.scss'

const Media = ({ content }) => {
  const getImage = (artwork) =>
    artwork.replace('.jpeg', '-width217-quality80.jpeg')

  return (
    <div className={'media'}>
      <div className={'media-artwork'}>
        <div className={'artwork-content'}>
          <Link to={`/movie/${content.id}`}>
            {content.title && (
              <img alt={content.title} src={getImage(content.images.artwork)} />
            )}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Media
