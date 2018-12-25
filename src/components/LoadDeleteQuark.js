import { Component } from 'react'

class LoadDeleteQuark extends Component {
  componentDidMount() {
    this.props.deleteFunc()
  }

  render() {
    return this.props.children
  }
}

export default LoadDeleteQuark
