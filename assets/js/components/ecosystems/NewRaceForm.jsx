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
      selectedSubdivision: '',
      subdivisions: [
        {
          id: 1,
          name: "Subdivision A"
        },
        {
          id: 2,
          name: "Subdivision B"
        },
        {
          id: 3,
          name: "Subdivision C"
        },
        {
          id: 4,
          name: "Subdivision D"
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
    this.setState({selectedSubdivision: id})
  }

  getSelectedSubdivision(subdivision) {
    return this.state.selectedSubdivision === subdivision.id
  }

  render(){
    return (
      <Card>
        <h2>New Race</h2>
        <p>{this.state.raceName}</p>
        <div className="pure-g">
          <div className="pure-u-3-5">
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
          <div className="pure-u-2-5">
            <label>Subdivision</label>
            {
              this.state.subdivisions.map(subdivision => {
                return (
                  <Input
                    checked={this.getSelectedSubdivision.call(this, subdivision)}
                    onClick={this.selectSubdivision.bind(this, subdivision)}
                    type="radio"
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
