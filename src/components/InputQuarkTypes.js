import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { QUARK_TYPES_QUERY } from './QuarkTypes'

class InputQuarkTypes extends Component {
  state = {
    value: '',
  }

  _onChange = (e) => {
    this.setState({value: e.target.value})
    this.props.onChange(e.target.value)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.defaultValue && !prevState.value) {
      nextProps.onChange(nextProps.defaultValue)
      return { value: nextProps.defaultValue }
    }
    return null
  }

  render() {
    return (
      <Query query={QUARK_TYPES_QUERY} variables={{ orderBy: 'id' }}>
        {({ loading, error, data }) => {
           if (loading) return 'Loading'
           if (error) return 'Error'
           if (data.quarkTypes.length === 0) return 'No Data for this Selectbox'
           
           return (
           <select defaultValue={this.props.defaultValue} onChange={this._onChange}>
             {data.quarkTypes.map((quark_type, index) => (
               <option key={quark_type.id} value={quark_type.id}>{quark_type.name}</option>
             ))}
           </select>
           )
        }}
      </Query>
    )
  }
}
export default InputQuarkTypes
