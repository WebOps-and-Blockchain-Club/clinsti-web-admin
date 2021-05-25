import { useEffect, useState } from "react";
import useFetch from "../server/useFetch";

const FeedbackList = () => {

  const feedbackValues = [
    "Engineering Unit",
    "Administration",
    "App development team"
]
  
  const [skip,setSkip] = useState(0)
  const [limit,setLimit] = useState(10)
  const [type,setType] = useState(new Set())
  const [sDate,setSDate] = useState("2021-01-01")
  const [eDate,setEDate] = useState("")
  const [nextDisable,setNextDisable] = useState(false)
  const [prevDisable,setPrevDisable] = useState(true)
  
  const [fLink,setFlink] = useState()
  const {data:feedback,isPending,error} = useFetch(fLink)
  useEffect(()=>{
    let link = 'http://localhost:3000/admin/feedback?'
    if(skip){
      link +=  `skip=${skip}&`
    }
    if(limit){
      link += `limit=${limit}&`
    }
    if(sDate){
      link += `dateFrom=${sDate}&`
    }
    if(eDate){
      link += `dateTo=${eDate}&`
    }
    if(type.size){
      link += `feedback_type=${[...type].join(',')}&`
    }
    setFlink(link)
  },[skip,limit,type,sDate,eDate])

  
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

  
  const reset = () =>{
    setPrevDisable(true)
    setNextDisable(false)
    setSkip(0)
  }

  const dateCheck = (e) =>{
    reset()
    if(e.target.name === "sDate"){
      if(eDate && eDate <e.target.value){
        setSDate(eDate)
      }else{
        setSDate(e.target.value)
      }
    }else if(e.target.name === "eDate"){
      if(sDate && sDate > e.target.value){
        setEDate(sDate)
      }else{
        setEDate(e.target.value)
      }
    }
  }
  
  const typeCheck = (e) =>{
    reset()
    if(e.target.checked){
      let x = new Set(type)
      x.add(e.target.name)
      setType(x)
    }else{
      let x = new Set(type)
      x.delete(e.target.name)
      setType(x)
    }
  }

  return (
    <div className="feedback-page">
      <div className="feedback-filter">
        <div>From</div>
        <input type="date" onChange={dateCheck} name="sDate" value={sDate}/>
          <div>to</div>
        <input type="date" onChange={dateCheck} name="eDate" value={eDate}/>
        <div className="dropdown">
          <button className="dropbtn">Filter by Feedback Type &#9662;</button>
          <div className="dropdown-content">
            {feedbackValues && feedbackValues.map((fb)=>(
              <p key={fb}><input type="checkbox" onChange={typeCheck} name={fb}/>{fb}</p>
            ))}
          </div>
        </div>
        <select id="1" value={limit} onChange={(e)=>{setLimit(parseInt(e.target.value));reset()}}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <button onClick={()=>{previous()}} disabled={prevDisable || isPending}>Prev</button>
        <button onClick={()=>{next()}} disabled={nextDisable || isPending}>Next</button>
      </div>
      <div className="feedback-list">
        {isPending && <div className="loader">Loading ... </div> }
        {error && <div className="loader">{error}</div> }
        {!isPending && !error && !feedback &&
          <div className="loader">No Feedback yet</div>
        }
        {
          feedback && 
          feedback.map((fd) =>(
            <div className="feedback" key={fd.feedback_id}>
              <span>{fd.feedback_type}</span>
              <span>{fd.feedback}</span>
              <span>{new Date(fd.created_time).toLocaleString()}</span>
            </div>
          ))
        }
      </div>
    </div>
   );
}
 
export default FeedbackList