import React, { Component } from 'react';

import DateField from '../fields/DateField';
import NumberField from '../fields/NumberField';
import OrdNumberField from '../fields/OrdNumberField';


class DetailForm extends Component {

    render() {
        return (
            <div className="con-adress">
                <h2 className="con-adress-ueberschrift">{this.props.type}</h2>
                <NumberField handleChange={this.props.handleChange} defaultFromCSV={this.props.defaultFromCSV} displayedAs={'Kursfreunde Kundennummer'} savedAs={'Kundennummer'} />
                <OrdNumberField handleChange={this.props.handleChange} defaultFromCSV={this.props.defaultFromCSV} displayedAs={'Bestellnummer'} savedAs={'Bestellnummer'} />
                <DateField handleChange={this.props.handleChange} defaultFromCSV={this.props.defaultFromCSV} displayedAs={'Rechnungsdatum'} savedAs={'Rechnungsdatum'} />                
                <NumberField handleChange={this.props.handleChange} defaultFromCSV={this.props.defaultFromCSV} displayedAs={'Rechnungsnummer'} savedAs={'Rechnungsnummer'} />
                <DateField handleChange={this.props.handleChange} defaultFromCSV={this.props.defaultFromCSV} displayedAs={'Buchungsdatum'} savedAs={'Buchungsdatum'} />

            </div>
        );
    }
}

export default DetailForm;