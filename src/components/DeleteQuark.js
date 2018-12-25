import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { QUARKS_QUERY } from './Quarks'
import { QUARKS_PER_PAGE } from '../constants'
import LoadDeleteQuark from './LoadDeleteQuark'

const POST_MUTATION = gql`
  mutation PostMutation(
    $id: String!
  ) {
    deleteQuark(
      id: $id
    ) {
      id
      createdAt
      name
    }
  }  
`
class DeleteQuark extends Component {

  render() {
    const { id } = this.props.match.params
    return (
      <div>
        <Mutation
          mutation={POST_MUTATION}
          variables={{ id }}
          onCompleted={() => this.props.history.push('/quarks/1')}
          update={(store, { data: { deleteQuark } }) => {
            const first = QUARKS_PER_PAGE
            const skip = 0
            const orderBy = 'created_at'
            const data = store.readQuery({
              query: QUARKS_QUERY,
              variables: { first, skip, orderBy }
            })
            data.quarks = data.quarks.map( quark => {
              if (quark.id === deleteQuark.id) {
                return deleteQuark
              }
              return quark
            })
            // data.quarks.unshift(deleteQuark)
            store.writeQuery({
              query: QUARKS_QUERY,
              data,
              variables: { first, skip, orderBy }
            })
          }}
        >
           {postMutation => <LoadDeleteQuark deleteFunc={postMutation} >Deleted</LoadDeleteQuark>}
        </Mutation>

      </div>
    )
  }
}

export default DeleteQuark
