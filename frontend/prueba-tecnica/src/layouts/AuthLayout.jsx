import React from 'react'

import { Outlet } from 'react-router-dom'


export const AuthLayout = () => {
    return (
        <>
            <main className='container mx-auto mt-5 md:mt-20 p-5 md:flex justify-center'>
                <div className='md:w-2/3 lg:w-1/3'>
                <Outlet />
                </div>
                
            </main>


        </>

    )
}
