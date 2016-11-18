import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import PostComponent from './postComponent.jsx';
import createStore from './postCreateStore.jsx'
import { Provider } from 'react-redux'

const store = createStore();
export default class PostView extends React.Component {
  render () {
    /* TODO move the loggedInUserID definition to a parent state */
    const appState = {
      loggedInUserID : 1
    };
    //TODO may not be the best solution
    const mergedStore = Object.assign({}, store, appState);

    return (
      <Provider store={ store }>
        <PostComponent postID = {this.props.params.postID}  />
      </Provider>
    )
  }
}

