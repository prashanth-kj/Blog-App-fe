import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BlogTile from './common/BlogTile'
import {toast} from  'react-toastify';
import AxiosService from '../utils/Apiservice';
import useLogout from '../Hooks/useLogout';
import { useNavigate } from 'react-router-dom';
function Create() {
     
  let [title,setTitle]=useState("");
  let [imageUrl,setImageUrl]=useState("");
  let [description,setDescription]=useState("");

    let navigate= useNavigate();
    let logout =useLogout()
   let createBlog=async()=>{
    try {
           let res = await AxiosService.post('/blog/create',{
             title,
             imageUrl,
             description
           })
           
             if(res.status==201){
                 toast.success(res.data.message)
                    navigate('/dashboard')
             }
    } catch (error) {
          toast.error(error.response.data.message)
          if(error.response.status==401){
            logout()
         }
    }
   }
    
    
  return <>
   <div className='container' style={{minHeight:'50vh'}}>
              <h2 className='text-center'>Share Your Views!</h2>
           <div className='d-flex justify-content-center' style={{height:'100%'}}>
               <div className='container-fluid' style={{minWidth:'370px'}}>
               <Form>
                    <Form.Group className="mb-3" >
                      <Form.Label className="form-label h6">Title</Form.Label>
                      <Form.Control type="text" className="form-control" placeholder="Enter Title" onChange={(e)=>setTitle(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="form-label h6">Image URL</Form.Label>
                      <Form.Control type="text" className="form-control" placeholder="Enter ImageUrl" onChange={(e)=>setImageUrl(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                      <Form.Label className="form-label h6">Description</Form.Label>
                      <Form.Control as="textarea"  className="form-control" onChange={(e)=>setDescription(e.target.value)}/>
                    </Form.Group>
                  </Form>
               </div>
           </div>
      </div>

      <div className='container' style={{minHeight:'90px'}}>
          <div className='d-flex justify-content-center' style={{height:'100%'}}>
               <div className='container-fluid' style={{maxWidth:'400px'}}>
               <h3 className='text-center'>Preview</h3>
                        <hr />
                    <div className='blog-wrapper '>
                        <BlogTile blog={{title,imageUrl,description}}/>  
                    </div>
                    <div style={{textAlign:"center",margin:'20px'}}>
                    <Button variant="success" className='w-50' onClick={()=>createBlog()}> Create </Button>
                    </div>
               </div>
          </div>
      </div>
  </>
}

export default Create