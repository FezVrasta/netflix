require('material-design-icons-iconfont/dist/material-design-icons.css')
require('reset-css/reset.css')

import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, IndexRedirect, Redirect, hashHistory } from 'react-router'

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
  <Router history={hashHistory}>
    <Redirect from='/' to='/tv-shows' />

    <Route path='/tv-shows' category='tv-shows' component={App}>
      <IndexRoute component={Content} />
      <Route path='/tv-shows/genre/:id' type='genre' component={Content} />
      <Route path='show/:id' component={TVShow}>
          <IndexRedirect to='about' />
          <Route path='about' component={TVShowAbout} />
          <Route path='season/:season' component={Season} />
      </Route>
    </Route>
    <Route path='/movies' category='movies' component={App}>
      <IndexRoute component={Content} />
      <Route path='genre/:id' type='genre' component={Content} />
      <Route path='movie/:id' component={Movie} />
    </Route>
    <Route path='*' component={App}>
      <IndexRoute component={NotFound} />
    </Route>
  </Router>
), document.getElementById('root'))
