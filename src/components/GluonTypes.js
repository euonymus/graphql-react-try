import React, { Component, Fragment } from 'react'
import GluonType from './GluonType'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const GLUON_TYPES_QUERY = gql`
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
  _getGluonTypesToRender = data => {
    return data.gluonTypes
  }

  render() {
    return (
      <Query query={GLUON_TYPES_QUERY} variables={{ orderBy: 'id' }}>
        {({ loading, error, data }) => {
           if (loading) return <div>Fetching</div>
           if (error) return <div>Error</div>
           if (data.gluonTypes.length === 0) return <div>No Data</div>

           const gluonTypesToRender = this._getGluonTypesToRender(data)
           const pageIndex = 0

           return (
             <Fragment>
               {gluonTypesToRender.map((data, index) => (
                 <GluonType
                   key={data.id}
                   data={data}
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
