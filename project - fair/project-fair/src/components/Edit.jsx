import React,{useContext, useEffect, useState} from 'react'
import { Button, Modal } from 'react-bootstrap'
import uploadImg from'../assets/upload.png'
import SERVERURL from '../services/serverurl'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProjectAPI } from '../services/allAPI';
import { editResponseContext } from '../contexts/ContextAPI';
const Edit=({project})=> {
  const {editResponse,setEditResponse}=useContext(editResponseContext)
  const[imageFileStatus,setImagesFileStatus]=useState(true)
  const[projectDetails,setProjectDetails]=useState({
    id:project?._id,title:project?.title,languages:project?.languages,github:project?.github,website:project?.website,overview:project?.overview,projectImg:""
  })
  const[preview,setPreview]=useState("")
    const [show, setShow] = useState(false);

    const handleClose = () =>{ 
      setShow(false);
      setProjectDetails({
        id:project?._id,title:project?.title,languages:project?.languages,github:project?.github,website:project?.website,overview:project?.overview,projectImg:""
      })

    }
    const handleShow = () => {
        setShow(true);
        setProjectDetails({
        id:project?._id,title:project?.title,languages:project?.languages,github:project?.github,website:project?.website,overview:project?.overview,projectImg:""
      })
    }


    useEffect(()=>{
      if(projectDetails.projectImg.type=="image/png" || projectDetails.projectImg.type=="image/jpg" || projectDetails.projectImg.type=="image/jpeg"){
        setPreview(projectDetails.projectImg)
        setPreview(URL.createObjectURL(projectDetails.projectImg))
        setImagesFileStatus(true)
      }else{
        setImagesFileStatus(false)
        setPreview("")
        setProjectDetails({...projectDetails,projectImg:""})
      }
    },[projectDetails.projectImg])
    const handleUpdateProject= async()=>{
      const{id,title,languages,github,website,overview,projectImg}=projectDetails
      if(title && languages && github && website && overview ){
        //  api call
         //reqbody - add items to form data
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      preview?reqBody.append("projectImg",projectImg):reqBody.append("projectImg",project.projectImg)
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type":preview?"multipart/form-data":"application/json",
          "Authorization": `Bearer ${token}`
        }
        // api call
        try{
          const result =await editProjectAPI(id,reqBody,reqHeader)
          console.log(result);
          if(result.status==200){
            handleClose()
            // pass response view
            setEditResponse(result)

          }else{
            console.log(result.response);
          }

        }catch(err){
          console.log(err);
        }
      }else{
        toast.warning("please fill the form completely!!")
      }
    }
  }
  return (
    <>
    <i onClick={handleShow}  class="fa-regular fa-pen-to-square"></i>
    <Modal size='lg ' centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update project details!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row align-items-center'>
            <div className='col-lg-4'>
                <label>
                <input type="file" style={{display:'none'}} onChange={e=>setProjectDetails({...projectDetails,projectImg:e.target.files[0]})} />
                <img height={'200px'} className='img-fluid' src={preview?preview:`${SERVERURL}/uploads/${project?.projectImg}`} alt="" />
              </label>
              { !imageFileStatus && <div className="text-warning fw-bolder my-2">*Upload Only the following file types (jpeg, jpg, png) here!!!</div> }
            </div>
            <div className="col-lg-8">
              <div className="mb-2">
                <input type="text" className='form-control' placeholder='Project Title' value={projectDetails.title} onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})} />
              </div>
              <div className="mb-2">
                <input type="text" className='form-control' placeholder='Languauges used in project' value={projectDetails.languages} onChange={e=>setProjectDetails({...projectDetails,languages:e.target.value})}/>
              </div>
              <div className="mb-2">
                <input type="text" className='form-control' placeholder='Project GITHUB Link' value={projectDetails.github} onChange={e=>setProjectDetails({...projectDetails,github:e.target.value})}/>
              </div>
              <div className="mb-2">
                <input type="text" className='form-control' placeholder='Project WEBSITE Link' value={projectDetails.website} onChange={e=>setProjectDetails({...projectDetails,website:e.target.value})}/>
              </div>
            </div>
          </div>
          <div>
            <input type="text" className='form-control' placeholder='Project Overview' value={projectDetails.overview} onChange={e=>setProjectDetails({...projectDetails,overview:e.target.value})}/>
                </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdateProject} variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </>
  )
}

export default Edit