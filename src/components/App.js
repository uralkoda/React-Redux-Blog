import React from 'react';

import { Route, Switch } from 'react-router';
import LoginForm from './LoginForm';
import BlogPostListContainer from './BlogPostListContainer';
import Header from './Header';
import BlogPostContainer from './BlogPostContainer';
import { requests } from '../agent';
import { connect } from 'react-redux';
import { userProfilFetch, userSetId } from '../actions/actions';

const mapStateToProps = state => ({
    ...state.auth
});
const mapDispatchToProps = {
    userProfilFetch,
    userSetId
};
class App extends React.Component {
    constructor(props) {
        super(props);
        const token = window.localStorage.getItem('jwtToken');
        if (token) {
            requests.setToken(token);
        }
    }
    componentDidMount() {
        const userId = window.localStorage.getItem('userId');
        const { userSetId } = this.props;
        if (userId) {
            userSetId(userId);
        }
    }
    componentDidUpdate(prevProps) {
        console.log(this.props);
        const { userId, userData, userProfilFetch } = this.props;
        console.log('conponent did update ' + userId + ' ' + prevProps.userId);
        if (prevProps.userId !== userId && userId !== null && userData === null) {
            console.log(`old user id ${prevProps.userId}`);
            console.log(`old user id ${userId}`);
            userProfilFetch(userId);
        }
    }
    render() {
        const { isAuthenticated, userData } = this.props;
        console.log(this.props);
        console.log("from app" + isAuthenticated);
        return (
            <div>
                <Header isAuthenticated={isAuthenticated} userData={userData} />
                <Switch>
                    <Route path="/login" component={LoginForm} />
                    <Route path="/blog-post/:id" component={BlogPostContainer} />
                    <Route path="/" component={BlogPostListContainer} />

                </Switch>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);