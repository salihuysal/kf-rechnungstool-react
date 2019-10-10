import React, { Component } from 'react';

import './styles/Field.css'

class NameField extends Component {
    render() {
        const csv = this.props.defaultFromCSV;
        return (
            <input
                className="form-control field"
                type="text"
                defaultValue={csv.hasOwnProperty(this.props.savedAs) ? csv[this.props.savedAs] : ""}
                placeholder={this.props.displayedAs}
                name={this.props.savedAs}
                onChange={this.props.handleChange}
            />
        )
    }
}

export default NameField;