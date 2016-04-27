import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import styles from '../styles/components/Content.styl'
import CSSModules from 'react-css-modules'
import { Actions } from '../actions/Actions'

// components
import SideMenu from './SideMenu'
import Gallery from './Gallery'
import SearchBar from './SearchBar'

// helpers
import camelCase from 'camelcase'
import _ from 'lodash'

// data
let data = require('../data/data.json')

// component
class Content extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    let galleries = this.getItems().map(function(item, index) {
      return item.api && <Gallery key={index} name={item.name} pathname={this.props.category} slug={item.slug} apiUrl={item.api} ref={index} />
    }.bind(this))

    return (
      <main styleName='content' >
        <SideMenu
          items={this.getItems()}
          base={this.props.category}
          scrollTop={this.props.scrollTop} />
        <div styleName='column'>
          <SearchBar category={this.props.category} placeholder={this.getPlaceholder()} collapsed={!!this.props.scrollTop} />
          {galleries}
        </div>
      </main>
    )
  }

  componentDidUpdate() {
    let found = _.values(this.refs).find(function(item) {
      let DOMItem = findDOMNode(item)
      return DOMItem.offsetTop + DOMItem.offsetHeight >= this.props.scrollTop + 100
    }.bind(this))
    Actions.changeSection(found.props.slug)
  }

  getItems() {
    return data.sideMenuItems[camelCase(this.props.category)]
  }
  getPlaceholder() {
    return data.searchPlaceholders[camelCase(this.props.category)]
  }
}

export default CSSModules(Content, styles, {allowMultiple: true})
