import React, { Component } from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import de from 'date-fns/locale/de'
import moment from "moment"

import './styles/Field.css'

class DateField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            minDate: new Date('01.01.2017'),
            selected: "",
        };
        this.handleDate = this.handleDate.bind(this);
        registerLocale('de', de);
    }

    handleDate(fullDate) {
        var date = moment(fullDate).format("DD.MM.YY");
        var newDate = { target: { value: date, name: this.props.savedAs } }
        this.props.handleChange(newDate)
        console.log(date)
        if (date !== "") {
            const day = date.split('.')[0];
            const month = date.split('.')[1] - 1;
            var year = date.split('.')[2];
            if (year.length === 2) {
                year = "20" + year;
            }
            date = new Date(year, month, day);
            this.setState({selected: new Date(date)})
        }
    }

    componentWillMount() {
        const csv = this.props.defaultFromCSV;
        const dateTMP = csv.hasOwnProperty(this.props.savedAs) ? csv[this.props.savedAs] : "";
        var date = "";
        if (dateTMP !== "") {
            const day = dateTMP.split('.')[0];
            const month = dateTMP.split('.')[1];
            var year = dateTMP.split('.')[2];
            if (year.length === 2) {
                year = "20" + year;
            }
            date = new Date(year, month, day);
            this.setState({selected: new Date(date)})
        }
    }

    render() {

        return (
            <div>
                <label className="datelabel">{this.props.displayedAs}</label>
                <DatePicker
                    dateFormat="d. MMMM yyyy"
                    locale="de"
                    className="form-control field datepicker"
                    minDate={this.state.minDate}
                    selected={this.state.selected}
                    placeholderText={'auswählen...'}    
                    name={this.props.savedAs}
                    onChange={this.handleDate}
                />
            </div>
        )
    }
}

export default DateField;