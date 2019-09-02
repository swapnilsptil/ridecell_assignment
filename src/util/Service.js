import axios from 'axios';
import {
    AUTHENTICATE_URL,
    REGISTER_USER,
    PERSONAL_INFO,
    RESET_PASSWORD
} from './Const';

export const API = {
    login: (param) => axios.post(AUTHENTICATE_URL, param),

    signUp: (param) => axios.post(REGISTER_USER, param),

    getUser: (userdata) => {
        return axios.get(`${PERSONAL_INFO}${userdata.person.key}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userdata.authentication_token
                }
            }
        )
    },

    resetPassword: (param) => axios.post(RESET_PASSWORD, param)

}

