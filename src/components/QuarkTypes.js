import React, { Component, Fragment } from 'react'
import QuarkType from './QuarkType'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const QUARK_TYPES_QUERY = gql`
  query FeedQuery($orderBy: String) {
    quarkTypes(orderBy: $orderBy) {
      id
      name
      sort
      createdAt
    }
  }
`

class QuarkTypes extends Component {
  _getQuarkTypesToRender = data => {
    return data.quarkTypes
  }

  render() {
    return (
      <Query query={QUARK_TYPES_QUERY} variables={{ orderBy: 'id' }}>
        {({ loading, error, data }) => {
           if (loading) return <div>Fetching</div>
           if (error) return <div>Error</div>
           if (data.quarkTypes.length === 0) return <div>No Data</div>

           const quarkTypesToRender = this._getQuarkTypesToRender(data)
           const pageIndex = 0

           return (
             <Fragment>
               {quarkTypesToRender.map((data, index) => (
                 <QuarkType
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
export default QuarkTypes
