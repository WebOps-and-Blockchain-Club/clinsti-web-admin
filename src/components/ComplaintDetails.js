import { useParams } from 'react-router';
import useFetch from '../server/useFetch';

const ComplaintDetails = () => {
  const {id} = useParams()
  const {data:complaint,isPending,error} = useFetch(`http://localhost:8000/complaints/${id}`)
  return (
    <div className="complaint-details split-child-2">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {complaint &&
        <div>
          <h2>{complaint.complaint_id}</h2>
          <p>{complaint.location}</p>
          <p>{complaint.description}</p>
          <p>{complaint.status}</p>
          <p>{complaint.created_time}</p>
          <p>User by -{complaint.user_id}</p>
          <button>Update</button>
        </div>
      }
    </div>
   );
}

export default ComplaintDetails;