import React from 'react';
import './App.css';
// import './Props.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


// import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Forgotpassword from './components/Forgotpassword/Forgotpassword';
import Sellcar from './components/Sellcar/Sellcar';
import Cardetail from './components/Cardetail/Cardetail';
// import Navbar2 from './components/Navbar/Navbar2';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      {/* <Navbar2 /> */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/sellcar" component={Sellcar}  />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/Forgotpassword" component={Forgotpassword} />
        <Route exact path="/cardetails" component={Cardetail} />
        {/* <Route exact path="/" component={} /> */}

        


      </Switch>
    </BrowserRouter>
  );
}

export default App;
 