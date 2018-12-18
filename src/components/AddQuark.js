import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { FEED_QUERY } from './Quarks'
import { QUARKS_PER_PAGE } from '../constants'

const POST_MUTATION = gql`
  mutation PostMutation(
    $name: String!,
    $image_path: String,
    $description: String,
    $url: String
  ) {
    createQuark(
      name: $name
      image_path: $image_path
      description: $description
      url: $url
    ) {
      id
      createdAt
      url
      description
    }
  }  
`

// start = models.DateField(null=True,blank=True)
// end = models.DateField(null=True,blank=True)
// start_accuracy = models.CharField(max_length=10,blank=True)
// end_accuracy = models.CharField(max_length=10,blank=True)
// is_momentary = models.BooleanField(default=False,blank=True)
// affiliate = models.URLField(blank=True)

// is_private = models.BooleanField(default=False,blank=True)
// is_exclusive = models.BooleanField(default=True,blank=True)

// posted_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, related_name='posted_quarks', on_delete=models.CASCADE)
// last_modified_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, related_name='modified_quarks', on_delete=models.CASCADE)
// quark_type = models.ForeignKey('graphql_api.QuarkType', related_name='quarks', on_delete=models.CASCADE)


class AddQuark extends Component {
  state = {
    name: '',
    image_path: '',
    description: '',
    // start: '',
    // end: '',
    start_accuracy: '',
    end_accuracy: '',
    // is_momentary: false,
    url: '',
    affiliate: '',
    // is_private: false,
    // is_exclusive: true,
    // quark_type: '',
  }

  render() {
    const { description, url } = this.state
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={description}
            onChange={e => this.setState({ description: e.target.value })}
            type="text"
            placeholder="A description for the quark"
          />
          <input
            className="mb2"
            value={url}
            onChange={e => this.setState({ url: e.target.value })}
            type="text"
            placeholder="The URL for the quark"
          />
        </div>
        <Mutation
          mutation={POST_MUTATION}
          variables={{ description, url }}


          onCompleted={() => this.props.history.push('/new/1')}
          update={(store, { data: { createQuark } }) => {
            const first = QUARKS_PER_PAGE
            const skip = 0
            const orderBy = 'created_at'
            const data = store.readQuery({
              query: FEED_QUERY,
              variables: { first, skip, orderBy }
            })
            data.quarks.unshift(createQuark)
            store.writeQuery({
              query: FEED_QUERY,
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

export default AddQuark
