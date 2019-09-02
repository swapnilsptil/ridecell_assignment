/**
* Created on 01/09/19.
* Author : Swapnil Patil
* Details : AppContainer functional component
*/

import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import withReduxStore from './../../util/withReduxStore';
import { connect } from 'react-redux';
import Login from './../login/Login';
import SignUp from './../signup/SignUp';
import HomePage from './../homepage/HomePage';

/**
* ProtectedRoute constant.
* @function ProtectedRoute
* @description Protected route to check authentic user. 
*/
const ProtectedRoute = ({ isAllowed, ...props }) => isAllowed ? <Route {...props} /> : <Redirect to="/" />;

/**
* AppContainer function.
* @function AppContainer
* @description React functional component to render AppContainer component
*/
const AppContainer = ({ userdata }) => {
    return (
        <BrowserRouter>
            <div>
                <Route exact path="/" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <ProtectedRoute isAllowed={userdata && userdata.authentication_token} exact path="/user" component={HomePage} />
            </div>
        </BrowserRouter>
    );
}

/**
* constant mapStateToProps
* @method AppContainer#mapStateToProps
* @description constant to bind all react actions. 
*/
const mapStateToProps = state => ({
    userdata: state.user.userdata
});

export default withReduxStore(connect(mapStateToProps)(AppContainer));