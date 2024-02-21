import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import AxiosService from '../utils/Apiservice';
import { useNavigate } from 'react-router-dom';
import useLogout from '../Hooks/useLogout';
import { Spinner } from 'react-bootstrap';
import {toast} from 'react-toastify';

function Dashboard() {
    let userData=JSON.parse(sessionStorage.getItem('userData'));
    let [blogs, setBlogs]=useState([]);
    let [loading,setLoading]=useState(false);
    let navigate = useNavigate();
    let logout = useLogout();
        
        let url = userData.role=="admin" ? '/blog' : 'blog/user'
       let getBlogs =async()=>{
              try {
                  setLoading(true)
                 let res = await AxiosService.get(url);
                  if(res.status==200){
                      setBlogs(res.data.blogs);
                  }
                 
              } catch (error) {
                  toast.error(error.response.data.message)
                  if(error.response.status==401){
                    logout()
                }
              }finally{
                 setLoading(false);
              }
       }
   useEffect(()=>{
        getBlogs()
   },[])

   
  return <>
       <div className='container mt-3'> 
                <div className='text-center'>
                     <h1>Blog Details</h1>
                     <hr />
                </div>
            <div className='container-fluid text-center'>
                {
                  loading ? (
                    <div className='text-center'>
                      <Spinner animation='border' role='status'>
                        <span className='visually-hidden'>Loading...</span>
                      </Spinner>
                    </div>
                  ) 
                  : (
                  <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Image</th>
                      <th>Created At</th>
                      <th>Status</th>
                      <th>Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                        {
                          blogs.map((e,i)=>{
                              return <tr key={e._id} onClick={()=>navigate(`/blog/${e._id}`)} className='cursor-pointer'>
                                  <td>{i+1}</td>
                                  <td>{e.title}</td>
                                  <td><img src={e.imageUrl} alt='Blog images' style={{width:"100px"}}/></td>
                                  <td>{e.createdAt}</td>
                                  <td>{e.status}</td>
                                  <td>{e.reason}</td>
                              </tr>
                          })
                        }
                  </tbody>
              </Table>
              )
              }
            </div>
       </div>
   
  </>
}

export default Dashboard