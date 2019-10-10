import React, { Component } from 'react';

import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond/dist/filepond.min.css';

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";


import 'react-dropzone-uploader/dist/styles.css'
import '../assets/Welcome.css'
import '../../node_modules/react-bootstrap/dist/bootstrap.min.css'

registerPlugin(FilePondPluginFileValidateType);

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.convertCSVtoJSon = this.convertCSVtoJSon.bind(this)
    }

    convertCSVtoJSon(newFile) {
        var file = newFile
        if (file !== undefined && file.type === "text/csv") {
            var Papa = require("csv-hero");
            Papa.parse(file).then(csv => 
            this.props.history.push({
                pathname: '/imports',
                state: { csv: csv }
            }))
        }
    }


    render() {
        return (
            <div>
                <div className="upload-con">
                    <div className="upload-menu">
                        <div className="upload-menu-top">
                            <FilePond
                                className="filepond"
                                acceptedFileTypes="text/csv"
                                labelIdle={`Drag & Drop die CSV-Datei oder <span class="filepond--label-action">durchsuchen</span>`}
                                allowMultiple={false}
                                onupdatefiles={(fileItems) => {
                                    var file = fileItems.map(fileItem => fileItem.file)[0];
                                    this.convertCSVtoJSon(file);
                                }}
                                // saves the file into this.pond. You can get the file with this.pond.getFile().file
                                // ref={ref => this.pond = ref} 
                                />
                        </div>
                        <div className="upload-menu-bottom">
                            <Link to="/neu" >
                                <button type="button" className="upload-btn">
                                    Neue Rechnung erstellen
                        </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

export default Welcome;