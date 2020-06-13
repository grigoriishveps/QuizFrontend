import React from 'react';
import OneOption from "./OneOption";
import axios from 'axios';
import './App.css';
export default class CreateQuiz extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            title:'',
            text:"",
            options:[''],
            answer : []
        };
        this.addNewOption = this.addNewOption.bind(this);
        this.changeValueArray = this.changeValueArray.bind(this);
        this.changeAnswer = this.changeAnswer.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.sendQuiz = this.sendQuiz.bind(this);
        this.handleChangeText= (event)=>this.setState({text: event.target.value});
    }

    addNewOption(){
        this.setState((state) => {
            let a = state.options.slice();
            a.push('');
            return {options:a};}
            );
    }
    changeValueArray(index, value){
        this.setState((state) => {
            let a = state.options.slice();
            a[index] = value;
            return {options:a};
        });
    }
    changeAnswer(index, onOrOff){
        const i = index;
        this.setState(state =>{
            //let a = [...state.answer];
            let a = state.answer.slice();
            if(onOrOff){
                a.push(index);
                a.sort();
            }
            else{
                const b = a.filter(item => { return item!==i});
                a = b.slice();
            }
            return {answer:a};
        });
    }
    handleChangeTitle(event){
        this.setState({title:event.target.value});
    }

    sendQuiz(){
        console.log(this.props.authHeader);
        axios.post("http://localhost:8889/api/quizzes", this.state, this.props.authHeader)
            .then((response) => console.log(response))
            .catch((response) => console.log(response));
    }
//
    render() {
        let op = this.state.options.map((item, index) => <OneOption id = {index} onChangeFunc = {this.changeValueArray} answerFunc ={this.changeAnswer} key = {index}/>);
        return (
            <div className="createquiz">
                <div className="input-group mb-3 ">
                    <div className="input-group-prepend" >
                        <span className="input-group-text" id="inputGroup-sizing-default">Введите заголовок</span>
                    </div>
                    <input type="text" className="form-control" value={this.state.title} onChange={this.handleChangeTitle} aria-label="Sizing example input"
                           aria-describedby="inputGroup-sizing-default"/>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Описание</span>
                    </div>
                    <textarea className="form-control" value={ this.state.text} onChange={this.handleChangeText} aria-label="With textarea"></textarea>
                </div>
                {op}

                <div className="groupButtons">
                    <button type="button" className="btn btn-light" onClick={this.addNewOption}> Добавить вариант ответа</button>
                    <button type="button" className="btn btn-success" onClick={this.sendQuiz}> Отправить Quiz</button>
                </div>
            </div>
        );
    }
}