import React, { Component } from 'react'
import Link from './Link'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

// const FEED_QUERY = gql`
//   {
//     links(search:"Jonatas", first:3) {
//       id
//       url
//       description
//     }
//   }
// `
// const FEED_QUERY = gql`
//   {
//     links {
//       id
//       url
//       description
//     }
//   }
// `
const FEED_QUERY = gql`
  {
    links {
      id
      url
      description
      postedBy {
        id
        username
      }
      votes {
        edges {
          node {
            id
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`


class LinkList extends Component {
  render() {
    return (
      <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
           if (loading) return <div>Fetching</div>
           if (error) return <div>Error</div>

           const linksToRender = data.links

           return (
             <div>
               {linksToRender.map((link, index) => (
                 <Link key={link.id} link={link} index={index} />
               ))}
             </div>
           )
        }}
      </Query>
    )
  }
}
export default LinkList
