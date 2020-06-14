import React from 'react';
import OneOption from "./OneOption";
import axios from 'axios';
import './App.css';
import Quiz from "./Quiz";

export default class HistoryQuiz extends React.Component {
    constructor(props) {
        super(props);
        console.log("Начало");
        let info = {};
        this.state = {
            infoPage: info,
            f: false
        };
        // this.addNewOption = this.addNewOption.bind(this);
        // this.changeValueArray = this.changeValueArray.bind(this);
        this.getPrevPage = this.getPrevPage.bind(this);
        // this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.getNextPage = this.getNextPage.bind(this);
        // this.handleChangeText = (event) => this.setState({text: event.target.value});

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
    // handleChangeTitle(event) {
    //     this.setState({title: event.target.value});
    // }

    componentWillMount() {
        axios.get("http://localhost:8889/api/quizzes/completed",  this.props.authHeader)
            .then((response) => {this.setState({infoPage:response.data, f:true});
                console.log(response);})
            .catch((response) => console.log(response));
    }

    getPrevPage(index, onOrOff) {
        console.log(this.props.authHeader);
        axios.get("http://localhost:8889/api/quizzes/completed", this.props.authHeader)
            .then((response) => this.setState({infoPage:response.data, f:true}))
            .catch((response) => console.log(response));
    }
    getNextPage() {
        console.log(this.props.authHeader);
        axios.get("http://localhost:8889/api/quizzes/completed", this.props.authHeader)
            .then((response) => this.setState({infoPage:response.data, f:true}))
            .catch((response) => console.log(response));
    }


    render() {
        let op=(this.state.f? this.state.infoPage.content.map((item)=> (<tr><td>{item.id}</td><td>{item.completedAt}</td></tr>)):null);
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
                <nav aria-label="...">
                    <ul className="pagination justify-content-center">
                        <li className="page-item disabled">
                            <a className="page-link" href="#" onClick={this.getPrevPage}>Prev</a>
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