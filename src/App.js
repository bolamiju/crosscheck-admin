import React from 'react';
import { Provider } from "react-redux";
import store from "./store";
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import AdminContent from "./components/admin/AdminContent";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
       <Route exact path="/" component={AdminContent} />
       <Route exact path="/requests" component={AdminContent} />
   </Router>
    </Provider>
  );
}

export default App;
