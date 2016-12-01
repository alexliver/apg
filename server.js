require('babel-core/register')({
  presets: ['es2015', 'react']
});
global.navigator = { userAgent: 'all' };
var http = require('http'),
    browserify = require('browserify'),
    literalify = require('literalify'),
    React = require('react'),
    ReactDOMServer = require('react-dom/server'),
    DOM = React.DOM, body = DOM.body, div = DOM.div, script = DOM.script,
    // This is our React component, shared by server and browser thanks to browserify
    App = (require('./app.jsx'))
var ReactRouter = require('react-router');
var match = ReactRouter.match;
var RouterContext = ReactRouter.RouterContext;
var routes = require('./routes.jsx').default
var fs = require( 'fs');
var setUserAgent = require('./util.jsx').setUserAgent;


// Just create a plain old HTTP server that responds to two endpoints ('/' and
// '/bundle.js') This would obviously work similarly with any higher level
// library (Express, etc)
http.createServer(function(req, res) {
  setUserAgent(req.headers['user-agent']);
  if (req.url == "/dist/index.bundle.js" ) {
    res.setHeader('Content-Type', 'text/javascript')

    /*
    browserify()
      .add('./browser.js')
      .transform("babelify", {presets: ["es2015", "react"]})
      .bundle()
      .pipe(res)
    */
    fs.readFile(`.${req.url}`, (err, data) => {
      res.end (data);
    });
  } else if (req.url.indexOf('/css/') == 0) {
    fs.readFile(`.${req.url}`, (err, data) => {
      res.end (data);
    });
  } else {
    match({ routes: routes, location: req.url }, (error, redirectLocation, renderProps) => {
      console.log(req.url);
      if (error) {
        //res.status(500).send(error.message)
        res.statusCode = 500;
        res.end();
      } else if (redirectLocation) {
        //res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        res.writeHead(302, {
          'Location': redirectLocation.pathname + redirectLocation.search
        });
        res.end();
      } else if (renderProps) {
        // You can also check renderProps.components or renderProps.routes for
        // your "not found" component or route respectively, and send a 404 as
        // below, if you're using a catch-all route.
        //res.status(200).send(renderToString(RouterContext (renderProps)))
        var app = React.createFactory(RouterContext)(renderProps);
        res.end (createPage(ReactDOMServer.renderToString(app)));
      } else {
        res.statusCode = 404;
        res.end();
      }
    });
  }
}).listen(9000, function(err) {
  if (err) throw err
  console.log('Listening on 9000...')
})


// A utility function to safely escape JSON for embedding in a <script> tag
function safeStringify(obj) {
  return JSON.stringify(obj)
    .replace(/<\/(script)/ig, '<\\/$1')
    .replace(/<!--/g, '<\\!--')
    .replace(/\u2028/g, '\\u2028') // Only necessary if interpreting as JS, which we do
    .replace(/\u2029/g, '\\u2029') // Ditto
}

function createPage(html) {
  return `
  <!doctype html>
  <html>
    <head>
      <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, user-scalable=no" />
      <meta name="robots" content="noindex, nofollow" />
      <meta name="googlebot" content="nosnippet, nofollow" />
      <meta name="google" content="notranslate" />
      <title>My Universal App</title>
      <link href="/css/master.css" rel="stylesheet"/>
    </head>
    <body>
      <div id="app"><div>${html}</div></div>
      <script src="/dist/index.bundle.js" type="text/javascript" ></script>
    </body>
  </html>
  `
}
