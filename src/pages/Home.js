import Base from '../components/base'
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import ScrollToTop from "../components/ScrollToTop";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import scrollreveal from "scrollreveal";
import React, { useEffect } from "react";
const Home = () => {
  useEffect(() => {
    const sr = scrollreveal({
      origin: "top",
      distance: "80px",
      duration: 2000,
      reset: true,
    });
    sr.reveal(
      `
        nav,
        #hero,
        #services,
        #testimonials,
        footer
        `,
      {
        opacity: 0,
        interval: 300,
      }
    );
  }, []);
  return (
    <>
    <Base>
      <ScrollToTop />
      <Hero />
      <Services />
      <Testimonials />
      <Footer />
    </Base>
    </>

  )
}

export default Home