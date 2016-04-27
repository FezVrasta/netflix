import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import styles from '../styles/components/Gallery.styl'
import CSSModules from 'react-css-modules'

// components
import Card from './Card'

// helpers
import request from 'superagent'

// data
let data = require('../data/data.json')

// component
class Gallery extends Component {
  constructor() {
    super()
    this.state = {
      results: [],
      rows: 2,
      to: 20,
      page: 1
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.apiUrl !== this.props.apiUrl) {
      this.setState({ results: [], page: 1 }, function() {
        this.loadNewPage()
      })
    }
  }

  render() {
    let shows = <div styleName='loading'>Loading...</div>

    this.state.results.length && ( shows = this.state.results.slice(0, this.state.to).map(function(show, index) {
      return <Card
        ref={index}
        key={show.id}
        id={show.id}
        pathname={this.props.pathname}
        image={show.backdrop_path} />
    }.bind(this)))

    let loadMore
    if (!!this.state.results.length && this.state.totalPages >= this.state.page) {
      loadMore = <button onClick={this.loadMore.bind(this)} styleName='loadMore'>Load More...</button>
    }

    return (
      <section styleName='gallery'>
        <h1 styleName='title'>
          <span styleName='anchor' id={this.props.slug}></span>
          {this.props.name}
        </h1>
        <div styleName='list' ref='list'>
          {shows}
        </div>
        {loadMore}
      </section>
    )
  }

  componentDidMount() {
    let _this = this
    this.loadNewPage()
    this.updateVisibleCardsBound = this.updateVisibleCards.bind(this)
    window.addEventListener('resize', this.updateVisibleCardsBound)

    this.props.rows && this.setState({rows: this.props.rows})
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateVisibleCardsBound)
  }

  loadMore() {
    this.setState({rows: this.state.rows + 2}, function() {
      this.updateVisibleCards()
    }.bind(this))
  }

  updateVisibleCards() {
    let to = this.getCardsPerRow() * this.state.rows

    if (to > this.state.results.length && this.state.totalPages >= this.state.page) {
      this.loadNewPage(function() {
        this.setState({ to: to })
      }.bind(this))
    } else {
      this.setState({ to: to })
    }
  }

  getCardsPerRow() {
    let listWidth = this.refs.list.clientWidth
    return Math.floor(listWidth / 224)
  }

  loadNewPage(callback) {
    let _this = this
    let url = data.api.url + this.props.apiUrl;
    request
    .get(url)
    .query({
      'api_key': data.api.key,
      'page': this.state.page
    })
    .query(this.props.query)
    .end(function( err, res ) {
      if (err) return console.error(err)

      _this.setState({
        results: _this.state.results.concat(res.body.results.filter((show) => { return !!show.backdrop_path})),
        page: _this.state.page + 1,
        totalPages: res.body.total_pages
      }, function() {
        _this.updateVisibleCards()
      })
    })
  }
}

export default CSSModules(Gallery, styles, {allowMultiple: true})
