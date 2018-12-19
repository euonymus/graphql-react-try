import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { QTYPE_PROPERTIES_QUERY } from './QtypeProperties'

import InputQuarkTypes from './InputQuarkTypes'
import InputQuarkProperties from './InputQuarkProperties'

const POST_MUTATION = gql`
  mutation PostMutation(
    $quark_type_id: Int!,
    $quark_property_id: Int!,
    $is_required: Boolean!,
  ) {
    createQtypeProperty(
      quarkTypeId: $quark_type_id
      quarkPropertyId: $quark_property_id
      isRequired: $is_required
    ) {
      id
      createdAt
      quarkType {
        id
        name
      }
      quarkProperty {
        id
        name
      }
    }
  }  
`

class AddQtypeProperty extends Component {
  state = {
    is_required: false,
    quark_type_id: '',
    quark_property_id: '',
  }

  render() {
    const { is_required, quark_type_id, quark_property_id } = this.state
    return (
      <div>
        <div className="flex flex-column mt3">
          <InputQuarkTypes onChange={value => this.setState( {value} )}/>
          <InputQuarkProperties onChange={value => this.setState( {value} )}/>
          <input
            onChange={e => this.setState({is_required: !is_required})}
            type="checkbox"
            checked={is_required}
          />
        </div>
        <Mutation
          mutation={POST_MUTATION}
          variables={{ is_required, quark_type_id, quark_property_id }}
          onCompleted={() => this.props.history.push('/qtype-properties')}
          update={(store, { data: { createQtypeProperty } }) => {
            const orderBy = 'id'
            const data = store.readQuery({
              query: QTYPE_PROPERTIES_QUERY,
              variables: { orderBy }
            })
            data.qtypeProperties.unshift(createQtypeProperty)
            store.writeQuery({
              query: QTYPE_PROPERTIES_QUERY,
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

export default AddQtypeProperty
