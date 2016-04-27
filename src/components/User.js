import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/components/User.styl'
import md5 from 'md5'

class User extends Component {
  render() {
    return <div styleName='user'>
        <img styleName='avatar' src={this.getGravatar()} />
      </div>
  }

  getGravatar() {
    let email = 'federico.zivolo@gmail.com'
    return `http://www.gravatar.com/avatar/${md5(email)}?s=200`
  }
}

export default CSSModules(User, styles, { allowMultiple: true })
