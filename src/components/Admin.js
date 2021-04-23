import { useParams } from 'react-router';
import useFetch from '../server/useFetch';
import axios from 'axios'
import ComplaintDetails from './ComplaintDetails';
import ComplaintsList from './ComplaintsList';
import PieChart from './PieChart';
axios.defaults.withCredentials = true;
const Admin = () => {
  const {id} = useParams()
  const {data:complaints,isPending,error} = useFetch('http://localhost:8000/complaints')

  return (
    <div className="admin">
      {isPending && <div>"Loading..."</div>}
      {error && <div>{error}</div>}
      <div className="split-container">
        {!complaints && <div className="complaint-list split-child-1">Empty</div> }
        {complaints && <ComplaintsList complaints={complaints}/>}
        {!id && <PieChart/>  }
        {id && <ComplaintDetails/>}
      </div>
    </div>
   );
}
 
export default Admin;