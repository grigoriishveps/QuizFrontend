import React from 'react';
import axios from 'axios';
import './App.css';
import {connect} from "react-redux";
import mapStateToProps from "./redux/mapStateToProps";
import mapDispatchToProps from "./redux/mapDispatchToProps";

class HistoryQuiz extends React.Component {
    constructor(props) {
        super(props);
        console.log("Начало");
        let info = {};
        this.state = {
            infoPage: info,
            f: false
        };

        this.getPage = this.getPage.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:8080/api/quizzes/completed",  this.props.authHeader)
            .then((response) => {this.setState({infoPage:response.data, f:true});
                console.log(response);})
            .catch((response) => console.log(response));
    }


    getPage() {
        console.log(this.props.authHeader);
        axios.get("http://localhost:8080/api/quizzes/completed", this.props.authHeader)
            .then((response) => this.setState({infoPage:response.data, f:true}))
            .catch((response) => console.log(response));
    }

    createNavPage(){
        const currentNum = this.state.infoPage.number;
        const numOp = this.state.num;
        return (<nav aria-label="...">
            <ul className="pagination justify-content-center">
                <li className= {"page-item "+((this.state.infoPage.first)?"disabled":"")}>
                    {this.state.infoPage.first ? <span className="page-link">Prev</span>
                        : <button className="page-link" href="#" onClick={this.getPage.bind(this, currentNum-1)}>Prev</button>}
                </li>

                {/*Предыдущая страница*/}
                {!this.state.infoPage.first && <li className="page-item">
                    <button className="page-link" href="#" onClick={this.getPage.bind(this, currentNum-1)}>{currentNum}</button>
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
                    <button className="page-link" href="#" onClick={this.getPage.bind(this, currentNum+1)}>{currentNum+2} </button>
                </li>}

                <li className={"page-item "+((this.state.infoPage.last)?"disabled":"")}>
                    {this.state.infoPage.last ?<span className="page-link">Next</span>
                        : <button className="page-link" onClick={this.getPage.bind(this,currentNum+1)}>Next</button>}
                </li>
            </ul>
        </nav>)
    }

    render() {
        let op=(this.state.f? this.state.infoPage.content.map((item)=> (<tr><td>{item.id}</td><td>{item.completedAt}</td></tr>)):null);
        let navPanel = this.createNavPage();
        return (
            <div className="">
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Data</th>
                    </tr>
                    </thead>
                    <tbody>
                        {op}
                    </tbody>
                </table>
                {navPanel}
            </div>
        );
    }
}
export default connect(mapStateToProps("HistoryQuiz"), mapDispatchToProps("HistoryQuiz")) (HistoryQuiz);
