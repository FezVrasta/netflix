import React, { Component } from 'react'
import styles from '../styles/components/SearchBar.styl'
import CSSModules from 'react-css-modules'

import { Link } from 'react-router'

import scrollLock from '../helpers/scrollLock'
import camelCase from 'camelcase'

// data
let data = require('../data/data.json')

class SearchResults extends Component {
  componentDidMount() {
    scrollLock.scrollLock(this.refs.scroll)
  }

  componentDidUpdate() {
    scrollLock.scrollLock(this.refs.scroll)
  }

  componentWillUnmount() {
    scrollLock.scrollRelease(this.refs.scroll)
  }

  render() {
    let topResults = this.props.results.filter((item)=>!!item.poster_path).map(function(item) {
      return (
        <Link to={`/${this.props.category}/${data.singular[camelCase(this.props.category)]}/${item.id}/`} onClick={this.props.closeSearch} className={this.props.styles['top-item']} key={item.id}>
          <img styleName='poster' src={`http://image.tmdb.org/t/p/w150${item.poster_path}`} />
        </Link>
      )
    }.bind(this))

    return (
      <div styleName='searchResults'>
        <div ref='scroll' styleName='top-results'>
          {topResults}
        </div>
      </div>
    )
  }
}

export default CSSModules(SearchResults, styles, {allowMultiple: true})
