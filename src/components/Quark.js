import React, { Component } from 'react'
// import { Mutation } from 'react-apollo'
// import gql from 'graphql-tag'
// import { AUTH_TOKEN } from '../constants'
import { timeDifferenceForDate } from '../utils'

// const VOTE_MUTATION = gql`
//   mutation VoteMutation($linkId: Int!) {
//     createVote(linkId: $linkId) {
//       link {
//         votes {
//               id
//               user {
//                 id
//           }
//         }
//       }
//       user {
//         id
//       }
//     }
//   }
// `

class Quark extends Component {
  render() {
    // const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <div className="flex mt2 items-start">
        <div className="flex items-center">
          <span className="gray">{this.props.index + 1}.</span>
{/*
          {authToken && (
             <Mutation
               mutation={VOTE_MUTATION}
               variables={{ linkId: this.props.link.id }}
               update={(store, { data: { createVote } }) =>
                 this.props.updateStoreAfterVote(store, createVote, this.props.link.id)
               }
               >
               {voteMutation => (
                 <div className="ml1 gray f11" onClick={voteMutation}>
                   ▲
                 </div>
               )}
             </Mutation>
          )}
*/}
        </div>
        <div className="ml1">
          <div>
            {this.props.quark.description} ({this.props.quark.url})
          </div>
          <div className="f6 lh-copy gray">
            {this.props.quark.postedBy
             ? this.props.quark.postedBy.username
             : 'Unknown'}{' '}
            {timeDifferenceForDate(this.props.quark.createdAt)}
          </div>
        </div>
      </div>
    )
  }
}
export default Quark
