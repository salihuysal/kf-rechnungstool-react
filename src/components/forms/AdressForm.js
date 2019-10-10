import React, { Component } from 'react';

import NameField from '../fields/NameField';
import CityField from '../fields/CityField';

import './styles/AdressForm.css'

class AdressForm extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    isCompany = () => {
        if (this.props.type === 'Kursanbieter') {
            return <NameField handleChange={this.props.handleChange} defaultFromCSV={this.props.defaultFromCSV} displayedAs={'Firma'} savedAs={this.props.type + 'Firma'} />
        }
        return '';
    }

    render() {
        return (
            <div className="con-adress">
                <h2 className="con-adress-ueberschrift">{this.props.type}</h2>
                {this.isCompany()}
                <NameField handleChange={this.props.handleChange} defaultFromCSV={this.props.defaultFromCSV} displayedAs={'Vorname'} savedAs={this.props.type + 'Vorname'} />
                <NameField handleChange={this.props.handleChange} defaultFromCSV={this.props.defaultFromCSV} displayedAs={'Nachname'} savedAs={this.props.type + 'Nachname'} />
                <NameField handleChange={this.props.handleChange} defaultFromCSV={this.props.defaultFromCSV} displayedAs={'Adresse'} savedAs={this.props.type + 'Adresse'} />
                <CityField handleChange={this.props.handleChange} defaultFromCSV={this.props.defaultFromCSV} savedAs={this.props.type} />
            </div>
        );
    }
}



export default AdressForm;