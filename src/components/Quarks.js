import React, { Component, Fragment } from 'react'
import Quark from './Quark'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { QUARKS_PER_PAGE } from '../constants'

export const QUARKS_QUERY = gql`
  query FeedQuery($first: Int, $skip: Int, $orderBy: String) {
    quarks(first: $first, skip: $skip, orderBy: $orderBy) {
      id
      createdAt
      name
      imagePath
      description
      url
      postedBy {
        id
        username
      }
      quarkType {
        id
        name
      }
    }
    quarkCount
  }
`

class Quarks extends Component {
  _getQueryVariables = () => {
    const page = parseInt(this.props.match.params.page, 10)

    const skip = (page - 1) * QUARKS_PER_PAGE
    const first = QUARKS_PER_PAGE
    const orderBy = 'created_at'
    return { first, skip, orderBy }
  }

  _getDatasToRender = data => {
    return data.quarks
  }

  _nextPage = data => {
    const page = parseInt(this.props.match.params.page, 10)
    if (page < data.quarkCount / QUARKS_PER_PAGE) {
      const nextPage = page + 1
      this.props.history.push(`/quarks/${nextPage}`)
    }
  }

  _previousPage = () => {
    const page = parseInt(this.props.match.params.page, 10)
    if (page > 1) {
      const previousPage = page - 1
      this.props.history.push(`/quarks/${previousPage}`)
    }
  }
  
  render() {
    return (
      <Query query={QUARKS_QUERY} variables={this._getQueryVariables()}>
        {({ loading, error, data }) => {
           if (loading) return <div>Fetching</div>
           if (error) return <div>Error</div>
           if (data.quarkCount === 0) return <div>No Data</div>

           const datasToRender = this._getDatasToRender(data)
           const pageIndex = this.props.match.params.page
           ? (this.props.match.params.page - 1) * QUARKS_PER_PAGE
           : 0

           return (
             <Fragment>
               {datasToRender.map((data, index) => (
                 <Quark
                   key={data.id}
                   data={data}
                   index={index + pageIndex}
                 />
               ))}
               {(
                  <div className="flex ml4 mv3 gray">
                    <div className="pointer mr2" onClick={this._previousPage}>
                      Previous
                    </div>
                    <div className="pointer" onClick={() => this._nextPage(data)}>
                      Next
                    </div>
                  </div>
               )}
             </Fragment>
           )
        }}
      </Query>
    )
  }
}
export default Quarks
