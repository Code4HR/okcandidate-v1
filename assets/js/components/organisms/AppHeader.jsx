import React, { Component } from 'react'

const style = {
  container: {
    height: 54,
    background: 'white',
    display: 'flex',
    padding: '0 1em',
    alignItems: 'center',
    marginBottom: '1em'
  },
  logo: {
    backgroundImage: 'url("/img/okcandidate-logo.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: 42,
    width: 200
  }
}

class AppHeader extends Component {

  render() {
    return (
      <header style={style.container}>
        <a href="/">
          <div style={style.logo}></div>
        </a>
      </header>
    )
  }

}

AppHeader.propTypes = {}

export default AppHeader
