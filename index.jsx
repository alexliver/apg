import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PostView from './post/postView.jsx';
import MainView from './main/mainView.jsx';
import { Router, Route, Link , browserHistory, hashHistory} from 'react-router'

ReactDOM.render((
  <MuiThemeProvider>
    <Router history={hashHistory}>
      <Route path="/" component={MainView}>
      </Route>
      <Route path="/post/:postID" component={PostView}/>
    </Router>
  </MuiThemeProvider>
),document.getElementById('app'));

