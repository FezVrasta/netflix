import React, { Component } from 'react'
import styles from './styles/App.styl'
import CSSModules from 'react-css-modules'

// components
import Header from './components/Header'

// helpers
import _ from 'lodash'

// data
let data = require('./data/data.json')

class App extends Component {
  constructor() {
    super()
    this.state = {
      scrollTop: 0
    }
  }
  render() {
    let main = React.cloneElement(
        this.props.children,
        {
          category: this.props.route.path.split('/')[1],
          id: this.props.params.id,
          scrollTop: this.state.scrollTop
        }
    )
    return (
      <div styleName='app'>
        <Header items={data.menuItems} />
        {main}
      </div>
    )
  }
  componentDidMount() {
    this.onScrollBound = this.onScroll.bind(this)
    window.addEventListener('scroll', _.throttle(this.onScrollBound, 100))
  }

  onScroll() {
    let scrollTop = getScrollTop()
    this.setState({
      scrollTop: scrollTop
    })
  }
}

export default CSSModules(App, styles, {allowMultiple: true})

function getScrollTop() {
    if(typeof pageYOffset!= 'undefined'){
        //most browsers except IE before #9
        return pageYOffset;
    }
    else{
        var B= document.body; //IE 'quirks'
        var D= document.documentElement; //IE with doctype
        D= (D.clientHeight)? D: B;
        return D.scrollTop;
    }
}
