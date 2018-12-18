import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { FEED_QUERY } from './QuarkTypes'

const POST_MUTATION = gql`
  mutation PostMutation(
    $name: String!,
    $image_path: String!,
    $name_prop: String!,
    $start_prop: String!,
    $end_prop: String!,
    $has_gender: Boolean!,
    $sort: Int!
  ) {
    createQuarkType(
      name: $name
      imagePath: $image_path
      nameProp: $name_prop
      startProp: $start_prop
      endProp: $end_prop
      hasGender: $has_gender
      sort: $sort
    ) {
      id
      createdAt
      name
    }
  }  
`

class AddQuarkType extends Component {
  state = {
    name: '',
    image_path: '',
    name_prop: 'name',
    start_prop: 'startDate',
    end_prop: 'endDate',
    has_gender: false,
    sort: 0,
  }

  render() {
    const { name, image_path, name_prop, start_prop, end_prop, has_gender, sort } = this.state
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={name}
            onChange={e => this.setState({ name: e.target.value })}
            type="text"
            placeholder="A name for the quark_type"
          />
          <input
            className="mb2"
            value={image_path}
            onChange={e => this.setState({ image_path: e.target.value })}
            type="text"
            placeholder="The image_path for the quark_type"
          />
          <input
            className="mb2"
            value={name_prop}
            onChange={e => this.setState({ name_prop: e.target.value })}
            type="text"
            placeholder="The name_prop for the quark_type"
          />
          <input
            className="mb2"
            value={start_prop}
            onChange={e => this.setState({ start_prop: e.target.value })}
            type="text"
            placeholder="The start_prop for the quark_type"
          />
          <input
            className="mb2"
            value={end_prop}
            onChange={e => this.setState({ end_prop: e.target.value })}
            type="text"
            placeholder="The end_prop for the quark_type"
          />
          <input
            className="mb2"
            value={has_gender}
            onChange={e => this.setState({ has_gender: e.target.value })}
            type="text"
            placeholder="The has_gender for the quark_type"
          />
          <input
            className="mb2"
            value={sort}
            onChange={e => this.setState({ sort: e.target.value })}
            type="text"
            placeholder="The sort for the quark_type"
          />
        </div>
        <Mutation
          mutation={POST_MUTATION}
          variables={{ name, image_path, name_prop, start_prop, end_prop, has_gender, sort }}
          onCompleted={() => this.props.history.push('/quark-types')}
          update={(store, { data: { createQuarkType } }) => {
            const orderBy = 'id'
            const data = store.readQuery({
              query: FEED_QUERY,
              variables: { orderBy }
            })
            data.quarkTypes.unshift(createQuarkType)
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

export default AddQuarkType
