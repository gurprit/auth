/** 
* create a component that will keep track of a users auth state
* then wrap _app.js so that the entire app knows if the user is logged in or not 
**/

import React, {useEffect, useContext} from 'react';
import firebase from '../firebase';
import {Context} from '../context';
import {axiosAuth} from '../actions/axios';
import { setCookie, destroyCookie } from 'nookies';

const FirebaseAuthState = ({children}) => {
    const { dispatch } = useContext(Context);
    
    useEffect(() => {
        return firebase.auth().onIdTokenChanged(async (user) => {
            if (!user) {
                dispatch({
                    type: "LOGOUT",
                });
                destroyCookie(null, 'token');
                setCookie(null, 'token', '', {});
            } else {
            const {token} = await user.getIdTokenResult();
            ///set token the cookie
            destroyCookie(null, 'token');
            setCookie(null, 'token', token, {});
            console.log("TOKEN", token);
   
            /** 
            * send this token to the backend
            **/ 
            axiosAuth.post('/current-user', {}).then((res) => {
                console.log('RES ====>', res); 
                dispatch({
                    type: 'LOGIN', 
                    payload: res.data,
                });
            });
                
            /**    
            * backend will check if the token is valid (using firebase admin tool)
            * if it is verified you get the same user informatrion in the backend too
            * then you can decide to either save this user in your database or update the existing user 
            * then send the user information back to the client
            **/
         
        }
        });
    }, []);

    return <>{children}</>
};

export default FirebaseAuthState;