import React from 'react';
import { Provider } from "react-redux";
import store from "./store";
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import AdminContent from "./components/admin/AdminContent";
import Institution from './components/Institution'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
       <Route exact path="/" component={AdminContent} />
       <Route exact path="/requests" component={AdminContent} />
       <Route exact path="/transcript" component={AdminContent} />
       <Route exact path="/education" component={AdminContent} />
       <Route exact path="/history" component={AdminContent} />
       <Route exact path="/check" component={AdminContent} />
       <Route exact path="/instit" component={Institution} />
   </Router>
    </Provider>
  );
}

export default App;
