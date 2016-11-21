import React from 'react';
import MainComponent from './mainComponent.jsx';
import createStore from './mainCreateStore.jsx'
import { Provider } from 'react-redux'

const store = createStore();
export default class PostView extends React.Component {
  render () {
    return (
      <Provider store={ store }>
        <MainComponent children={this.props.children} />
      </Provider>
    )
  }
}

