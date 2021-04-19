import React from 'react';
import { Provider } from "react-redux";
import store from "./store";
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import AdminContent from "./components/admin/AdminContent";
import Institutions from './components/admin/ManageInstitutions'
import Login from './components/admin/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';

function App() {
  
  const withAuthCheck = (Component, props) => {
    if (JSON.parse(localStorage.getItem("user"))) {
      return <Component {...props} />;
    }
    return <Redirect to="/login" />;
  };
  return (
    <Provider store={store}>
      <Router>
       <Route exact path="/dashboard" component={AdminContent} />
       <Route exact path="/requests" component={AdminContent} />
       <Route exact path="/transcript" component={AdminContent} />
       <Route exact path="/education" component={AdminContent} />
       <Route exact path="/history" component={AdminContent} />
       <Route exact path="/check" component={AdminContent} />
       <Route exact path="/institutions" component={AdminContent}/>
       <Route exact path="/users" component={AdminContent}/>
       <Route exact path="/login" component={Login}/>
   </Router>
    </Provider>
  );
}

export default App;
