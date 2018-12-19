import React, { Component } from 'react'
import { timeDifferenceForDate } from '../utils'

class QuarkProperty extends Component {
  render() {
    const { data } = this.props

    return (
      <div className="flex mt2 items-start">
        <div className="flex items-center">
          <span className="gray">{this.props.index + 1}.</span>
        </div>
        <div className="ml1">
          <div>
            {data.id} {data.name} ({data.caption})
          </div>
          <div className="f6 lh-copy gray">
            {timeDifferenceForDate(data.createdAt)}
          </div>
        </div>
      </div>
    )
  }
}
export default QuarkProperty
