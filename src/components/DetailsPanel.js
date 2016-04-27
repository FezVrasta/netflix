import React, { Component } from 'react'
import styles from '../styles/components/DetailsPanel.styl'
import CSSModules from 'react-css-modules'

// helpers
import leftpad from 'left-pad'

// components
import VideoLightbox from './VideoLightbox'
import Ink from 'react-ink'
import { Link } from 'react-router'

class DetailsPanel extends Component {
  constructor() {
    super()
    this.state = { trailerOpened: false }
  }
  render() {
    let playButtonText
    if (this.props.type === 'tvShow') {
      let season = leftpad(this.props.season || 1, 2, 0)
      let episode = leftpad(this.props.episode || 1, 2, 0)
      playButtonText = `S${season}E${episode}`
    }
    if (this.props.type === 'movie') {
      playButtonText = 'movie'
    }

    let trailer
    this.props.trailer && (trailer = (
      <a href='javascript:;' styleName='button button--modest' onClick={this.toggleTrailer.bind(this)}>
        <i styleName='icon' className='material-icons'>
        local_movies</i>Play trailer
        <Ink />
      </a>
    ))

    let lightbox
    this.props.trailer && this.state.trailerOpened && ( lightbox = (
      <VideoLightbox video={this.props.trailer.key} />
    ))

    let backdropStyleName = 'backdrop'
    this.state.trailerOpened && ( backdropStyleName += ' backdrop--in' )

    return (
      <div styleName='detailsPanel'>
        <div styleName='details'></div>
        <div styleName='play'>
          {trailer}
          <a href='javascript:;' styleName='button'>
            <i styleName='icon' className='material-icons'>
            play_arrow</i>Play {playButtonText}
            <Ink />
          </a>
        </div>
        {lightbox}
        <div styleName={backdropStyleName} onClick={this.toggleTrailer.bind(this, false)} />
      </div>
    )
  }

  toggleTrailer(status) {
    status === undefined && ( status = !this.state.trailerOpened )
    let time = status ? 150 : 0
    setTimeout(function() {
      this.setState({ trailerOpened: status })
    }.bind(this), time)
  }
}

export default CSSModules(DetailsPanel, styles, {allowMultiple: true})
