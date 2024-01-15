import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Fotter = () => {
  return (
    <div className="container mt-5 d-flex bg-light p-5" id='contect'>
        <div className="col-5">
            <h3>Timing</h3>
            <p className='fw-light'>10:30 am to 7:30pm</p>
            <h3>Email</h3>
            <p className='fw-light'>info@gmail.com</p>
            <h3>Contect Number</h3>
            <p className='fw-light'>7897897898</p>
        </div>
        <div className="col-3">
            <h3>Our Clinic</h3>
            <p className='fw-light'>890,Sector 62 Gyan sarovar,GAIL Noida(Delhi/NCR)</p>
        </div>
        <div className="col-3">
            <h3 >Socials</h3>
            <div className="icon">
            <FaFacebook className='m-1'/>
            <FaInstagramSquare className='m-1' />
            <FaTwitter className='m-1' />
            <FaLinkedin className='m-1' />
            </div>
        </div>
    </div>
  )
}

export default Fotter