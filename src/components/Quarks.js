import React, { Component, Fragment } from 'react'
import Quark from './Quark'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { QUARKS_PER_PAGE } from '../constants'

export const FEED_QUERY = gql`
  query FeedQuery($first: Int, $skip: Int, $orderBy: String) {
    quarks(first: $first, skip: $skip, orderBy: $orderBy) {
      id
      createdAt
      url
      description
      postedBy {
        id
        username
      }
    }
    quarkCount
  }
`

class Quarks extends Component {
  _getQueryVariables = () => {
    const isNewPage = this.props.location.pathname.includes('new')
    const page = parseInt(this.props.match.params.page, 10)

    const skip = isNewPage ? (page - 1) * QUARKS_PER_PAGE : 0
    const first = isNewPage ? QUARKS_PER_PAGE : 100
    const orderBy = isNewPage ? 'created_at' : null
    return { first, skip, orderBy }
  }

  _getDatasToRender = data => {
    const isNewPage = this.props.location.pathname.includes('new')
    if (isNewPage) {
      return data.quarks
    }
    const rankedQuarks = data.quarks.slice()
    // rankedQuarks.sort((l1, l2) => l2.votes.length - l1.votes.length)
    return rankedQuarks
  }

  _nextPage = data => {
    const page = parseInt(this.props.match.params.page, 10)
    if (page < data.quarkCount / QUARKS_PER_PAGE) {
      const nextPage = page + 1
      this.props.history.push(`/new/${nextPage}`)
    }
  }

  _previousPage = () => {
    const page = parseInt(this.props.match.params.page, 10)
    if (page > 1) {
      const previousPage = page - 1
      this.props.history.push(`/new/${previousPage}`)
    }
  }
  
  render() {
    return (
      <Query query={FEED_QUERY} variables={this._getQueryVariables()}>
        {({ loading, error, data }) => {
           if (loading) return <div>Fetching</div>
           if (error) return <div>Error</div>
           if (data.quarkCount === 0) return <div>No Data</div>

           const datasToRender = this._getDatasToRender(data)
           const isNewPage = this.props.location.pathname.includes('new')
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
               {isNewPage && (
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
