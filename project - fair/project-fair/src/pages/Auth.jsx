import React, { useState } from 'react'
import loginImg from '../assets/login.png'
import {FloatingLabel,Spinner} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerAPI,loginAPI } from '../services/allAPI';


const Auth = ({insideRegister}) => {
  const [isLoggedin,setIsLoggedin] = useState(false)
  const navigate = useNavigate()

  const [userData,setUserData] = useState({
    username:"",email:"",password:""
  })

  console.log(userData);

  const handleRegister = async (e) => {
    e.preventDefault()
    if(userData.username && userData.email && userData.password){
      //api call
      try{
        const result = await registerAPI(userData)
        console.log(result);
        if(result.status==200){
          toast.warning(`Welcome ${result?.data?.username}... Please login to explore our website!!`)
          setUserData({username:"",email:"",password:""})
          navigate('/login')
        }else{
             if(result.response.status==406){
              toast.error(result.response.data)
              setUserData({
                username:"",email:"",password:""
              })
             }
        }

      }catch{
        console.log(err);

      }
    }else{
      toast.warning("Please fill the form completely!!")
    }

  }
  const handleLogin = async (e) => {
    e.preventDefault()
    if(userData.email && userData.password && userData.password){
          //api call
          try{
            const result = await loginAPI(userData)
            if(result.status==200){
              setIsLoggedin(true)
              sessionStorage.setItem("user",JSON.stringify(result.data.user))
              sessionStorage.setItem("token",result.data.token)
              setTimeout(()=>{
              // toast.warning(`Welcome ${result.data.user.username}....`)
              setUserData(
                {
                  username:"",email:"",password:""
                })
             
        setIsLoggedin(false)
                navigate('/')
              }, 2000);
            }else{
              if(result.response.status==404){
                toast.error(result.response.data
                )
              }
            }
            
          }catch(err){
            console.log(err);
          }


    }else{
      toast.warning("Please fill the form completely!!")
    }
  }



  return (
    <div style={{width:'100%',height:'100vh'}} className='d-flex justify-content-center align-items-center'>
     <div className="container w-75 ">
      <div className="card shadow p-2">
      <div className="row align-items-center">
      <div className="col-lg-6">
          <img className='w-100' src={loginImg} alt="login" />
        </div>

        <div className="col-lg-6">
          <h1 className='fw-bolder mt-2'>
            <i className='fa-brands fa-docker'></i>Project Fair
          </h1>

          <h5 className='fw-bolder mt-2'>
            Sign {insideRegister?'Up':'In'} to your Account
          </h5>

          <Form>
    {
      insideRegister &&
      <FloatingLabel
      controlId="floatingInputname"
      label="Username"
      className="mb-3"
    >
      <Form.Control type="text" placeholder="Username" value={userData.username} onChange={e=>setUserData({...userData,username:e.target.value})} />
    </FloatingLabel>
    }

      <FloatingLabel controlId="floatingInput" label="Email address" className='mb-3'>
        <Form.Control type="email" placeholder="name@example.com"  value={userData.email} onChange={e=>setUserData({...userData,email:e.target.value})} />
      </FloatingLabel>

      
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control type="password" placeholder="Password"  value={userData.password} onChange={e=>setUserData({...userData,password:e.target.value})} />
      </FloatingLabel>
          </Form>

          {
            insideRegister?

            <div className="mt-3">
              <button onClick={handleRegister} className='btn btn-primary mb-2'>Register</button>
              <p>Already have an account? Click here to <Link to={'/login'}>Login</Link></p>
            </div>
            :
            <div className="mt-3">
            <button onClick={handleLogin} className='btn btn-primary mb-2'>Login</button>
            { isLoggedin && <Spinner animation="border" variant="light" />}
            <p>New User? Click here to <Link to={'/register'}>Register</Link></p>
          </div>

          }
        </div>
      </div>
      </div>
     </div>
     <ToastContainer />
    </div>
  )
}

export default Auth
