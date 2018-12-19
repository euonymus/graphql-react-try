import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { QPROPERTY_TYPES_QUERY } from './QpropertyTypes'

import InputQuarkProperties from './InputQuarkProperties'
import InputQuarkTypes from './InputQuarkTypes'

const POST_MUTATION = gql`
  mutation PostMutation(
    $quark_property_id: Int!,
    $quark_type_id: Int!,
  ) {
    createQpropertyType(
      quarkPropertyId: $quark_property_id
      quarkTypeId: $quark_type_id
    ) {
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

class AddQpropertyType extends Component {
  state = {
    quark_property_id: '',
    quark_type_id: '',
  }

  render() {
    const { quark_property_id, quark_type_id } = this.state
    return (
      <div>
        <div className="flex flex-column mt3">
          Quark Property: <InputQuarkProperties onChange={quark_property_id => this.setState( {quark_property_id} )}/>
          Quark Type: <InputQuarkTypes onChange={quark_type_id => this.setState( {quark_type_id} )}/>
        </div>
        <Mutation
          mutation={POST_MUTATION}
          variables={{ quark_type_id, quark_property_id }}
          onCompleted={() => this.props.history.push('/qproperty-types')}
          update={(store, { data: { createQpropertyType } }) => {
            const orderBy = 'id'
            const data = store.readQuery({
              query: QPROPERTY_TYPES_QUERY,
              variables: { orderBy }
            })
            data.qpropertyTypes.unshift(createQpropertyType)
            store.writeQuery({
              query: QPROPERTY_TYPES_QUERY,
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

export default AddQpropertyType
