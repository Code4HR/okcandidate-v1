'use strict'
// Default layout template
const React = require('react');

const Default = React.createClass({

  componentDidMount() {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga')

    ga('create', 'UA-39303796-10', 'auto');
    ga('send', 'pageview');
  },

  render: function() {

    return(
      <html>
        <head>
          <meta charSet="utf-8"></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
          <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet"></link>
          <title>OK Candidate</title>
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
