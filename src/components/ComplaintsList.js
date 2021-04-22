import { Link } from "react-router-dom";

const ComplaintsList = ({complaints}) => {
  return ( 
    <div className="complaint-list split-child-1">
      {complaints.map((complaint)=>(
        <Link to = {`/${complaint.complaint_id}`} key={complaint.complaint_id}>
          <div className="complaint-preview" >
            <h2>{complaint.complaint_id}</h2>
            <p>{complaint.status}</p><p> {complaint.created_time}</p>
          </div>
        </Link>
      ))}
    </div>
   );
}
 
export default ComplaintsList;