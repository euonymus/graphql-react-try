import React, { Component, Fragment } from 'react'
import QpropertyGtype from './QpropertyGtype'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const QPROPERTY_GTYPES_QUERY = gql`
  query FeedQuery($orderBy: String) {
    qpropertyGtypes(orderBy: $orderBy) {
      id
      side
      createdAt
      quarkProperty {
        id
        name
      }
      gluonType {
        id
        name
      }
    }
  }
`

class QpropertyGtypes extends Component {
  _getDatasToRender = data => {
    return data.qpropertyGtypes
  }

  render() {
    return (
      <Query query={QPROPERTY_GTYPES_QUERY} variables={{ orderBy: 'id' }}>
        {({ loading, error, data }) => {
           if (loading) return <div>Fetching</div>
           if (error) return <div>Error</div>
           if (data.qpropertyGtypes.length === 0) return <div>No Data</div>

           const datasToRender = this._getDatasToRender(data)
           const pageIndex = 0

           return (
             <Fragment>
               {datasToRender.map((data, index) => (
                 <QpropertyGtype
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
export default QpropertyGtypes
