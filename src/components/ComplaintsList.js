import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { GrPrevious, GrNext } from 'react-icons/gr'
import useFetch from '../server/useFetch';
import { MdLocationOn } from 'react-icons/md';

const ComplaintsList = ({filterQ}) => {

  const limitValues = [5,10,25,50,100]
  const history = useHistory()
  const {id} = useParams()
  const click = (x) =>{
    history.replace(`/complaints/${x}`)
  }
  const [skip,setSkip] = useState(0)
  const [limit,setLimit] = useState(10)

  const [nextDisable,setNextDisable] = useState(false)
  const [prevDisable,setPrevDisable] = useState(true)
  const [fLink,setFlink] = useState()
  const {data:complaints,isPending,error} = useFetch(fLink,id)

  useEffect(() => {
    reset()
  },[filterQ])

  useEffect(()=>{
    let link = `http://localhost:3000/admin/complaints?${filterQ}skip=${skip}&limit=${limit}&`
    setFlink(link)
  },[filterQ, skip, limit])
  
  useEffect(()=>{
    if(error === 'No Data Found'){
      if(skip > limit){
        setSkip(skip-limit)
        setNextDisable(true)
      }else if(skip >= 0){
        setSkip(0)
        setNextDisable(true)
        setPrevDisable(true)
      }if(skip < 0){
        setSkip(0)
        setPrevDisable(true)
      }
    }
  },[error,skip,limit])

  useEffect(()=>{
    if(complaints && complaints.length < limit){
      setNextDisable(true)
    }
  },[complaints,limit])

  const next = () =>{
    setSkip(skip+limit)
    setPrevDisable(false)
  }

  const previous = () => {
    setNextDisable(false)
    if (skip > limit){
      setSkip(skip-limit)
    }else if(skip >= 0){
      setSkip(0)
      setPrevDisable(true)
    }
  }
  
  const reset = () => {
    setPrevDisable(true)
    setNextDisable(false)
    setSkip(0)
  }

  const getLocation = (loc) =>{
    try{
      JSON.parse(loc)
      return ( <> <MdLocationOn/>Location </>)
    }catch{
      return loc;
    }
  }

  return (
    <div className="complaint-list-container">
      <div className="complaint-list" >
        {isPending && <div className="loader">Loading...</div> }
        {error && <div className="loader">{error}</div> }
        {!complaints && !isPending && !error && <div className="loader">No Data Found</div> }
        {complaints && complaints.map((complaint)=>(
          <div className="complaint-preview link" onClick={()=>{click(complaint.complaint_id)}} key={complaint.complaint_id}>
          {/* <div className={`complaint-preview link ${complaint.status.split(" ").join("-")}`} onClick={()=>{click(complaint.complaint_id)}} key={complaint.complaint_id}>*/}
            <p>{getLocation(complaint._location)}</p>
            <h3 className={`${complaint.status.split(" ").join("-")}`}>{complaint.status}</h3>
            <p> {new Date(complaint.created_time).toLocaleString()}</p>
          </div>
        ))}
      </div>
      <div className="bottom-nav">
        <button onClick={()=>{previous()}} disabled={prevDisable || isPending}><GrPrevious className='react-icons'/></button>
        <select id="1" value={limit} onChange={(e)=>{setLimit(parseInt(e.target.value));reset()}}>
          {limitValues && limitValues.map((v)=>(
            <option value={v} key={v}>{v}</option>
          ))}
        </select>
        <button onClick={()=>{next()}} disabled={nextDisable || isPending}><GrNext className='react-icons'/></button>
      </div>
    </div>
   );
}
 
export default ComplaintsList;