import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import NotFoundPage from "./pages/NotFoundPage";

import './App.css';

function App() {
    return (
        <div className="App">
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            </nav>
            <header id="header" className="App-header">
                <Switch>
                    <Route path="/about" component={AboutPage} />
                    <Route path="/" exact component={HomePage} />
                    <Route path="*" component={NotFoundPage} />
                </Switch>
            </header>
        </div>
    );
}

export default App;
