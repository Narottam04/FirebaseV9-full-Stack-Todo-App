import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import './App.css';
import Todo from './Pages/todo/Todo';
import Login from './Pages/login/Login'

import Signup from './Pages/signup/Signup';
import { AuthProvider } from './Context/AuthContext';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './Pages/forgotPassword/ForgotPassword';
import UpdateProfile from './Pages/updateProfile/UpdateProfile';
function App() {
  return (

    <Router>
        <AuthProvider>
          <Switch>
            <Route exact path = "/" component = {Login}></Route>
            <Route exact path = "/forgotpassword" component = {ForgotPassword}></Route>
            <Route exact path = "/signup" component = {Signup}></Route>
            <PrivateRoute exact path = "/app" component = {Todo}></PrivateRoute>
            <PrivateRoute exact path = "/updateProfile" component = {UpdateProfile}></PrivateRoute>
          </Switch>
        </AuthProvider>
      </Router>
  );
}

export default App;
