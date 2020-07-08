import React from 'react'
import propTypes from 'prop-types'

import { getImage } from '../../services/images'
import { Link } from 'react-router-dom'
import './cover.styles.scss'

const Cover = ({ media }) => {
  if (!media) {
    return (
      <div className={'cover'}>
        <div className={'cover-artwork'} />
      </div>
    )
  }

  return (
    <div className={'cover'}>
      <div
        className={'cover-artwork'}
        style={{
          backgroundImage: `url(${getImage(media.images.snapshot, 1000)})`,
        }}
      />
      <div className={'cover-content'}>
        <h1 className={'content-title'}>{media.title}</h1>
        <Link to={`/trailer/${media.id}`} className={'button'}>
          Ver trailer
        </Link>
      </div>
    </div>
  )
}

Cover.propTypes = {
  media: propTypes.object,
}

Cover.defaultProps = {
  media: null,
}

export default Cover
