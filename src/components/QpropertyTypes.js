import React, { Component, Fragment } from 'react'
import QpropertyType from './QpropertyType'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const QPROPERTY_TYPES_QUERY = gql`
  query FeedQuery($orderBy: String) {
    qpropertyTypes(orderBy: $orderBy) {
      id
      createdAt
      quarkProperty {
        id
        name
      }
      quarkType {
        id
        name
      }
    }
  }
`

class QpropertyTypes extends Component {
  _getDatasToRender = data => {
    return data.qpropertyTypes
  }

  render() {
    return (
      <Query query={QPROPERTY_TYPES_QUERY} variables={{ orderBy: 'id' }}>
        {({ loading, error, data }) => {
           if (loading) return <div>Fetching</div>
           if (error) return <div>Error</div>
           if (data.qpropertyTypes.length === 0) return <div>No Data</div>

           const datasToRender = this._getDatasToRender(data)
           const pageIndex = 0

           return (
             <Fragment>
               {datasToRender.map((data, index) => (
                 <QpropertyType
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
export default QpropertyTypes
