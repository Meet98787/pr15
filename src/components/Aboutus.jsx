import React from 'react'

const Aboutus = () => {
  return (
    <div className="container my-5 d-flex" id='about'>
        <div className="col-6 m-5">
            <h3 className='fw-bold'>
                About Us
            </h3>
            <p class="fw-bold">Our mission declares our purpose of existence as a company and our objectives.</p>
            <p class="fw-bold">To give every customer much more than what he/she asks for in terms of quality, selection, value for money and customer service, by understanding local tastes and preferences and innovating constantly to eventually provide an unmatched experience in jewellery shopping.</p>
        </div>
        <div className="col-6 ">
            <div className="roundabout shadow-lg">
            <p className='experiences'>
                12 <span>Years</span> 
            </p>
            <p className='ofexp'>of Experiences</p>
            </div>
        </div>
    </div>
  )
}

export default Aboutus