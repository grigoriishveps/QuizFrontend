import React from 'react';

export default class MenuQuiz extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title:'',
            options:[],
            answer:''
        };
    }

//return (<div className="form-group "> let partners = this.props.value.map((item) => <p>{item.Error}</p>)
    render() {
        return (
            <div>
                <button type="button" class="btn btn-success"> Отправить Quiz </button>
                <button type="button" class="btn btn-info"> Получить задачу </button>
            </div>
        );
    }
}