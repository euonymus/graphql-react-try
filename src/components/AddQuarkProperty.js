import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { FEED_QUERY } from './QuarkProperties'

const POST_MUTATION = gql`
  mutation PostMutation(
    $name: String!,
    $caption: String!,
    $caption_ja: String!,
  ) {
    createQuarkProperty(
      name: $name
      caption: $caption
      captionJa: $caption_ja
    ) {
      id
      createdAt
      name
    }
  }  
`

class AddQuarkProperty extends Component {
  state = {
    name: '',
    caption: '',
    caption_ja: '',
  }

  render() {
    const { name, caption, caption_ja } = this.state
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={name}
            onChange={e => this.setState({ name: e.target.value })}
            type="text"
            placeholder="A name for the quark_property"
          />
          <input
            className="mb2"
            value={caption}
            onChange={e => this.setState({ caption: e.target.value })}
            type="text"
            placeholder="The caption for the quark_property"
          />
          <input
            className="mb2"
            value={caption_ja}
            onChange={e => this.setState({ caption_ja: e.target.value })}
            type="text"
            placeholder="The caption_ja for the quark_property"
          />
        </div>
        <Mutation
          mutation={POST_MUTATION}
          variables={{ name, caption, caption_ja }}
          onCompleted={() => this.props.history.push('/quark-properties')}
          update={(store, { data: { createQuarkProperty } }) => {
            const orderBy = 'id'
            const data = store.readQuery({
              query: FEED_QUERY,
              variables: { orderBy }
            })
            data.quarkProperties.unshift(createQuarkProperty)
            store.writeQuery({
              query: FEED_QUERY,
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

export default AddQuarkProperty
