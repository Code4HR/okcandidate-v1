import React, {Component, PropTypes} from 'react'

class SplashPage extends Component {

  render() {
    const viewStyle = {
      margin: '2%'
    };

    const titleStyle = {
      WebkitTransition: 'all', // note the capital 'W' here
      msTransition: 'all', // 'ms' is the only lowercase vendor prefix
      flex: 1,
      backgroundColor: 'pink',
      border: 'solid lightgrey 4px',
      margin: 2
    };

    const aboutStyle = {
      fontSize: '18',
      flex: 1,
      backgroundColor: 'white',
      border: 'solid lightgrey 4px',
      margin: 2
    };

    const teamStyle = {
      backgroundColor: 'lightblue',
      border: 'solid lightgrey 4px',
      margin: 2
    };

    const candidateStyle = {
      height: 160,
      alignItems: 'center',
      justifyContent: 'center'
    };

    const citizenStyle = {
      height: 160,
      alignItems: 'center',
      justifyContent: 'center'
    };


    const code4HRStyle = {
      backgroundImage: 'url("/img/code4hr.png")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100%',
      marginTop: 20,
      height: 160
    };

    const pilotStyle = {
      backgroundImage: 'url("/img/pilot.jpg")',
      backgroundSize: '70%',
      backgroundRepeat: 'no-repeat',
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
              OK Candidate is a web app for matching voters with candidates for
              local offices.
            </h2>
            <hr/>
            <h2>Problem</h2>
            <hr/>
            <p>Most people don’t know their candidates for local offices.
              Publishing voter guides is laborious and most voters are not going
              to take the time to read them. Even the most engaged voters have
              difficulty determining which candidates to support for some local
              offices.</p>
            <h2>Solution</h2>
            <hr/>
            <p>We propose an app that works like a dating site for matching
               voters with their candidates. This has been done for presidential
               elections but never at the local level, where it is most needed.</p>
            <h2>Background</h2>
            <hr/>
            <p>A common feature of dating sites is the age-old questionnaire. A
               group of users are given a list of questions. Potential
               compatibility between members of the group is calculated based
               on the user’s responses and the level of importance they have
               placed in finding someone who shares their views. We believe the
               same approach can be taken to match candidates with voters.</p>
            <h2>Approach</h2>
            <hr/>
            <p>This is a platform on which:</p>
              <ul>
                <li>News editors create questions</li>
                <li>Candidates answer the questions</li>
                <li>Voters answer the questions</li>
                <li>Voters see which candidates match their answers best</li>
                <li>Candidate see how many respondents line up with them</li>
              </ul>
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

            </div>
            <div className="col-sm-3 col-md-3 col-lg-3" style={candidateStyle}>
              Candidates
            </div>
            <div className="col-sm-3 col-md-3 col-lg-3" style={citizenStyle}>
              Citizens
            </div>
            <div className="col-sm-2 col-md-2 col-lg-2" style={pilotStyle}>

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
