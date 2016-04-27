require('material-design-icons-iconfont/dist/material-design-icons.css')
require('reset-css/reset.css')

import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import { createHistory } from 'history'
import { Router, Route, IndexRoute, IndexRedirect, Redirect, useRouterHistory } from 'react-router'

const browserHistory = useRouterHistory(createHistory)({
    basename: '/netflix'
});

// components
import App from './App'
import Content from './components/Content'
import TVShow from './components/TVShow'
import TVShowAbout from './components/TVShowAbout'
import Season from './components/Season'
import Movie from './components/Movie'
import NotFound from './components/NotFound'

// data
let data = require('./data/data.json')

render((
  <Router history={browserHistory}>
    <Redirect from='/' to='/tv-shows' />

    <Route path='/tv-shows' component={App}>
      <IndexRoute component={Content} />
      <Route path='/tv-shows/:id' component={TVShow}>
          <IndexRedirect to='/tv-shows/:id/about' />
          <Route path='/tv-shows/:id/about' component={TVShowAbout} />
          <Route path='/tv-shows/:id/season/:season' component={Season} />
      </Route>
    </Route>
    <Route path='/movies' component={App}>
      <IndexRoute component={Content} />
      <Route path='/movies/:id' component={Movie} />
    </Route>
    <Route path='*' component={App}>
      <IndexRoute component={NotFound} />
    </Route>
  </Router>
), document.getElementById('root'))
