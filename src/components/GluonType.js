import React, { Component } from 'react'
import { timeDifferenceForDate } from '../utils'

class GluonType extends Component {
  render() {
    return (
      <div className="flex mt2 items-start">
        <div className="flex items-center">
          <span className="gray">{this.props.index + 1}.</span>
        </div>
        <div className="ml1">
          <div>
            {this.props.gluon_type.id} {this.props.gluon_type.name} ({this.props.gluon_type.sort})
          </div>
          <div className="f6 lh-copy gray">
            {timeDifferenceForDate(this.props.gluon_type.createdAt)}
          </div>
        </div>
      </div>
    )
  }
}
export default GluonType
