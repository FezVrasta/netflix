// data
let data = require('../data/data.json')

// helpers
import request from 'superagent'
import camelCase from 'camelcase'
import _ from 'lodash'

var movieDB = {

  // get tv show or movie
  getItem(category, id) {
    let url = `${data.api.url}${data.api.requests[camelCase(category)]}/${id}`

    request
    .get(url)
    .query({
      'api_key': data.api.key
    })
    .end(function( err, res ) {
      if (err) console.error(err)

      this.setState({
        item: res.body
      })
    }.bind(this))
  },

  // get first video related to given item
  getVideo(category, id) {
    let url = `${data.api.url}${data.api.requests[camelCase(category)]}/${id}/videos`

    request
    .get(url)
    .query({
      'api_key': data.api.key
    })
    .end(function( err, res ) {
      if (err) console.error(err)

      this.setState({
        trailer: res.body.results[0]
      })
    }.bind(this))
  },

  getGenres(category) {
    let url = `${data.api.url}/genre${data.api.requests[camelCase(category)]}/list`

    request
    .get(url)
    .query({
      'api_key': data.api.key
    })
    .end(function( err, res ) {
      if (err) console.error(err)

      this.setState({
        genres: res.body.genres
      })
    }.bind(this))
  },

  getImageURL(image, size) {
    !size && (size = 600)

    return `http://image.tmdb.org/t/p/w${size}${unescape(image)}`
  },

  // get cast of the given ID
  getCast(category, id) {
    let url = `${data.api.url}${data.api.requests[camelCase(category)]}/${id}/credits`

    request
    .get(url)
    .query({
      'api_key': data.api.key
    })
    .end(function( err, res ) {
      if (err) console.error(err)

      this.setState({
        cast: res.body.cast,
        person: res.body.cast[_.findIndex(res.body.cast, { order: 0 })]
      })
    }.bind(this))
  },

  getPerson(id) {
    let url = `${data.api.url}/person/${id}`

    request
    .get(url)
    .query({
      'api_key': data.api.key
    })
    .end(function( err, res ) {
      if (err) console.error(err)

      this.setState({
        person: res.body
      })
    }.bind(this))
  }

}

export default movieDB
