import React, { Component } from 'react'
import styles from '../styles/components/Item.styl'
import CSSModules from 'react-css-modules'

// components
import { Link } from 'react-router'
import SearchBar from './SearchBar'
import Ink from 'react-ink'

// helpers
import movieDB from '../helpers/movieDB'
import camelCase from 'camelcase'

// data
let data = require('../data/data.json')

class TVShow extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    movieDB.getItem.call(this, this.props.category, this.props.id)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) {
      movieDB.getItem.call(this, this.props.category, nextProps.id)
    }
  }

  render() {
    let content = <div styleName='item' />

    if (this.state.item) {
      let main = React.cloneElement(
          this.props.children,
          {
            item: this.state.item,
            category: this.props.category
          }
      )

      let seasons = this.state.item.seasons.map(function(season) {
        if (season.season_number) {
          return (
            <Link
              className={this.props.styles['tab']}
              activeClassName={this.props.styles['tab--active']}
              to={'/tv-shows/' + this.props.id + '/season/' + season.season_number}
              key={season.id}>
              Season {season.season_number}
              <Ink />
            </Link>
          )
        }
      }.bind(this))

      let base = 'http://image.tmdb.org/t/p/w1920'
      let fade = 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7))'
      let css = { backgroundImage: `${fade}, url(${base}${unescape(this.state.item.backdrop_path)})` }
      content = (
        <div styleName='item' style={css}>
          <SearchBar
            category='tv-shows'
            placeholder={data.searchPlaceholders[camelCase(this.props.category)]}
            collapsed={true} />
          <header styleName='header'>
            <Link to={'/tv-shows'} styleName='back-arrow' className='material-icons'>
              arrow_back
              <Ink />
            </Link>
            <h1 styleName='title'>{this.state.item.name}</h1>
          </header>
          <nav styleName='tabs'>
            <Link
              className={this.props.styles['tab']}
              activeClassName={this.props.styles['tab--active']}
              to={'/tv-shows/' + this.props.id + '/about'}>
              About
              <Ink />
            </Link>
            {seasons}
          </nav>
          {main}
        </div>
      )
    }
    return content
  }
}

export default CSSModules(TVShow, styles, {allowMultiple: true})
