import Home from './components/Home';
import { useContext } from 'react';
import Navbar from './components/Navbar';
import AuthContext from './server/authContext';
import {BrowserRouter, Route,Switch} from 'react-router-dom'
import SignIn from './components/SignIn';
import Complaints from './components/Complaints';
import FeedbackList from './components/FeedbackList';
import axios from 'axios'
import Verify from './components/Verify';
axios.defaults.withCredentials = true;


function Router() {
  const {loggedIn} = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Navbar/>
      <div className="content">
        {!loggedIn && 
          <Switch>
            <Route path="/verify/:token" >
              <Verify/>
            </Route>
            <Route path="/" >
              <SignIn/>
            </Route>
          </Switch>
        }
        {loggedIn &&
          <Switch>
            <Route path="/complaints/:id">
              <Complaints/>
            </Route>
            <Route path="/complaints">
              <Complaints/>
            </Route>
            <Route exact path="/feedback">
              <FeedbackList/>
            </Route>
            <Route path="/" >
              <Home/>
            </Route>
          </Switch>
        }
      </div>
    </BrowserRouter>
  )
}

export default Router