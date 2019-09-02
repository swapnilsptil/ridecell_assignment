/**
* Created on 01/09/19.
* Author : Swapnil Patil
* Details : Redux reducer for app
*/

import {  SET_USER_DATA } from '../../util/Const';

export default function UserReducer(state = {}, action) {
  switch (action.type) {
    case SET_USER_DATA:
      state.userdata = action.payload;
      return {...state};
    default:
      return state
  }
}