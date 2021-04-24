
import { useContext } from 'react';
import AuthContext from '../server/authContext';
import { useHistory} from 'react-router';

const Navbar = () => {
  const {loggedIn,signOut}= useContext(AuthContext);
  const history = useHistory()

  const logout = async() =>{
    await signOut()
    history.replace('/')
  }

  const home = async() =>{
    history.replace('/')
  }


  return (
    <nav className="navbar">
      <h1 className = "link" onClick = {()=>home()}>CLinsti</h1>
      {loggedIn &&
        <div className="links">
          <span className="link" onClick = {()=>home()}> Home </span>
          <span className="link" onClick={()=>logout()}>Logout</span>
        </div>
      }
    </nav>
   );
}
 
export default Navbar;