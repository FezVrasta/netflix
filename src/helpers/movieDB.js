// data
let data = require('../data/data.json')

// helpers
import request from 'superagent'
import camelCase from 'camelcase'

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
  }

}

export default movieDB
