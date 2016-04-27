import React, { Component } from 'react'
import { Link } from 'react-router'
import Ink from 'react-ink'

export default class HeaderItem extends Component {
  render() {
    let to = {}
    this.props.pathname && ( to.pathname = this.props.pathname )
    this.props.hash && ( to.hash = this.props.hash )

    return (
      <Link
        to={to}
        className={this.props.className}
        activeClassName={this.props.activeClassName}
        onClick={this.props.onClick}>
        {this.props.name}
        <Ink />
      </Link>
    )
  }
}
