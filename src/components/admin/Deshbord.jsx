import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { app } from '../firebase';
import Approveappo from './Approveappo';

const Deshbord = () => {
  const database = getDatabase(app);
  const ActiveDoctor = JSON.parse(localStorage.getItem('Active-doctor'))
  const [pendingApo, setPending] = useState()
  const [approvedApo, setapproved] = useState()
  const [cancelle, setcancelle] = useState()
  const [apoiment, setApoiment] = useState()
  useEffect(() => {
    userlist();
  }, []);

  const userlist = () => {
    const userRef = ref(database, "booking");
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const Approvelist = Object.keys(data)
          .map((id) => ({ id, ...data[id] }))
          .filter(item => (
            item.doctor && item.doctor.includes(ActiveDoctor[0]) &&
            item.status && item.status.includes("Approve")
          ));
          setapproved(Approvelist.length);
          const Pendinglist = Object.keys(data)
          .map((id) => ({ id, ...data[id] }))
          .filter(item => (
            item.doctor && item.doctor.includes(ActiveDoctor[0]) &&
            item.status && item.status.includes("Pending")
          ));
          setPending(Pendinglist.length);
          const rejectlist = Object.keys(data)
          .map((id) => ({ id, ...data[id] }))
          .filter(item => (
            item.doctor && item.doctor.includes(ActiveDoctor[0]) &&
            item.status && item.status.includes("Reject")
          ));
          setcancelle(rejectlist.length);
          const list = Object.keys(data)
          .map((id) => ({ id, ...data[id] }))
          .filter(item => (
            item.doctor && item.doctor.includes(ActiveDoctor[0])
          ));
          setApoiment(list.length);
      } else {
        console.log("data not Found")
      }
    });
  };
  return (
    <div className="row m-0">
      <div className="col-5 m-2 ms-4 p-4 border rounded">
        <p>{pendingApo? pendingApo : "0"}</p>
        <h5>Total New Appointment</h5>
        <div className="col-12 bg-warning p-2 ">
          <Link className=' text-white' to="/doctor/pendingappoinment">View Detail</Link>
        </div>
      </div>
      <div className="col-5 m-2 p-4 border rounded">
        <p>{approvedApo ? approvedApo : "0" }</p>
        <h5>Total Approved Appointment</h5>
        <div className="col-12 bg-success p-2 ">
          <Link className=' text-white' to="/doctor/approveappoinment">View Detail</Link>
        </div>
      </div>
      <div className="col-5 ms-4 m-2 p-4 border rounded">
        <p>{cancelle ? cancelle : "0" }</p>
        <h5>Total Cancelled Appointment</h5>
        <div className="col-12 bg-danger p-2 ">
          <Link className=' text-white' to="/doctor/rejectappoinment">View Detail</Link>
        </div>
      </div>
      <div className="col-5 m-2 p-4 border rounded">
        <p>{apoiment ? apoiment : "0" }</p>
        <h5>Total Appointment</h5>
        <div className="col-12 bg-primary p-2 ">
          <Link className='text-white' to="/doctor/appoinment">View Detail</Link>
        </div>
      </div>
    </div>
  )
}

export default Deshbord