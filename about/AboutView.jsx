import React from 'react';
import Paper from 'material-ui/Paper';
import {mainActions} from '../globalRedux.jsx'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import { Link} from 'react-router'
import {getPrePageState} from '../util.jsx'
import createStore from './aboutStore.jsx'

const style = {
  paddingLeft: 15,
  paddingRight: 15 ,
  paddingBottom: 15 ,
};

class AboutComponent extends React.Component {
  componentDidMount() {
    const me = this;
    this.props.dispatch(mainActions.setIsRoot(true));
    this.props.dispatch(mainActions.goToAboutPage())
    var addScript = document.createElement('script');
    addScript.setAttribute('src', 'https://www.cornify.com/js/cornify.js');
    document.body.appendChild(addScript);
  }

  showCornify() {
    window.cornify_add();
  }

  render () {
    return (
      <Paper style={style}>
        <p>
          I am Alex Yin. I musician and programmer. I did this website to
          <a onClick={this.showCornify.bind(this)}>
            &nbsp;play around&nbsp;
          </a>
          with the latest web technologies 
          and have a place to store my thoughts.
        </p>
        <p>
          <ul>
            <li> <a target="_blank" href="https://www.youtube.com/user/alexliver">My YouTube Page</a></li>
            <li> <a target="_blank" href="https://soundcloud.com/alex-yin">My SoundCloud</a></li>
          </ul>
        </p>
        <p>
          Stuff used when creating this website:
          <ul>
            <li><a target="_blank" href="https://facebook.github.io/react/">
              React JS
            </a></li>
            <li><a target="_blank" href="http://redux.js.org/">
              Redux
            </a></li>
            <li><a target="_blank" href="http://www.material-ui.com/">
              Material UI
            </a></li>
            <li><a target="_blank" href="https://material.io/icons/">
              Material Icons
            </a></li>
            <li><a target="_blank" href="https://webpack.github.io/">
              Webpack
            </a></li>
            <li><a target="_blank" href="https://nodejs.org/">
              Node JS
            </a></li>
            <li><a target="_blank" href="https://www.djangoproject.com/">
              Django
            </a></li>
            <li><a target="_blank" href="http://www.django-rest-framework.org/">
              Django Rest Framework
            </a></li>
            <li><a target="_blank" href="https://www.nginx.com/">
              Nginx
            </a></li>
          </ul>
          <a target="_blank" href="https://github.com/alexliver/apg">Source codes</a>
        </p>
      </Paper>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
  };
}

const ConnectedAboutComponent = connect(mapStateToProps)(AboutComponent)


let store = null;
export default class AboutView extends React.Component {
  constructor(props){
    super(props);
    store = createStore(getPrePageState());
  }

  render () {
    return (
      <Provider store={store}>
        <ConnectedAboutComponent   />
      </Provider>
    )
  }
}
