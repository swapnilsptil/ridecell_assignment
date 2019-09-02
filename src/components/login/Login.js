/**
* Created on 01/09/19.
* Author : Swapnil Patil
* Details :  Login Page
*/

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUserData } from '../../redux/actions/Actions';
import { API } from './../../util/Service';
import withReduxStore from './../../util/withReduxStore';
import './Login.scss';

/**
* Login function.
* @function Login
* @description React functional component to render Login component
*/
const Login = ({ history, setUserData }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginProgress, setLoginProgress] = useState({})
    const [passwordVisible, setPasswordVisible] = useState(true)

    /**
    * onLogin function 
    * @method Login#onLogin
    * @description Function to call API for login
    */
    const onLogin = () => {

        let param = { "email": username, "password": password };
        setLoginProgress({ progress: true })
        API.login(param)
            .then(res => {
                setUserData(res.data);
                setLoginProgress({ progress: false })
                history.push('/user');
            })
            .catch(error => {
                setLoginProgress({ progress: false, error: error.response.data.message })
                console.log(error);
            });

    }

    /**
    * return function 
    * @method Login#return
    * @description returning Login functional component.
    */
    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-container-title">
                    <span>Welcome!</span>
                    <span>Please Login to continue.</span>
                </div>
                <div className="login-container-input">
                    <input placeholder="Email"
                        onChange={(e) => setUsername(e.target.value)}
                        className="login-email" />
                        
                    <div className="login-password-container">
                        <input type={passwordVisible ? 'password' : 'text'}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="login-password" />

                        <span alt="password_toggle"
                            className="toggle-password"
                            onClick={() => setPasswordVisible(!passwordVisible)} />
                    </div>

                    {loginProgress && loginProgress.error ? <p className="login-error">{loginProgress.error}</p> : ''}

                    <button className="login-button" onClick={onLogin}>Login</button>
                    <button className="signup-button" onClick={() => history.push(`/signup`)}>Sign Up</button>
                </div>
            </div>
            {loginProgress && loginProgress.progress ? <div className="loading"></div> : ''}
        </div>
    );
}

/**
* constant mapDispatchToProps
* @method Login#mapDispatchToProps
* @description constant to bind all react actions. 
*/
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setUserData
    }, dispatch);
}

/**
* constant mapStateToProps
* @method Login#mapStateToProps
* @description constant to bind state to props. 
*/
const mapStateToProps = state => ({
    userdata: state.userdata
});

export default withReduxStore(connect(mapStateToProps, mapDispatchToProps)(Login));
