import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Spinner } from 'react-bootstrap';
import AxiosService from '../utils/Apiservice';
import { useNavigate } from 'react-router-dom';
import {toast} from  'react-toastify';
import {FiBook} from 'react-icons/fi'

function SignUp() {
        
     let [firstName,setFirstName]=useState("");
     let [lastName,setLastName]=useState("");
     let [email,setEmail]=useState("");
     let [password,setPassword]=useState("");
     let [loading,setLoading]=useState(false);
     let navigate= useNavigate();

    let handleCreate= async ()=>{
        try {
              setLoading(true);
          let res= await AxiosService.post('/user/signup',{
              firstName,
              lastName,
              email,
              password
          })

             if(res.status==201){
                   toast.success(res.data.message);
                   navigate('/')
             }
        } catch (error) {

          toast.error(error.response.data.message)
        }finally{
            setLoading(false);
        }
    }
     
  return <>
      <div className='container' style={{height:"100Vh"}}>
            <div className='d-flex justify-content-center align-items-center' style={{height:"100%"}}>
                <div className='container-fluid shadow p-4' style={{maxWidth:"400px"}}>
                    <div>
                        <h3 className='text-center' style={{fontFamily:"sans-serif",color:"crimson"}}> <FiBook size={"24px"} className='mb-1 mx-2'/>Blog App</h3>
                    </div>
                    
                 <Form>
                    <Form.Group className="mb-3" >
                      <Form.Label  className="form-label">First Name</Form.Label>
                      <Form.Control type="text" className="form-control" placeholder="Enter your First Name" onChange={(e)=>setFirstName(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="form-label">Last Name</Form.Label>
                      <Form.Control type="text" className="form-control" placeholder="Enter Last Name" onChange={(e)=>setLastName(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                      <Form.Label className="form-label">Email address</Form.Label>
                      <Form.Control type="email" className="form-control"  placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="form-label">Password</Form.Label>
                      <Form.Control type="password" className="form-control"  placeholder="Password" onChange={(e)=> setPassword(e.target.value)} />
                    </Form.Group>

                    <Button className="mb-3 w-100" variant="primary" onClick={()=>handleCreate()} style={{backgroundColor:"crimson", border:"1px solid cadetblue"}}> 
                      {
                        loading ? <Spinner animation='border' size='sm' ></Spinner> : 'SignUp'
                      }
                    </Button>

                </Form>

                </div>
            </div>
      </div>
  </>
}

export default SignUp