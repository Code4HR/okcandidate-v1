import React, { Component, PropTypes } from 'react'
import {
  connect
} from 'react-redux'

import {
  Col,
  Grid,
  Row
} from 'react-bootstrap'

import colors from './../style/colors'
import Card from './../atoms/Card.jsx'

import WardFinder from './../organisms/WardFinder.jsx'

const style = {
  header: {
    background: colors.darkBlue,
    padding: '3em 3em 0em 3em',
    textAlign: 'center'
  },
  heading: {
    color: 'white'
  },
  card: {
    position: 'relative',
    top: '2em'
  },
  marketingContainer: {
    paddingTop: '2em'
  }
}

class WardFinderPage extends Component {

  render() {
    return (
      <article>

        <section style={style.header}>
          <div className="container">
            <Grid>
              <Row>
                <Col xs={12} sm={8} smOffset={2}>
                  <header>
                    
                    <h1 style={style.heading}>Candidates Near You Want Your Vote!</h1>
                  </header>
                </Col>
              </Row>

              <Row>
                <Col xs={12} sm={6} smOffset={3}>
                  <Card style={style.card}>
                    <p>We can find candidates near you using your street address.</p>
                    <WardFinder
                      ward={this.props.ward}
                      dispatch={this.props.dispatch} />
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
                <Col xs={12} sm={4}>
                  <h2>Marketing Column 1</h2>
                </Col>
                <Col xs={12} sm={4}>
                  <h2>Marketing Column 2</h2>
                </Col>
                <Col xs={12} sm={4}>
                  <h2>Marketing Column 3</h2>
                </Col>
              </Row>
            </Grid>

          </div>
        </section>

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
