
import React,{useState,useEffect} from 'react'
import Header from '../components/Header'
import { Row,Col } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { allProjectAPI } from '../services/allAPI'

const Projects=()=> {
const[allProjects,setAllProjects]=useState([])
console.log(allProjects);
useEffect(()=>{
  getAllProjects()
},[])
const getAllProjects=async()=>{
  const token = sessionStorage.getItem("token")
  if(token){
    const reqHeader = {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`
    }
    //api call- reqbody, reqheader
    try{
      const result = await allProjectAPI(reqHeader)
      console.log(result);
      if(result.status==200){
       setAllProjects(result.data)
      
      }
    }catch(err){
      console.log(err);
    }
  }
}
  return (
    <>
      <Header/>
      <div style={{marginTop:'150px'}} className="container-fluid">
        <div className="d-flex justify-content-between">
          <h1>All Projects</h1>
          <input type="text" className="form-control w-25" placeholder='Search Projects By Language used' />
        </div>
      
        <Row className='mt-3'>
       {
        allProjects?.length>0?
        allProjects?.map(project=>(
          <Col key={project?._id} className='mb-3'sm={12} md={6} lg={4}>
          <ProjectCard displayData={project}/>
          </Col>
        ))
        :
        <div className='fw-bolder text-danger m-5 text-center'>project not found!!</div>
       }
      </Row>
    </div>
    </>
  )
}

export default Projects