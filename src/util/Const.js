/**
* Created on 01/09/19.
* Author : Swapnil Patil
* Details : Constants.
*/

export const SET_USER_DATA = 'SET_USER_DATA';

export const AUTHENTICATE_URL = 'https://blooming-stream-45371.herokuapp.com/api/v2/people/authenticate';
export const PERSONAL_INFO = 'https://blooming-stream-45371.herokuapp.com/api/v2/people/';
export const REGISTER_USER = 'https://blooming-stream-45371.herokuapp.com/api/v2/people/create';
export const RESET_PASSWORD = 'https://blooming-stream-45371.herokuapp.com/api/v2/people/reset_password';

export const SPECIAL_CHARACTER_REGEX = /[!@#$%^&*(),.?":{}|<>]/;
export const UPPER_CASE_REGEX = /[A-Z]/;
export const EMAIL_REGEX = /\S+@\S+\.\S+/;
export const NUMBER_REGEX = /[0-9]/;

export const MARKERS = [
    { "id": 1, "country": "Pune", "info": "Ridecell India ", "longitude": 73.8038, "latitude": 18.5538 },
    { "id": 2, "country": "SFO", "info": "Ridecell Global HQ", "longitude": -122.3986, "latitude": 37.7811 },
    { "id": 3, "country": "Germany", "info": "Ridecell Germany ", "longitude": 11.5720, "latitude": 48.1418 },
    { "id": 4, "country": "France", "info": "Ridecell France",  "longitude": -0.5813, "latitude": 44.8321 }
];