import React, { useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { Modal } from '../components/Modal';
import Modal from 'react-modal';
import { ModalToken } from '../components/Modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const Session = () => {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [id, setid] = useState('');
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [jwt, setjwt] = useState(JSON.parse(localStorage.getItem('x-token')));
  const navigateTo = useNavigate();
  const [virtualtoken, setvirtualtoken] = useState('');
  const [time, settime] = useState(60);

  const [currentTime, setcurrentTime] = useState();
  const [lastToken, setlastToken] = useState();
  const [alltokens, setalltokens] = useState([]);
  const [showalltokens, setshowsetalltokens] = useState(false);


  const getCurrentTime =(ctime)=>{
    setcurrentTime(ctime);
    console.log(ctime);
    console.log(currentTime);
  }

  // const [starTimer, setstarTimer] = useState(false);
 

  //GET USER DATA 1 TIME
  useEffect(() => {
    fetch('http://localhost:8080/api/auth/userlogged', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "x-token": jwt
      },
    })
      .then(resp => resp.json())
      .then((data) => {

        setid(data.userAutenticated.id);
        setemail(data.userAutenticated.email);
        setname(data.userAutenticated.name);

      });
  }, [])



  const generateVirtualToken = () => {


    fetch(`http://localhost:8080/api/tokens/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "x-token": jwt
      },
    })
      .then(resp => resp.json())
      .then((data) => {
        
        setvirtualtoken(data.newToken.Token);
        openModal();
      });

  }


  // const newTokenGenerated =()=>{

  //   fetch(`http://localhost:8080/api/users/${id}}/tokens`,{
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //       "x-token": jwt
  //     },
  //   })
  //     .then(resp => resp.json())
  //     .then((data)=>{

  //      setalltokens([data]);
  //      console.log(alltokens);
  //       //setlastToken()
  //     })

  //     setshowsetalltokens(true);
  // }


  const openModal = () => {
    setIsOpen(true);
    // setstarTimer(true);
    //console.log(time)
  }

  const closeModal = () => {
    setIsOpen(false);
    //setRunning(!running);
    // setstarTimer(false);
    console.log('Despues del clear');
  }



  const logout = () => {
    localStorage.clear();
    navigateTo('/');
    
  }

  return (
    <>
      <div id='session'>

      <p>{currentTime}</p>

        <h1 className='text-sky-600 font-bold text-4xl'>Welcome  <span className='text-gray-900'>{name}</span></h1>
        <div className='flex justify-end'>
          <button
            onClick={logout}
            className='bg-gray-500 p-5 mt-2 rounded text-white font-bold hover:cursor-pointer  hover:bg-gray-600 transition-all ' >
            Logout
          </button>
        </div>

        <hr />

        <div className='flex justify-between' >
          <button
            onClick={generateVirtualToken}
            className='w-1/3 container mx-auto bg-sky-600 py-5 mt-5 text-white font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-all' >
            Generate Virtual Token
          </button>

          
          {/* <button
            onClick={newTokenGenerated}
            className='w-1/3 container mx-auto bg-sky-600 py-5  mt-5 text-white font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-all' >
            Generate Record of Virtual Token
          </button> */}
          
          </div>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className='flex justify-end'>
              <button onClick={closeModal} className=''>X</button>
            </div>

            <ModalToken
              virtualToken={virtualtoken}
              time={time}
              generateVirtualToken={generateVirtualToken}
              getCurrentTime={getCurrentTime}
            />


          </Modal>

        

      </div>

    </>
  )
}
