import React from 'react';
import './App.css';
import {Redirect} from "react-router-dom"
import axios from 'axios';
import {connect} from "react-redux";
import mapStateToProps from "./redux/mapStateToProps";
import mapDispatchToProps from "./redux/mapDispatchToProps";
class AuthenticationWindow extends React.Component{
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

    }
    componentDidMount() {
        //this.handleClickLogin();
    }

    handleLogin(event){
        this.setState({email:event.target.value});
    }
    handlePassword(event){
        this.setState({password: event.target.value});
    }

    handleClickRegister(event){
        axios.post('http://localhost:8080/api/register', this.state)
            .then((response) => {
            console.log(response);})
            .catch((response) => console.log(response));
    }

    handleClickLogin(){
        const s ={"Authorization": "Basic " + btoa(this.state.email +
                ':' + this.state.password)}
        console.log(s);
        axios.get('http://localhost:8080/login', {"headers": {s}})
            .then((response) => {console.log("Успешно авторизован"); this.props.actionLogin({...this.state});this.props.location.pathname = '/new';})
            .catch((response) => console.log(response));
    }

    render() {
        if (this.props.isLogin)
            return(<Redirect to="/"/>)
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

export default connect(mapStateToProps("AuthenticationWindow"), mapDispatchToProps("AuthenticationWindow")) (AuthenticationWindow);
