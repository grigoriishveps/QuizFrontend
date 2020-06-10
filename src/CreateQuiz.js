import React from 'react';
import OneOption from "./OneOption";

export default class CreateQuiz extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            title:'',
            options:[''],
            answer : []
        };
        this.addNewOption = this.addNewOption.bind(this);
        this.changeValueArray = this.changeValueArray.bind(this);
        this.changeAnswer = this.changeAnswer.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
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

//
    render() {
        let op = this.state.options.map((item, index) => <OneOption id = {index} onChangeFunc = {this.changeValueArray} answerFunc ={this.changeAnswer} key = {index}/>);
        return (
            <div className="createquiz">
                <div className="input-group mb-3 ">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-default">Введите заголовок</span>
                    </div>
                    <input type="text" className="form-control" value={this.state.title} onChange={this.handleChangeTitle} aria-label="Sizing example input"
                           aria-describedby="inputGroup-sizing-default"/>
                </div>
                {op}

                <button type="button" className="btn btn-light" onClick={this.addNewOption}> Добавить вариант ответа</button>
                <button type="button" className="btn btn-success"> Отправить Quiz</button>

            </div>
        );
    }
}