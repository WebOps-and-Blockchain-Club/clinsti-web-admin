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
      {!id && <div>Select a complaint</div> }
      {id && <div>
        {error && <div>{error}</div>}
        {isPending && <div>Loading...</div>}
        {complaint &&
          <div className="comp-2">
            <h2>Complaint ID: {complaint.complaint_id}</h2>
            <div></div>
            <div className="complaint-status">
              <p>status - <select id="1" value={status} onChange={changeStatus}>
                  {statusValues && statusValues.map((st) => (
                    <option value={st} key={st}>{st}</option>
                  ))}
                </select>
              </p>
              <p>remark - <input type="text" name="remark" value={remark} onChange={changeRemark} placeholder={"write remark"}/></p>
              <button onClick={()=>{upDate()} } disabled={!update}>Update</button>
            </div>
            <div className="complaint-details">
              <div className="comp-1">
                <p>Location - {complaint._location}</p>
                <p>Description - {complaint.description}</p>
                <p>posting time - {new Date(complaint.created_time).toLocaleString()}</p>
                <p>feedback_rating - {complaint.feedback_rating}</p>
                <p>feedback_remark - {complaint.feedback_remark}</p>
                <p>Waste type - {complaint.waste_type}</p>
                <p>Zone - {complaint.zone}</p>
                {complaint.status === "Work completed" && <p>completing time-{new Date(complaint.completed_time).toLocaleString()}</p>}
                <p>{eRror}</p>
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