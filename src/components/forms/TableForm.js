import React, { Component } from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import ButtonGroup from 'react-bootstrap/ButtonGroup'



import './styles/TableForm.css'
import { ReactComponent as Plus } from '../../assets/plus.svg';
import { ReactComponent as Delete } from '../../assets/x.svg';

var f = require('float');





class TableForm extends Component {
    constructor(props) {
        super(props);
        this.renderEditable = this.renderEditable.bind(this);
        this.renderPreisNetto = this.renderPreisNetto.bind(this);
        this.renderNotEditable = this.renderNotEditable.bind(this);
        this.renderMenge = this.renderMenge.bind(this);
        this.renderDelete = this.renderDelete.bind(this);
        this.renderNotEditablePosition = this.renderNotEditablePosition.bind(this);


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

    updateBrutto(cellInfo, data) {
        const mwst = cellInfo.original.ProzentsatzMwst;
        const netto = data[cellInfo.index].PreisNetto;
        data[cellInfo.index].Mwst = this.round(netto * mwst / 100)
        data[cellInfo.index].PreisBrutto = this.round(netto + data[cellInfo.index].Mwst)
        return data;
    }

    renderDelete(cellInfo) {
        return (
            <Button
                className="x btn-danger"
                onClick={e => {
                    this.props.deleteRow(cellInfo.index);
                }}>
                <Delete
                    className="x-img"
                />
            </Button>
        )
    }

    renderMenge(cellInfo) {
        return (
            <div
                className="renderedField"
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    var data = [...this.props.data];
                    data[cellInfo.index][cellInfo.column.id] = parseInt(e.target.innerHTML);
                    data[cellInfo.index].PreisNetto = this.round(data[cellInfo.index].PreisNetto) * this.round(data[cellInfo.index][cellInfo.column.id]);
                    data = this.updateBrutto(cellInfo, data);
                    this.props.handleChangeTable({ data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.props.data[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }

    renderNotEditablePosition(cellInfo) {
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: this.props.data[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }

    renderNotEditable(cellInfo) {
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: this.props.data[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }

    renderSum(cellInfo) {
        return (
            <div
                className="renderedField"
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    var data = [...this.props.data];
                    data[cellInfo.index][cellInfo.column.id] = parseInt(e.target.innerHTML);
                    data[cellInfo.index].PreisNetto *= data[cellInfo.index][cellInfo.column.id];
                    data = this.updateBrutto(cellInfo, data);
                    this.props.handleChangeTable({ data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.props.data[cellInfo.index][cellInfo.column.id]
                }}
            />
        )
    }

    renderPreisNetto(cellInfo) {
        return (
            <div
                className="renderedField"
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    var data = [...this.props.data];
                    data[cellInfo.index][cellInfo.column.id] = this.round(e.target.innerHTML);
                    data = this.updateBrutto(cellInfo, data);
                    this.props.handleChangeTable({ data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.props.data[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }

    renderEditable(cellInfo) {
        return (
            <div
                className="renderedField"
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.props.data];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.props.handleChangeTable({ data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.props.data[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }

    render() {
        const position = Object.keys(this.props.headers)[0];
        const menge = Object.keys(this.props.headers)[1];
        const kursname = Object.keys(this.props.headers)[2];
        const teilnehmername = Object.keys(this.props.headers)[3];
        const preisnetto = Object.keys(this.props.headers)[4];
        const mwst = Object.keys(this.props.headers)[5];
        const prozentsatzMwst = Object.keys(this.props.headers)[6];
        const preisbrutto = Object.keys(this.props.headers)[7];

        const data = this.props.data;
        const columns = [{
            Header: this.props.headers.Position,
            Cell: this.renderNotEditablePosition,
            id: position,
            accessor: position,
            Footer: 'Gesamt',
            getFooterProps: () => ({ style: { fontWeight: 'bold' } })
        }, {
            Header: this.props.headers.Menge,
            Cell: this.renderMenge,
            id: menge,
            accessor: menge,
        }, {
            Header: this.props.headers.Kursname,
            Cell: this.renderEditable,
            id: kursname,
            accessor: kursname,
        }, {
            Header: this.props.headers.Teilnehmername,
            Cell: this.renderEditable,
            id: teilnehmername,
            accessor: teilnehmername,
        }, {
            Header: this.props.headers.PreisNetto,
            Cell: this.renderPreisNetto,
            id: preisnetto,
            accessor: preisnetto,
            Footer: parseFloat(this.props.sums.NettoSum).toFixed(2),
            getFooterProps: () => ({ style: { fontWeight: 'bold' } })
        },
        {
            Header: this.props.headers.Mwst,
            id: mwst,
            Cell: this.renderNotEditable,
            accessor: mwst,
            Footer: this.props.sums.MwstSum
        },
        {
            Header: this.props.headers.ProzentsatzMwst,
            id: prozentsatzMwst,
            Cell: this.renderPreisNetto,
            accessor: prozentsatzMwst,
        },
        {
            Header: this.props.headers.PreisBrutto,
            id: preisbrutto,
            Cell: this.renderNotEditable,
            accessor: preisbrutto,
            Footer: parseFloat(this.props.sums.BruttoSum).toFixed(2),
            getFooterProps: () => ({ style: { fontWeight: 'bold' } })
        },
        {
            Header: "",
            id: "delete",
            Cell: this.renderDelete,
            accessor: "delete",
        }
        ]
        return (
            <div className="con-button">
                <div className="con-table">
                    <ReactTable
                        className="table"
                        showPagination={false}
                        minRows={0}
                        data={data}
                        columns={columns}
                    />
                </div>
                <Button className="plus" onClick={this.props.addRow}>
                    <Plus className="plus-img" />
                </Button>
            </div>

        );
    }
}

export default TableForm;