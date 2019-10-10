import React, { Component } from 'react';

import './styles/Field.css'

class CityField extends Component {
    render() {
        const csv = this.props.defaultFromCSV;
        const savedAsPlz = this.props.savedAs + 'Plz';
        const savedAsStadt = this.props.savedAs + 'Stadt';
        return (
            <div className="plz-stadt">
                <input 
                className="form-control field"
                type="text"
                placeholder="PLZ" 
                name={this.props.savedAs + 'Plz'}
                defaultValue={csv.hasOwnProperty(savedAsPlz) ? csv[savedAsPlz] : ""}
                onChange={this.props.handleChange} 
                />
                <input 
                className="form-control field"
                type="text"
                placeholder="Stadt" 
                name={this.props.savedAs + 'Stadt'}
                defaultValue={csv.hasOwnProperty(savedAsStadt) ? csv[savedAsStadt] : ""}
                onChange={this.props.handleChange} />
            </div>
        )
    }
}

export default CityField;