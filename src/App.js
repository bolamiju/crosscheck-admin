import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import AdminContent from "./components/admin/AdminContent";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
       <Route exact path="/" component={AdminContent} />
       <Route exact path="/requests" component={AdminContent} />
   </Router>
  );
}

export default App;
