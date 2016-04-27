import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import styles from '../styles/components/SideMenu.styl'
import CSSModules from 'react-css-modules'
import MenuItem from './MenuItem'
import { browserHistory } from 'react-router'
import { Actions } from '../actions/Actions'

import movieDB from '../helpers/movieDB'

import _ from 'lodash'
import scrollTo from 'scroll-to'

class SideMenu extends Component {
  constructor() {
    super()
    this.state = {
      active: window.location.hash.replace('#', '') || 'trending-now',
      genres: []
    }
  }

  componentDidMount() {
    this.unlistenChangeSection = Actions.changeSection.listen(function(slug) {
      this.setState({ active: slug })

      // here we make a loop... commenting for now
      // browserHistory.push({hash: slug})
    }.bind(this))

    this.onRouteChangeBound = this.onRouteChange.bind(this)
    this.unlistenRoute = browserHistory.listen(this.onRouteChangeBound);

    movieDB.getGenres.call(this, this.props.category)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.category !== nextProps.category) {
      movieDB.getGenres.call(this, nextProps.category)
    }
  }

  componentWillUnmount() {
    this.unlistenRoute()
    this.unlistenChangeSection()
  }

  render() {
    let items = this.props.items.map(function(item, index) {
      let className = this.props.styles['item']
      if (this.state.active === item.slug) className += ' ' + this.props.styles['item--active']
      return <div
        className={className}
        key={item.slug}
        name={item.name}
        onClick={this.scrollTo.bind(this, item.slug)}>
        {item.name}
      </div>
    }.bind(this))

    let genres
    if (this.props.category === 'movies') {
      let list = this.state.genres.map(function(item) {
        let className = this.props.styles['item'] + ' ' + this.props.styles['item--genre']
        return <MenuItem
          className={className}
          activeClassName={this.props.styles['item--active']}
          key={item.id}
          name={item.name}
          pathname={`/${this.props.category}/genre/${item.id}`}/>
      }.bind(this))
      genres = (
        <div styleName='genres'>
          <div styleName='divider' />
          <div styleName='item'>GENRES</div>
          <div styleName='genres'>
            {list}
          </div>
        </div>
      )
    }

    return (
      <aside styleName='sideMenu'>
        {items}
        {genres}
      </aside>
    )
  }

  onRouteChange() {
    this.setState({ active: window.location.hash.replace('#', '') || 'trending-now' })
  }

  scrollTo(id) {
    scrollTo(
      this.props.scrollTop,
      document.getElementById(id).parentNode.offsetTop - 80,
      { ease: 'linear', duration: 200 }
    )
  }
}

export default CSSModules(SideMenu, styles, {allowMultiple: true})
