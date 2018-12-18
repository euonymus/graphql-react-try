import React, { Component } from 'react'
import { timeDifferenceForDate } from '../utils'

class QuarkType extends Component {
  render() {
    return (
      <div className="flex mt2 items-start">
        <div className="flex items-center">
          <span className="gray">{this.props.index + 1}.</span>
        </div>
        <div className="ml1">
          <div>
            {this.props.quark_type.name} ({this.props.quark_type.sort})
          </div>
          <div className="f6 lh-copy gray">
            {timeDifferenceForDate(this.props.quark_type.createdAt)}
          </div>
        </div>
      </div>
    )
  }
}
export default QuarkType
