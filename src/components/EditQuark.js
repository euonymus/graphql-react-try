import React, { Component } from 'react'
import { withApollo, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { QUARKS_QUERY } from './Quarks'
import { QUARKS_PER_PAGE } from '../constants'
import InputQuarkTypes from './InputQuarkTypes'

const QUARK_QUERY = gql`
  query QuarkQuery($id: String) {
    quark(id: $id) {
      id
      createdAt
      name
      imagePath
      description
      start
      end
      startAccuracy
      endAccuracy
      isMomentary
      url
      affiliate
      isPrivate
      isExclusive
      quarkType {
        id
        name
      }
      postedBy {
        id
        username
      }
    }
  }
`

const POST_MUTATION = gql`
  mutation PostMutation(
    $id: String!
    $name: String!,
    $image_path: String,
    $description: String,
    $start: String,
    $end: String,
    $start_accuracy: String,
    $end_accuracy: String,
    $is_momentary: Boolean!,
    $url: String,
    $affiliate: String,
    $is_private: Boolean!,
    $is_exclusive: Boolean!,
    $quark_type_id: Int!,
  ) {
    updateQuark(
      id: $id
      name: $name
      imagePath: $image_path
      description: $description
      start: $start
      end: $end
      startAccuracy: $start_accuracy
      endAccuracy: $end_accuracy
      isMomentary: $is_momentary
      url: $url
      affiliate: $affiliate
      isPrivate: $is_private
      isExclusive: $is_exclusive
      quarkTypeId: $quark_type_id
    ) {
      id
      createdAt
      name
      imagePath
      description
      start
      end
      startAccuracy
      endAccuracy
      isMomentary
      url
      affiliate
      isPrivate
      isExclusive
      quarkType {
        id
        name
      }
      postedBy {
        id
        username
      }
    }
  }  
`
class EditQuark extends Component {
  state = {
    name: '',
    image_path: '',
    description: '',
    start: '',
    end: '',
    start_accuracy: '',
    end_accuracy: '',
    is_momentary: false,
    url: '',
    affiliate: '',
    is_private: false,
    is_exclusive: true,
    quark_type_id: '',
  }

  componentDidMount() {
    this.props.client.query({
      query: QUARK_QUERY,
      variables: { id: this.props.match.params.id }
    }).then(response => {
      const { quark } = response.data
      this.setState({
        name: quark.name,
        image_path: quark.imagePath,
        description: quark.description,
        start: quark.start,
        end: quark.end,
        start_accuracy: quark.startAccuracy,
        end_accuracy: quark.endAccuracy,
        is_momentary: quark.isMomentary,
        url: quark.url,
        affiliate: quark.affiliate,
        is_private: quark.isPrivate,
        is_exclusive: quark.isExclusive,
        quark_type_id: quark.quarkType.id,
      })
    })
  }

  render() {
    const { id } = this.props.match.params
    const { name, image_path, description, start, end, start_accuracy, end_accuracy, is_momentary, url, affiliate,
            is_private, is_exclusive, quark_type_id } = this.state
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={name}
            onChange={e => this.setState({ name: e.target.value })}
            type="text"
            placeholder="A name for the quark"
          />
          <input
            className="mb2"
            value={image_path}
            onChange={e => this.setState({ image_path: e.target.value })}
            type="text"
            placeholder="A image_path for the quark"
          />
          <input
            className="mb2"
            value={description}
            onChange={e => this.setState({ description: e.target.value })}
            type="text"
            placeholder="A description for the quark"
          />
          <input
            className="mb2"
            value={start}
            onChange={e => this.setState({ start: e.target.value })}
            type="date"
            placeholder="A start for the quark"
          />
          <input
            className="mb2"
            value={end}
            onChange={e => this.setState({ end: e.target.value })}
            type="date"
            placeholder="A end for the quark"
          />
          <input
            className="mb2"
            value={start_accuracy}
            onChange={e => this.setState({ start_accuracy: e.target.value })}
            type="text"
            placeholder="A start_accuracy for the quark"
          />
          <input
            className="mb2"
            value={end_accuracy}
            onChange={e => this.setState({ end_accuracy: e.target.value })}
            type="text"
            placeholder="A end_accuracy for the quark"
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
            placeholder="The URL for the quark"
          />
          <input
            className="mb2"
            value={affiliate}
            onChange={e => this.setState({ affiliate: e.target.value })}
            type="text"
            placeholder="The affiliate URL for the quark"
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
          Quark Type: <InputQuarkTypes defaultValue={quark_type_id} onChange={quark_type_id => this.setState( {quark_type_id} )}/>
        </div>
        <Mutation
          mutation={POST_MUTATION}
          variables={{ id, name, image_path, description, start, end, start_accuracy, end_accuracy,
                       is_momentary, url, affiliate,
                       is_private, is_exclusive, quark_type_id }}
          onCompleted={() => this.props.history.push('/quarks/1')}
          update={(store, { data: { updateQuark } }) => {
            const first = QUARKS_PER_PAGE
            const skip = 0
            const orderBy = 'created_at'
            const data = store.readQuery({
              query: QUARKS_QUERY,
              variables: { first, skip, orderBy }
            })
            data.quarks = data.quarks.map( quark => {
              if (quark.id === updateQuark.id) {
                return updateQuark
              }
              return quark
            })
            // data.quarks.unshift(updateQuark)
            store.writeQuery({
              query: QUARKS_QUERY,
              data,
              variables: { first, skip, orderBy }
            })
          }}
        >
          {postMutation => <button onClick={postMutation}>Submit</button>}
        </Mutation>

      </div>
    )
  }
}

export default withApollo(EditQuark)
