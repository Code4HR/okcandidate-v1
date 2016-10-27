'use strict'
// Default layout template
const React = require('react');

const Default = React.createClass({

  _titlecase: function(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  },
  getInitialState: function() {
    const defaultUrl = "http://okcandidate.code4hr.org";
    const image = this.props.candidate ? `http://okcandidate.code4hr.org/img/candidates/virginiabeach/${this.props.candidate}.jpg` : 'http://okcandidate.code4hr.org/img/ballot-box.png';
    const url = this.props.id ? `http://code4hr.org/results/${id}` : defaultUrl;
    const description = this.props.candidate ? `I got matched with ${this._titlecase(this.props.candidate)}. Who will you match with?`: "Find out which candidates for local office are a match for you!";
    const siteName = "OkCandidate"
    return {
        tags: [
        {name: "description", content: description},
        {itemProp: "name", content: siteName},
        {itemProp: "description", content: description},
        {itemProp: "image", content: image},
        {name: "twitter:card", content: siteName},
        {name: "twitter:site", content: url},
        {name: "twitter:title", content: siteName},
        {name: "twitter:description", content: description},
        {name: "twitter:creator", content: "@code4hr"},
        {name: "twitter:image", content: image},
        {property: "og:title", content: siteName},
        {property: "og:type", content: "website"},
        {property: "og:url", content: url},
        {property: "og:image", content: image},
        {property: "og:description", content: description},
        {property: "og:site_name", content: siteName}
    ]}
  },

  render: function() {
    return(
      <html>
        <head>
          <meta charSet="utf-8"></meta>
          {
            this.state.tags.map((tag, index) =>
              <meta data-doc-meta="true" key={index} {...tag} />)
          }
          <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1, user-scalable=no"></meta>
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
