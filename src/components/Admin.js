import { useParams } from 'react-router';
import axios from 'axios'
import ComplaintDetails from './ComplaintDetails';
import ComplaintsList from './ComplaintsList';
import Stats from './Stats';
axios.defaults.withCredentials = true;
const Admin = () => {
  const {id} = useParams()
  return (
    <div className="admin">
      <div className="split-container-2-7">
        <ComplaintsList/>
        {!id && <Stats/>  }
        {id && <ComplaintDetails/>}
      </div>
    </div>
   );
}
 
export default Admin;