'use strict'
// Default layout template
const React = require('react');

const Default = React.createClass({

  render: function() {

    return(
      <html>
        <head>
          <meta charSet="utf-8"></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
          <title>OK Candidate - Administrator Login</title>
        </head>

        <body>
          <h1>Admin Login Screen</h1>
            <div id="app"></div>
            <script src="/js/bundle.js"></script>
        </body>
      </html>
    );
  }
});

module.exports = Default;

