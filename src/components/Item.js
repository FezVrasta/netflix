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

class Item extends Component {
  constructor() {
    super()
    this.state = {}
  }

  // get item on load
  componentDidMount() {
    movieDB.getItem.call(this, this.props.category, this.props.id)
    this.setState({baseURL: `/${this.props.category}/${data.singular[camelCase(this.props.category)]}/`})
  }

  // get new item on page change
  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) {
      movieDB.getItem.call(this, this.props.category, nextProps.id)
    }
    if (this.props.category !== nextProps.category) {
      this.setState({baseURL: `/${nextProps.category}/${data.singular[camelCase(nextProps.category)]}/` })
    }
  }

  render() {
    if (this.state.item) {
      let main = React.cloneElement(
          this.props.children,
          {
            item: this.state.item,
            category: this.props.category,
            season: this.props.params.season
          }
      )

      let seasons = this.getSeasons()

      let tabs = (
        <nav styleName='tabs'>
          <Link
            className={this.props.styles['tab']}
            activeClassName={this.props.styles['tab--active']}
            to={`${this.state.baseURL}${this.props.id}/about`}>
            About
            <Ink />
          </Link>
          <Link
            className={this.props.styles['tab']}
            activeClassName={this.props.styles['tab--active']}
            to={`${this.state.baseURL}${this.props.id}/cast`}>
            Cast
            <Ink />
          </Link>
          {seasons}
        </nav>
      )

      let fade = 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7))'
      let css = {
        backgroundImage: `${fade}, url(${movieDB.getImageURL(this.state.item.backdrop_path, 1920)})`
      }

      return (
        <div styleName='item' style={css}>
          <SearchBar
            category={this.props.category}
            placeholder={data.searchPlaceholders[camelCase(this.props.category)]}
            collapsed={true} />
          <header styleName='header'>
            <Link to={`/${this.props.category}`} styleName='back-arrow' className='material-icons'>
              arrow_back
              <Ink />
            </Link>
            <h1 styleName='title'>{this.state.item.name || this.state.item.title}</h1>
          </header>
          {tabs}
          {main}
        </div>
      )
    }
  }

  getSeasons() {
    return (this.state.item.seasons || []).map(function(season) {
      if (season.season_number) {
        return (
          <Link
            className={this.props.styles['tab']}
            activeClassName={this.props.styles['tab--active']}
            to={`${this.state.baseURL}${this.props.id}/season/${season.season_number}`}
            key={season.id}>
            Season {season.season_number}
            <Ink />
          </Link>
        )
      }
    }.bind(this))
  }
}

export default CSSModules(Item, styles, {allowMultiple: true})
