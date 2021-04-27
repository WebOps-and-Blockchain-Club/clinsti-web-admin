import { useParams } from 'react-router';
import axios from 'axios'
import ComplaintDetails from './ComplaintDetails';
import ComplaintsList from './ComplaintsList';
import Model from './Model';
import Stats from './Stats';
import FeedbackList from './FeedbackList';
import { useState } from 'react';

axios.defaults.withCredentials = true;
const Admin = () => {
  const [selectedImg, setSelectedImg] = useState(null)
  const {id} = useParams()
  return (
    <div className="admin">
      {id && id === "feedback" && <FeedbackList/>}
      {(!id || (id && id !== "feedback" )) && 
        <div className="split-container-2-7">
          <ComplaintsList/>
          {!id && <Stats/>  }
          {id &&  <ComplaintDetails setSelectedImg={setSelectedImg}/>}
        </div>
      }
      {selectedImg && <Model selectedImg = {selectedImg} setSelectedImg={setSelectedImg}/> }
    </div>
   );
}
 
export default Admin;