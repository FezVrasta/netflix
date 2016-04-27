import React, { Component } from 'react'
import styles from '../styles/components/Season.styl'
import CSSModules from 'react-css-modules'
import { Actions } from '../actions/Actions'

import Stars from './Stars'
import DetailsPanel from './DetailsPanel'

// helpers
import request from 'superagent'

// components
import EpisodesList from './EpisodesList'

// data
let data = require('../data/data.json')

// component
class Season extends Component {
  constructor() {
    super()
    this.state = { season: null, episode: 1 }
  }

  componentDidMount() {
    this.getSeason()
    this.setState({ season: this.props.params.season })

    this.unlistenSelectEpisode = Actions.selectEpisode.listen(function(episode) {
      this.setState({ episode: episode })
    }.bind(this))
  }

  componentWillUnmount() {
    this.unlistenSelectEpisode()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.season !== this.state.season) {
      this.setState({season: nextProps.params.season, episode: 1}, function() {
        this.getSeason()
      }.bind(this))
    }
  }

  render() {
    let content

    if (this.state.item) {
      let episodeOverview = this.state.item.episodes[this.state.episode - 1].overview
      let episodeOverviewTitleClass = this.state.item.overview ? 'title' : 'title title--no-padding'
      content = (
        <div styleName='about'>
          <div styleName='row'>
            <div styleName='episodesListWrapper'>
              <EpisodesList
                season={this.state.item.season_number}
                episodes={this.state.item.episodes}
                selected={this.state.episode}
                poster={this.state.item.poster_path} />
            </div>
            <div styleName='content'>
              <header styleName='header'>
                <Stars
                  className={this.props.styles['info'] + ' ' + this.props.styles['info--first']}
                  rate={this.state.item.vote_average} />
                <span styleName='info'>
                  {this.state.item.air_date}
                </span>
              </header>
              <div styleName='overview'>
                {this.state.item.overview}
              </div>
              <div styleName='episodeOverview'>
                <h2 styleName={episodeOverviewTitleClass}>Episode Overview</h2>
                {episodeOverview}
              </div>
            </div>
          </div>
          <DetailsPanel
            type='tvShow'
            item={this.state.item}
            season={this.state.season}
            episode={this.state.episode}/>
        </div>
      )
    }
    return content
  }


  getSeason() {
    let _this = this
    let url = `${data.api.url}/tv/${this.props.params.id}/season/${this.props.params.season}`

    request
    .get(url)
    .query({
      'api_key': data.api.key
    })
    .end(function( err, res ) {
      if (err) console.error(err)

      _this.setState({
        item: res.body
      })
    })
  }
}

export default CSSModules(Season, styles, {allowMultiple: true})
