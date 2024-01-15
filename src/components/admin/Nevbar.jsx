import React from 'react';
import { Link } from 'react-router-dom';
import { handleLogout } from '../firebase';
import { MdDashboard } from "react-icons/md";

const Nevbar = () => {
  return (
    <div className="nevbar col-12 p-2">
      <Link to="/doctor">
        <img src="/logo.png" height="60" alt="MDB Logo" loading="lazy" />
      </Link>
      <ul className='p-2'>
        <li className='p-2'>
          <Link to="/doctor">
          <MdDashboard /> Dashbaord
          </Link>
        </li>
        <li className='p-2'>
          <Link to="/doctor/appoinment">
          <i class="fa-solid fa-calendar-days"></i> All Appointment
          </Link>
        </li>
        <li className='p-2'>
          <Link to="/doctor/pendingappoinment">
          <i class="fa-solid fa-calendar-day"></i> Pending Appointment
          </Link>
        </li>
        <li className='p-2'>
          <Link to="/doctor/approveappoinment">
          <i className="fa-regular fa-calendar-check"></i> Approved Appointment
          </Link>
        </li>
        <li className='p-2'>
          <Link to="/doctor/rejectappoinment">
          <i class="fa-regular fa-calendar-xmark"></i> Reject Appointment
          </Link>
        </li>
        <li className='p-2'>
          <Link to="/doctor/doctorprofail">
          <i class="fa-solid fa-user-doctor"></i> Your Profile
          </Link>
        </li>
        <li className='p-2'>
          <button className='btn btn-danger ' on onClick={handleLogout}>
            Sign out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Nevbar;
