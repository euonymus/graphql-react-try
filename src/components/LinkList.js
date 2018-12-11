import React, { Component } from 'react'
import Link from './Link'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const FEED_QUERY = gql`
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
  _updateCacheAfterVote = (store, createVote, linkId) => {
    const data = store.readQuery({ query: FEED_QUERY })

    const votedLink = data.links.find(link => link.id === linkId)
    votedLink.votes = createVote.link.votes

    store.writeQuery({ query: FEED_QUERY, data })
  }

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
                 <Link
                   key={link.id}
                   link={link}
                   index={index}
                   updateStoreAfterVote={this._updateCacheAfterVote}
                 />
               ))}
             </div>
           )
        }}
      </Query>
    )
  }
}
export default LinkList
