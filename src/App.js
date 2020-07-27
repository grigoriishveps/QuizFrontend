import React from 'react';
import './App.css';
import CreateQuiz from './CreateQuiz';
import AuthenticationWindow from "./AuthenticationWindow";
import PagingQuiz from "./PagingQuiz";
import HistoryQuiz from "./HistoryQuiz";
import {BrowserRouter,  Route, Switch} from 'react-router-dom';
import NavMenu from "./NavMenu";


class App extends React.Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <NavMenu/>
                <header className="App-header" align="center">
                    < Switch >
                        <Route exact path="/" component={PagingQuiz} />
                        <Route path="/new" component={CreateQuiz} />
                        <Route path="/history" component={HistoryQuiz} />
                        <Route path="/auth" component={AuthenticationWindow} />
                    </Switch>
                </header>
                </BrowserRouter>
            </div>
        );
    }
}

export default (App);
