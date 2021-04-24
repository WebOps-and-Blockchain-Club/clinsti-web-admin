import { useParams } from 'react-router';
import useFetch from '../server/useFetch';
import axios from 'axios';

const ComplaintDetails = () => {
  const {id} = useParams()
  const {data:complaint,isPending,error} = useFetch(`http://localhost:3000/admin/complaints/${id}`)
  const update = async ()=>{
    // await axios.patch(`http://localhost:3000/admin/complaints/${id}`,{
    //   status:"processing"
    // })
  }
  return (
    <div className="complaint-details split-child-2">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {complaint &&
        <div>
          <h2>{complaint.complaint_id}</h2>
          <p>{complaint._location}</p>
          <p>{complaint.description}</p>
          <p>{complaint.status}</p>
          <p>{complaint.created_time}</p>
          <p>User id -{complaint.user_id}</p>
          <button onClick={()=>{update()}}>Update</button>
        </div>
      }
    </div>
   );
}

export default ComplaintDetails;