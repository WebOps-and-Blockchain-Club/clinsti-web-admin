import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { GoSearch } from 'react-icons/go';
import { MdFileDownload } from 'react-icons/md';
import { BiChevronDown } from 'react-icons/bi';
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

  const [sDate,setSDate] = useState("2021-01-01")
  const [eDate,setEDate] = useState("")
  const [zone,setZone] = useState(new Set())
  const [status,setStatus] = useState(new Set())
  const [complaintID, setComplaintID] = useState()

  const history = useHistory()
  const gotoComplaint = (e) =>{
    e.preventDefault();
    setComplaintID("")
    history.replace(`/complaints/${complaintID}`)
  }

  useEffect(() => {
    let filter = ''
    if(sDate) filter += `dateFrom=${sDate}&`
    if(eDate) filter += `dateTo=${eDate}&`
    if(zone.size) filter += `zone=${[...zone].join(',')}&`
    if(status.size) filter += `status=${[...status].join(',')}&`

    setFilterQ(filter)
  },[zone, sDate, eDate, status,setFilterQ])

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

  const changeComplaintID = (e) =>{
    setComplaintID(e.target.value)
  }

  const Report = () =>{
    let link = '/admin/report?'
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
      // console.log(e)
    })
  }
  
    return(
        <div className="top-bar">
          <div className="complaint-filter">
            <div className="date-select">
              <p>From</p>
              <input type="date" onChange={dateCheck} name="sDate" value={sDate}/>
              <p>To</p>
              <input type="date" onChange={dateCheck} name="eDate" value={eDate}/>
            </div>
            <div className="dropdown">
              <button className="filter-button">Filter by Zone <BiChevronDown className="react-icons"/></button>
              <div className="dropdown-content">
                {zoneValues && zoneValues.map((zn)=>(
                  <p key={zn}><input type="checkbox" onChange={zoneCheck} name={zn}/>{zn}</p>
                ))}
              </div>
            </div>
            <div className="dropdown">
              <button className="filter-button">Filter by Status <BiChevronDown className="react-icons"/></button>
              <div className="dropdown-content">
                {statusValues && statusValues.map((st)=>(
                <p  key={st}><input type="checkbox" onChange={statusCheck} name={st}/>{st}</p>
                ))}
              </div>
            </div>
            <form className="id-filter" onSubmit={gotoComplaint} >
              <input type="number" name="complaint_id_filter" value={complaintID} onChange={changeComplaintID} /*onAbort={(e) => click(e.target.value)}*/ placeholder={"Enter Complaint ID"}/>
              <button><GoSearch className="react-icons"/></button>
            </form>
          </div>
          <button onClick={()=>{Report()}}><MdFileDownload className="react-icons"/> Download Report</button>
      </div>
    )
};