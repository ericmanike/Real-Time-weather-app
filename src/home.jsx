import React from 'react'
import { useState , useEffect} from 'react'
import { FaCloudRain, FaCloudSunRain, FaRainbow, FaRankingStar, FaStar } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

function Home() {

    const [info, setInfo] = useState(null)
   const [erro, setErro] = useState('')
   const [coords, setCoords]= useState(null)
   const [loc,setLoc] =useState(null)
  const navigate = useNavigate()
  const [loading,setLoading]=useState(true);



   
        useEffect(()=>{
         
            if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (pos)=>{
                    setCoords({
                        lat:pos.coords.latitude,
                        lon:pos.coords.longitude

                    })

                },
                (error)=>{
                    console.log(error)
                }
            )
            }
         
        }, [] )
        

       useEffect(() => {
            async function Weather() {
                if(!coords) return
           try{
                const res =  await fetch(`https://api.weatherapi.com/v1/current.json?key=330e917d9c1149cf9f8175427251809&q=${coords.lat},${coords.lon}&aqi=yes`)
                const data = await res.json()
                setInfo(data.current);
                setLoc(data.location);
                setLoading(false);
            
            
            }
        catch(error){
         setErro(error)
        }
        
    } 
    Weather()
        }, [coords])





  return (
    <div className='h-[100vh] text-center bg-gradient-to-b from-indigo-700 via-blue-300 to-blacknp'> 

    <p className='text-[16px] md:text-3xl pt-7'>Real Time weather condition </p>


    <div className='w-full  flex flex-row justify-around flex-wrap mt-16 '>

<div className='h-[70%] w-[70%] md:w-[30%] '>
<div>


<FaCloudSunRain  className='w-[100%] h-[70%] mb-9 text-white  border-none p-3 rounded-2xl bg-gradient-to-r from-red-600 via-yellow-400 to-blue-600 ' style={{boxShadow:"2px 2px 10px white "}} />



</div>
<button className='bg-[blue]  text-2xl mb-8 text-white p-3 rounded-2xl m-auto ' onClick={()=>navigate("/weather")}   style={{boxShadow:"2px 2px 10px white "}}>
    Get Forecast 
</button>

</div>
  <div className='md:w-[40%] w-[80%] h-[350px] bg-gray-400 rounded-2xl p-4  grid grid-cols-2'>

    <div className='text-3xl font-bold grid grid-cols-1'>
 
 
{ loc  && !loading && (<>
    <div>{loc.country}</div>
    <div>{loc.name}</div>
    <div className='text-[16px]'>{loc.localtime}</div>
     <div className=' flex justify-center'> <img src={info.condition.icon}  /></div>
    </>
    ) }
    </div>
      { loading && (<p className='text-3xl font-bold  text-center col-span-2  duration-75'> Loading Weather...  </p>)}

    <div>{erro  &&(<p>an error occured</p>)}     
    {info && !loading && (<div><p><span className='text-[gold] font-bold'>{info.temp_c}&deg;C </span></p>
            <p>Day <span className='font-bold'> {info.is_day?"Yes":"No"}</span></p>
             <p> <span className='text-[gold] font-bold'>{info.condition.text}</span></p>
              <p> wind speed <span className='text-[gold] font-bold'>{info.wind_kph} k/h</span></p>
              <p> wind direction<span className='text-[gold] font-bold'>{info.wind_dir}</span> </p>
                <p> Precipitation <span className='text-[gold] font-bold'>{info.precip_mm} mm</span> </p>
                 <p> Humidity <span className='text-[gold] font-bold'>{info.humidity} % </span> </p>
                 <p> Cloud <span className='text-[gold] font-bold'>{info.cloud}</span> </p></div>
                
                )

             
        
    }

     </div>

    



    </div>
  


    </div>
    
    </div>
  )
}

export default Home