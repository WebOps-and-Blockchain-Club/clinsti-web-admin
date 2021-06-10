import useFetch from "../server/useFetch";
import PieCharT from "./PieChart";


const Stats = () => {
  const {data:stats,isPending,error} = useFetch(`/admin/piechart`)
  return (
    <div className="stats">
      {isPending && <div>Loading Stats</div> }
      {error && <div>{error}</div> }
      {stats && 
        <div className="split-container-1-1">
          <div style={{padding:10}}>
            Status
            <PieCharT pie={stats['All Zones']}  labels={'All Zones'} type={'status'}/>
            <div className="split-container-1-1-1">
              <PieCharT pie={stats['Academics Zone']} labels={'Academics Zone'} type={'status'}/>
              <PieCharT pie={stats['Hostel Zone']} labels={'Hostel Zone'} type={'status'}/>
              <PieCharT pie={stats['Residential Zone']} labels={'Residential Zone'} type={'status'}/>
            </div>
          </div>
          <div style={{padding:10}}>
            Waste Type
            <PieCharT pie={stats['All Zones']}  labels={'All Zones'} type={'waste_type'}/>
            <div className="split-container-1-1-1">
              <PieCharT pie={stats['Academics Zone']} labels={'Academics Zone'} type={'waste_type'}/>
              <PieCharT pie={stats['Hostel Zone']} labels={'Hostel Zone'} type={'waste_type'}/>
              <PieCharT pie={stats['Residential Zone']} labels={'Residential Zone'} type={'waste_type'}/>
            </div>
          </div>
        </div>
      }
    </div>
   );
}
 
export default Stats;