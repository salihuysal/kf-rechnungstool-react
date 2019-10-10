import React, { Component } from 'react';

import './styles/Field.css'

class OrdNumberField extends Component {
    
    render() {
        const csv = this.props.defaultFromCSV;
        return (
            <div>
                <input
                className="form-control field number-field"
                defaultValue={csv.hasOwnProperty(this.props.savedAs) ? csv[this.props.savedAs] : ""}
                type="text"
                placeholder={this.props.displayedAs}
                name={this.props.savedAs}
                onChange={this.props.handleChange}
            />
            </div>
            
        )
    }
}

export default OrdNumberField; 