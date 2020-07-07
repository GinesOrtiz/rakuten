import React from 'react'

import './notFound.styles.scss'

const NotFoundPage = () => {
  return (
    <div className={'not-found'}>
      <h3 className={'title'}>¿No lo encuentras?</h3>
      <p className={'subtitle'}>
        Lo sentimos, pero nuestros pequeños extraterrestres no han podido
        encontrar lo que estás buscando. Puedes ir a la página principal para
        ver nuestras estratosféricas películas o navegar por géneros como si de
        planetas se tratase.
      </p>
    </div>
  )
}

export default NotFoundPage
