import React, { useState } from 'react'

export const Login = () => {


    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const handleSubmit =(e)=>{
        e.preventDefault();
    

        fetch('http://localhost:8080/api/auth/login',{
            method: "POST",
            crossDomain:true,
            headers: {
                "Content-Type": "application/json",
                Accept:"application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then((res)=>res.json())
            .then((data)=>{

                //console.log(data.tokenjwt);
                localStorage.setItem('x-token',JSON.stringify(data.tokenjwt));

                if(data.tokenjwt){
                    window.location.href = '/session';
                }else{
                    alert('Mal');
                }
                
            }).catch((err)=>{
                console.log(err);
            })

        console.log({
            email,
            password
        })
       
    }


  return (
    <>
        <h1 className='text-sky-600 font-bold text-4xl'>Welcome to login page</h1>

        <hr />
        <form onSubmit={handleSubmit} className='my-10 bg-white shadow rounded-md px-10 py-10'>
            <div className='my-4'>
                <label className='text-gray-600 block font-bold' htmlFor='email'>Email</label>
                <input 
                    id="email"
                    type="email" 
                    placeholder='Your email address'
                    className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                    onChange={(e)=>setemail(e.target.value)}
                    />
            </div>
            <div className='my-4'>
                <label className='text-gray-600 block font-bold' htmlFor='password'>Password</label>
                <input 
                    id="password"
                    type="password" 
                    placeholder='Your password'
                    className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                    onChange={(e)=>setpassword(e.target.value)}
                    />
            </div>

            <input 
                type="submit" 
                value="Access"
                className='w-full bg-sky-600 py-3 text-white font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-all'
            
            />




        </form>

    </>
  )
}
