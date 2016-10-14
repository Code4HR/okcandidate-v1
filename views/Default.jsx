'use strict'
// Default layout template
const React = require('react');

const Default = React.createClass({

  getInitialState: function() {
    return {
        tags: [
        {name: "description", content: "lorem ipsum dolor"},
        {itemProp: "name", content: "The Name or Title Here"},
        {itemProp: "description", content: "This is the page description"},
        {itemProp: "image", content: "http://www.example.com/image.jpg"},
        {name: "twitter:card", content: "product"},
        {name: "twitter:site", content: "@publisher_handle"},
        {name: "twitter:title", content: "Page Title"},
        {name: "twitter:description", content: "Page description less than 200 characters"},
        {name: "twitter:creator", content: "@author_handle"},
        {name: "twitter:image", content: "http://www.example.com/image.html"},
        {name: "twitter:data1", content: "$3"},
        {name: "twitter:label1", content: "Price"},
        {name: "twitter:data2", content: "Black"},
        {name: "twitter:label2", content: "Color"},
        {property: "og:title", content: "Title Here"},
        {property: "og:type", content: "article"},
        {property: "og:url", content: "http://www.example.com/"},
        {property: "og:image", content: "http://example.com/image.jpg"},
        {property: "og:description", content: "Description Here"},
        {property: "og:site_name", content: "Site Name, i.e. Moz"},
        {property: "og:price:amount", content: "15.00"},
        {property: "og:price:currency", content: "USD"},
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
