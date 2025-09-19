import React from 'react'
import { useState,useEffect } from 'react'
import { ToastContainer,toast } from 'react-toastify'



function Weather() {

const [fetloc,setLoc] =useState(null)
const [curren,setCurrent] = useState(null)
const [forecas, setForcast] = useState(null)
const [input,setInput] = useState('kumasi')
const [err,seterr] = useState('')







    async function Forecast(loc) {
        if(!loc){
            toast.error("Please Enter a valid  place name")
            return
        }
        try{
 const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=330e917d9c1149cf9f8175427251809&q=${loc}&days=3&aqi=no&alerts=yes`)

const data = await res.json()
if(data.error){
    toast.error(`cannot find ${input} weather info`)
    return
}
setLoc(data.location)
setCurrent(data.current)
setForcast(data.forecast.forecastday)
toast.success("Your search is been loaded")


        }
         catch(error){
       seterr(error)
        }
      
     setInput('')}

   
    useEffect(()=>{
        Forecast(input)
    },[])




    

 return (
    <div className='h-[100vh] text-center bg-gradient-to-b from-indigo-700 via-blue-300 to-blacknp'>
        <ToastContainer  />
        <p className='text-4xl pt-8 mb-10'>Weather forecast</p>
    <div className='flex flex-row justify-around md:justify-center gap-5'>
     <input value={input} onChange={(e)=>setInput(e.target.value)}  
         onKeyDown={(e) => {
            if (e.key === "Enter") {
              Forecast(input);
            }
          }}
    type='text'
    placeholder='Enter Location...'
     className='md:w-[70vh] md:h-[70px] bg-white rounded-2xl p-3
     focus:ring-blue-800 border-2 border-blue-600 '
  
     />
  <button className='text-white bg-amber-950 p-4 rounded-2xl' onClick={()=>Forecast(input)}>Get ForeCast</button>



     </div>
  


  <div className="w-[100%]  mt-10 flex flex-row flex-wrap m-auto  justify-around p-5">

  {
    err && (
        <p>{input} forecast not found</p>
    )
}
    






{fetloc &&(

    
     
    <div className='p-5 bg-indigo-800  grid grid-cols-2 rounded-2xl h-fit w-[100%] md:w-[40%] text-white gap-2 '>
        <div className='w-[100%] text-3xl text-[#fdd10c] mb-4 border-b-2 col-span-2 '>Current weather </div > 
       <div className='text-[gold] font-bold'>  Country</div>  <div>{fetloc.country}</div>
     <div className='text-[gold] font-bold'>  City</div>  <div>{fetloc.name}</div>
      <div className='text-[gold] font-bold'>   Region</div>  <div>{fetloc.region} </div>
       <div className='text-[gold] font-bold'>   Time </div>  <div>{fetloc.localtime}</div>
          <div className='text-[gold] font-bold'>   Temperature </div>  <div>{curren.temp_c}&deg;C</div>
             <div className='text-[gold] font-bold'>   Condition </div>  <div>{curren.condition.text}</div>
                <div className='text-[gold] font-bold'> Is Day  Time</div>  <div>{curren.is_day?'Yes':'No'}</div>
                   <div className='text-[gold] font-bold mt-3'>Clouds </div>  <div><img src={curren.condition.icon} width={100} height={100}/></div>


    
    </div>
)
}
{ 
forecas &&(
 <div className='p-5 max-md:mt-5 bg-indigo-800  grid grid-cols-1 rounded-2xl h-[100%] w-[100%] md:w-[50%] text-white gap-2'>
<div className='text-3xl text-[gold] mb-3'>  A 3 day forecast  for  {fetloc.name}, {fetloc.country} </div>
   {

    forecas.map((d,i)=>(
        <div  key={i}>
            
        
            <div className='flex flex-nowrap justify-around items-center border-[1px] rounded-[5px] bg-[brown]'>
                <span className='text-[gold]  font-bold   '>Date</span> <span> {d.date}</span>
            </div> 

        <div className='flex flex-row flex-nowrap justify-around'>
            <span className='text-[gold] font-bold  '>Max Temperature</span> <span>{d.day.maxtemp_c}&deg;C </span>
        </div>
         <div className='flex flex-row flex-nowrap justify-around'>
            <span className='text-[gold] font-bold  '>Min Temperature</span><span> {d.day.mintemp_c}&deg;C</span></div>

           <div className='flex flex-row flex-nowrap justify-around'><span className='text-[gold] font-bold'>chance of rain </span> <span>{d.day.daily_chance_of_rain}% </span></div>
             <div className='flex flex-row flex-nowrap justify-around'><span className='text-[gold] font-bold '>Condition</span><span> {d.day.condition.text}</span></div>
               <div className='flex flex-row flex-nowrap justify-around'><span className='text-[gold] font-bold '>Maximum windspeed</span><span> {d.day.maxwind_kph}</span></div>
       <div className='flex flex-row flex-nowrap justify-around'><span className='text-[gold] font-bold '>Average humidity</span><span> {d.day.avghumidity}</span></div>
          <div className='flex justify-end  '>
          <img src={d.day.condition.icon} width={100} height={100} />

          </div>
        </div>
        
     
    ))
   }
     

    
    </div>
)
}

    </div>

    </div>
  )
}

export default Weather