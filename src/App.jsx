import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import RakutenWrapper from './context/rakuten.context'
import Header from './components/header/Header'
import HomePage from './pages/home/Home'
import MoviePage from './pages/movie/Movie'
import NotFoundPage from './pages/notFound/NotFound'

const App = () => {
  const routes = [
    {
      path: '/',
      component: HomePage,
    },
    {
      path: '/movie/:id',
      component: MoviePage,
    },
  ]

  return (
    <BrowserRouter>
      <RakutenWrapper>
        <Header />
        <Switch>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              exact
              component={route.component}
            />
          ))}

          <Route component={NotFoundPage} />
        </Switch>
      </RakutenWrapper>
    </BrowserRouter>
  )
}

export default App
