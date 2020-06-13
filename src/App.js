import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import CreateQuiz from './CreateQuiz';
import AuthenticationWindow from "./AuthenticationWindow";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLogin: false,
        }
        this.changeDataAfterLogin = this.changeDataAfterLogin.bind(this);
    }

    changeDataAfterLogin(email, password) {
        const a = email
        this.setState({
            email: a,
            password: password,
            isLogin: true
        });
    }

    render() {
        const a = this.state.isLogin;
        const sdata = btoa(this.state.email +
            ':' + this.state.password);
        const logInfo = {headers: {"Authorization": "Basic " + sdata}};
        console.log(logInfo)
        return (
            <div className="App">
                <header className="App-header" align="center">
                    {a
                        ? <CreateQuiz authHeader ={logInfo} />
                        : <AuthenticationWindow successLoginFunc={this.changeDataAfterLogin}/>}
                </header>
            </div>
        );
    }
}

export default App;
