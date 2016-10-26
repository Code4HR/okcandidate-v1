import React, { PropTypes, Component } from 'react'
import Select from 'react-select'

import neighborhoods from './../utils/neighborhoodList.js'

import {
  submitNeighborhood
} from './../../redux/survey/survey-actions'

class NeighborhoodFinder extends Component {

  constructor(props) {
    super(props)
  }

  shimNeighborhoods(neighborhoods) {
    return neighborhoods.map(neighborhood => {
      return { value: neighborhood, label: neighborhood }
    })
  }

  submit(selection) {
    this.props.dispatch(submitNeighborhood(selection.value))
  }

  render() {
    return (
      <Select
        clearable={false}
        name="form-field-name"
        options={this.shimNeighborhoods(neighborhoods)}
        onChange={this.submit.bind(this)} />
    )
  }

}

NeighborhoodFinder.propTypes = {
  dispatch: PropTypes.func
}

export default NeighborhoodFinder
