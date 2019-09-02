/**
* Created on 01/09/19.
* Author : Swapnil Patil
* Details : SignUp functional component
*/

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUserData } from '../../redux/actions/Actions';
import { API } from './../../util/Service';
import withReduxStore from './../../util/withReduxStore';
import './SignUp.scss';
import {
    SPECIAL_CHARACTER_REGEX,
    UPPER_CASE_REGEX,
    NUMBER_REGEX,
    EMAIL_REGEX
} from '../../util/Const';


/**
* SignUp function.
* @function SignUp
* @description React functional component to render SignUp component
*/
const SignUp = ({ history, setUserData }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [match, setMatch] = useState(true);
    const [charNumberValid, setCharNumberValid] = useState(false);
    const [specialCharValid, setSpecialCharValid] = useState(false);
    const [uppercaseValid, setUppercaseValid] = useState(false);
    const [numberValid, setNumberValid] = useState(false);
    const [loginProgress, setLoginProgress] = useState({})

    /**
    * checkPasswordLength function 
    * @method SignUp#checkPasswordLength
    * @description Function to check password length
    */
    const checkPasswordLength = (password) => {
        password.length >= 8 ? setCharNumberValid(true) : setCharNumberValid(false);
    }

    /**
    * checkSpecialCharacters function 
    * @method SignUp#checkSpecialCharacters
    * @description Function to check special character in password
    */
    const checkSpecialCharacters = (password) => {
        return SPECIAL_CHARACTER_REGEX.test(password) ? setSpecialCharValid(true) : setSpecialCharValid(false);
    }

    /**
    * checkUppercase function 
    * @method SignUp#checkUppercase
    * @description Function to check uppercase character in password
    */
    const checkUppercase = (password) => {
        return UPPER_CASE_REGEX.test(password) ? setUppercaseValid(true) : setUppercaseValid(false);
    }

    /**
    * checkNumber function 
    * @method SignUp#checkNumber
    * @description Function to check number in password
    */
    const checkNumber = (password) => {
        return NUMBER_REGEX.test(password) ? setNumberValid(true) : setNumberValid(false);
    }

    /**
    * validateEmail function 
    * @method SignUp#validateEmail
    * @description Function to validate email format
    */
    const validateEmail = (email) => {
        // let pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g;
        setEmail(email);
        return EMAIL_REGEX.test(email) ? setValidEmail(true) : setValidEmail(false);
    }

    /**
    * validateEmail function 
    * @method SignUp#validateEmail
    * @description Function to validate password
    */
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);

        checkPasswordLength(event.target.value);
        checkSpecialCharacters(event.target.value);
        checkUppercase(event.target.value);
        checkNumber(event.target.value);
    }

    /**
    * handleConfirmPasswordChange function 
    * @method SignUp#handleConfirmPasswordChange
    * @description Function to set confirm password field.
    */
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    /**
    * comparePassword function 
    * @method SignUp#comparePassword
    * @description Function to compare password
    */
    const comparePassword = () => {
        password === confirmPassword ? setMatch(true) : setMatch(false);
    }

    /**
    * registerUser function 
    * @method SignUp#registerUser
    * @description Function to create new user
    */
    const registerUser = () => {

        let param = { "email": email, "display_name": username, "password": password };
        setLoginProgress({ progress: true })
        API.signUp(param)
            .then(res => {
                setUserData(res.data);
                setLoginProgress({ progress: false })
                history.push('/user');
            })
            .catch(error => {
                setLoginProgress({ progress: false, error: error.response.data.message })
            });

    }

    /**
    * return function 
    * @method SignUp#return
    * @description returning SignUp functional component.
    */
    return (
        <div className="signup-page">
            <div className="login-container">
                <div className="login-container-title">
                    <span>Please tell us a little about you!</span>
                </div>
                <div className="login-container-input">
                    <input placeholder="Display Name"
                        onChange={(e) => setUsername(e.target.value)}
                        className="login-email" />

                    <input placeholder="Email"
                        type="email"
                        onChange={(e) => validateEmail(e.target.value)}
                        className="login-email" />
                    {
                        email && !validEmail ?
                            <div className="validator email">
                                <p className="validation-item">Enter Valid Email</p>
                            </div>
                            : ''
                    }

                    <input type='password'
                        placeholder="Password"
                        onChange={(e) => handlePasswordChange(e)}
                        className="login-password" />

                    <input type='password'
                        placeholder="Password Again"
                        onChange={(e) => handleConfirmPasswordChange(e)}
                        onBlur={comparePassword}
                        className={`login-password ${match === false ? 'error' : ''}`}
                    />

                    {!match && confirmPassword ? <p className="login-error">Passwords are not match !! Please reenter</p> : ''}

                    <button className="signup-button"
                        disabled={!match || !username || !email || !password || !confirmPassword}
                        onClick={registerUser}>Sign Up</button>

                    <button className="login-button" onClick={() => history.push('/')}>Login</button>
                    {loginProgress && loginProgress.error ? <p className="login-error">{loginProgress.error}</p> : ''}
                    <div className="validation">
                        Password Criteria :
                        <div className={`validator ${charNumberValid ? "success" : "error"}`}>
                            <p className="validation-item">8-20 characters</p>
                        </div>
                        <div className={`validator ${specialCharValid ? "success" : "error"}`}>
                            <p className="validation-item">1 special character</p>
                        </div>
                        <div className={`validator ${uppercaseValid ? "success" : "error"}`}>
                            <p className="validation-item">1 uppercase letter</p>
                        </div>
                        <div className={`validator ${numberValid ? "success" : "error"}`}>
                            <p className="validation-item">1 number</p>
                        </div>
                    </div>
                </div>
            </div>
            {loginProgress && loginProgress.progress ? <div className="loading"></div> : ''}
        </div>
    );
}

/**
* constant mapDispatchToProps
* @method SignUp#mapDispatchToProps
* @description constant to bind all react actions. 
*/
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setUserData
    }, dispatch);
}

/**
* constant mapStateToProps
* @method SignUp#mapStateToProps
* @description constant to bind state to props. 
*/
const mapStateToProps = state => ({
    login: state.login
});

export default withReduxStore(connect(mapStateToProps, mapDispatchToProps)(SignUp));
