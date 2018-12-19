import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { QUARK_PROPERTIES_QUERY } from './QuarkProperties'

class InputQuarkProperties extends Component {
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
      <Query query={QUARK_PROPERTIES_QUERY} variables={{ orderBy: 'id' }}>
        {({ loading, error, data }) => {
           if (loading) return 'Loading'
           if (error) return 'Error'
           if (data.quarkProperties.length === 0) return 'No Data for this Selectbox'
           
           return (
           <select defaultValue={this.props.defaultValue} onChange={this._onChange}>
             {data.quarkProperties.map((quark_property, index) => (
               <option key={quark_property.id} value={quark_property.id}>{quark_property.id}: {quark_property.name}</option>
             ))}
           </select>
           )
        }}
      </Query>
    )
  }
}
export default InputQuarkProperties
