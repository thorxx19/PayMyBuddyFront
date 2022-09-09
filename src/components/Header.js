import React from "react";
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import FireComponents from './FireComponents'
import PersonsComponent from './PersonsComponent'
import Home from './Home'
import ChildrenComponent from './ChildrenComponent'


export default function Header() {
  return (
    <Router>
      <div>
        <nav className=" navbar navbar-dark bg-dark">
            <form className="container-fluid justify-content-start head">
              <Link to="/" type="button" className="btn btn-outline-success me-2">Home</Link>

              <Link to="/fire" type="button" className="btn btn-outline-success me-2">Fire</Link>
            
              <Link to="/children" type="button" className="btn btn-outline-primary me-2">Children</Link>
            
              <Link to="/persons" type="button" className="btn btn-outline-info">Persons</Link>
            </form>
        </nav>

        <Switch>
        <Route exact path="/">
            <Home />
        </Route>
        <Route path="/fire">
            <FireComponents />
        </Route>
        <Route path="/children">
            <ChildrenComponent />
        </Route>
        <Route path="/persons">
            <PersonsComponent />
        </Route>
        </Switch>

      </div>
    </Router>
  );
}

