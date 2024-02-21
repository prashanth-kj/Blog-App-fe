import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BlogTile from './common/BlogTile'
import {toast} from  'react-toastify';
import AxiosService from '../utils/Apiservice';
import useLogout from '../Hooks/useLogout';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

function Blog() {
          
           let userData=JSON.parse(sessionStorage.getItem('userData'));
         
  return <>
       <div className='container'>
          {
             userData.role=="admin" ? <AdminBlog/> : <EditBlog/>
          }
       </div>
              
  </>
}


function EditBlog(){
      let params = useParams();
      let [title,setTitle]=useState("");
      let [imageUrl, setImageUrl]=useState("");
      let [description,setDescription]=useState("");
     
      let navigate =useNavigate();
      let logout =useLogout();
  
         
        let getblog=async()=>{
                try {
                let res= await AxiosService.get(`blog/${params.id}`);
                    
                    if(res.status==200){
                      setTitle(res.data.blog.title);
                      setImageUrl(res.data.blog.imageUrl);
                      setDescription(res.data.blog.description);
                      
                    }
                    
                } catch (error) {
                    toast.error(error.response.data.message)
                    if(error.response.status==401){
                      logout()
                  }
                }     
        }


        let editBlog =async()=>{
                try {
                    
                    let res= await AxiosService.put(`blog/edit/${params.id}`,{
                      title,imageUrl,description
                    });
                    console.log(res);
                       if(res.status===200){
                            toast.success(res.data.message);
                            navigate('/dashboard');
                       }
                     
                } catch (error) {
                  toast.error(error.response.data.message)
                  if(error.response.status==401){
                    logout()
                  }
                }
        }


   useEffect(()=>{
          if(params.id){
               getblog();
          }else{
               logout()
          }
   },[])
  
return <>
         <div className='container' style={{height:'50vh'}}>
              <div className='d-flex justify-content-center align-items-center' style={{height:'100%'}}>
                   <div className='container-fluid' style={{minWidth:'370px'}}>
                   <Form>
                      <Form.Group className="mb-3" >
                        <Form.Label  className="form-label" >Title</Form.Label>
                        <Form.Control type="text"  className="form-control"  value={title} placeholder="Enter Title" onChange={(e)=>setTitle(e.target.value)}/>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="form-label" >Image URL</Form.Label>
                        <Form.Control type="text"  className="form-control" value={imageUrl} placeholder="Enter ImageUrl" onChange={(e)=>setImageUrl(e.target.value)}/>
                      </Form.Group>
                      <Form.Group className="mb-3" >
                        <Form.Label className="form-label" >Description</Form.Label>
                        <Form.Control as="textarea"  className="form-control"  value={description} onChange={(e)=>setDescription(e.target.value)}/>
                      </Form.Group>
                    </Form>
                   </div>
              </div>
         </div>
        
        <div className='container' style={{minHeight:'90vh'}}>
              <div className='d-flex justify-content-center ' style={{height:'100%'}}>
                   <div className='container-fluid' style={{maxWidth:'400px'}}>
                       <h3 className='text-center'>Preview</h3>
                           <hr />
                          <div className='blog-wrapper '>
                              <BlogTile blog={{title,imageUrl,description}}/>  
                          </div>

                          <div style={{textAlign:"center", margin:'20px'}}>
                              <Button variant="primary" className='w-25' onClick={()=>editBlog()}> Edit </Button>
                              &nbsp; &nbsp; 
                              <Button variant="info" className='w-25' onClick={()=>navigate('/dashboard')}> cancel </Button>
                          </div>

                   </div>
              </div>
        </div>
     
</>

}


function AdminBlog(){
       let params=useParams();
       let [blog, setblog]=useState([]);
       let [reason,setReason]=useState("");
       let [showModel,setShowModel]=useState(false);
       let navigate =useNavigate();
       let logout =useLogout();  

        let getblog =async()=>{
               try {
                    
                  let res= await AxiosService.get(`blog/${params.id}`);
                
                  if(res.status==200){
                        setblog(res.data.blog);
                  }
               } catch (error) {
                  toast.error(error.response.data.message)
                  if(error.response.status==401){
                    logout()
                  }
               }
              
        }

        let ChangedStatus = async(status)=>{
                 try {
                        
                       let res =await AxiosService.put(`blog/status/${params.id}/${status}`,{reason});
                       if(res.status==200){
                           toast.success(res.data.message);
                           navigate('/dashboard');
                       }
                       
                 } catch (error) {
                    toast.error(error.response.data.message)
                    if(error.response.status==401){
                      logout()
                    }
                 }
                 finally{
                  setShowModel(false);
                }
        }

     useEffect(()=>{

        if(params.id){
             getblog();
        }else{
             logout()
        }

     },[])
     
       return <>
            <div className='container' style={{minHeight:'90vh'}}>
                        <div className='adminblog m-2'>
                                  {
                                    <Button variant='info'  onClick={()=>navigate('/dashboard')}>Back</Button>
                                  }
                        </div>
                 <div className='d-flex justify-content-center ' style={{height:'100%'}}>
                      
                      <div className='container-fluid' style={{maxWidth:'450px'}}>
                        <div className='blog-wrapper'>
                            <BlogTile blog={blog}/>
                        </div>
                        <div className='text-center mb-4'>
                            {
                              blog.status != "pending" ?<Button variant='warning' className='w-25 p-2' onClick={()=>ChangedStatus("pending")}>Pending</Button> : <></>
                            } 
                            &nbsp;
                            {
                              blog.status !="approved" ?  <Button variant='success' className='w-25 p-2' onClick={()=>ChangedStatus("approved")}>Approved</Button> : <></>
                            }
                            &nbsp;
                            {
                              blog.status !="rejected" ? <Button variant='danger' className='w-25 p-2' onClick={()=>setShowModel(true)}>Rejected</Button> : <></>
                            }
                            &nbsp;
                           
                        </div>
                      </div>
                 </div>
            </div>

      {/* Modal */}
      
      <Modal show={showModel} >
          <Modal.Header>
            <Modal.Title >Provide Reason for Rejection</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <textarea
              onChange={(e) => setReason(e.target.value)}
              className='form-control'
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModel(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => ChangedStatus("rejected")}>Reject</Button>
          </Modal.Footer>
      </Modal>
            
       </>
}

export default Blog
