import React from 'react';
import './App.css';
// import './Props.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


// import Header from './components/Header/Header';
// import Navbar from './components/Navbar/Navbar';
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
import AdminForgotPassword from './components/Admin/AdminForgotPassword/AdminForgotPassword';
import AdminDashboard from './components/Admin/AdminDashboard/AdminDashboard';
import Userlist from './components/Admin/Userlist/Userlist';
import Carlist from './components/Admin/Carlist/Carlist';
import Reportlist from './components/Admin/Reportlist/Reportlist'
import EditAdminProfile from './components/Admin/AdminProfile/EditAdminProfile'; 
import ResetAdminPassword from './components/Admin/AdminResetPassword/AdminResetPassword';


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
        {/* <Route exact path="/admin/forgotpassword" component={AdminForgotPassword} /> */}
        <Route exact path="/admin/dashboard" component={AdminDashboard} />
        <Route exact path="/admin/users" component={Userlist} />
        <Route exact path="/admin/cars" component={Carlist} />
        <Route exact path="/admin/carreports" component={Reportlist} />
        <Route exact path="/admin/profile" component={EditAdminProfile} />
        <Route exact path="/resetAdminPassword/:id" component={ResetAdminPassword} />
        <Route exact path="/admin/forgotPassword" component={AdminForgotPassword} />


      </Switch>





    </BrowserRouter>


  );
}

export default App;
