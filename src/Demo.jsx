import React, { useEffect, useState } from 'react';

function App() {
  const [data, setdata] = useState(null);
  const [search, setsearch] = useState('');
  const [sdata, setsdata] = useState('');
  const api_key = '9cbeebd6148d43f0b77145122251609';

  async function getdata() {
    try {
      if (!search) return;
      let api = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${search}`
      );
      let data1 = await api.json();
      if (!api.ok) {
        alert(`Please Enter Valid City ${search}`);
      } else {
        setdata(data1);
      }
    } catch (error) {
      console.log(error);
      setdata(null);
    }
  }

  const handleclick = () => {
    setsearch(sdata);
  };

  useEffect(() => {
    getdata();
  }, [search]);

  return (
    <div className="bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 min-h-screen flex flex-col justify-center items-center">
      <h1 className="mb-10 text-5xl font-bold text-blue-900 drop-shadow-lg">
        Today's Weather
      </h1>

      <div className="flex mb-8">
        <input
          value={sdata}
          onChange={(e) => setsdata(e.target.value)}
          className="px-4 py-2 rounded-l-md border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          type="text"
          placeholder="Search City"
        />
        <button
          onClick={handleclick}
          className="px-5 py-2 bg-blue-600 text-white font-medium rounded-r-md hover:bg-blue-700 active:scale-90 transition"
        >
          Search
        </button>
      </div>

      {data && data.location && (
        <div className="bg-white/80 shadow-lg shadow-blue-800/30 rounded-2xl p-8 w-80 text-center backdrop-blur-md">
          <h2 className="text-2xl font-semibold text-blue-800 mb-2">
            {data.location.name}, {data.location.country}
          </h2>
          <p className="text-gray-600 mb-4">{data.location.localtime}</p>
          <p className="text-5xl font-bold text-blue-900 mb-2">
            {data.current.temp_c}°C
          </p>
          <p className="text-lg text-gray-700">
            {data.current.condition.text}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
