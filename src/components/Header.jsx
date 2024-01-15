import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => {
  return (
    <div className="container-fluid header">
      <div className="container">
        <nav class="navbar navbar-expand-lg navbar-light bg-body-tertiary">
          <div class="container-fluid ">

            <div class="collapse navbar-collapse ">
            <a class="navbar-brand mt-2 mt-lg-0" href="#home">
                    <img
                      src="/logo.png"
                      height="60"
                      alt="MDB Logo"
                      loading="lazy"
                    />
                  </a>
              <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center">
                <li class="nav-item">
                  <a class="nav-link" href="#home">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#about">About</a>

                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#project">Projects</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#chack">check Appointment</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#booking">Booking</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#contect">Contect</a>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/login">Doctor</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>

  )
}

export default Header