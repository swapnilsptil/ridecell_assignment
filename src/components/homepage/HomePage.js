/**
* Created on 01/09/19.
* Author : Swapnil Patil
* Details :  Home Page for User
*/

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setUserData } from '../../redux/actions/Actions';
import { bindActionCreators } from 'redux';
import { API } from './../../util/Service';
import withReduxStore from './../../util/withReduxStore';
import RideCellMap from '../maps/Maps';
import './HomePage.scss';

/**
* HomePage function.
* @function HomePage
* @description React functional component to render HomePage component
*/
const HomePage = ({ userdata, history }) => {

    const [showMenu, setShowMenu] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    /**
    * @method HomePage#useEffect
    * @description React useEffect hook to for HomePage functional Component
    * @param {} {}
    **/
    useEffect(() => {

        API.getUser(userdata)
            .then(res => setUserInfo(res.data))
            .catch(error => console.log(error));

    }, [userdata])

    /**
    * getIntials function 
    * @method HomePage#getIntials
    * @description Function returns initials of Logged in user.
    */
    const getIntials = (person) => person.substring(0, 2).toUpperCase();

    /**
    * resetPassword function 
    * @method HomePage#resetPassword
    * @description Function to reset resetPassword of logged in user
    */
    const resetPassword = () => {
        let param = { email: userInfo.email }
        API.resetPassword(param)
            .then(res => {
                alert(res.data.message);
            })
            .catch(error => {
                console.log(error);
            });
    }

    /**
    * getLastAccessedData function 
    * @method HomePage#getLastAccessedData
    * @description Function to get Last Accessed time of logged user.
    */
    const getLastAccessedData = (lastAccessedDate) => {
        let today = new Date();
        let lastAccessed = new Date(lastAccessedDate);
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        let compDate = new Date(lastAccessed.getFullYear(), lastAccessed.getMonth(), lastAccessed.getDate());
        let diff = today.getTime() - compDate.getTime();
        if (compDate.getTime() === today.getTime()) {
            return "Today";
        } else if (diff <= (24 * 60 * 60 * 1000)) {
            return "Yesterday";
        } else {
            return compDate.toDateString();
        }
    }

    /**
    * getAge function 
    * @method HomePage#getAge
    * @description Function to get age of user account.
    */
    const getAge = () => {
        let createDate = new Date(userInfo.created_at);
        let todayDate = new Date();
        return Math.floor((Date.UTC(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate()) - Date.UTC(createDate.getFullYear(), createDate.getMonth(), createDate.getDate())) / (1000 * 60 * 60 * 24));
    }

    /**
    * getAge function 
    * @method HomePage#getAge
    * @description Function to logout user.
    */
    const logout = () => {
        setUserData({});
        history.push('/');
    }

    /**
    * return function 
    * @method HomePage#return
    * @description returning HomePage functional component.
    */
    return (
        <div className="home-page">
            {
                Object.entries(userInfo).length > 0 ?
                    <div className="home-container">
                        <div className="home-container-title">
                            <span>User Home Page</span>
                            <span>Welcome {userInfo.display_name} </span>
                            <RideCellMap />
                        </div>
                        <div className={`home-user-button ${showMenu ? 'home-show-menu' : ''}`} onClick={() => setShowMenu(!showMenu)}>
                            <span className="home-user-initial">
                                {getIntials(userInfo.display_name)}
                            </span>
                        </div>
                        {
                            showMenu ?
                                <div className="home-sidebar">
                                    <div className="home-sidebar-title">
                                        Display Name
                                        <span className="home-sidebar-displayname">{userInfo.email}</span>
                                    </div>
                                    <div className="home-account-age">
                                        <span className="home-account-age-title">Account Age</span>
                                        <span className="home-sidebar-age">{getAge() < 2 ? `${getAge()} Day` : `${getAge()} Days`}</span>
                                    </div>
                                    <div className="home-account-security">
                                        Security
                                        <div className="home-account-security-content">
                                            <span className="home-account-securit-title">Last update : </span>
                                            <span className="home-sidebar-securit">{getLastAccessedData(userInfo.updated_at)}</span>
                                        </div>
                                    </div>
                                    <div className="home-links">
                                        <p className="home-recent-links" onClick={resetPassword}>Reset Password</p>
                                        <p className="home-logout-links" onClick={logout}>Logout</p>
                                    </div>
                                </div>
                                :
                                ''
                        }
                    </div>
                    :
                    <div className="loading"></div>
            }
        </div>
    );
}

/**
* constant mapDispatchToProps
* @method HomePage#mapDispatchToProps
* @description constant to bind all react actions. 
*/
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setUserData,
    }, dispatch);
}

/**
* constant mapStateToProps
* @method HomePage#mapStateToProps
* @description constant to bind state to props. 
*/
const mapStateToProps = state => ({
    userdata: state.user.userdata
});

export default withReduxStore(connect(mapStateToProps, mapDispatchToProps)(HomePage));