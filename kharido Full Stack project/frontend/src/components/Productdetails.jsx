import React  from 'react'
import Productcard from './Productcard.jsx'
const  Productdetails = ({user,data}) => {
 
  return (
    <div className='w-full'>
      <ul className='ml-5 flex flex-wrap gap-[1rem]'>
      {data.map((product,i) => (
        <li key={i}><Productcard product={product} user={user}/></li>
        ))}
      </ul>
    </div>
  )
}
export default Productdetails;