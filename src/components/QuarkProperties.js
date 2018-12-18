import React, { Component, Fragment } from 'react'
import QuarkProperty from './QuarkProperty'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const FEED_QUERY = gql`
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
  _getQueryVariables = () => {
    const orderBy = 'id'
    return { orderBy }
  }

  _getQuarkPropertiesToRender = data => {
    return data.quarkProperties
  }

  render() {
    return (
      <Query query={FEED_QUERY} variables={this._getQueryVariables()}>
        {({ loading, error, data }) => {
           if (loading) return <div>Fetching</div>
           if (error) return <div>Error</div>
           if (data.quarkProperties.length === 0) return <div>No Data</div>

           const quarkPropertiesToRender = this._getQuarkPropertiesToRender(data)
           const pageIndex = 0

           return (
             <Fragment>
               {quarkPropertiesToRender.map((quark_property, index) => (
                 <QuarkProperty
                   key={quark_property.id}
                   quark_property={quark_property}
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
