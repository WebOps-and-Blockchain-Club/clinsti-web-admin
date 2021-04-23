import Admin from './components/Admin';
import { useContext } from 'react';
import Navbar from './components/Navbar';
import AuthContext from './components/authContext';
import {BrowserRouter, Route,Switch} from 'react-router-dom'
import Settings from './components/Settings';
import SignIn from './components/SignIn';


function Router() {
  const {loggedIn} = useContext(AuthContext);
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <div className="content">
          {!loggedIn && 
            <Switch>
              <Route path="/" >
                <SignIn/>
              </Route>
            </Switch>
          }
          {loggedIn &&
            <Switch>
              <Route exact path="/" >
                <Admin/>
              </Route>
              <Route exact path="/settings">
                <Settings/>
              </Route>
              <Route exact path="/:id">
                <Admin/>
              </Route>
            </Switch>
          }
        </div>
      </div>
    </BrowserRouter>
  )
}

export default Router