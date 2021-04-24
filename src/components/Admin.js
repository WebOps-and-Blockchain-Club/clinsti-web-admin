import { useParams } from 'react-router';
import axios from 'axios'
import ComplaintDetails from './ComplaintDetails';
import ComplaintsList from './ComplaintsList';
import PieChart from './PieChart';
axios.defaults.withCredentials = true;
const Admin = () => {
  const {id} = useParams()
  return (
    <div className="admin">
      <div className="split-container">
        <ComplaintsList/>
        {!id && <PieChart/>  }
        {id && <ComplaintDetails/>}
      </div>
    </div>
   );
}
 
export default Admin;