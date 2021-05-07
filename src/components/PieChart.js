import { PieChart } from 'react-minimal-pie-chart'

const PieCharT = ({pie,labels,type}) => {
  const wasteTypeValues = [
    {value:"Paper/Plastic",color:`#f16b00`},
    {value:"Bottles",color:`#f1d10b`},
    {value:"Steel scrap",color:`#f18b20`},
    {value:"Construction debris",color:`#f76b30`},
    {value:"Food waste",color:`#e16b40`},
    {value:"Furniture",color:`#b16b50`},
    {value:"Equipment",color:`#ff6b60`},
    {value:"Package materials",color:`#f1bb70`},
    {value:"e-waste (Tubelight, Computer, Battery)",color:`#f10b80`},
    {value:"Hazardous waste (chemical, oil, bitumen, empty chemical bottle)",color:`#f16bff`},
    {value:"Bio-medical waste",color:`#ff0fa0`},
    {value:"Others",color:`#f46bb0`},
  ]
  const statusValues = [
    {value:"Pending transmission",color:`#f16b00`},
    {value:"Work is pending",color:`#f1010b`},
    {value:"Work in progress",color:`#ff0fa0`},
    {value:"Work completed",color:`#f1bb70`},
    {value:"Closed with due justification",color:`#f162f0`},
  ]

  const data = []
  if(type==="status"){
    statusValues.forEach((st)=>{
      try{data.push({title:st.value,value:pie[st.value],color:st.color})}catch{}
    })
  }
  if(type ==="waste_type"){
    wasteTypeValues.forEach((wt)=>{
      try {data.push({title:wt.value,value:pie[wt.value],color:wt.color})} catch{}
    })
  }

  const myLabel = ({dataEntry}) => {
    if(dataEntry.percentage > 3){
      return dataEntry.title
    }
  }

  return (
    <div className="pie-chart">
      {labels}
      <PieChart
        data={data}
        label={myLabel}
        labelStyle={{fontSize:3.4}}
        startAngle={180}
      />
    </div>
   );
}
 
export default PieCharT;