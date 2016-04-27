import React, { Component } from 'react'
import styles from '../styles/components/About.styl'
import CSSModules from 'react-css-modules'

import Stars from './Stars'
import DetailsPanel from './DetailsPanel'

// helpers
import movieDB from '../helpers/movieDB'

// data
let data = require('../data/data.json')

// component
class MovieAbout extends Component {
  constructor() {
    super()
    this.state = { showPoster: false, trailer: undefined }
  }

  componentDidMount() {
    movieDB.getVideo.call(this, this.props.category, this.props.item.id)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.item.id !== nextProps.item.id) {
      movieDB.getVideo.call(this, this.props.category, nextProps.item.id)
    }
  }

  render() {
    return (
      <div styleName='about'>
        <div styleName='row'>
          <div styleName='poster'>
            {this.getPoster()}
          </div>
          <div styleName='content'>
            <header styleName='header'>
              <Stars
                className={this.props.styles['info'] + ' ' + this.props.styles['info--first']}
                rate={this.props.item.vote_average} />
              <span styleName='info'>
                {this.props.item.genres.map(function(genre) { return genre.name }).join(', ')}
              </span>
              <span styleName='info'>
                {this.props.item.release_date} - {this.props.item.status}
              </span>
            </header>
            <div styleName='overview'>
              {this.props.item.overview}
            </div>
          </div>
        </div>
        <DetailsPanel type='movie' item={this.props.item} trailer={this.state.trailer} />
      </div>
    )
  }

  showPoster() {
    this.setState({ showPoster: true })
  }

  getPoster() {
    let styleName = 'poster-img'
    !this.state.showPoster && ( styleName += ' poster-img--hidden')
    return (
      <img
        onLoad={this.showPoster.bind(this)}
        styleName={styleName}
        src={`http://image.tmdb.org/t/p/w600${this.props.item.poster_path}`} />
    )
  }
}

export default CSSModules(MovieAbout, styles, {allowMultiple: true})
