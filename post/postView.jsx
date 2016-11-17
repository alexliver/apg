import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import PostComponent from './postComponent.jsx';
import createStore from './postCreateStore.jsx'
import { Provider } from 'react-redux'

const store = createStore();
export default class PostView extends React.Component {
  render () {
    return (
      <Provider store={ store }>
        <PostComponent postID = {this.props.params.postID} />
      </Provider>
    )
  }
}

