import React, { useEffect, useRef, useState } from 'react'

export const ModalToken = ({virtualToken, time, generateVirtualToken,getCurrentTime}) => {

  const [countdown, setcountdown] = useState(time);
  const timerId= useRef();
  const [actualValue, setactualValue] = useState();


useEffect(()=>{

  timerId.current= setInterval(()=>{
    setcountdown(prev=>prev-1)
    //getCurrentTime(countdown);
    setactualValue(prev=>prev-1);
    getCurrentTime(actualValue);
  },1000)
  return ()=> clearInterval(timerId.current);
},[])



useEffect(() => {

  if(countdown <=0){

    //alert('Token Expired');
    clearInterval(timerId.current);
    generateVirtualToken();
    
      setcountdown(10);
      setInterval(()=>{
        setcountdown(prev=>prev-=1);
      },1000)
    
  }
}, [countdown])


  return (
    <>
    <div className='md:flex gap-10'>
        <div className='md:w-1/3'> 
          <h2 className='text-1xl font-bold mt-5'>Virutal Token: </h2>{''}
          <p className='text-2xl font-bold mt-2'>{virtualToken}</p>
        </div>
        <div className='md:w-2/3'>
            <h2 className='text-1xl font-bold mt-5'>Time Remain:</h2>{''}
            <p className='text-2xl font-bold mt-2'>{countdown} s</p>
        </div>

    </div>
   
    
    </>
    
  )
}
