import { useState } from 'react';
import FilterComplaints from "./complaint-filter";
import ComplaintDetails from "./ComplaintDetails"
import ComplaintsList from "./ComplaintsList"
import Model from "./Model";

const Complaints = () => {
  const [selectedImg, setSelectedImg] = useState(null)
  const [filterQ, setFilterQ ] = useState()

  return ( 
    <div className="complaints-page">
      <FilterComplaints setFilterQ={setFilterQ}/>
      <div className="complaints">
        <ComplaintsList filterQ={filterQ}/>
        <ComplaintDetails setSelectedImg={setSelectedImg}/>
      </div>
      {selectedImg && <Model selectedImg = {selectedImg} setSelectedImg={setSelectedImg}/> }
    </div>
   );
}
 
export default Complaints;