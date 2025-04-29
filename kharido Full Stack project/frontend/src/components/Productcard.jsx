import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Productcard({product,user}) {

  let navigate=useNavigate();
  // console.log(product);
  const handleAdd= async(item)=>{
  if (!user || !user._id){  
    alert('Login First To add product');
    return;}

  await fetch("http://localhost:8080/api/orders/",{
    method:'POST',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      user:user._id,
      items:[{
        product:item._id,
       quantity:item.quantity
      }],
      totalPrice:item.price,
    })
  }).then((res)=>res.json()).then((data)=>{console.log(data)})
  .catch((err)=>{
    console.log(err);
    
  })
  }

  return (
    <div className='productcard h-[15rem] bg-white w-[10rem] flex flex-col justify-between gap-4 mt-4 ml-4 rounded-lg p-1.5 border border-gray-300 drop-shadow-xl'>
        <div className='h-1/1 rounded-lg flex justify-center items-center overflow-hidden'>
            <img className='h-[7.5rem] ' src={product.itemImage} alt="" />
        </div>
        <div className='text-[1.2rem]'>{product.name}</div>
        <div className='flex justify-between items-center'>
            <div className='text-[1.5rem]'>${product.price}</div>
            <button onClick={()=>handleAdd(product)} className='h-[2rem] border border-green-600 border-[1px] bg-white px-2 text-[1rem] text-green-500 rounded-lg hover:bg-green-600 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 active:bg-violet-700 '>ADD</button>
        </div>
    </div>
  )
}

export default Productcard