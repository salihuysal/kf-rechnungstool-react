import React, { Component } from 'react';

import Export from './Export';

class AllExports extends Component {

    componentWillMount() {

        if (this.props.location.state !== undefined) {
            this.setState({components: this.createPages()});
        } else {
            this.setState({components: this.createBlankPage()});
        }
    }

    createBlankPage() {
        console.log("creating Blank Page")
        var components = [];
        components.push(<Export key={0}/>);
        return components;
    }
 
    getField(fieldName, csvRow) {
        const csv = this.props.location.state.csv.data;
        const headers = csv[0];
        const fieldindex = headers.indexOf(fieldName);
        return csvRow[fieldindex] !== undefined ? csvRow[fieldindex] : "";
    }

    createPages() {
        const csv = this.props.location.state.csv.data;
        const headers = csv[0];
        const data = csv.slice(1);


        var components = [];
        var csvOutput = [];
        

        var neueRechnung = true;
        
        for (var i = 0; i < data.length; i++) {
            if (i + 1 !== data.length) {
                var nextOrderID = this.getField('Order ID', data[i + 1])
                var nextAnbieterID = this.getField('Anbieter ID', data[i + 1])
            } else {
                var nextOrderID = -1;
                var nextAnbieterID = -1;
            }

            if (this.getField('Order ID', data[i]) === nextOrderID && this.getField('Anbieter ID', data[i]) === nextAnbieterID && this.getField('Payment Status', data[i]) === "paid") {
                csvOutput.push(data[i])
            } else if (this.getField('Payment Status', data[i]) === "paid") {
                csvOutput.push(data[i])
                components.push(<Export key={i} headers={headers} csv={csvOutput}/>)
                console.log(csvOutput)
                csvOutput = [];
            }
        }

        return components;
    }


    render() {
        const components = this.state.components;
        return (<div>
            {components.length !== 0 ? components.map((component, id) => {
                return <div key={id}>{component}</div>
            }) : "1"}
        </div>);
    }
}

export default AllExports;