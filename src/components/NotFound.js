import React, { Component } from 'react'
import styles from '../styles/components/NotFound.styl'
import CSSModules from 'react-css-modules'

class NotFound extends Component {
  render() {
    return (
      <div styleName='notFound'>
        <div styleName='number'>4<i styleName='icon' className='material-icons'>explore</i>4</div>
        Not Found
      </div>
    )
  }
}

export default CSSModules(NotFound, styles, {allowMultiple: true})
