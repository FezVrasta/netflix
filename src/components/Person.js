import React, { Component } from 'react'
import styles from '../styles/components/Person.styl'
import CSSModules from 'react-css-modules'

// helpers
import movieDB from '../helpers/movieDB'

class Person extends Component {
  constructor() {
    super()
    this.state = { loaded: false }
  }
  render() {
    let styleName = 'person'
    !this.state.loaded && ( styleName += ' person--hidden')

    return (
      <div styleName={styleName}>
        <img
          styleName='image'
          onLoad={this.load.bind(this)}
          src={movieDB.getImageURL(this.props.person.profile_path)} />
        <span styleName='name'>
          {this.props.person.character}
        </span>
      </div>
    )
  }

  load() {
    this.setState({ loaded: true })
  }
}

export default CSSModules(Person, styles, {allowMultiple: true})
