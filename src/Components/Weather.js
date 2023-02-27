import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./Weather.css"
const Weather = () => {
    const [userInput, setUserInput] = useState('');
    const [vaildUserInput, setValidInput] = useState(false)
    const [lat, setLat] = useState("");
    const [lon, setLon] = useState("");
    const [data, setData] = useState({})
    const [histortarr, setHistory] = useState([])
    // const histortarr = [1,2,2]

    useEffect(()=>{
        if(lat !==""  && lon !==""){
            async function axioscall (){
              try {
                const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=959c9b72512496cfb52666fb78be0782`)

                console.log(weatherData.data,"weather data")
                setData(weatherData.data)
                // console.log(weatherData.data)

                histortarr.push(userInput)
                setHistory(histortarr)
                if(histortarr.length > 3){
                    histortarr.shift()
                    // console.log(histortarr)
                    setHistory(histortarr)
                }

                

              } catch (error) {
                console.log(error)
           
              }
            }
            axioscall()
        }else{
            setData({})
        }

        if(lat !== "" && lon !== "") setData({})

    },[lat,lon])

    function functionforcheck() {
        console.log(lat, lon, "<<<<<lat, lon")
        console.log(data.main.temp);
        console.log(data.main.temp_max)
        console.log(data.main.temp_min)
        console.log(data.main.humidity)
        console.log(data.main.sea_level)
        console.log(data.main.grnd_level)
        console.log(histortarr,histortarr,"histortarr")
      
        
    }
    function onsubmitFunction(e){
        e.preventDefault()
        console.log('from sunbmited', userInput)

       async function fetchcall(){
            try {
                
                const data = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=1&appid=959c9b72512496cfb52666fb78be0782`)
                        console.log(data.status)
                        setLat(data.data[0].lat)
                        setLon(data.data[0].lon)

                        if(data.data[0].lat === "") setValidInput(true);
                        else setValidInput(false)
            } catch (error) {
                console.log(error,"error form 1 fetch call")
                setValidInput(true)
            }

        }
        fetchcall()      
    }

    
  return (
    <div>
      <h1 className='heading'>Weather App</h1>
    <form action="" onSubmit={onsubmitFunction}>
        <input type="text"
        placeholder='Enter City Name'
        onChange={(e)=>setUserInput(e.target.value)}/>
        <input type="submit" value="Submit" />
    </form>

    {vaildUserInput? <h1 className='errorforinvalidname'>Please input a valid place </h1>:""}
{/* <button onClick={functionforcheck}>suuuu</button> */}
  {userInput === ""?"":<>
        {data.main===undefined ?"":<>
        <div className= "display">
        {<h5>Weather Detailes of city: {userInput}{data?.name} </h5>}
        <p>Current Temperature: {(data?.main?.temp-273.15).toFixed(2)} °C</p>
        {/* {data?.main?.temp_min} */}
         <p>Temparature Range  : {`${(data?.main?.temp_min-273.15).toFixed(2)}}°C to ${(data?.main?.temp_max-273.15).toFixed(2)} °C`}</p>
        <p>Humidity :{data?.main?.humidity}</p>
        <p>Sea Lavel:{data?.main?.sea_level===undefined ?"dataNotAbavable for the place":data?.main?.sea_level }</p>
        <p>Ground Lavel: {data?.main?.grnd_level===undefined ?"dataNotAbavable for the place":data?.main?.grnd_level } </p>        
        
        
    </div>
        </>}
        </>}
        
    <div className="history">
        {histortarr.length !==0 ? <h4>Last 3 Citis Entry</h4>:""}
        {histortarr.map((item,i)=>{
            return (
                <li key={i*0.00025}>{item}</li>
            )
        })}

    </div>
    </div>
  )
}

export default Weather
