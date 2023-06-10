import React from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../../assets";

const LandingFooter = () => {
  const navigate = useNavigate();
  const auth =
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : "";
  return (
    <>
      <div className="w-full mx-auto py-16 px-8 md:px-40  md:flex md:justify-between text-white bg-blue-900 mt-24">
        <div>
          <div className="flex gap-2">
            <img src={Logo} alt="icon_total_patient"></img>
            <h3 className="text-center font-semibold text-[22px] self-center text-white">
              Ardita Medical
            </h3>
          </div>
          <p className="py-4">
            Leading the Way in Medical <br />
            Execellence, Trusted Care.
          </p>
          <p className="py-4">© 2023 Ardita Medical</p>
        </div>
        <div>
          <h6 className="font-medium text-gray-400 mt-4 md:mt-0">
            Quick Links
          </h6>
          <ul>
            <li
              className="py-2 text-sm cursor-pointer"
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className="py-2 text-sm cursor-pointer"
              onClick={() => navigate("/check-visitation")}
            >
              Visitation
            </li>
            <li
              className={
                auth.level === "Dokter" || auth.level === "Admin"
                  ? "hidden"
                  : "self-center cursor-pointer py-2 text-sm"
              }
              onClick={() =>
                auth ? navigate("/my-record") : navigate("/login")
              }
            >
              Medical Record
            </li>
          </ul>
        </div>
        <div>
          <h6 className="font-medium text-gray-400 mt-4 md:mt-0">Contact</h6>
          <ul>
            <li className="py-2 text-sm">Phone: +62 85238879055</li>
            <li className="py-2 text-sm">Email: ardita@gmail.com</li>
            <li className="py-2 text-sm">Working Hour: Mon-Sat 17:00-21:00</li>
          </ul>
        </div>
        <div>
          <h6 className="font-medium text-gray-400 mt-4 md:mt-0">Location</h6>
          <ul>
            <li className="py-2 text-sm">
              Address: Jl Ir Dokter Soekarno Br. Intaran Pejeng, <br />
              Tampaksiring (Next to Galaxy Pharmacy)
            </li>
          </ul>
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d246.61429636763992!2d115.29309507814231!3d-8.516002965160446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1682482481857!5m2!1sid!2sid"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              className="rounded-sm"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingFooter;
