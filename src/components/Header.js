import React, { Component } from 'react'
import styles from '../styles/components/Header.styl'
import CSSModules from 'react-css-modules'
import MenuItem from './MenuItem'
import User from './User'
import { Link } from 'react-router'

let netflixLogo = require('../images/netflix.svg')

class Header extends Component {
  render() {
    let items = this.props.items.map(function(item) {
      return <MenuItem
        className={this.props.styles['item']}
        activeClassName={this.props.styles['item--active']}
        key={item.slug}
        name={item.name}
        pathname={'/' + item.slug} />
    }.bind(this))

    return (
      <header styleName='header'>
        <Link to='/'>
          <img src={netflixLogo} styleName='logo' alt='Netflix' />
        </Link>
        {items}
        <User />
      </header>
    )
  }
}

export default CSSModules(Header, styles, {allowMultiple: true})
