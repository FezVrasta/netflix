import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import styles from '../styles/components/SideMenu.styl'
import CSSModules from 'react-css-modules'
import MenuItem from './MenuItem'
import { browserHistory } from 'react-router'
import { Actions } from '../actions/Actions'

import _ from 'lodash'
import scrollTo from 'scroll-to'

class SideMenu extends Component {
  constructor() {
    super()
    this.state = { active: window.location.hash.replace('#', '') || 'trending-now' }
  }

  componentDidMount() {
    this.unlistenChangeSection = Actions.changeSection.listen(function(slug) {
      this.setState({ active: slug })

      // here we make a loop... commenting for now
      // browserHistory.push({hash: slug})
    }.bind(this))

    this.onRouteChangeBound = this.onRouteChange.bind(this)
    this.unlistenRoute = browserHistory.listen(this.onRouteChangeBound);
  }

  componentWillUnmount() {
    this.unlistenRoute()
    this.unlistenChangeSection()
  }

  render() {
    let items = this.props.items.map(function(item, index) {
      let className = this.props.styles['item']
      if (this.state.active === item.slug) className += ' ' + this.props.styles['item--active']
      return <MenuItem
        className={className}
        key={item.slug}
        name={item.name}
        pathname={this.props.base}
        hash={`#${item.slug}`}
        onClick={this.scrollTo.bind(this)}/>
    }.bind(this))

    return (
      <aside styleName='sideMenu'>
        {items}
      </aside>
    )
  }

  onRouteChange() {
    this.setState({ active: window.location.hash.replace('#', '') || 'trending-now' })
  }

  scrollTo(evt) {
    scrollTo(
      this.props.scrollTop,
      document.getElementById(evt.target.parentNode.getAttribute('href').split('#')[1]).parentNode.offsetTop - 80,
      { ease: 'linear', duration: 200 }
    )
  }
}

export default CSSModules(SideMenu, styles, {allowMultiple: true})
