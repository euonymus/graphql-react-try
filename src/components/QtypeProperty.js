import React, { Component } from 'react'
import { timeDifferenceForDate } from '../utils'

class QtypeProperty extends Component {
  render() {
    return (
      <div className="flex mt2 items-start">
        <div className="flex items-center">
          <span className="gray">{this.props.index + 1}.</span>
        </div>
        <div className="ml1">
          <div>
            {this.props.qtype_property.id} {this.props.qtype_property.quark_type.name} ({this.props.qtype_property.quark_property.name})
          </div>
          <div className="f6 lh-copy gray">
            {timeDifferenceForDate(this.props.qtype_property.createdAt)}
          </div>
        </div>
      </div>
    )
  }
}
export default QtypeProperty