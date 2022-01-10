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
import MyCars from './components/Account/MyCars';
import EditCarDetails from './components/Account/EditCarDetails';
import EditProfile from './components/Account/EditProfile';
import Resetpassword from './components/Resetpassword/Resetpassword';


//admin
import AdminLogin from './components/Admin/AdminLogin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard/AdminDashboard';
import Userlist from './components/Admin/Userlist/Userlist';
import Carlist from './components/Admin/Carlist/Carlist';
import Reportlist from './components/Admin/Reportlist/Reportlist'


function App() {
  return (
    <BrowserRouter>



      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/sellcar" component={Sellcar} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/Forgotpassword" component={Forgotpassword} />
        <Route exact path="/cardetails" component={Cardetail} />
        <Route exact path="/account" component={MyCars} />
        <Route exact path="/account/mycar/:id" component={EditCarDetails} />
        <Route exact path="/account/editprofile" component={EditProfile} />
        <Route exact path="/resetPassword/:id" component={Resetpassword} />


        <Route exact path="/admin" component={AdminDashboard} />
        <Route exact path="/admin/login" component={AdminLogin} />
        <Route exact path="/admin/dashboard" component={AdminDashboard} />
        <Route exact path="/admin/users" component={Userlist} />
        <Route exact path="/admin/cars" component={Carlist} />
        <Route exact path="/admin/carreports" component={Reportlist} />

      </Switch>





    </BrowserRouter>


  );
}

export default App;
