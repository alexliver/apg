import React from 'react';
import createStore from './categoryStore.jsx'
import actions from './categoryActions.jsx'
import PostContentComponent from './postContentComponent.jsx'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import { Link} from 'react-router'


const store = createStore();

class CategoryComponent extends React.Component {
  componentDidMount() {
    this.props.dispatch(actions.loadCategory(this.props.categoryID))
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
