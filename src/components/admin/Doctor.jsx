import React from 'react';
import Nevbar from './Nevbar';
import Deshbord from './Deshbord';
import { Routes, Route } from 'react-router-dom';
import Appoinment from './Appoinment';
import Pendingappo from './Pendingappo';
import Approveappo from './Approveappo';
import Rejectappo from './Rejectappo';
import DoctorProfail from './DoctorProfail';
import Changepassword from './Changepassword';

const Doctor = () => {
  return (
    <div className=' d-flex'>
      <div className="col-2">
        <Nevbar />
      </div>
      <div className="col-10 side">
        <Routes>
        <Route path="/" element={<Deshbord />} />
          <Route path="/appoinment" element={<Appoinment />} />
          <Route path="/pendingappoinment" element={<Pendingappo />} />
          <Route path="/approveappoinment" element={<Approveappo />} />
          <Route path="/rejectappoinment" element={<Rejectappo />} />
          <Route path="/doctorprofail" element={<DoctorProfail />} />
          <Route path="/chengepassword" element={<Changepassword />} />
          
        </Routes>
      </div>
    </div>
  );
};

export default Doctor;
