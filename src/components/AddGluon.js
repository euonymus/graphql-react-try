import React, { Component } from 'react'
import { withApollo, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
// import { QUARKS_QUERY } from './Quarks'
// import { QUARKS_PER_PAGE } from '../constants'
import InputGluonTypes from './InputGluonTypes'

const QUARK_QUERY = gql`
  query QuarkQuery($id: String) {
    quark(id: $id) {
      id
      name
    }
  }
`
const POST_MUTATION = gql`
  mutation PostMutation(
    $subject_quark_id: String!,
    $object_quark_name: String!,
    $gluon_type_id: Int!,
    $prefix: String,
    $relation: String!,
    $suffix: String,
    $start: String,
    $end: String,
    $start_accuracy: String,
    $end_accuracy: String,
    $is_momentary: Boolean!,
    $url: String,
    $is_private: Boolean!,
    $is_exclusive: Boolean!,
  ) {
    createGluon(
      subjectQuarkId: $subject_quark_id
      objectQuarkName: $object_quark_name
      gluonTypeId: $gluon_type_id
      prefix: $prefix
      relation: $relation
      suffix: $suffix
      start: $start
      end: $end
      startAccuracy: $start_accuracy
      endAccuracy: $end_accuracy
      isMomentary: $is_momentary
      url: $url
      isPrivate: $is_private
      isExclusive: $is_exclusive
    ) {
      id
      createdAt
      prefix
      relation
      suffix
      start
      end
      startAccuracy
      endAccuracy
      isMomentary
      url
      isPrivate
      isExclusive
      objectQuark {
        id
        name
        imagePath
        description
      }
      subjectQuark {
        id
        name
        imagePath
        description
      }
      gluonType {
        id
        name
      }
    }
  }  
`
class AddGluon extends Component {
  state = {
    subject_quark_name: '',
    object_quark_name: '',
    gluon_type_id: '',
    prefix: '',
    relation: '',
    suffix: '',
    start: '',
    end: '',
    start_accuracy: '',
    end_accuracy: '',
    is_momentary: false,
    url: '',
    is_private: false,
    is_exclusive: true,
  }

  componentDidMount() {
    this.props.client.query({
      query: QUARK_QUERY,
      variables: { id: this.props.match.params.subject_quark_id }
    }).then(response => {
      const { quark } = response.data
      this.setState({
        subject_quark_name: quark.name,
      })
    })
  }

  render() {
    const { subject_quark_id } = this.props.match.params
    const { object_quark_name, gluon_type_id, prefix, relation, suffix, start, end, start_accuracy, end_accuracy,
            is_momentary, url, is_private, is_exclusive } = this.state

    return (
      <div>
        <h2>Adding new gluon on {this.state.subject_quark_name}</h2>
        <div className="flex flex-column mt3">
          Quark Type: <InputGluonTypes onChange={gluon_type_id => this.setState( {gluon_type_id} )}/>
          <input
            className="mb2"
            value={object_quark_name}
            onChange={e => this.setState({ object_quark_name: e.target.value })}
            type="text"
            placeholder="A object quark name for the gluon"
          />
          <input
            className="mb2"
            value={prefix}
            onChange={e => this.setState({ prefix: e.target.value })}
            type="text"
            placeholder="A prefix for the gluon"
          />
          <input
            className="mb2"
            value={relation}
            onChange={e => this.setState({ relation: e.target.value })}
            type="text"
            placeholder="A relation for the gluon"
          />
          <input
            className="mb2"
            value={suffix}
            onChange={e => this.setState({ suffix: e.target.value })}
            type="text"
            placeholder="A suffix for the gluon"
          />
          <input
            className="mb2"
            value={start}
            onChange={e => this.setState({ start: e.target.value })}
            type="date"
            placeholder="A start for the gluon"
          />
          <input
            className="mb2"
            value={end}
            onChange={e => this.setState({ end: e.target.value })}
            type="date"
            placeholder="A end for the gluon"
          />
          <input
            className="mb2"
            value={start_accuracy}
            onChange={e => this.setState({ start_accuracy: e.target.value })}
            type="text"
            placeholder="A start_accuracy for the gluon"
          />
          <input
            className="mb2"
            value={end_accuracy}
            onChange={e => this.setState({ end_accuracy: e.target.value })}
            type="text"
            placeholder="A end_accuracy for the gluon"
          />
          is_momentary
          <input
            onChange={e => this.setState({is_momentary: !is_momentary})}
            type="checkbox"
            checked={is_momentary}
          /><br />
          <input
            className="mb2"
            value={url}
            onChange={e => this.setState({ url: e.target.value })}
            type="text"
            placeholder="The URL for the gluon"
          />
          is_private
          <input
            onChange={e => this.setState({is_private: !is_private})}
            type="checkbox"
            checked={is_private}
          /><br />
          is_exclusive
          <input
            onChange={e => this.setState({is_exclusive: !is_exclusive})}
            type="checkbox"
            checked={is_exclusive}
          /><br />
        </div>
        <Mutation
          mutation={POST_MUTATION}
          variables={{ subject_quark_id, object_quark_name, gluon_type_id, prefix, relation, suffix,
                       start, end, start_accuracy, end_accuracy, is_momentary, url, is_private, is_exclusive }}
          onCompleted={() => this.props.history.push(`/quark/${subject_quark_id}`)}
          update={(store, { data: { createGluon } }) => {
            // const first = QUARKS_PER_PAGE
            // const skip = 0
            // const orderBy = 'created_at'
            // const data = store.readQuery({
            //   query: QUARKS_QUERY,
            //   variables: { first, skip, orderBy }
            // })
            // data.quarks.unshift(createGluon)
            // store.writeQuery({
            //   query: QUARKS_QUERY,
            //   data,
            //   variables: { first, skip, orderBy }
            // })
          }}
        >
          {postMutation => <button onClick={postMutation}>Submit</button>}
        </Mutation>

      </div>
    )
  }
}

export default withApollo(AddGluon)
