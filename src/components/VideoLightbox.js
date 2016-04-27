import React, { Component } from 'react'
import styles from '../styles/components/VideoLightbox.styl'
import CSSModules from 'react-css-modules'

// component
class VideoLightbox extends Component {
  render() {
    return (
      <div styleName='videoLightbox'>
        <iframe
          width='640'
          height='360'
          src={`https://www.youtube.com/embed/${this.props.video}?autoplay=1&showinfo=0&modestbranding=1&controls=0`}
          frameborder='0'
          allowfullscreen />
      </div>
    )
  }
}

export default CSSModules(VideoLightbox, styles, {allowMultiple: true})
