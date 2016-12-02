import React from 'react';
import MainComponent from './mainComponent.jsx';
import createStore from './mainCreateStore.jsx'
import { Provider } from 'react-redux'


let store = null;

export default class MainView extends React.Component {
  constructor(props){
    super(props);
    let preloadedState = window.__PRELOADED_GLOBAL_STATE__;
    if (!preloadedState)
      preloadedState = {};
    store = createStore(preloadedState);
  }

  render () {
    return (
      <Provider store={ store }>
        <MainComponent children={this.props.children} />
      </Provider>
    )
  }
}

