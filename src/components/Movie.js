import React, { Component } from 'react'
import styles from '../styles/components/Item.styl'
import CSSModules from 'react-css-modules'

// components
import { Link } from 'react-router'
import MovieAbout from './MovieAbout'
import SearchBar from './SearchBar'
import Ink from 'react-ink'

// helpers
import movieDB from '../helpers/movieDB'
import camelCase from 'camelcase'

// data
let data = require('../data/data.json')

class Movie extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) {
      movieDB.getItem.call(this, this.props.category, this.props.id)
    }
  }

  componentDidMount() {
    movieDB.getItem.call(this, this.props.category, this.props.id)
  }

  render() {
    let content = <div styleName='item' />

    if (this.state.item) {
      let base = 'http://image.tmdb.org/t/p/w1920'
      let fade = 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7))'
      let css = { backgroundImage: `${fade}, url(${base}${unescape(this.state.item.backdrop_path)})` }
      content = (
        <div styleName='item' style={css}>
          <SearchBar
            category='movies'
            placeholder={data.searchPlaceholders[camelCase(this.props.category)]}
            collapsed={true} />
          <header styleName='header'>
            <Link to={'/movies'} styleName='back-arrow' className='material-icons'>
              arrow_back
              <Ink />
            </Link>
            <h1 styleName='title'>{this.state.item.title}</h1>
          </header>
          <MovieAbout item={this.state.item} category={this.props.category}/>
        </div>
      )
    }
    return content
  }
}

export default CSSModules(Movie, styles, {allowMultiple: true})
