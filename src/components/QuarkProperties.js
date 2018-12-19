import React, { Component, Fragment } from 'react'
import QuarkProperty from './QuarkProperty'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const QUARK_PROPERTIES_QUERY = gql`
  query FeedQuery($orderBy: String) {
    quarkProperties(orderBy: $orderBy) {
      id
      name
      caption
      captionJa
      createdAt
    }
  }
`

class QuarkProperties extends Component {
  _getQuarkPropertiesToRender = data => {
    return data.quarkProperties
  }

  render() {
    return (
      <Query query={QUARK_PROPERTIES_QUERY} variables={{ orderBy: 'id' }}>
        {({ loading, error, data }) => {
           if (loading) return <div>Fetching</div>
           if (error) return <div>Error</div>
           if (data.quarkProperties.length === 0) return <div>No Data</div>

           const quarkPropertiesToRender = this._getQuarkPropertiesToRender(data)
           const pageIndex = 0

           return (
             <Fragment>
               {quarkPropertiesToRender.map((data, index) => (
                 <QuarkProperty
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
export default QuarkProperties
