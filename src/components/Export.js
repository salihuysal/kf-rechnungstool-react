import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { saveAs } from 'file-saver';

import AdressForm from './forms/AdressForm';
import DetailForm from './forms/DetailForm';
import TableForm from './forms/TableForm';

import TextField from './fields/TextField';

import '../assets/Export.css';
import { isThisQuarter } from 'date-fns';

var f = require('float');

class Export extends Component {

    constructor(props) {

        super(props);
        this.state = {
            data: this.setDefaults() || [],
            TableHeader: this.getTableHeader(),
            Rechnungseintraege: this.setEintraegeDefaults() || [],
        }
    }

    getActualDate() {
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear()
        const actualDate = day + "." + month + "." + year
        return actualDate;
    }

    getTableHeader() {
        return {
            Position: "Position",
            Menge: "Menge",
            Kursname: "Kursname",
            Teilnehmername: "Teilnehmer",
            PreisNetto: "Preis netto (€)",
            Mwst: "MwSt. €",
            ProzentsatzMwst: "MwSt. %",
            PreisBrutto: "Preis brutto (€)",
        }
    }

    commaToPoint(num) {
        num = num.toString()
            if (num.includes(",")) {
                return num.replace(/,/g, '.')
            }
        return num
    }

    round(num){
        return f.round(parseFloat(this.commaToPoint(num)), 2)
    }

    setEintraegeDefaults() {
        if (this.props.csv !== undefined) {
            var result = []
            const csv = this.props.csv;
            var map = new Map()
            const header = Object.keys(this.getTableHeader());
            csv.map((row, index) => {
                var productID = this.getFromCSV('Order Position Produkt ID', index);
                var object = {}
                if (map.get(productID) !== undefined) {
                    object = map.get(productID)
                } else {
                    object = {
                        [header[1]]: 0, 
                        [header[2]]: "", 
                        [header[3]]: "", 
                        [header[4]]: this.round(0), 
                        [header[5]]: this.round(this.getFromCSV('Bestellung Position Retail Preis Brutto', index)) - this.round(this.getFromCSV('Bestellung Position Retail Preis Brutto', index)),
                        [header[6]]: this.round(this.getFromCSV('Produkt Steuer Satz', index)),
                        [header[7]]: 0, 
                    }
                }

                    object[header[1]] = parseInt(object[header[1]] + 1);
                    object[header[2]] = this.getFromCSV('Bestellung Position Name', index)
                    object[header[3]] = object[header[3]] === "" ? this.getFromCSV('Teilnehmer Name', index) : object[header[3]] + ", " + this.getFromCSV('Teilnehmer Name', index)
                    object[header[4]] = this.round(object[header[4]]) + this.round(this.getFromCSV('Bestellung Position Retail Preis Netto', index))
                    object[header[5]] = this.round(this.round(this.getFromCSV('Bestellung Position Retail Preis Brutto', index)) - this.round(this.getFromCSV('Bestellung Position Retail Preis Netto', index)));
                    object[header[7]] = this.round(object[header[7]]) + this.round(this.getFromCSV('Bestellung Position Retail Preis Brutto', index))

                map.set(productID, object)
            

            })
            for (var [key, value] of map) {
                result.push(value);
            }
            return result;
        }
        return []
    }

    setDefaults() {
    
        if (this.props.csv !== undefined) {
            var result = {}
            result = {
                KundeVorname: this.getFromCSV('Kunde Rechnungsadresse Vorname'),
                KundeNachname: this.getFromCSV('Kunde Rechnungsadresse Nachname'),
                KundeAdresse: this.getFromCSV('Kunde Rechnungsadresse Strasse')
                + " " + this.getFromCSV('Kunde Rechnungsadresse Hausnummer'),
                KundePlz: this.getFromCSV('Kunde Rechnungsadresse PLZ'),
                KundeStadt: this.getFromCSV('Kunde Rechnungsadresse Ort'),
    
                KursanbieterFirma: this.getFromCSV('Anbieter Rechnungsadresse Firma'),                
                KursanbieterVorname: this.getFromCSV('Anbieter Rechnungsadresse Vorname'),
                KursanbieterNachname: this.getFromCSV('Anbieter Rechnungsadresse Nachname'),
                KursanbieterAdresse: this.getFromCSV('Anbieter Rechnungsadresse Strasse')
                + " " + this.getFromCSV('Anbieter Rechnungsadresse Hausnummer'),
                KursanbieterPlz: this.getFromCSV('Anbieter Rechnungsadresse PLZ'),
                KursanbieterStadt: this.getFromCSV('Anbieter Rechnungsadresse Ort'),

                Bestellnummer: this.getFromCSV('Bestellnummer'),
                Rechnungsdatum: this.getActualDate(),
                Buchungsdatum: this.getFromCSV('Bestelldatum').split(' ')[0],

                Vortext: "Hallo " + this.geehrter(this.getFromCSV('Kunde Anrede')) + " " + 
                this.herr(this.getFromCSV('Kunde Anrede')) + " " + this.getFromCSV('Kunde Rechnungsadresse Nachname') + ",",
            }

            return result;
        }
        return {
            Rechnungsdatum: this.getActualDate(),
        }
    }

    herr(geschlecht) {
        if (geschlecht === 'mr') {
            return "Herr"
        } 
        return "Frau"
    }

    geehrter(geschlecht) {
        if (geschlecht === 'mr') {
            return "geehrter"
        } 
        return "geehrte"
    }

    getFromCSV(csvfield, row) {
        var newRow = row;
        if (newRow == undefined) {
            newRow = 0;
        }
        const csv = this.props.csv[newRow];
        const headers = this.props.headers;
        const fieldindex = headers.indexOf(csvfield);
        return csv[fieldindex] !== undefined ? csv[fieldindex] : "";
    }

    defaultFromCSV = () => {
        return this.state.data;
    }

    componentWillMount() {
        this.updateSums();
        this.getRechnungseintraege();
    }

    handleChange = ({ target: { value, name } }) => {
        this.setState(prevState => ({
            data: {...prevState.data, [name]: value }}));
    }

    handleChangeTable = ({ data }) => {

        this.updateSums()
        this.setState({ Rechnungseintraege: data })
    }

    createAndDownloadPdf = () => {
        axios.post('/create-pdf', this.state)
            .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                saveAs(pdfBlob, 'newPdf.pdf');
            })
    }



    addRow = () => {
        var data = this.state.Rechnungseintraege.slice();
        const newData = {
            Position: this.state.Rechnungseintraege.length + 1,
            Menge: 1,
            Kursname: "",
            Teilnehmername: "",
            PreisNetto: 0.00,
            ProzentsatzMwst: 19,
            Mwst: 0,
            PreisBrutto: 0.00
        }
        data.push(newData);
        this.setState({ Rechnungseintraege: data })
    }

    deleteRow = (row) => {
        var data = this.state.Rechnungseintraege.slice();
        data.splice(row, 1);
        data = this.updatePosition(data)

        this.setState({ Rechnungseintraege: data })

    }

    getRechnungseintraege = () => {
        return this.updatePosition(this.state.Rechnungseintraege);
    }

    updatePosition(newData) {
        var data = newData;
        for (var i = 0; i < data.length; i++) {
            delete data[i].Position;
            data[i] = { Position: i + 1, ...data[i] }
        }
        return data;
    }

    getSums() {
        const NettoSum = this.state.data.NettoSum;
        const MwstSum = this.state.data.MwstSum;
        const BruttoSum = this.state.data.BruttoSum;
        var sums = { NettoSum, MwstSum, BruttoSum }
        return sums;
    }

    updateSums() {
        var data = this.state.Rechnungseintraege;
        var NettoSum = 0;
        var MwstSum = 0;
        var BruttoSum = 0;
        for (var i = 0; i < data.length; i++) {
            NettoSum += data[i].PreisNetto;
            MwstSum += data[i].Mwst;
            BruttoSum += data[i].PreisBrutto;
        }
        this.setState( prevState => ({
            data: {...prevState.data, NettoSum, MwstSum, BruttoSum }
        }))
            
        return data;
    }

    changePercent  = (cellInfo, percent) => {
        var data = this.state.Rechnungseintraege;
        data[cellInfo].ProzentsatzMwst = this.round(percent);
        this.setState({Rechnungseintraege: data})
    }

    render() {
        console.log(this.state)
        return (
            <div className="pack">
                <div className="con">
                    <div>
                        <div className="con-details">
                            <AdressForm handleChange={this.handleChange} defaultFromCSV={this.defaultFromCSV()} type={'Kunde'} />
                            <AdressForm handleChange={this.handleChange} defaultFromCSV={this.defaultFromCSV()} type={'Kursanbieter'} />
                            <DetailForm handleChange={this.handleChange} defaultFromCSV={this.defaultFromCSV()} type={'Rechnungsdetails'} />
                        </div>
                        <div className="con-details">
                            <div className="con-text">
                                <h2 className="con-adress-ueberschrift">Rechnungstext</h2>
                                <TextField
                                defaultFromCSV={this.defaultFromCSV()}
                                handleChange={this.handleChange}
                                type={"Vortext"}
                                savedAs={"Vortext"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <TableForm 
                    handleChangeTable={this.handleChangeTable} 
                    deleteRow={this.deleteRow} 
                    addRow={this.addRow}
                    changePercent={this.changePercent}
                    data={this.getRechnungseintraege()} 
                    sums={this.getSums()}
                    headers={this.state.TableHeader} />
                <Button onClick={this.createAndDownloadPdf}>Download PDF</Button>
            </div>
        );
    }
}

export default Export;
