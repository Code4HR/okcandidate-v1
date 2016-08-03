import React, { Component, PropTypes } from 'react'

import {
  Input
} from 'react-bootstrap'

import Card from './../atoms/Card.jsx'

class NewRaceForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      raceName: '',
      selectedCity: 1,
      cities: [
        {
          id: 1,
          name: 'Virginia Beach'
        },
        {
          id: 2,
          name: 'Chesapeake'
        },
        {
          id: 3,
          name: 'Suffolk'
        }
      ],
      selectedSubdivisions: [],
      subdivisions: [
        {
          id: 1,
          name: 'Subdivision A'
        },
        {
          id: 2,
          name: 'Subdivision B'
        },
        {
          id: 3,
          name: 'Subdivision C'
        },
        {
          id: 4,
          name: 'Subdivision D'
        }
      ]
    }
  }

  setRaceName(event){
    const name = event.target.value
    this.setState({raceName: name})
  }

  setCity(event){
    const id = event.target.value
    this.setState({selectedCity: id})
  }

  selectSubdivision(subdivision){
    const id = subdivision.id
    const exists = this.state.selectedSubdivisions.find(subdivisionId => subdivisionId === id)
    if (exists) {
      this.setState({
        selectedSubdivisions: this.state.selectedSubdivisions.filter(subdivisionId => subdivisionId !== id)
      })
    }
    else {
      this.setState({
        selectedSubdivisions: [
          ...this.state.selectedSubdivisions,
          id
        ]
      })
    }
  }

  isSelected(subdivision) {
    const id = subdivision.id
    return this.state.selectedSubdivisions.find(subdivisionId => subdivisionId === id)
  }

  render(){
    return (
      <Card>
        <h2>New Race</h2>
        <div className="pure-g">
          <div className="pure-u-3-5 column">
            <Input
              type="text"
              label="Name"
              placeholder="Mayoral Race"
              value={this.state.raceName}
              onChange={this.setRaceName.bind(this)}>
            </Input>
            <Input
              type="select"
              label="City"
              placeholder="Virginia Beach"
              value={this.state.selectedCity}
              onChange={this.setCity.bind(this)}>
              {
                this.state.cities.map(city => {
                  return (
                    <option value={city.id}>{city.name}</option>
                  )
                })
              }
            </Input>
          </div>
          <div className="pure-u-2-5 column">
            <label>Subdivision</label>
            {
              this.state.subdivisions.map(subdivision => {
                return (
                  <Input
                    checked={this.isSelected.call(this, subdivision)}
                    onChange={this.selectSubdivision.bind(this, subdivision)}
                    type="checkbox"
                    label={subdivision.name} >
                  </Input>
                )
              })
            }
          </div>
        </div>
      </Card>
    )
  }
}

export default NewRaceForm
