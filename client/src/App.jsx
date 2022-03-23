import React from "react";
import Dashboard from "./Dashboard";
import Login from "./Login";
import { Container } from  "./styles/App.styles";

const App = () => {
    //urlsearchparams.get returns first value associated with search param
    const code = new URLSearchParams(window.location.search).get("code")
    //conditionally rendering either login or dashboard based on the value of code fetched from urlparams
    return <Container>{code ? <Dashboard code={code} /> : <Login />}</Container>
};

export default App;