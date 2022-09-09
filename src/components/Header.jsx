import React from "react";
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import Transfert from "./Transfert";
import Home from './Home'


export default function Header() {
  return (
    <Router>
      <div>
        <nav className=" navbar navbar-dark bg-dark">
            <form className="container-fluid justify-content-start head">
              <Link to="/" type="button" className="btn btn-outline-success me-2">Home</Link>

              <Link to="/transfert" type="button" className="btn btn-outline-success me-2">Transfert</Link>
            
            </form>
        </nav>

        <Routes>

          <Route exact path="/" element={<Home/>}/>
          <Route path="/transfert" element={<Transfert/>}/>
          
        </Routes>

      </div>
    </Router>
  );
}

