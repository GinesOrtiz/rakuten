import React from 'react'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types'

import './media.styles.scss'

const Media = ({ content }) => {
  const getImage = (artwork) =>
    artwork.replace('.jpeg', '-width217-quality80.jpeg')

  return (
    <div className={'media'}>
      <Link to={`/movie/${content.id}`}>
        <div className={'media-artwork'}>
          <div className={'artwork-content'}>
            <div className={'content-title'}>{content.title}</div>
          </div>
          <div className={'artwork-content'}>
            {content.title && (
              <img alt={content.title} src={getImage(content.images.artwork)} />
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

Media.propTypes = {
  content: propTypes.object.isRequired,
}

export default Media
