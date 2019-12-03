import React from 'react';
import BlogPostList from './BlogPostList';
import { blogPostListFetch } from '../actions/actions';
import { connect } from "react-redux";


const mapStateToProps = state => ({
    ...state.blogPostList
});
const mapDispatchToProps = {
    blogPostListFetch
};

class BlogPostListContainer extends React.Component {
    componentDidMount() {
        setTimeout(this.props.blogPostAdd, 3000);
        setTimeout(this.props.blogPostAdd, 5000);
        setTimeout(this.props.blogPostAdd, 7000);
        this.props.blogPostListFetch();

    }
    render() {
        return (
            <BlogPostList posts={this.props.posts} isFetching={this.props.isFetching} />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPostListContainer);