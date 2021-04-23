import { Link } from "react-router-dom";

const ComplaintsList = ({complaints}) => {
  return ( 
    <div className="complaint-list split-child-1">
      {complaints.map((complaint)=>(
        <Link to = {`/${complaint.id}`} key={complaint.id}>
          <div className={`complaint-preview  ${complaint.status}`} >
            <p>{complaint.location}</p>
            <p>{complaint.status}</p>
            <p> {complaint.created_time}</p>
          </div>
        </Link>
      ))}
    </div>
   );
}
 
export default ComplaintsList;