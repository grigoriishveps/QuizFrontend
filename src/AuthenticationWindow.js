import React from 'react';
import OneOption from "./OneOption";
import './App.css';
import axios from 'axios';
export default class AuthenticationWindow extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            email: 'grigorii.shveps@gmail.ru',
            password:'88888888'
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleClickRegister = this.handleClickRegister.bind(this);
        this.handleClickLogin = this.handleClickLogin.bind(this);
        this.handleClickLogin();
    }


    handleLogin(event){
        this.setState({email:event.target.value});
    }
    handlePassword(event){
        this.setState({password: event.target.value});
    }

    handleClickRegister(event){
        axios.post('http://localhost:8889/api/register', this.state)
            .then((response) => {
            console.log(response);})
            .catch((response) => console.log(response));
    }

    handleClickLogin(){
        const a = btoa(this.state.email +
        ':' + this.state.password);
        const s ={"Authorization": "Basic " + a}
        console.log(s);
        axios.get('http://localhost:8889/login', {"headers": {"Authorization": "Basic " + a}})
            .then((response) => {console.log("Успешно авторизован"); this.props.successLoginFunc(this.state.email, this.state.password);})
            .catch((response) => console.log(response));

    }
//
    render() {
        return (
            <div className="authwindow">
                <div className="input-group input-group-sm mb-3 ">
                    <div className="input-group-prepend" >
                        <span className="input-group-text" id="authGroup1" > Почта </span>
                    </div>
                    <input type="text" className="form-control" value={this.state.email} onChange={this.handleLogin} aria-label="Sizing example input"
                           aria-describedby="inputGroup-sizing-sm"/>
                </div>
                <div className="input-group input-group-sm mb-3 ">
                    <div className="input-group-prepend ">
                        <span className="input-group-text" id="authGroup2">Пароль</span>
                    </div>
                    <input type="text" className="form-control" value={this.state.password} onChange={this.handlePassword} aria-label="Sizing "
                           aria-describedby="inputGroup-sizing-sm"/>
                </div>

                <div className="groupButtons">
                    <button type="button" className="btn btn-warning" onClick={this.handleClickRegister}> Регистрация </button>
                    <button type="button" className="btn btn-success" onClick={this.handleClickLogin}> Войти </button>
                </div>
            </div>
        );
    }
}