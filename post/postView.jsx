import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import PostComponent from './postComponent.jsx';
import createStore from './postCreateStore.jsx'
import { Provider } from 'react-redux'
import {getPrePageState} from '../util.jsx'

let store = null;
export default class PostView extends React.Component {
  constructor(props){
    super(props);
    store = createStore(getPrePageState());
  }

  render () {
    return (
      <Provider store={ store }>
        <PostComponent postID = {this.props.params.postID}  />
      </Provider>
    )
  }
}

