import React from 'react';
import createStore from './categoryStore.jsx'
import actions from './categoryActions.jsx'
import {mainActions} from '../globalRedux.jsx'
import PostContentComponent from './postContentComponent.jsx'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import { Link} from 'react-router'
import { hashHistory} from 'react-router'


const store = createStore();

class CategoryComponent extends React.Component {
  componentDidMount() {
    const me = this;
    hashHistory.listen((location) => {
      console.log(`location: ${location.pathname}. action: ${location.action}. categoryID: ${me.props.categoryID}`);
      if (location.action == 'POP')
        me.routeLocationDidUpdate(location);
    });
    this.props.dispatch(mainActions.setIsRoot(true));
    this.props.dispatch(actions.loadCategory(this.props.categoryID))
    this.props.dispatch(mainActions.changeCategory(this.props.categoryID))
  }

  routeLocationDidUpdate() {
    this.props.dispatch(actions.loadCategory(this.props.categoryID))
    this.props.dispatch(mainActions.changeCategory(this.props.categoryID))
  }

  render () {
    const me = this;

    return (
      <div>
        {me.props.posts.map(post => [
          <PostContentComponent writerName={post.writer.username} writerTitle="The Supreme Leader" writerAvatarURL={post.writer.avatar.image}
              title={post.title} content={post.content} />,
          <Link to={`/post/${post.pk}`}>Show comments</Link>
        ])}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    posts: state.posts
  }
}

const ConnectedCategoryComponent = connect(mapStateToProps)(CategoryComponent)


export default class CategoryView extends React.Component {
  render () {
    let categoryID = this.props.categoryID;
    if (!categoryID)
      categoryID = this.props.params.categoryID;
    return (
      <Provider store={ store }>
        <ConnectedCategoryComponent categoryID = {categoryID}  />
      </Provider>
    )
  }
}
