import React, { Component } from 'react'
import styles from '../styles/components/EpisodesList.styl'
import CSSModules from 'react-css-modules'
import { Actions } from '../actions/Actions'

class EpisodesList extends Component {
  constructor() {
    super()
    this.state = { selected: 1 }
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.selected !== nextProps.selected && this.props.season !== nextProps.season) {
      this.selectEpisode(nextProps.selected)
    }
  }
  render() {
    let items = this.props.episodes.filter((episode)=>!!episode.name).map(function(episode) {
      let styleName = 'episode'
      if (episode.episode_number === this.state.selected) styleName += ' episode--active'
      return (
        <li styleName={styleName} key={episode.episode_number} onClick={this.selectEpisode.bind(this, episode.episode_number)}>
          <span styleName='episode__number'>{episode.episode_number}</span>
          <span styleName='episode__name'>{episode.name}</span>
        </li>
      )
    }.bind(this))
    let css = this.getPoster()
    return (
      <ul styleName='episodesList' style={css}>
        {items}
      </ul>
    )
  }

  getPoster() {
    if (this.props.poster) {
      return {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(http://image.tmdb.org/t/p/w600${this.props.poster})`
      }
    }
  }

  selectEpisode(number) {
    this.setState({ selected: number })
    Actions.selectEpisode(number)
  }
}

export default CSSModules(EpisodesList, styles, {allowMultiple: true})
