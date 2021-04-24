import axios from 'axios';
import { AuthContextProvider } from './server/authContext';
import Router from './Router';
axios.defaults.withCredentials=true;
function App() {
  return (
    <AuthContextProvider>
      <Router/>
    </AuthContextProvider>
  );
}

export default App;
