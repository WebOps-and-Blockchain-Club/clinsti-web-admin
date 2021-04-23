import axios from 'axios';
import { useContext } from 'react';
import {Link} from 'react-router-dom'
import AuthContext from './authContext';

const Navbar = () => {
  const {loggedIn,getLoggedIn}= useContext(AuthContext);

  async function logout(){
    await axios.delete("http://localhost:3000/admin").then((res)=>{}).catch(()=>{});
    await getLoggedIn();
  }

  return (
    <nav className="navbar">
      <Link to="/"><h1>CLinsti</h1></Link>
      {loggedIn &&
        <div className="links">
          <Link to='/'>Home</Link>
          {/* <Link to='/settings'>Settings</Link> */}
          <button onClick={logout}>Logout</button>
        </div>
      }
    </nav>
   );
}
 
export default Navbar;