import React from 'react';
import axios from "axios";

export default class Quiz extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            answer: ""
        };
        this.handleChangeAnswer = this.handleChangeAnswer.bind(this);
        this.solveQuiz = this.solveQuiz.bind(this);
    }

    handleChangeAnswer(event){
        this.setState({answer: event.target.value});
    }

    solveQuiz(){
        const array = this.state.answer.split(",");
        const answer = array.map((item)=>Number(item)-1);
        console.log(answer);
        axios.post("http://localhost:8889/api/quizzes/"+this.props.question.id+"/solve", {answer}, this.props.authHeader)
            .then((response) => console.log(response))
            .catch((response) => console.log(response));
    }

//<img src="" className="card-img-top" alt=""/>
    render() {
        let a = this.props.question.options.map((item)=><li text-align="left">{item}</li>);
        return (
            <div className="card text-white bg-success border-info" style={{width: "18rem"}}>
            {/*//style={{width: "18rem"}}*/}

                    <div className="card-body" >
                        <h5 className="card-title">{this.props.question.title}</h5>
                        <p className="card-text">{this.props.question.text}</p>
                        <div text-align="left">
                        <ol text-align="left">
                            {a}
                        </ol>
                        </div>
                    </div>
                    <div className="input-group mb-3 card-footer">
                        <input type="text" className="form-control" placeholder="Enter answer"
                               aria-label="Recipient's username" aria-describedby="button-addon2"
                               value ={this.state.answer} onChange={this.handleChangeAnswer}/>
                        <div className="input-group-append">
                            <button className="btn btn-primary" onClick={this.solveQuiz}>Решить</button>
                        </div>
                    </div>
            </div>
        );
    }
}