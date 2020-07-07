import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { RakutenContext } from '../../context/rakuten.context'
import './header.styles.scss'

const Header = () => {
  const { state } = useContext(RakutenContext)

  return (
    <div className={'header'}>
      <div className={'header-container'}>
        <Link to={'/'}>
          <div className={'header-logo'} />
        </Link>
        <div className={'header-section'}>
          <span>{state.currentSection.name}</span>
          {state.currentSection.title && (
            <span> | {state.currentSection.title}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
