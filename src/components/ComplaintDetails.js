import { useHistory, useParams } from 'react-router';
import useFetch from '../server/useFetch';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ComplaintDetails = ({setSelectedImg}) => {
  const {id} = useParams()
  const history = useHistory()
  const {data:complaint,isPending,error} = useFetch(`http://localhost:3000/admin/complaints/${id}`)
  const [status,setStatus] = useState('posted')
  const [remark,setRemark] = useState('')
  const [update,setUpdate] = useState(false)
  const upDate = async ()=>{
    await axios.patch(`http://localhost:3000/admin/complaints/${id}`,{
      status,remark
    })
    history.replace('/')
    history.replace(`${id}`)
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
    <div className="complaint-details split-child-2">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {complaint &&
        <div>
          <h2>{complaint.complaint_id}</h2>
          {complaint.images && 
            complaint.images.map((img)=>(
              <img alt={'img'} style={{padding:5}} width={200} 
              src={`http://localhost:3000/admin/images/${complaint.user_id}_${img}`}
              onClick={()=>{setSelectedImg(`http://localhost:3000/admin/images/${complaint.user_id}_${img}`)}} 
              key={img}></img>
            ))
          }
          <p>Location - {complaint._location}</p>
          <p>Description - {complaint.description}</p>
          <p>posting time - {new Date(complaint.created_time).toLocaleString()}</p>
          <p>feedback_rating - {complaint.feedback_rating}</p>
          <p>feedback_remark - {complaint.feedback_remark}</p>
          <p>Waste type - {complaint.waste_type}</p>
          <p>Zone - {complaint.zone}</p>
          <p>complete-time-{new Date(complaint.completed_time).toLocaleString()}</p>
          <p>status - <select id="1" value={status} onChange={changeStatus}>
              <option value="posted">posted</option>
              <option value="processing">processing</option>
              <option value="completed">completed</option>
              <option value="invalid_complaint">invalid complaint</option>
            </select>
          </p>
          <p>remark - <input type="text" name="remark" value={remark} onChange={changeRemark} placeholder={"write remark"}/></p>
          <button onClick={()=>{upDate()} } disabled={!update}>Update</button>
        </div>
      }
    </div>
   );
}

export default ComplaintDetails;