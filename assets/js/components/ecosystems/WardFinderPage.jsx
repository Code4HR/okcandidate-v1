import React, { Component, PropTypes } from 'react'

import {
  connect
} from 'react-redux'

import {
  toggleWardfinderWardDropdown,
  selectGeography
} from './../../redux/survey/survey-actions'

import {
  Col,
  Grid,
  Row,
  Button
} from 'react-bootstrap'
import ReactGA  from 'react-ga'

import Card from './../atoms/Card.jsx'
import WardFinderDropdown from './../organisms/WardFinderDropdown.jsx'
import WardFinderAddress from './../organisms/WardFinderAddress.jsx'
import NeighborhoodTypeahead from './../organisms/NeighborhoodTypeahead.jsx'
import Credits from './../atoms/Credits.jsx'
import colors from './../style/colors.js'

const style = {
  header: {
    padding: '2em 1em 0em 1em',
    textAlign: 'center'
  },
  heading: {
    color: colors.darkBlue,
    fontSize: '2.25em',
    lineHeight: '1.125',
    margin: 0
  },
  card: {
    position: 'relative',
    top: '2em'
  },
  marketingContainer: {
    padding: '4em 0 2em 0',
    marginBottom: '1em',
    backgroundColor: '#ffffff'
  },
  marketingColumns: {
    textAlign: 'center'
  },
  surveyIcon: {
    margin: '0 auto',
    height: 150,
    width: 150,
    backgroundImage: 'url("/img/survey-icons.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain'
  },
  politicianIcon: {
    margin: '0 auto',
    height: 150,
    width: 150,
    backgroundImage: 'url("/img/politician.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain'
  },
  ballotBoxIcon: {
    margin: '0 auto',
    height: 150,
    width: 150,
    backgroundImage: 'url("/img/ballot-box.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain'
  }
}

class WardFinderPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      geolocation: false
    }
  }

  toggleWardDropdown() {
    this.props.dispatch(toggleWardfinderWardDropdown())
  }

  skipGeolocation() {
    this.props.dispatch(selectGeography(1))
    ReactGA.event({
      category: 'Splash',
      action: 'Skipped neighborhood typahead'
    })
  }

  render() {
    return (
      <article>

        <section style={style.header}>
          <Grid>
            <Row>
              <Col xs={12} sm={8} smOffset={2}>
                <header>
                  <h1 style={style.heading}>
                    Find out which candidates for local office are a match for you!
                  </h1>
                </header>
              </Col>
            </Row>

            <Row>
              <Col xs={12} sm={6} smOffset={3}>
                <Card style={style.card}>

                  {
                    this.state.geolocation ?
                    <p>
                      We can find candidates running for office in your area by
                      using any Virginia Beach street address.
                    </p>
                    :
                    <p>
                      Start typing the name of your neighborhood and select it when it appears.
                    </p>
                  }

                  {
                    this.state.geolocation ?
                      <div>
                        <WardFinderAddress
                          ward={this.props.ward}
                          dispatch={this.props.dispatch} />
                        <a onClick={this.toggleWardDropdown.bind(this)}>Other options</a>
                        {
                          this.props.ward.showWardFinderDropdown ?
                          <WardFinderDropdown
                            ward={this.props.ward}
                            dispatch={this.props.dispatch} />
                          :
                          null
                        }
                      </div>
                    :
                      <div>
                        <NeighborhoodTypeahead dispatch={this.props.dispatch} />
                        <Button onClick={this.skipGeolocation.bind(this)}>Skip This</Button>
                      </div>
                  }

                </Card>
              </Col>
            </Row>
          </Grid>
        </section>

        <section style={style.marketingContainer}>
          <Grid>
            <Row>
              <Col xs={12} sm={4} style={style.marketingColumns}>
                <div style={style.surveyIcon}></div>
                <h2>1. Ask</h2>
                <p>Candidates and voters take our survey</p>
              </Col>
              <Col xs={12} sm={4} style={style.marketingColumns}>
                <div style={style.politicianIcon}></div>
                <h2>2. Match</h2>
                <p>We match voters with candidates based on the results</p>
              </Col>
              <Col xs={12} sm={4} style={style.marketingColumns}>
                <div style={style.ballotBoxIcon}></div>
                <h2>3. Vote</h2>
                <p>Voters go to the polls knowing exactly who they want in every office</p>
              </Col>
            </Row>
          </Grid>
        </section>

        <Credits />

      </article>
    )
  }

}

WardFinderPage.propTypes = {
  ward: PropTypes.object,
  dispatch: PropTypes.func
}

export default connect(
  state => ({
    ward: state.survey.ward
  })
)(WardFinderPage)
