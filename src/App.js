import React from 'react';

import './assets/Rechnung.css';
import './App.css';
import './assets/Navbar.css';
import '../node_modules/react-bootstrap/dist/bootstrap.min.css'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavMenu from './components/NavMenu';

import Export from './components/Export';
import AllExports from './components/AllExports';
import Welcome from './components/Welcome';

const App = () => (<div className="App">

  <Router>
  <NavMenu className="navbar navbar-title" />
    <Route exact path="/" component={Welcome} />
    <Route path="/imports" exact component={AllExports} />
    <Route path="/neu" exact component={AllExports} />
  </Router>

</div>);


export default App;

