import axios from 'axios';
import { useEffect, useState } from 'react';
const fileDownload = require('js-file-download')

export default function FilterComplaints({setFilterQ}) {

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

  const [zone,setZone] = useState(new Set())
  const [sDate,setSDate] = useState("2021-01-01")
  const [eDate,setEDate] = useState("")
  const [status,setStatus] = useState(new Set())

  useEffect(() => {
    let filter = ''
    if(sDate) filter += `dateFrom=${sDate}&`
    if(eDate) filter += `dateTo=${eDate}&`
    if(zone.size) filter += `zone=${[...zone].join(',')}&`
    if(status.size) filter += `status=${[...status].join(',')}&`

    setFilterQ(filter)
  },[zone, sDate, eDate, status])

  const zoneCheck = (e) =>{
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
  
    return(
        <div className="filter-options">
          <div>Filter Complaints</div>
          <div className="date-select">
            <input type="date" onChange={dateCheck} name="sDate" value={sDate}/>
            <div>--</div>
            <input type="date" onChange={dateCheck} name="eDate" value={eDate}/>
          </div>
          <div className="dropdown">
            <button className="dropbtn">Zone</button>
            <div className="dropdown-content">
              {zoneValues && zoneValues.map((zn)=>(
                <p key={zn}><input type="checkbox" onChange={zoneCheck} name={zn}/>{zn}</p>
              ))}
            </div>
          </div>
          <div className="dropdown">
            <button className="dropbtn">Status</button>
            <div className="dropdown-content">
              {statusValues && statusValues.map((st)=>(
              <p  key={st}><input type="checkbox" onChange={statusCheck} name={st}/>{st}</p>
              ))}
            </div>
          </div>
          <button onClick={()=>{Report()}}>Download Report</button>
      </div>
    )
};