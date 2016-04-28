import React, { Component } from 'react'
import styles from '../styles/components/PersonDetails.styl'
import CSSModules from 'react-css-modules'

// helpers
import movieDB from '../helpers/movieDB'

class PersonDetails extends Component {
  constructor() {
    super()
    this.state = { person: null }
  }

  componentDidMount() {
    movieDB.getPerson.call(this, this.props.id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.setState({ person: null}, function() {
        movieDB.getPerson.call(this, nextProps.id)
      }.bind(this))
    }
  }

  render() {
    let info
    if (this.state.person) {

      let biography = 'No biography available.'
      if (this.state.person.biography) {
        biography = this.state.person.biography.split('\n').map(function(item, index) {
          return (
            <span key={index}>
              {item}
              <br/>
            </span>
          )
        })
      }

      info = (
        <div>
          <h1 styleName='name'>{this.state.person.name}</h1>
          <div styleName='bio'>
            {biography}
          </div>
        </div>
      )
    }
    return info
  }

}

export default CSSModules(PersonDetails, styles, {allowMultiple: true})
