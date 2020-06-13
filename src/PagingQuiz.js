import React from 'react';
import OneOption from "./OneOption";
import axios from 'axios';
import './App.css';
import Quiz from "./Quiz";

export default class PagingQuiz extends React.Component {
    constructor(props) {
        super(props);
        console.log("Начало");
        let info = {};
        axios.get("http://localhost:8889/api/quizzes",  this.props.authHeader)
            .then((response) => {info = response.data;
            console.log(response);})
            .catch((response) => console.log(response));
        console.log(info);
        this.state = {
            infoPage: info,
            f: false
        };
        // this.addNewOption = this.addNewOption.bind(this);
        // this.changeValueArray = this.changeValueArray.bind(this);
        // this.changeAnswer = this.changeAnswer.bind(this);
        // this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.getNextPage = this.getNextPage.bind(this);
        // this.handleChangeText = (event) => this.setState({text: event.target.value});
        this.formPageQuiz = this.formPageQuiz.bind(this);
    }

    // addNewOption() {
    //     this.setState((state) => {
    //             let a = state.options.slice();
    //             a.push('');
    //             return {options: a};
    //         }
    //     );
    // }
    //
    // changeValueArray(index, value) {
    //     this.setState((state) => {
    //         let a = state.options.slice();
    //         a[index] = value;
    //         return {options: a};
    //     });
    // }
    //
    // changeAnswer(index, onOrOff) {
    //     const i = index;
    //     this.setState(state => {
    //         //let a = [...state.answer];
    //         let a = state.answer.slice();
    //         if (onOrOff) {
    //             a.push(index);
    //             a.sort();
    //         } else {
    //             const b = a.filter(item => {
    //                 return item !== i
    //             });
    //             a = b.slice();
    //         }
    //         return {answer: a};
    //     });
    // }
    //
    // handleChangeTitle(event) {
    //     this.setState({title: event.target.value});
    // }

    getNextPage() {
        console.log(this.props.authHeader);
        axios.get("http://localhost:8889/api/quizzes", this.props.authHeader)
            .then((response) => this.setState({infoPage:response.data, f:true}))
            .catch((response) => console.log(response));
    }

    formPageQuiz(){
        let k = 0, i = -1, j = 3;
        let arrayOfQuiz = [];
        const ff = this.state.f;

        while(k < this.state.infoPage.numberOfElements){
            if (j == 3){
                i++;
                j = 0;
            }
            arrayOfQuiz.push(<div className="card-deck col mb-3"><Quiz key={String(i)+j+k} authHeader={this.props.authHeader} question={this.state.infoPage.content[k]}/></div>);
            k++;
            j++;
        }
        console.log(arrayOfQuiz);
        return arrayOfQuiz;
    }


    render() {
        // let op = this.state.options.map((item, index) => <OneOption id={index} onChangeFunc={this.changeValueArray}
        //                                                             answerFunc={this.changeAnswer} key={index}/>);
        let op= this.formPageQuiz();
        return (
            <div className="paging-quiz">

                <h2> Все задания </h2>
                {/*<div className="card-deck">*/}
                <div className=" row row-cols-1 row-cols-md-3">
                    {op}
                </div>
                {/*<div className="groupButtons">*/}
                {/*    <button type="button" className="btn btn-light" onClick={this.addNewOption}> Добавить вариант*/}
                {/*        ответа*/}
                {/*    </button>*/}
                {/*    <button type="button" className="btn btn-success" onClick={this.getNextPage}> Отправить Quiz</button>*/}
                {/*</div>*/}

                <nav aria-label="...">
                    <ul className="pagination justify-content-center">
                        <li className="page-item disabled">
                            <span className="page-link">Previous</span>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item active" aria-current="page">
                          <span className="page-link">
                            2
                            <span className="sr-only">(current)</span>
                          </span>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item">
                            <a className="page-link" href="#" onClick={this.getNextPage}>Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}