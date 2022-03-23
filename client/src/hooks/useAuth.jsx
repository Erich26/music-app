import { useState, useEffect } from "react";
import axios from "axios";
//useAuth maintains states of accesstoken, refreshtoken, and expiresinvalues
//useAuth is perfect for login,logout,passwordreset,etc... gets current state and rerenders if any changes are made.
const useAuth = code => {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()
//first useeffect hook makes an api call to the login route,sends code value, and retrives the three values maintained here. then clears values for security
    useEffect(() => {
        (async () => {
            try {
                const {
                    data: { access_token, refresh_token, expires_in },
                } = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, {
                    code,
                })
                setAccessToken(access_token)
                setRefreshToken(refresh_token)
                setExpiresIn(expires_in)
                window.history.pushState({}, null, "/")
            } catch {
                window.location = "/"
            }
        })();
    }, [code]);
//second hook makes an api call to refresh route, this is needed because  once expiresin expires our accesstoken is invalid. refresh will fetch a new access token and expires in value
//passes the refreshtoken as the body and assigns new accesstoken and expires in.
    useEffect(() => {
        if(!refreshToken || !expiresIn) return
        const interval = setInterval(async () => {
            try {
                const {
                    data: { access_token, expires_in },
                } = await axios.post(`${process.env.REACT_APP_BASE_URL}/refresh`, {
                    refreshToken,
                })
                setAccessToken(access_token)
                setExpiresIn(expires_in)
            } catch {
                window.location = "/"
            }
        }, (expiresIn - 60) * 1000)

        return () => clearInterval(interval)
    }, [refreshToken, expiresIn])

    return accessToken
};
//this page will return the accesstoken which spotify will use to fetch artists and songs
export default useAuth;