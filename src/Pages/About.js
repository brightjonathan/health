import React from 'react';


const About = () => {
  return (
    <section id="about" className="about">
      <div className="container-fluid">

        <div className="row">
          <div className="col-xl-5 col-lg-6 video-box d-flex justify-content-center align-items-stretch position-relative">
          </div>

          <div className="col-xl-7 col-lg-6 icon-boxes d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5">
            <h3>About</h3>
            <p>Birth registration is the first step towards recognizing a child's inalienable right as a human being. Through this registration is one of the primary activities in any hospital with a birth admission like central hospital Benin City. Over time, the statistics of birth records keep on growing due to a population increase. The control and management of such data become cumbersome due to the manual method that is being used. The use of globally accessible technologies for child-birth registration has shown great potential in this area. Therefore, this study aims to create an electronic registration system record 
            (web-based and mobile-friendly application), to ease the difficulties of the manual method of registration, managing and processing birth certificate by individuals whenever they need it. To create a software application management system to transform the manual and semi-electronic operation in the day-to-day activities of Doctors and Nurses in the central hospital Benin City.</p>

            <div className="icon-box">
              <div className="icon"><i className="bx bx-fingerprint"></i></div>
              <h4 className="title"><a href="">Quality in Health</a></h4>
              <p className="description">Quality of care is the degree to which health services for individuals and populations increase the likelihood of desired health outcomes.</p>
            </div>

            <div className="icon-box">
              <div className="icon"><i className="bx bx-gift"></i></div>
              <h4 className="title"><a href="">Experience Academic Staff</a></h4>
              <p className="description"> Central hospital workers valued clear, consistent, and communication. It includes listening to, informing and involving patients in their care. </p>
            </div>

            <div className="icon-box">
              <div className="icon"><i className="bx bx-atom"></i></div> 
              <h4 className="title"><a href=""> Patient Focuse Service </a></h4>
              <p className="description"> Central Hospital care is the practice of caring for patients (and their families) in ways that are meaningful and valuable to the individual patient. </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default About
