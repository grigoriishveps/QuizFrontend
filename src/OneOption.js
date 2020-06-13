import React from 'react';

export default class OneOption extends React.Component{
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            f: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleChange(event){
        this.props.onChangeFunc(this.props.id, event.target.value);
    }

    handleInputChange(event){
        const y = event.target.checked;
        console.log(event);
        this.props.answerFunc(this.props.id, y);
        this.setState({f:y});
    }

    render() {
        return (
            <div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <input type="checkbox"  onChange={this.handleInputChange} aria-label="Checkbox input"/>
                        </div>
                    </div>
                    <input type="text" value={this.props.value} onChange={this.handleChange} className="form-control" aria-label="Text input with checkbox"/>
                </div>

            </div>
        );
    }
}