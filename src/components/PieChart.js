import { PieChart } from 'react-minimal-pie-chart'

const PieCharT = ({pie,labels,type}) => {

  const myLabel = ({
    dataEntry
  }) =>{
    if(dataEntry.percentage > 3){
      return dataEntry.title === "invalid_complaint" ? 'invalid':dataEntry.title
    }
  }

  return (
    <div className="pie-chart">
      {labels}
      {type && type ==="status" &&<PieChart

        data={[
          {title:'posted',value:pie.posted,color:'#f16b94'},
          {title:'processing',value:pie.processing,color:'#f5ae5e'},
          {title:'completed',value:pie.completed,color:'#60ff68'},
          {title:'invalid_complaint',value:pie.invalid_complaint,color:'#745aeb'}
        ]}
        label={myLabel}
        labelStyle={{fontSize:5}}
        startAngle={180}
      />}
      {type && type ==="waste_type" &&<PieChart 
        data={[
          {title:'Plastic',value:pie.Plastic,color:'#f73a73'},
          {title:'Debris',value:pie.Debris,color:'#ff8a1d'},
          {title:'Other',value:pie.Other,color:'#3bffff'},
        ]}
        label={myLabel}
        labelStyle={{fontSize:5}}
        startAngle={180}
      />}
    </div>
   );
}
 
export default PieCharT;