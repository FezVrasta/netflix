import React, { Component } from 'react'
import styles from '../styles/components/ItemAbout.styl'
import CSSModules from 'react-css-modules'

import Stars from './Stars'
import DetailsPanel from './DetailsPanel'

// helpers
import movieDB from '../helpers/movieDB'
import camelCase from 'camelcase'

// data
let data = require('../data/data.json')

// component
class TVShowAbout extends Component {
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

    let dateInfo
    if (this.props.category === 'movies') {
      dateInfo = (
        <span styleName='info'>
          {this.props.item.release_date} - {this.props.item.status}
        </span>
      )
    } else {
      dateInfo = (
        <span styleName='info'>
          {this.props.item.first_air_date.split('-')[0]} - {this.props.item.in_production ? 'Ongoing' : 'Ended'}
        </span>
      )
    }

    let overview
    if (this.props.item.overview) {
      overview = <div styleName='overview'>
        {this.props.item.overview.split('\n').map((row, i)=>{
          return <span key={i}>{row}<br/></span>
        })}
      </div>
    }

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
              {dateInfo}
            </header>
            {overview}
          </div>
        </div>
        <DetailsPanel
          type={data.singular[camelCase(this.props.category)]}
          item={this.props.item}
          trailer={this.state.trailer}
          path={this.props.route.path} />
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

export default CSSModules(TVShowAbout, styles, {allowMultiple: true})
