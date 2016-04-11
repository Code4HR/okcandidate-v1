import React, { Component, PropTypes } from 'react'

import {
  connect
} from 'react-redux'

import {
  toggleWardfinderWardDropdown
} from './../../redux/survey/survey-actions'

import {
  Col,
  Grid,
  Row
} from 'react-bootstrap'

import Card from './../atoms/Card.jsx'

import WardFinderDropdown from './../organisms/WardFinderDropdown.jsx'
import WardFinderAddress from './../organisms/WardFinderAddress.jsx'
import Credits from './../atoms/Credits.jsx'

const style = {
  header: {
    // backgroundColor: colors.lightBlue,
    // backgroundImage: 'url("http://www.transparenttextures.com/patterns/60-lines.png")',
    padding: '2em 1em 0em 1em',
    textAlign: 'center'
  },
  heading: {
    color: 'white'
  },
  logo: {
    backgroundImage: 'url("/img/okcandidate-logo.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    width: 300,
    height: 65,
    margin: '0 auto'
  },
  card: {
    position: 'relative',
    top: '2em'
  },
  marketingContainer: {
    padding: '3em 0 2em 0',
    marginBottom: '1em',
    backgroundColor: '#ffffff'
  },
  marketingColumns: {
    textAlign: 'center'
  }
}

class WardFinderPage extends Component {

  constructor(props) {
    super(props)
  }

  toggleWardDropdown() {
    this.props.dispatch(toggleWardfinderWardDropdown())
  }

  render() {
    return (
      <article>

        <section style={style.header}>
          <div className="container">
            <Grid>
              <Row>
                <Col xs={12} sm={8} smOffset={2}>
                  <header>
                    <div style={style.logo}></div>
                    <h1 style={style.heading}>Find out which candidates for local office are a match for you!</h1>
                  </header>
                </Col>
              </Row>

              <Row>
                <Col xs={12} sm={6} smOffset={3}>
                  <Card style={style.card}>
                    <h2>Get Started!</h2>
                    <p>We can find candidates running for office in your area by using any Norfolk street address.</p>
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
                  </Card>
                </Col>
              </Row>

            </Grid>
          </div>
        </section>

        <section style={style.marketingContainer}>
          <div className="container">

            <Grid>
              <Row>
                <Col xs={12} sm={4} style={style.marketingColumns}>
                  <h2>1. Ask</h2>
                  <p>Candidates and voters take our survey</p>
                </Col>
                <Col xs={12} sm={4} style={style.marketingColumns}>
                  <h2>2. Match</h2>
                  <p>We match voters with candidates based on the results</p>
                </Col>
                <Col xs={12} sm={4} style={style.marketingColumns}>
                  <h2>3. Vote</h2>
                  <p>Voters go to the polls knowing exactly who they want in every office</p>
                </Col>
              </Row>
            </Grid>

          </div>
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
