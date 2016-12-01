import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from './routes.jsx'
import { Router, Route, Link , browserHistory, hashHistory} from 'react-router'

injectTapEventPlugin();
const App = () => 
    <Router history={browserHistory} routes={routes}>
    </Router>

export default App;
module.exports = App;
