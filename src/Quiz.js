import React from 'react';

class Quiz extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            title:'',
            options:[''],
            answer : []
        };
    }

    render() {
        let a = this.state.options.map((item)=><li>{item}</li>)
        return (
            <div className="quiz">
                <ul>
                    {a}
                </ul>
            </div>
        );
    }
}