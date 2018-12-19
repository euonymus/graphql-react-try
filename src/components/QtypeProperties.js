import React, { Component, Fragment } from 'react'
import QtypeProperty from './QtypeProperty'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const QTYPE_PROPERTIES_QUERY = gql`
  query FeedQuery($orderBy: String) {
    qtypeProperties(orderBy: $orderBy) {
      id
      isRequired
      createdAt
      quarkType {
        id
        name
      }
      quarkProperty {
        id
        name
      }
    }
  }
`

class QtypeProperties extends Component {
  _getQueryVariables = () => {
    const orderBy = 'id'
    // const orderBy = 'sort'
    return { orderBy }
  }

  _getQtypePropertiesToRender = data => {
    return data.qtypeProperties
  }

  render() {
    return (
      <Query query={QTYPE_PROPERTIES_QUERY} variables={this._getQueryVariables()}>
        {({ loading, error, data }) => {
           if (loading) return <div>Fetching</div>
           if (error) return <div>Error</div>
           if (data.qtypeProperties.length === 0) return <div>No Data</div>

           const qtypePropertiesToRender = this._getQtypePropertiesToRender(data)
           const pageIndex = 0

           return (
             <Fragment>
               {qtypePropertiesToRender.map((data, index) => (
                 <QtypeProperty
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
export default QtypeProperties
