import React from 'react';
import { Link } from 'react-router-dom';

import finddoctor from "../Image/finddoctor.png";
import calender from "../Image/calender.png";
import { BsArrowRightCircleFill } from "react-icons/bs";

function Home() {
  return (
    <div className="hero_section">
      <div className="container">
        <div className="flex">
          <div className="content">
            <h1 className="heading">We help patients live a healthy, longer life.</h1>
            <div className="image">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/028/287/555/small_2x/an-indian-young-female-doctor-isolated-on-green-ai-generated-photo.jpg"
                alt="Doctor"
              />
            </div>
          </div>

          <div className="content-end">
            <h1 className="h1-end">Providing best medical services</h1>
            <p className="p-end">
              World-class care for everyone. Our health system offers unmatched, expert health care.
            </p>
          </div>

          <div className="section">
            <div className="book-doctor">
              <div className="book-image">
                <img src={calender} alt="Book appointment" height="200px" />
              </div>
              <div className="book-btn">
                <h2 className="book-h2">Book Appointment</h2>
                <Link to="/booking" className="arrow-btn">
                  <BsArrowRightCircleFill style={{ width: "100px", height: "50px" }} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
