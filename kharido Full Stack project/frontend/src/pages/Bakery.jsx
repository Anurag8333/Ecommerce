import React,{useEffect,useState} from 'react'
import Productdetails from '../components/Productdetails';

function Bakery({user}) {
    let [data,setData] =useState([]);
    let[loading,setLoading] = useState(false);
        useEffect(() => {
          setLoading(true);
          const fetchData = async() => {
           await fetch('http://localhost:8080/api/items/bakery').then((response) => response.json()).then(data => setData(data));
            setLoading(false);} 
          fetchData();
        }, []);
    
    return (
      <div>
        {loading && (<div className=' mt-[50px] flex justify-center w-full'>
    <h1 className='text-[1.5rem]'>Loading  . . .</h1>
       </div>)}
        <Productdetails data={data} user={user}/>
      </div>
    );
}

export default Bakery