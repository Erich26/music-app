import React from "react"
import { LoginButton, LoginLink } from "./styles/Login.styles"
//redirected to login on spotify, this page gives us code params which will get the access token
const Login = () => {
    const AUTH_URL= `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`
    //clientid from spotify api must be mentioned here, response type is code and this will be auth code that is exchanged for acces token. redirect uri is one I set in spotify web api it sets where to take user when successful login. scopes are permissions that I ask spotify for.
    return (
        <LoginButton>
            <LoginLink href={AUTH_URL}>Login with Spotify</LoginLink>
        </LoginButton>
    )
}

export default Login