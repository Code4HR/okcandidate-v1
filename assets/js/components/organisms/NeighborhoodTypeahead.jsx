import React, { PropTypes, Component } from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import ReactGA from 'react-ga'

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
    ReactGA.event({
      category: 'Splash',
      action: 'Used neighborhood typeahead'
    })
    this.props.dispatch(submitNeighborhood(selection.value))
  }

  render() {
    return (
      <Select
        style={{marginBottom: '.5em'}}
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
