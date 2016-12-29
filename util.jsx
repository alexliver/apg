var fetch = require('node-fetch');

import config from './config.jsx'
var MobileDetect = require('mobile-detect');

let userAgent = null;
export function setUserAgent(_userAgent) {
  userAgent = _userAgent;
}

export const isMobile = () => {
  if (!userAgent)
    userAgent = eval('window').navigator.userAgent;
  let md = new MobileDetect(userAgent);
  if ( md.mobile())
    return true;
  return false;
}

export function getGlobalState(url) {
  return fetch(config.url + 'category/')
  .then(function(response) {
    return response.json();
  }).then(function(body) {
    return {categories: body};
  });
}


export function getPageState(url) {
  let splitted = url.split('/');
  if (splitted[1] == 'category') {
    const categoryID = parseInt(splitted[2]);
    return fetch(`${config.url}categoryPostList/${categoryID}/`)
    .then(function(response) {
      return response.json();
    }).then(function(body) {
      return {posts: body, loaded: true, categoryID};
    }).then(res => ({
      pageState: res,
      globalState: {}
    }));
  } else if (splitted[1] == 'post') {
    const postID = parseInt(splitted[2]);
    return fetch(`${config.url}post/${postID}/`)
    .then(function(response) {
      return response.json();
    }).then(function(body) {
      return {
        post: body,
        replies: body.replies,
        loaded: true
      };
    }).then(res => ({
      pageState: res,
      globalState: {
        selectedCategoryID: res.post.category.pk
      }
    }));

  }

  return Promise.resolve({});
}

export function getPrePageState() {
  let preloadedState = window.__PRELOADED_PAGE_STATE__;
  if (!preloadedState)
    preloadedState = {};
  window.__PRELOADED_PAGE_STATE__ = null;
  return preloadedState;
}

export function getAuthHeader() {
  return {
    Authorization: "Bearer " + sessionStorage.getItem("token")
  }
}
