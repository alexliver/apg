import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PostView from './post/postView.jsx';
import CategoryView from './post/categoryView.jsx';
import MainView from './main/mainView.jsx';
import { Router, Route, Link , browserHistory, hashHistory} from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
ReactDOM.render((
  <MuiThemeProvider>
    <Router history={hashHistory}>
      <Route path="/" component={MainView}>
        <Route path="post/:postID" component={PostView}/>
        <Route path="category/:categoryID" component={CategoryView}/>
      </Route>
    </Router>
  </MuiThemeProvider>
),document.getElementById('app'));

