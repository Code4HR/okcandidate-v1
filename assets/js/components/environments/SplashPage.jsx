import React, {Component, PropTypes} from 'react'

class SplashPage extends Component {

  render() {
    const viewStyle = {
      margin: '2%'
    };

    const titleStyle = {
      WebkitTransition: 'all', // note the capital 'W' here
      msTransition: 'all', // 'ms' is the only lowercase vendor prefix
      height: 160,
      border: 'solid red 2px'
    };

    const aboutStyle = {
      border: 'solid blue 2px'
    };

    const teamStyle = {
        border: 'solid green 2px'
    };

    const code4HRStyle = {
      backgroundImage: 'url("/img/code4hr.png")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100%',
      height: 160
    };

    const pilotStyle = {
      backgroundImage: 'url("/img/pilot.jpg")',
      backgroundSize: '100%',
      height: 160
    };

    return (
      <div className="row" style={viewStyle}>
        <div className="row" style={titleStyle}>
          <div className="col-sm-2 col-md-2 col-lg-2"></div>
          <div className="col-sm-12 col-sm-8 col-md-8 col-lg-8">
            <h1>Find out which candidates for local offices match with you.</h1>
          </div>
          <div className="col-sm-2 col-md-2 col-lg-2"></div>
        </div>
        <div className="row" style={aboutStyle}>
          <div className="col-sm-2 col-md-2 col-lg-2"></div>
          <div className="col-sm-12 col-sm-8 col-md-8 col-lg-8">
            <h1>What is this about?</h1>
            <h2>
              OK Candidate is a web app for matching voters with candidates for local offices.
            </h2>
            <hr/>
            <h2>Problem</h2>
            <hr/>
            <p>Lorem ipsum</p>
            <h2>Solution</h2>
            <hr/>
            <p>Lorem ipsum</p>
            <h2>Background</h2>
            <hr/>
            <p>Lorem ipsum</p>
          </div>
          <div className="col-sm-2 col-md-2 col-lg-2"></div>
        </div>
        <div className="row" style={teamStyle}>
          <div className="row">
            <div className="col-sm-2 col-md-2 col-lg-2"></div>
            <div className="col-sm-12 col-sm-8 col-md-8 col-lg-8">
              <h1>Who's involved?</h1>
            </div>
            <div className="col-sm-2 col-md-2 col-lg-2"></div>
          </div>
          <div className="row">
            <div className="col-sm-1 col-md-1 col-lg-1"></div>
            <div className="col-sm-2 col-md-2 col-lg-2" style={code4HRStyle}>
              Code4HR
            </div>
            <div className="col-sm-3 col-md-3 col-lg-3">
              Candidates
            </div>
            <div className="col-sm-3 col-md-3 col-lg-3">
              Citizens
            </div>
            <div className="col-sm-2 col-md-2 col-lg-2" style={pilotStyle}>
              The Virginian-Pilot
            </div>
            <div className="col-sm-1 col-md-1 col-lg-1"></div>
          </div>
        </div>
      </div>

    )
  }
}

SplashPage.propTypes = {
  splash: PropTypes.object
}

export default SplashPage
