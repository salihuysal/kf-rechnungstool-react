import React, { Component } from 'react';

import './styles/Field.css'

class TextField extends Component {

    render() {
        const csv = this.props.defaultFromCSV;
        return (
            <textarea
                className="form-control field textarea"
                type="text"
                defaultValue={csv.hasOwnProperty(this.props.savedAs) ? csv[this.props.savedAs] : ""}
                placeholder={"Eine Nachricht an den Kunden..."}
                name={this.props.savedAs}
                onChange={this.props.handleChange}
            />
           
        )
    }
}

export default TextField;