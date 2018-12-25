import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import { timeDifferenceForDate } from '../utils'

const QUARK_QUERY = gql`
  query QuarkQuery($id: String) {
    quark(id: $id) {
      id
      createdAt
      name
      imagePath
      description
      start
      end
      startAccuracy
      endAccuracy
      isMomentary
      url
      affiliate
      isPrivate
      isExclusive
      quarkType {
        id
        name
      }
      postedBy {
        id
        username
      }
    }
  }
`

class QuarkDetail extends Component {

  render() {
    const { id } = this.props.match.params
    return (
      <Query query={QUARK_QUERY} variables={{ id }}>
        {({ loading, error, data }) => {
           if (loading) return <div>Fetching</div>
           if (error) return <div>Error</div>
           if (data.quarkCount === 0) return <div>No Data</div>

           console.log(data)
           return (
             <div>
               <p>
                 {data.quark.id}<br />
                 {data.quark.name}<br />
                 {data.quark.imagePage}<br />
                 {data.quark.description}<br />
                 {data.quark.start}<br />
                 {data.quark.end}<br />
                 {data.quark.startAccuracy}<br />
                 {data.quark.endAccuracy}<br />
                 {data.quark.isMomentary}<br />
                 {data.quark.isExclusive}<br />
                 {data.quark.isPrivate}<br />
                 {data.quark.postedBy.username}<br />
                 {data.quark.quarkType.name}<br />
               </p>
               <div><Link to={`/add-gluon/${id}`}>Add Gluon</Link></div>
             </div>
           )

           // return (
           //   <div>
           //     {datasToRender.map((data, index) => (
           //       <Quark
           //         key={data.id}
           //         data={data}
           //       />
           //     ))}
           //   </div>
           // )
        }}
      </Query>
    )
  }


}
export default QuarkDetail
