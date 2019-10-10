import React, { Component } from 'react';

import './styles/Field.css'

class NumberField extends Component {
    
    render() {
        const csv = this.props.defaultFromCSV;
        return (
            <div>
                <input
                className="form-control field"
                defaultValue={csv.hasOwnProperty(this.props.savedAs) ? csv[this.props.savedAs] : ""}
                type="number"
                placeholder={this.props.displayedAs}
                name={this.props.savedAs}
                onChange={this.props.handleChange}
            />
            </div>
            
        )
    }
}

export default NumberField; 