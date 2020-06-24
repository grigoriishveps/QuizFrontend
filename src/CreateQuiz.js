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
            options:['',''],
            answer : [],
            success : "",
            num:1
        };
        this.addNewOption = this.addNewOption.bind(this);
        this.deleteLastOption = this.deleteLastOption.bind(this);
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
    deleteLastOption(){
        this.setState(state=>{return {options:state.options.slice(0,-1)}});
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
            .then((response) => {console.log(response);
            this.setState(state=>{return{
                title:'',
                text:"",
                options:['',''],
                answer : [],
                success:true,
                num: state.num+1}})})
            .catch((response) => {console.log(response);
                this.setState({success:false})});
    }


//
    render() {
        const len = this.state.options.length;
        let op = this.state.options.map((item, index) => <OneOption key={"" + this.state.num+"-" + index}  id = {index} onChangeFunc = {this.changeValueArray} deleteFunc={this.deleteLastOption} answerFunc ={this.changeAnswer} last = {len >2 && index===len-1}/>);
        let mes ;
        if(this.state.success===true)
            mes = <div className="alert alert-success" role="alert">
                        Успешно создано!
                    </div>;
        else if (this.state.success===false)
            mes = <div className="alert alert-danger" role="alert">
                    Не принято!
            </div>;
        return (


            <div className="createquiz">
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Заголовок</label>

                        <input type="text" className="form-control" value={this.state.title} onChange={this.handleChangeTitle} aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default"/>

                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Описание</label>
                        <textarea className="form-control" value={ this.state.text} onChange={this.handleChangeText} aria-label="With textarea"></textarea>
                    </div>
                    <label htmlFor="exampleInputPassword1">Варианты ответов</label>
                    {op}
                    <div className="groupButtons">
                        <button type="button" className="btn btn-info" onClick={this.addNewOption}> Добавить вариант ответа</button>
                        <button type="button" className="btn btn-success" onClick={this.sendQuiz}> Отправить Quiz</button>
                    </div>
                    {mes}

                </form>
            </div>
        );
    }
}