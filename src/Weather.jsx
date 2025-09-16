import axios from 'axios'
import React, { useEffect, useState } from 'react'

function App() {
  const [data, setdata] = useState(null)
  const [search, setsearch] = useState("")
  const [sdata, setsdata] = useState("")
  const api_key = '9cbeebd6148d43f0b77145122251609';
  async function getdata() {
   try {
     if(!search)return
    let api = await fetch(`https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${search}`);
    let data1 = await api.json();
    if(!api.ok){
      alert(`Please Enter Valid City ${search}`)
    }
    else{
      setdata(data1)
    }
   } catch (error) {
    console.log(error)
    setdata(null)
   }
  }
  const handleclick = () => {
    setsearch(sdata)
   
  }
  useEffect(() => {
    getdata()
  }, [search])

  return (
    <div className=' bg-[#bde0fe] h-screen flex justify-center items-center flex-col '>
      <h1 className='mb-20 text-6xl font-semibold shadow-lg shadow-blue-800'>Today's Weather</h1>
      <input
        value={sdata}
        onChange={(e) => setsdata(e.target.value)}
        className='border-3 rounded-md' type="text" placeholder='Search City' />
      <button onClick={() => handleclick()} className='border-3 bg-blue-400 font-semibold rounded-md active:scale-90 ml-2 w-50'>Search</button>
          {data && data.location && (
        <div>
          <h1>City: {data.location.name}</h1>
          <p>Country: {data.location.country}</p>
          <p>Local Time: {data.location.localtime}</p>
          <p>Temperature: {data.current.temp_c} °C</p>
          <p>Condition: {data.current.condition.text}</p>
        </div>
      )}

    </div>
  )
}

export default App