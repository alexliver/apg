import React from 'react';
import ReactDOM from 'react-dom';
import PostView from './post/postView.jsx';
import CategoryView from './post/categoryView.jsx';
import MainView from './main/mainView.jsx';
import { Router, Route, Link } from 'react-router'
const routes = (
  <Route path="/" component={MainView}>
    <Route path="post/:postID" component={PostView}/>
    <Route path="category/:categoryID" component={CategoryView}/>
  </Route>
)

export default routes;

