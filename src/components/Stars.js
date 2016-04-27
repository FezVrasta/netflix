import React, { Component } from 'react'
import styles from '../styles/components/Stars.styl'
import CSSModules from 'react-css-modules'

// component
class Stars extends Component {
  render() {
    let starsCount = Math.round(this.props.rate) / 2
    let int = Math.floor(starsCount)
    let half = starsCount % int

    let stars = []
    let count = 0
    for (let i = 0; i < int; i++) {
      stars.push(<i key={count++} className='material-icons'>star</i>)
    }
    if (half) {
      stars.push(<i key={count} className='material-icons'>star_half</i>)
      count++
    }
    for (count; count < 5; count++) {
      stars.push(<i key={count} className='material-icons'>star_border</i>)
    }
    return (
      <div styleName='stars' className={this.props.className}>
        {stars}
      </div>
    )
  }

}

export default CSSModules(Stars, styles, {allowMultiple: true})
