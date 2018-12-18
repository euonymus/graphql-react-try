import React, { Component, Fragment } from 'react'
import GluonType from './GluonType'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const FEED_QUERY = gql`
  query FeedQuery($orderBy: String) {
    gluonTypes(orderBy: $orderBy) {
      id
      name
      sort
      createdAt
    }
  }
`

class GluonTypes extends Component {
  _getQueryVariables = () => {
    const orderBy = 'id'
    // const orderBy = 'sort'
    return { orderBy }
  }

  _getGluonTypesToRender = data => {
    return data.gluonTypes
  }

  render() {
    return (
      <Query query={FEED_QUERY} variables={this._getQueryVariables()}>
        {({ loading, error, data }) => {
           if (loading) return <div>Fetching</div>
           if (error) return <div>Error</div>
           if (data.gluonTypes.length === 0) return <div>No Data</div>

           const gluonTypesToRender = this._getGluonTypesToRender(data)
           const pageIndex = 0

           return (
             <Fragment>
               {gluonTypesToRender.map((gluon_type, index) => (
                 <GluonType
                   key={gluon_type.id}
                   gluon_type={gluon_type}
                   index={index + pageIndex}
                 />
               ))}
             </Fragment>
           )
        }}
      </Query>
    )
  }
}
export default GluonTypes
