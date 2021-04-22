import { useParams } from 'react-router';
import useFetch from '../server/useFetch';
import ComplaintDetails from './ComplaintDetails';
import ComplaintsList from './ComplaintsList';

const Admin = () => {
  const {id} = useParams()
  const {data:complaints,isPending,error} = useFetch('http://localhost:8000/complaints')

  return (
    <div className="admin">
      {isPending && <div>"Loading..."</div>}
      {error && <div>{error}</div>}
      <div className="split-container">
        {!complaints && <div className="complaint-list split-child-1"></div> }
        {complaints && <ComplaintsList complaints={complaints}/>}
        {!id && <div className="complaint-details split-child-2">Select a complaint to edit</div>}
        {id && <ComplaintDetails/>}
      </div>
    </div>
   );
}
 
export default Admin;