import React, { Component } from 'react'
import { timeDifferenceForDate } from '../utils'

class QuarkProperty extends Component {
  render() {
    return (
      <div className="flex mt2 items-start">
        <div className="flex items-center">
          <span className="gray">{this.props.index + 1}.</span>
        </div>
        <div className="ml1">
          <div>
            {this.props.quark_property.id} {this.props.quark_property.name} ({this.props.quark_property.caption})
          </div>
          <div className="f6 lh-copy gray">
            {timeDifferenceForDate(this.props.quark_property.createdAt)}
          </div>
        </div>
      </div>
    )
  }
}
export default QuarkProperty
