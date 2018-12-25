import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { timeDifferenceForDate } from '../utils'

class Quark extends Component {

  render() {
    const { data } = this.props

    return (
      <div className="flex mt2 items-start">
        <div className="flex items-center">
          <span className="gray">{this.props.index + 1}.</span>
        </div>
        <div className="ml1">
          <div>
            {data.name} ({data.imagePath}) <Link to={`/quark/${data.id}`}>Show</Link> <Link to={`/edit-quark/${data.id}`}>Edit</Link> <Link to={`/delete-quark/${data.id}`}>Delete</Link>
          </div>
          <div className="f6 lh-copy gray">
            {timeDifferenceForDate(data.createdAt)}
          </div>
        </div>
      </div>
    )
  }
}
export default Quark
