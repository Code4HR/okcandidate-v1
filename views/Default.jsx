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
          <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet"></link>
          <title>OK Candidate</title>
          <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png"></link>
          <link rel="icon" type="image/png" href="/icons/favicon-32x32.png" sizes="32x32"></link>
          <link rel="icon" type="image/png" href="/icons/favicon-16x16.png" sizes="16x16"></link>
          <link rel="manifest" href="/icons/manifest.json"></link>
          <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#fc3453"></link>
          <link rel="shortcut icon" href="/icons/favicon.ico"></link>
          <meta name="msapplication-config" content="/icons/browserconfig.xml"></meta>
          <meta name="theme-color" content="#ffffff"></meta>
        </head>

        <body>
          <div id="app"></div>
          <script src="/js/bundle.js"></script>
        </body>
      </html>
    );
  }
});

module.exports = Default;
