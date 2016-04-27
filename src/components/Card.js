import React, { Component } from 'react'
import styles from '../styles/components/Card.styl'
import CSSModules from 'react-css-modules'
import { browserHistory } from 'react-router'

// components
import { Link } from 'react-router'
import Ink from 'react-ink'

class Card extends Component {
  constructor() {
    super()
    this.state = { hidden: true }
  }

  render() {
    let base = 'http://image.tmdb.org/t/p/w500'
    let styleName = this.props.styles['card']
    this.state.hidden && ( styleName += ' ' + this.props.styles['card--hidden'] )

    return (
      <Link to={`/${this.props.pathname}/${this.props.id}`} className={styleName}>
        <img
          ref='img'
          onLoad={this.showImage.bind(this)}
          styleName='image'
          src={`${base}${unescape(this.props.image)}`} />
        <Ink />
      </Link>
    )
  }

  showImage() {
    this.setState({hidden: false})
  }
}

export default CSSModules(Card, styles, {allowMultiple: true})
