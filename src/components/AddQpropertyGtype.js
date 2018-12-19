import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { QPROPERTY_GTYPES_QUERY } from './QpropertyGtypes'

import InputQuarkProperties from './InputQuarkProperties'
import InputGluonTypes from './InputGluonTypes'

const POST_MUTATION = gql`
  mutation PostMutation(
    $quark_property_id: Int!,
    $gluon_type_id: Int!,
    $side: Int!,
  ) {
    createQpropertyGtype(
      quarkPropertyId: $quark_property_id
      gluonTypeId: $gluon_type_id
      side: $side
    ) {
      id
      createdAt
      side
      quarkProperty {
        id
        name
      }
      gluonType {
        id
        name
      }
    }
  }  
`

class AddQpropertyGtype extends Component {
  state = {
    side: 0,
    quark_property_id: '',
    gluon_type_id: '',
  }

  render() {
    const { quark_property_id, gluon_type_id, side } = this.state
    return (
      <div>
        <div className="flex flex-column mt3">
          Quark Property: <InputQuarkProperties onChange={quark_property_id => this.setState( {quark_property_id} )}/>
          Gluon Type: <InputGluonTypes onChange={gluon_type_id => this.setState( {gluon_type_id} )}/>
          <input
            className="mb2"
            value={side}
            onChange={e => this.setState({ side: e.target.value })}
            type="text"
            placeholder="The side for the quark_type"
          />
        </div>
        <Mutation
          mutation={POST_MUTATION}
          variables={{ gluon_type_id, quark_property_id, side }}
          onCompleted={() => this.props.history.push('/qproperty-gtypes')}
          update={(store, { data: { createQpropertyGtype } }) => {
            const orderBy = 'id'
            const data = store.readQuery({
              query: QPROPERTY_GTYPES_QUERY,
              variables: { orderBy }
            })
            data.qpropertyGtypes.unshift(createQpropertyGtype)
            store.writeQuery({
              query: QPROPERTY_GTYPES_QUERY,
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

export default AddQpropertyGtype
