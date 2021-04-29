import { useState } from "react";
import ComplaintDetails from "./ComplaintDetails"
import ComplaintsList from "./ComplaintsList"
import Model from "./Model";

const Complaints = () => {
  const [selectedImg, setSelectedImg] = useState(null)
  return ( 
    <div className="complaints-page split-container-2-7">
      <ComplaintsList/>
      <ComplaintDetails setSelectedImg={setSelectedImg}/>
      {selectedImg && <Model selectedImg = {selectedImg} setSelectedImg={setSelectedImg}/> }
    </div>
   );
}
 
export default Complaints;