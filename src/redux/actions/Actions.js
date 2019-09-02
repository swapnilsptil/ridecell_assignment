/**
* Created on 01/09/19.
* Author : Swapnil Patil
* Details : Redux actions for app
*/
import { SET_USER_DATA } from './../../util/Const';

export const setUserData = user => (dispatch) => {
    dispatch({
        type: SET_USER_DATA,
        payload: user
    })
}
