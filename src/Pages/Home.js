import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Component/Footer';

const Home = () => {

  return (
    <>
    <div className='sm:mt-4 '>
    <section id="hero" className="d-flex align-items-center  " > 
    <div className="container sm:pr-[20vh]">
      <h1 className='text-black'> Welcome to central <br/> hospital, Benin city </h1>
      <h2 className='text-black'> Birth registration is the first step towards recognizing a child's inalienable <br/> right as a human being </h2>
      <Link to='/birth_registration' className="btn-get-started scrollto"> Get Started </Link>
    </div>
  </section>
  </div>

  <main id="main ">

    <section id="why-us" className="why-us">
      <div className="container ">

        <div className="row">
          <div className="col-lg-4 d-flex align-items-stretch">
            <div className="content">
              <h3>Why Choose Central Hospitals?</h3>
              <p>
              Central Hospitals focus on patient satisfaction in order to provide high quality service by using international
              measurement methods and improvement mechanisms to ensure the Word Class health services are provided to it's patients.
              </p>
              <div className="text-center">
                <Link to='/about' className="more-btn"> Learn More <i className="bx bx-chevron-right"></i></Link>
              </div>
            </div>
          </div>
          <div className="col-lg-8 d-flex align-items-stretch">
            <div className="icon-boxes d-flex flex-column justify-content-center">
              <div className="row">
                <div className="col-xl-4 d-flex align-items-stretch">
                  <div className="icon-box mt-4 mt-xl-0">
                    <i className="bx bx-receipt"></i>
                    <h4>Quality in Health</h4>
                    <p>Quality of care is the degree to which health services for individuals and populations increase the likelihood of desired health outcomes.</p>
                  </div>
                </div>
                <div className="col-xl-4 d-flex align-items-stretch">
                  <div className="icon-box mt-4 mt-xl-0">
                    <i className="bx bx-cube-alt"></i>
                    <h4>Experience Academic Staff</h4>
                    <p>Central hospital workers valued clear, consistent, and communication. It includes listening to, informing and involving patients in their care.</p>
                  </div>
                </div>
                <div className="col-xl-4 d-flex align-items-stretch">
                  <div className="icon-box mt-4 mt-xl-0">
                    <i className="bx bx-images"></i>
                    <h4>Patient Focuse Service</h4>
                    <p>Central Hospital care is the practice of caring for patients (and their families) in ways that are meaningful and valuable to the individual patient.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <section id="services" className="services">
      <div className="container">

        <div className="section-title">
          <h2>Services</h2>
          <p>Medicine, pharmacy, midwifery, nursing, optometry, audiology, psychology, occupational therapy, physical therapy, athletic training, and other health professions all constitute health care. It includes work done in providing primary care, secondary care, and tertiary care, as well as in public health.</p>
        </div>

        <div className="row">
          <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
            <div className="icon-box">
              <div className="icon"><i className="fas fa-heartbeat"></i></div>
              <h4>Maternity Health Care</h4>
              <p>Does your idea of delivery comfort have less to do with the bed you'll give birth in, and more to do with the medical backup you'll have on hand? If so, Central hospital is probably the most comfortable choice for you. </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
            <div className="icon-box">
              <div className="icon"><i className="fas fa-pills"></i></div>
              <h4> Antenetal Health Care </h4>
              <p>Through this form of Antenetal health care, women can learn from skilled health personnel about healthy behaviours during pregnancy, better understand warning signs during pregnancy and childbirth, and receive social, emotional and psychological support at this critical time in their lives</p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
            <div className="icon-box">
              <div className="icon"><i className="fas fa-hospital-user"></i></div>
              <h4> Birth Registration System </h4>
              <p>At Central Hospital, it establishes a legal record of where the child was born and who his or her parents are. Birth registration is required for a child to get a birth certificate - his or her first legal proof of identity.</p>
            </div>
          </div>          

        </div>

      </div>
    </section>

    </main>
    <Footer /> 

  </>
  )
}

export default Home;



