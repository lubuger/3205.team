import React from "react";
import "../styles/App.scss";

import Main from "../pages/main";


class App extends React.Component {
    render() {
        return (
            <div className="App container-fluid">
                <div className="container-fluid">
                    {/*<header className="App-header">*/}
                    {/*    <img src={logo} className="App-logo" alt="logo" />*/}
                    {/*</header>*/}

                    <Main />
                </div>
            </div>
        )
    }
}

export default App
