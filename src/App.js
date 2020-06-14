import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import CreateQuiz from './CreateQuiz';
import AuthenticationWindow from "./AuthenticationWindow";
import PagingQuiz from "./PagingQuiz";
import HistoryQuiz from "./HistoryQuiz";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLogin: false,
            idMenu:-1
        }
        this.changeDataAfterLogin = this.changeDataAfterLogin.bind(this);
        this.switchMenu = this.switchMenu.bind(this);
    }

    changeDataAfterLogin(email, password) {
        const a = email
        this.setState({
            email: a,
            password: password,
            isLogin: true,
            idMenu : 1
        });
    }

    switchMenu(id){
        return (() => this.setState({idMenu : id}));
    }

    render() {
        const a = this.state.isLogin;
        const sdata = btoa(this.state.email +
            ':' + this.state.password);
        const logInfo = {headers: {"Authorization": "Basic " + sdata}};
        console.log(logInfo);
        let menu = null;
        switch(this.state.idMenu){
            case 1:
                menu = <PagingQuiz authHeader ={logInfo}/>;
                break;
            case 2:
                menu = <CreateQuiz authHeader ={logInfo} />;
                break;
            case 3:
                menu = <HistoryQuiz authHeader ={logInfo}/>;
                break;
        }



        return (
            <div className="App">
                <nav className="site-header sticky-top py-1">
                    <div className="container d-flex flex-column flex-md-row justify-content-between">
                        <a className="py-2" href="#" aria-label="Product">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                 stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                 className="d-block mx-auto" role="img" viewBox="0 0 24 24" focusable="false">
                                <title>Product</title>
                                <circle cx="12" cy="12" r="10"></circle>
                                <path
                                    d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"></path>
                            </svg>
                        </a>
                        <a className="py-2 d-none d-md-inline-block" href="#" onClick={this.switchMenu(1)}>Задачи</a>
                        <a className="py-2 d-none d-md-inline-block" href="#" onClick={this.switchMenu(2)}>Новый Quiz</a>
                        <a className="py-2 d-none d-md-inline-block" href="#" onClick={this.switchMenu(3)}>История</a>
                        <a className="py-2 d-none d-md-inline-block" href="#">Enterprise</a>
                        <a className="py-2 d-none d-md-inline-block" href="#">Support</a>
                        <a className="py-2 d-none d-md-inline-block" href="#">Pricing</a>
                        <a className="py-2 d-none d-md-inline-block" href="#">Cart</a>
                    </div>
                </nav>
                <header className="App-header" align="center">
                    {a
                        ?menu
                        : <AuthenticationWindow successLoginFunc={this.changeDataAfterLogin}/>

                    }
                </header>
            </div>
        );
    }
}

export default App;
