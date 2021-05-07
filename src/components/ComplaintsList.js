import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import useFetch from '../server/useFetch'
const fileDownload = require('js-file-download')

const ComplaintsList = () => {
  const zoneValues = [
    "Academic Zone",
    "Hostel Zone",
    "Residential Zone"
  ]
  const statusValues = [
    "Pending transmission",
    "Work is pending",
    "Work in progress",
    "Work completed",
    "Closed with due justification"
  ]
  const limitValues = [5,10,25,50,100]
  const history = useHistory()
  const {id} = useParams()
  const click = (x) =>{
    history.replace(`/complaints/${x}`)
  }
  const [skip,setSkip] = useState(0)
  const [limit,setLimit] = useState(10)
  const [zone,setZone] = useState(new Set())
  const [sDate,setSDate] = useState("2021-01-01")
  const [eDate,setEDate] = useState("")
  const [status,setStatus] = useState(new Set())
  const [nextDisable,setNextDisable] = useState(false)
  const [prevDisable,setPrevDisable] = useState(true)
  const [fLink,setFlink] = useState()
  const {data:complaints,isPending,error} = useFetch(fLink,id)

  useEffect(()=>{
    let link = 'http://localhost:3000/admin/complaints?'
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
    if(zone.size){
      link += `zone=${[...zone].join(',')}&`
    }
    if(status.size){
      link += `status=${[...status].join(',')}&`
    }
    setFlink(link)
  },[skip,limit,zone,sDate,eDate,status])
  
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
  
  const reset = () =>{
    setPrevDisable(true)
    setNextDisable(false)
    setSkip(0)
  }

  const zoneCheck = (e) =>{
    reset()
    if(e.target.checked){
      let x = new Set(zone)
      x.add(e.target.name)
      setZone(x)
    }else{
      let x = new Set(zone)
      x.delete(e.target.name)
      setZone(x)
    }
  }

  const statusCheck = (e) =>{
    reset()
    if(e.target.checked){
      let x = new Set(status)
      x.add(e.target.name)
      setStatus(x)
    }else{
      let x = new Set(status)
      x.delete(e.target.name)
      setStatus(x)
    }
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

  const Report = () =>{
    let link = 'http://localhost:3000/admin/report?'
    if(sDate){
      link += `dateFrom=${sDate}&`
    }
    if(eDate){
      link += `dateTo=${eDate}&`
    }
    if(zone.size){
      link += `zone=${[...zone].join(',')}&`
    }
    if(status.size){
      link += `status=${[...status].join(',')}&`
    }
    axios.get(link).then((v)=>{
      fileDownload(v.data,`Report-${new Date().toJSON()}.csv`)
    }).catch((e)=>{
      console.log(e)
    })
  }

  return (
    <div className="complaint-list-container">
      <div className="sdate-select">
        <input type="date" onChange={dateCheck} name="sDate" value={sDate}/>
      </div>
      <div className="zone-select">
        {zoneValues && zoneValues.map((zn)=>(
          <p key={zn}><input type="checkbox" onChange={zoneCheck} name={zn}/>{zn}</p>
        ))}
      </div>
      <select id="1" value={limit} onChange={(e)=>{setLimit(parseInt(e.target.value));reset()}}>
        {limitValues && limitValues.map((v)=>(
          <option value={v} key={v}>{v}</option>
        ))}
      </select>
      <button onClick={()=>{previous()}} disabled={prevDisable || isPending}>prev</button>
      <button onClick={()=>{next()}} disabled={nextDisable || isPending}>next</button>
      <div className="status-select">
        {statusValues && statusValues.map((st)=>(
        <p  key={st}><input type="checkbox" onChange={statusCheck} name={st}/>{st}</p>
        ))}
      </div>
      <div className="edate-select">
        <input type="date" onChange={dateCheck} name="eDate" value={eDate}/>
      </div>
      <button onClick={()=>{Report()}}>Print All</button>

      {isPending && <div>Loading...</div> }
      {error && <div>{error}</div> }
      {!complaints && !isPending && !error && <div>No Data Found</div> }
      <div className="complaint-list" >
        {complaints && complaints.map((complaint)=>(
          <div className={`complaint-preview link ${complaint.status.split(" ").join("-")}`} onClick={()=>{click(complaint.complaint_id)}} key={complaint.complaint_id}>
            <p>{complaint._location}</p>
            <p>{complaint.status}</p>
            <p> {new Date(complaint.created_time).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
   );
}
 
export default ComplaintsList;