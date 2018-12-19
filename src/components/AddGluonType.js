import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { GLUON_TYPES_QUERY } from './GluonTypes'

const POST_MUTATION = gql`
  mutation PostMutation(
    $name: String!,
    $caption: String!,
    $caption_ja: String!,
    $sort: Int!
  ) {
    createGluonType(
      name: $name
      caption: $caption
      captionJa: $caption_ja
      sort: $sort
    ) {
      id
      createdAt
      name
    }
  }  
`

class AddGluonType extends Component {
  state = {
    name: '',
    caption: '',
    caption_ja: '',
    sort: 0,
  }

  render() {
    const { name, caption, caption_ja, sort } = this.state
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={name}
            onChange={e => this.setState({ name: e.target.value })}
            type="text"
            placeholder="A name for the gluon_type"
          />
          <input
            className="mb2"
            value={caption}
            onChange={e => this.setState({ caption: e.target.value })}
            type="text"
            placeholder="The caption for the gluon_type"
          />
          <input
            className="mb2"
            value={caption_ja}
            onChange={e => this.setState({ caption_ja: e.target.value })}
            type="text"
            placeholder="The caption_ja for the gluon_type"
          />
          <input
            className="mb2"
            value={sort}
            onChange={e => this.setState({ sort: e.target.value })}
            type="text"
            placeholder="The sort for the gluon_type"
          />
        </div>
        <Mutation
          mutation={POST_MUTATION}
          variables={{ name, caption, caption_ja, sort }}
          onCompleted={() => this.props.history.push('/gluon-types')}
          update={(store, { data: { createGluonType } }) => {
            const orderBy = 'id'
            const data = store.readQuery({
              query: GLUON_TYPES_QUERY,
              variables: { orderBy }
            })
            data.gluonTypes.unshift(createGluonType)
            store.writeQuery({
              query: GLUON_TYPES_QUERY,
              data,
              variables: { orderBy }
            })
          }}
        >
          {postMutation => <button onClick={postMutation}>Submit</button>}
        </Mutation>

      </div>
    )
  }
}

export default AddGluonType
