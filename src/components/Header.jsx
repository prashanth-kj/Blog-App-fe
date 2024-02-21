import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import useLogout from '../Hooks/useLogout';
import { useNavigate } from 'react-router-dom';
import {FiBook} from 'react-icons/fi'

function Header() {
       let userData=JSON.parse(sessionStorage.getItem('userData'))

        let[role,setRole]=useState("");
       
      useEffect(()=>{
           
         if(!userData){
             logout();
         }else{
               setRole(userData.role)
         }

      },[])  
        
      let logout= useLogout();

  return <>
       <Navbar expand="md" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand> <h3 className='ml-2' style={{color:'crimson'}}> <FiBook size={"24px"} className='mb-1 mx-2'/>Blog App</h3></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav ">
          <Nav className="me-auto  nav-items">
            {
                 role==="admin"?<><AdminNavLinks/></>: <><UserNavLinks/> </>
            }  
                
           </Nav>
            <Nav>
                <Nav.Item><h4>{ `${userData.firstName} ${userData.lastName}`}</h4></Nav.Item>
                &nbsp; &nbsp;
                <Nav.Item  onClick={logout}><Button variant='danger'>Logout</Button></Nav.Item>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>
}

function AdminNavLinks (){
        let navigate= useNavigate()

        return <>
                <Nav onClick={()=> navigate('/dashboard')}>dashboard</Nav>    
        </>
}

function UserNavLinks (){
    let navigate= useNavigate()

    return <>
            <Nav onClick={()=> navigate('/home')}>Home</Nav>
            <Nav onClick={()=> navigate('/dashboard')}>dashboard</Nav>
            <Nav onClick={()=> navigate('/create')}>Create</Nav>
      </>
}


export default Header