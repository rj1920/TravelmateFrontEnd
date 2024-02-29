import React from "react";
import styled from "styled-components";
// import avatarImage from "../assets/avatarImage.jpeg";
export default function Testimonials() {
  return (
    <Section id="testimonials">
      <div className="title">
        <h2 style={{ fontSize: 45, fontFamily: 'unset', color: 'blueviolet' }}>Our Happy Customers!!</h2>
      </div>
      <div className="testimonials" style={{ color: 'black' }}>
        <div className="testimonial">
          <p><i>
            My recent vacation organized by TravelMate was nothing short of extraordinary.Thanks to them, I had an unforgettable adventure that exceeded all my expectations.
            Thank you TravelMate <br></br><br></br><b>
              -Jai Sharma</b></i>
          </p>
          {/* <div className="info">
            <img src={avatarImage} alt="" />
            <div className="details">
              <h4>Kishan Sheth</h4>
              <span>CEO - Shashaan Web Solutions</span>
            </div>
          </div> */}
        </div>
        <div className="testimonial">
          <p><i>
            "I can't thank TravelMate enough for crafting a vacation that perfectly suited my family's needs. Traveling with kids can be a challenge, but they took care of every detail, ensuring that both adults and children had a fantastic time."
            <br></br><br></br>

            <b>-Pratik Shahane</b></i>
          </p>
          {/* <div className="info">
            <img src={avatarImage} alt="" />
            <div className="details">
              <h4>Kishan Sheth</h4>
              <span>CEO - Shashaan Web Solutions</span>
            </div>
          </div> */}
        </div>
        <div className="testimonial">
          <p><i>
            "I've been on multiple trips with TravelMate, and each one has been exceptional.As a conscious traveler, I appreciate their efforts in making a positive difference while delivering top-notch travel experiences."
            <br></br><br></br>
            <b>-Vijay Choughule </b></i>
          </p>
          {/* <div className="info">
            <img src={avatarImage} alt="" />
            <div className="details">
              <h4>Kishan Sheth</h4>
              <span>CEO - Shashaan Web Solutions</span>
            </div>
          </div> */}
        </div>
        <div className="testimonial">
          <p><i>
            "Traveling solo for the first time was a big step for me, but TravelMate ensured that it was an enriching and hassle-free experience. I returned home with amazing memories and a newfound sense of independence."
            <br></br><br></br><br></br>
            <b>-Riya Singh</b></i>
          </p>
          {/* <div className="info">
            <img src={avatarImage} alt="" />
            <div className="details">
              <h4>Kishan Sheth</h4>
              <span>CEO - Shashaan Web Solutions</span>
            </div>
          </div> */}
        </div>

      </div>
    </Section>
  );
}

const Section = styled.section`
  margin: 5rem 0;
  .title {
    text-align: center;
    margin-bottom: 2rem;
  }
  .testimonials {
    display: flex;
    justify-content: center;
    margin: 0 2rem;
    gap: 2rem;
    .testimonial {
      background-color:aliceblue;
      padding: 2rem;
      border-radius: 0.5rem;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      transition: 0.3s ease-in-out;
      &:hover {
        transform: translateX(0.4rem) translateY(-1rem);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }
      .info {
        display: flex;
        justify-content: center;
        gap: 1rem;
        align-items: center;
        margin-top: 1rem;
        img {
          border-radius: 3rem;
          height: 3rem;
        }
        .details {
          span {
            font-size: 0.9rem;
          }
        }
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 768px) {
    .testimonials {
      flex-direction: column;
      margin: 0;
      .testimonial {
        justify-content: center;
        .info {
          flex-direction: column;
          justify-content: center;
        }
      }
    }
  }
`;