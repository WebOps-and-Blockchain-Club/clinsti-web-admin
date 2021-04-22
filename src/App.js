import Admin from './components/Admin';
import Navbar from './components/Navbar';
import {BrowserRouter as Router , Route,Switch} from 'react-router-dom'
import Settings from './components/Settings';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <div className="content">
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
        </div>
      </div>
    </Router>
  );
}

export default App;
