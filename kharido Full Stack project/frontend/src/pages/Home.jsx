import React,{ useEffect, useState } from 'react'
import Productdetails from '../components/Productdetails.jsx'
function Home({user}) {
  let [data,setData] =useState([]);
  let[loading,setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchData = async() => {
     await fetch('http://localhost:8080/api/items/').then((response) => response.json()).then(data => setData(data));
    setLoading(false);  
    } 
    fetchData();
  }, []);
  return (
    <div className='h-full w-full'>
       {loading && (<div className=' mt-[50px] flex justify-center w-full'>
    <h1 className='text-[1.5rem]'>Loading  . . .</h1>
       </div>)}
        <Productdetails user={user} data={data}/>
    </div>
  )
}

export default Home