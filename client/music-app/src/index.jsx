import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import GlobalStyles from "./styles/globalStyles.styles";
//ReactDOM.render renders a react element into the DOM(document object model) to return a reference to the component. If
//already in a container it will update and only mutate the DOM as necessary to reflect latest react element.
ReactDOM.render(
    <>
    <GlobalStyles />
    <App />
    </>,
    document.getElementById("root")
)