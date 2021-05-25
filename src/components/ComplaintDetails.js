import { useHistory, useParams } from 'react-router';
import useFetch from '../server/useFetch';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ComplaintDetails = ({setSelectedImg}) => {
  const statusValues = [
    "Pending transmission",
    "Work is pending",
    "Work in progress",
    "Work completed",
    "Closed with due justification"
  ]
  const {id} = useParams()
  const history = useHistory()
  const {data:complaint,isPending,error} = useFetch(`http://localhost:3000/admin/complaints/${id}`)
  const [status,setStatus] = useState('posted')
  const [remark,setRemark] = useState('')
  const [update,setUpdate] = useState(false)
  const [eRror,setError] = useState("")

  const upDate = async ()=>{
    setError('')
    let dt
    if(remark!== "" || (complaint.admin_remark && remark !== complaint.admin_remark)){
      dt = {status,remark}
    }else{dt = {status}}
    await axios.patch(`http://localhost:3000/admin/complaints/${id}`,dt).then(()=>{
      history.replace('/')
      history.replace(`/complaints/${id}`)
    }).catch((e)=>{
      if(e.response.status === 400 && e.response.data){
        setError(e.response.data)
      }
    })
  }
  
  useEffect(()=>{
    if(complaint){
      setRemark(complaint.admin_remark ?? "")
      setStatus(complaint.status)
   }
  },[complaint])

  const changeRemark = (e) =>{
    setRemark(e.target.value)
    setUpdate(true)
  }

  const changeStatus = (e) =>{
    setStatus(e.target.value)
    setUpdate(true)
  }

  return (
    <div className="complaint-container">
      {!id && <div className="loader">Select a complaint</div> }
      {id && <div>
        {error && <div className="loader">{error}</div>}
        {isPending && <div className="loader">Loading...</div>}
        {complaint &&
          <div className="complaint-cont-2">
            <h2>Complaint ID: {complaint.complaint_id}</h2>
            <div></div>
            <div className="complaint-status">
              <p>Status - <select id="1" value={status} onChange={changeStatus}>
                  {statusValues && statusValues.map((st) => (
                    <option value={st} key={st}>{st}</option>
                  ))}
                </select>
              </p>
              <p>Remark - <textarea type="text" name="remark" value={remark} onChange={changeRemark} placeholder={"write remark"}/></p>
              <button onClick={()=>{upDate()} } disabled={!update}>Update Status</button>
            </div>
            <div className="complaint-details">
              <div className="complaint-description">
                <p>Location</p>
                <p>{complaint._location}</p>
                <p>Zone</p>
                <p>{complaint.zone}</p>
                <p>Description</p>
                <p>{complaint.description}</p>
                <p>Waste Type</p>
                <p>{complaint.waste_type}</p>
                <p>Posted Time</p>
                <p>{new Date(complaint.created_time).toLocaleString()}</p>
                {complaint.status === "Work completed" && <p>Complaint Solved Time</p>}
                {complaint.status === "Work completed" && <p>{new Date(complaint.completed_time).toLocaleString()}</p>}
                {complaint.status === "Closed with due justification" && <p>Complaint Closed Time</p>}
                {complaint.status === "Closed with due justification" &&  <p>{new Date(complaint.completed_time).toLocaleString()}</p>}
                {complaint.feedback_rating && <p>Feedback Rating</p>}
                {complaint.feedback_rating && <p>
                  {complaint.feedback_rating === 1 && <p>&#9733; &#9734; &#9734; &#9734; &#9734;</p>}
                  {complaint.feedback_rating === 2 && <p>&#9733; &#9733; &#9734; &#9734; &#9734;</p>}
                  {complaint.feedback_rating === 3 && <p>&#9733; &#9733; &#9733; &#9734; &#9734;</p>}
                  {complaint.feedback_rating === 4 && <p>&#9733; &#9733; &#9733; &#9733; &#9734;</p>}
                  {complaint.feedback_rating === 5 && <p>&#9733; &#9733; &#9733; &#9733; &#9733;</p>}
                </p>}
                {complaint.feedback_remark && <p>Feedback Remark</p>}
                {complaint.feedback_remark && <p>{complaint.feedback_remark}</p>}
                {eRror && <p>{eRror}</p>}
              </div>
              <div className="complaint-img">
                {complaint.images && 
                complaint.images.map((img)=>(
                  <img alt={'img'} style={{padding:5}} width={200} 
                  src={`http://localhost:3000/admin/images/${complaint.user_id}_${img}`}
                  onClick={()=>{setSelectedImg(`http://localhost:3000/admin/images/${complaint.user_id}_${img}`)}} 
                  key={img}></img>
                ))}
              </div>
            </div>
          </div>
        }
      </div>}
    </div>
   );
}

export default ComplaintDetails;