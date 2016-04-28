import React, { Component } from 'react'
import styles from '../styles/components/ItemCast.styl'
import CSSModules from 'react-css-modules'

// helpers
import movieDB from '../helpers/movieDB'
import _ from 'lodash'

// components
import Person from './Person'
import PersonDetails from './PersonDetails'
import Slider, { SlickGoTo } from 'react-slick'

class ItemCast extends Component {
  constructor() {
    super()
    this.state = { cast: [], selected: 0, person: null }
  }
  componentDidMount() {
    movieDB.getCast.call(this, this.props.category, this.props.params.id)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      movieDB.getCast.call(this, nextProps.category, nextProps.params.id)
    }
  }
  render() {
    let castArray = this.state.cast.filter((person)=>!!person.profile_path)
    castArray = _.sortBy(castArray, ['order'])

    let cast = castArray.map(function(person, index) {
      return (
        <div styleName='person-wrapper' key={person.credit_id} onClick={this.select.bind(this, index)}>
          <Person person={person} ref={index} />
        </div>
      )
    }.bind(this))

    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      afterChange: this.afterChange.bind(this),
      slickGoTo: this.state.selected,
      responsive: [
        {
          breakpoint: 1800,
          settings: {
            slidesToShow: 6
          }
        },
        {
          breakpoint: 1500,
          settings: {
            slidesToShow: 5
          }
        },
        {
          breakpoint: 1240,
          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 840,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    }

    let details
    if (this.state.person) {
      details = <PersonDetails id={this.state.person.id} />
    }
    return (
      <div styleName='cast'>
        <Slider className={this.props.styles['slider']} {...settings}>
          {cast}
        </Slider>
        <div styleName='detailsPanel'>
          {details}
        </div>
      </div>
    )
  }

  select(index) {
    this.setState({selected: index})
  }

  afterChange(index) {
    this.setState({ person: this.refs[index].props.person })
  }
}

export default CSSModules(ItemCast, styles, {allowMultiple: true})
