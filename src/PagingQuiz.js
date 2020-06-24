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

        console.log(info);
        this.state = {
            infoPage: info,
            f: false,
            num: 1
        };
        this.getPage = this.getPage.bind(this);
        // this.handleChangeText = (event) => this.setState({text: event.target.value});
        this.formPageQuiz = this.formPageQuiz.bind(this);
    }
// {    "totalPages":1,
//     "totalElements":3,
//     "last":true,
//     "first":true,
//     "sort":{ },
//     "number":0,
//     "numberOfElements":3,
//     "size":10,
//     "empty":false,
//     "pageable": { },
//     "content":[
//         {"id":102,"title":"Test 1","text":"Text 1","options":["a","b"]}}

    componentWillMount() {
        axios.get("http://localhost:8889/api/quizzes?pageSize=3",  this.props.authHeader)
            .then((response) => {this.setState({infoPage:response.data});
                console.log(response);})
            .catch((response) => console.log(response));
    }

    getPage(index) {
        console.log(this.props.authHeader);
        axios.get("http://localhost:8889/api/quizzes?page="+index+"&pageSize=3", this.props.authHeader)
            .then((response) => this.setState(state=>{return{infoPage:response.data, f:true, num: state.num+1}}))
            .catch((response) => console.log(response));
    }

    formPageQuiz(){
        let k = 0, i = -1, j = 3;
        let arrayOfQuiz = [];
        const ff = this.state.f;
        const numOp = this.state.num;
        while(k < this.state.infoPage.numberOfElements){
            if (j == 3){
                i++;
                j = 0;
            }
            arrayOfQuiz.push(<div className="card-deck col mb-3" key={"card-"+numOp+"-" +k}><Quiz  authHeader={this.props.authHeader} question={this.state.infoPage.content[k]}/></div>);
            k++;
            j++;
        }
        console.log(arrayOfQuiz);
        return arrayOfQuiz;
    }

    createNavPage(){
        const currentNum = this.state.infoPage.number;
        const numOp = this.state.num;
        return (<nav aria-label="...">
            <ul className="pagination justify-content-center">
                <li className= {"page-item "+((this.state.infoPage.first)?"disabled":"")}>
                    {this.state.infoPage.first ? <span className="page-link">Prev</span>
                        : <a className="page-link" href="#" onClick={this.getPage.bind(this, currentNum-1)}>Prev</a>}
                </li>

                {/*Предыдущая страница*/}
                {!this.state.infoPage.first && <li className="page-item">
                    <a className="page-link" href="#" onClick={this.getPage.bind(this, currentNum-1)}>{currentNum}</a>
                </li>}

                {/*Текущая страница*/}
                <li className="page-item active" aria-current="page">
                            <span className="page-link">
                                {currentNum+1}
                                <span className="sr-only">(current)</span>
                            </span>
                </li>

                {/*Следующая страница*/}
                {!this.state.infoPage.last && <li className="page-item">
                    <a className="page-link" href="#" onClick={this.getPage.bind(this, currentNum+1)}>{currentNum+2} </a>
                </li>}

                <li className={"page-item "+((this.state.infoPage.last)?"disabled":"")}>
                    {this.state.infoPage.last ?<span className="page-link">Next</span>
                        : <a className="page-link" href="#" onClick={this.getPage.bind(this,currentNum+1)}>Next</a>}
                </li>
            </ul>
        </nav>)
    }

    render() {

        let op= this.formPageQuiz();
        let navPanel = this.createNavPage();
        return (
            <div className="paging-quiz">

                <h2> Все задания </h2>
                {/*<div className="card-deck">*/}
                <div className=" row row-cols-1 row-cols-md-3">
                    {op}
                </div>
                {navPanel}
            </div>
        );
    }
}