import React, { useEffect } from "react";
import { AiOutlineWhatsApp } from "react-icons/ai";
import {
  AboutUs,
  IconTestimony,
  IconHomeCare,
  Avatar2,
  Avatar3,
  Avatar4,
  IconGeneralTreatment,
  IconInsurance,
  IconProfesional,
  IconExperience,
  IconCheap,
  IconReferral,
} from "../../assets";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";
import "../../index.css";
import { LandingNavbar, LandingFooter } from "../../components";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";

const LandingPage = () => {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);
  return (
    <div name="home">
      <Helmet>
        <title>Home | Ardita Medical</title>
      </Helmet>
      {/* Navbar */}
      <LandingNavbar />
      {/* Hero */}
      <div className="flex md:h-screen h-[540px]  items-center justify-center relative">
        <div className="hero-image-home" />
        <div className="relative px-4 md:px-40 w-full md:mt-20">
          <p className="text-blue-400 sm:text-lg font-semibold text-center">
            Ardita Medical
          </p>
          <h2 className="hero-motto text-4xl md:text-6xl leading-tight md:leading-snug text-center text-white font-extralight">
            Your <span className="font-medium">Health</span> is Our <br />{" "}
            <span className="font-medium">Priority</span>
          </h2>
          <a
            href="https://api.whatsapp.com/send?phone=6285238879055&text=Hi Ardita Medical!"
            target="blank"
          >
            <button className="bg-blue-700 mt-6 sm:mt-10 block mx-auto border-none cursor-pointer px-4 h-12 sm:px-8 text-white text-base rounded">
              <div className="flex gap-2">
                <AiOutlineWhatsApp className="self-center text-2xl" />
                Book Appoinment
              </div>
            </button>
          </a>
        </div>
      </div>
      {/* Advantage */}
      <div className="w-full bg-blue-300 py-10 md:flex justify-center gap-10 px-4 md:px-40">
        <div>
          <img
            src={IconProfesional}
            alt="icon_profesional"
            className="h-16 w-16 mx-auto md:mx-0"
            data-aos="fade-up"
            data-aos-duration="400"
          />
          <div>
            <h3
              className="text-lg sm:text-xl text-blue-900 font-semibold mt-4 text-center md:text-start"
              data-aos="fade-up"
              data-aos-duration="400"
            >
              Professional Care
            </h3>
            <p
              className="text-base font-normal mt-2 text-center md:text-start"
              data-aos="fade-up"
              data-aos-duration="400"
            >
              Commitment to professional care ensures that you receive the
              highest quality medical services possible, delivered with
              compassion and personalized attention.
            </p>
          </div>
        </div>
        <div>
          <img
            src={IconExperience}
            alt="icon_experience"
            className="h-16 w-16 mx-auto md:mx-0 mt-6 md:mt-0"
            data-aos="fade-up"
            data-aos-duration="600"
          />
          <div>
            <h3
              className="text-lg sm:text-xl text-blue-900 font-semibold mt-4 text-center md:text-start"
              data-aos="fade-up"
              data-aos-duration="600"
            >
              Experienced Doctor
            </h3>
            <p
              className="text-base font-normal mt-2 text-center md:text-start"
              data-aos="fade-up"
              data-aos-duration="600"
            >
              The wealth of experience that our doctors have with more than 10
              years of experience makes us confident that we can provide the
              best medical care for you
            </p>
          </div>
        </div>
        <div>
          <img
            src={IconCheap}
            alt="icon_cheap"
            className="h-16 w-16 mx-auto md:mx-0 mt-6 md:mt-0"
            data-aos="fade-up"
            data-aos-duration="800"
          />
          <div>
            <h3
              className="text-lg sm:text-xl text-blue-900 font-semibold mt-4 text-center md:text-start"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              Low Cost of Service
            </h3>
            <p
              className="text-base font-normal mt-2 text-center md:text-start"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              Ensure that you can receive high-quality medical care without
              straining your finances, delivered by experienced doctors who
              prioritize your health and well-being.
            </p>
          </div>
        </div>
      </div>
      {/* About Us */}
      <div
        name="about"
        className="lg:flex gap-8 px-4 lg:px-40 mt-12 lg:mt-20 w-full"
      >
        <p
          className="text-blue-400 sm:text-lg font-semibold text-center md:hidden"
          data-aos="fade-left"
        >
          Welcome to Ardita Medical
        </p>
        <h2
          className="text-blue-900 font-bold text-xl sm:text-3xl md:text-4xl mt-2 leading-snug text-center md:hidden"
          data-aos="fade-left"
        >
          Best Care for Your Good <br />
          Health
        </h2>
        <div className="lg:w-1/2">
          <img
            src={AboutUs}
            alt="aboutUs"
            className="rounded"
            data-aos="fade-right"
          />
        </div>
        <div className="lg:w-1/2">
          <p
            className="text-blue-400 sm:text-lg font-semibold hidden md:block"
            data-aos="fade-left"
          >
            Welcome to Ardita Medical
          </p>
          <h2
            className="text-blue-900 font-bold text-xl sm:text-3xl md:text-4xl mt-2 leading-snug hidden md:block"
            data-aos="fade-left"
          >
            Best Care for Your Good <br />
            Health
          </h2>
          <div className="mt-4"></div>
          <div data-aos="fade-left">
            <p className="mt-4 text-center md:text-start">
              Ardita medical is a general practitioner's practice of Dr. I Wayan
              Gede Ardita. We believe that everyone deserves access to
              professional medical care that's both affordable and
              compassionate. That's why we offer low-cost services designed to
              help you get the care you need without worrying about the cost.
            </p>
            <p className="mt-2 text-center md:text-start">
              We're not just about affordability - we're passionate about
              healing. Our experienced and dedicated team of doctors and staff
              are here to help you every step of the way, from diagnosis to
              treatment and beyond.
            </p>
          </div>
        </div>
      </div>
      {/* Service */}
      <div
        name="service"
        className="mt-20 w-full bg-blue-300 py-20
      "
      >
        <p
          className="text-blue-400  sm:text-lg font-semibold text-center"
          data-aos="fade-up"
        >
          What We Provide to You
        </p>
        <h2
          className="text-blue-900 font-bold text-2xl sm:text-4xl mt-2 leading-snug text-center"
          data-aos="fade-up"
          data-aos-duration="400"
        >
          Our Service
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 px-4 md:px-40">
          <div
            className="p-10 border shadow-md rounded-lg hover:shadow-xl"
            data-aos="fade-up"
            data-aos-duration="400"
          >
            <img
              src={IconGeneralTreatment}
              alt="iconGeneralTreatment"
              className="h-16 w-16 mx-auto"
            />
            <h3 className="text-lg sm:text-xl text-blue-900 font-semibold mt-4 text-center">
              General Tretment
            </h3>
            <p className="text-base font-normal mt-2 text-center">
              General treatment services for various medical issues, including
              evaluations, personalized treatment plans to each patient's unique
              needs
            </p>
          </div>
          <div
            className="p-10 border shadow-md rounded-lg hover:shadow-xl"
            data-aos="fade-up"
            data-aos-duration="600"
          >
            <img
              src={IconHomeCare}
              alt="IconHomeCare"
              className="h-16 w-16 mx-auto"
            />
            <h3 className="text-lg sm:text-xl text-blue-900 font-semibold mt-4 text-center">
              Home Care Visit
            </h3>
            <p className="text-base font-normal mt-2 text-center">
              Treatment services to patients in the comfort of their own homes,
              helping to manage their health concerns and promote overall
              wellness.
            </p>
          </div>
          <div
            className="p-10 border shadow-md rounded-lg hover:shadow-xl"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <img
              src={IconReferral}
              alt="IconInsurance"
              className="h-16 w-16 mx-auto"
            />
            <h3 className="text-lg sm:text-xl text-blue-900 font-semibold mt-4 text-center">
              Referrals To Specialists
            </h3>
            <p className="text-base font-normal mt-2 text-center">
              We work with specialists and medical facilities to provide
              efficient and timely referrals, ensuring our patients receive the
              best possible care.
            </p>
          </div>
          <div
            className="p-10 border shadow-md rounded-lg hover:shadow-xl"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <img
              src={IconInsurance}
              alt="IconInsurance"
              className="h-16 w-16 mx-auto"
            />
            <h3 className="text-lg sm:text-xl text-blue-900 font-semibold mt-4 text-center">
              BPJS Insurance
            </h3>
            <p className="text-base font-normal mt-2 text-center">
              We're proud partners with BPJS for providing accessible and
              affordable medical care for everyone without worrying about the
              cost.
            </p>
          </div>
        </div>
      </div>
      {/* Testimony */}
      <div
        name="testimony"
        className="mt-20 w-full px-4 md:px-40
      "
      >
        <p
          className="text-blue-400  sm:text-lg font-semibold text-center"
          data-aos="fade-up"
          data-aos-duration="400"
        >
          What They Say About Us
        </p>
        <h2
          className="text-blue-900 font-bold  text-2xl sm:text-3xl md:text-4xl mt-2 leading-snug text-center"
          data-aos="fade-up"
          data-aos-duration="400"
        >
          Testimony
        </h2>

        <div
          className="relative flex content-center items-center justify-center py-4 mt-10 bg-blue-900"
          data-aos="fade-up"
          data-aos-duration="400"
        >
          {/* <div
            className="absolute top-0 h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${BannerTestimony})` }}
          /> */}
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 1,
                spaceBetween: 50,
              },
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper mt-10 h-[400px]  md:h-[320px]"
          >
            <SwiperSlide>
              <div>
                <img
                  src={IconTestimony}
                  alt="iconTestimony"
                  className="mx-auto"
                />
                <p className="mt-6 text-xl text-center text-white">
                  Saya sangat senang dengan layanan disini.
                  <br />
                  Dokter dan stafnya sangat ramah dan memberikan <br />
                  perawatan terbaik untuk saya
                </p>
                <hr className="w-20 mx-auto mt-6" />
                <div className="flex justify-center gap-4 mt-4">
                  <img
                    src={Avatar4}
                    className="w-[50px] h-[50px] p-1 rounded-[50px] box-border object-cover"
                    alt="testimony1"
                  ></img>
                  <p className="text-xl text-white self-center">Putu Riani</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <img
                  src={IconTestimony}
                  alt="iconTestimony"
                  className="mx-auto"
                />
                <p className="mt-6 text-xl text-center text-white">
                  Saya sangat terkesan dengan pelayanan disini
                  <br />
                  Dokter sangat ahli dan membantu saya sembuh
                  <br />
                  dari sakit saya dengan cepat
                </p>
                <hr className="w-20 mx-auto mt-6" />
                <div className="flex justify-center gap-4 mt-4">
                  <img
                    src={Avatar2}
                    className="w-[50px] h-[50px] p-1 rounded-[50px] box-border object-cover"
                    alt="testimony1"
                  ></img>
                  <p className="text-xl text-white self-center">Putu Semaya</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <img
                  src={IconTestimony}
                  alt="iconTestimony"
                  className="mx-auto"
                />
                <p className="mt-6 text-xl text-center text-white">
                  Saya sangat merekomendasikan paraktik dokter ardita. <br />
                  Dokter dan stafnya sangat profesional dan memberikan <br />
                  perawatan yang sangat baik
                </p>
                <hr className="w-20 mx-auto mt-6" />
                <div className="flex justify-center gap-4 mt-4">
                  <img
                    src={Avatar3}
                    className="w-[50px] h-[50px] p-1 rounded-[50px] box-border object-cover"
                    alt="testimony1"
                  ></img>
                  <p className="text-xl text-white self-center">Made Cendana</p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
