import React, { Component } from 'react'
import styles from '../styles/components/SearchBar.styl'
import CSSModules from 'react-css-modules'
import { Actions } from '../actions/Actions'

// helpers
import _ from 'lodash'
import request from 'superagent'
import camelCase from 'camelcase'

// data
let data = require('../data/data.json')

// components
import SearchResults from './SearchResults'
import Ink from 'react-ink'

class SearchBar extends Component {
  constructor() {
    super()
    this.state = { expanded: false, filter: '', results: [] }
  }
  render() {
    let collapsed = this.props.collapsed
    collapsed && ( collapsed = !this.state.expanded )

    let styleName = 'searchBar'
    collapsed && (styleName += ' searchBar--collapsed')

    let backdropStyleName = 'backdrop'
    this.state.expanded && ( backdropStyleName += ' backdrop--in' )

    let element = (
      <input
        ref='input'
        value={this.state.filter}
        type='search'
        styleName='input'
        onChange={this.changeFilter.bind(this)}
        onFocus={this.expand.bind(this)}
        placeholder={this.props.placeholder} />
    )

    collapsed && (
      element = <div styleName='input fab' className='material-icons' onClick={this.onClick.bind(this)}>search</div>
    )

    let results
    this.state.results.length && this.state.expanded && (
      results = <SearchResults category={this.props.category} closeSearch={this.closeSearch.bind(this)} results={this.state.results} />
    )

    return (
      <div styleName={styleName}>
        <div styleName={backdropStyleName} onClick={this.closeSearch.bind(this)} />
        {element}
        {results}
      </div>
    )
  }

  componentDidMount() {
    this.applyFilterBound = this.applyFilter.bind(this)
  }

  componentDidUpdate() {
    if (this.props.collapsed && this.state.expanded && this.refs.input) {
      this.refs.input.focus()
    }
  }

  changeFilter(evt) {
    let filter = evt.target.value
    this.setState({filter: filter})

    _.debounce(this.applyFilterBound, 500)()
  }

  applyFilter() {
    let filter = this.state.filter

    if (!filter) {
      this.setState({results: []})
    } else {
      let _this = this
      let url = data.api.url + this.getSearchApiUrl()
      request
      .get(url)
      .query({
        'api_key': data.api.key,
        'query': filter
      })
      .end(function( err, res ) {
        if (err) console.error(err)
        _this.setState({
          results: res.body.results || []
        })
      })
    }
  }

  onClick() {
    this.setState({ expanded: !this.state.expanded })
  }

  closeSearch() {
    this.setState({ expanded: false })
  }

  expand() {
    this.setState({ expanded: true })
  }

  getSearchApiUrl() {
    return '/search' + data.api.requests[camelCase(this.props.category)]
  }
}

export default CSSModules(SearchBar, styles, {allowMultiple: true})
