import { Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import {
  AiFillDownCircle,
  AiOutlineClose,
  AiOutlineMenu,
} from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { Logo, Avatar } from "../../../assets";

const LandingNavbar = ({ image }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth =
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : "";

  const [nav, setNav] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const logout = () => {
    navigate("/");
    localStorage.removeItem("user");
    window.location.reload();
  };

  const items =
    auth.level === "Admin" || auth.level === "Dokter"
      ? [
          {
            key: "1",
            label: <p onClick={logout}>Logout</p>,
          },
        ]
      : [
          {
            key: "1",
            label: (
              <p onClick={() => navigate("/my-account/setting")}>
                Account Setting
              </p>
            ),
          },
          {
            key: "2",
            label: <p onClick={logout}>Logout</p>,
          },
        ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`flex fixed top-0 right-0 w-full justify-between items-center mx-auto px-4 lg:px-40 text-white z-10  ${
          showBackground
            ? "bg-blue-900 h-20 ease-in-out duration-500"
            : "bg-transparent h-28 ease-in-out duration-300"
        }`}
      >
        <div className="flex justify-center gap-10">
          <div
            className="flex gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={Logo} alt="icon_total_patient"></img>
            <h3 className="text-center font-semibold text-[22px] self-center text-white">
              Ardita Medical
            </h3>
          </div>
          <ul className="hidden md:flex gap-6">
            <li
              className="self-center cursor-pointer"
              onClick={() => navigate("/")}
            >
              Home
              <hr
                className={
                  location.pathname === "/"
                    ? "w-4 bg-white mx-auto h-[1px]"
                    : "hidden"
                }
              />
            </li>
            <li
              className="self-center cursor-pointer"
              onClick={() => navigate("/check-visitation")}
            >
              Visitation
              <hr
                className={
                  location.pathname === "/check-visitation"
                    ? "w-4 bg-white mx-auto h-[1px]"
                    : "hidden"
                }
              />
            </li>

            <li
              className={
                auth.level === "Dokter" || auth.level === "Admin"
                  ? "hidden"
                  : "self-center cursor-pointer"
              }
              onClick={() =>
                auth ? navigate("/my-record") : navigate("/login")
              }
            >
              Medical Record
              <hr
                className={
                  location.pathname === "/my-record" ||
                  location.pathname.includes("/prescription") ||
                  location.pathname.includes("/history")
                    ? "w-4 bg-white mx-auto h-[1px]"
                    : "hidden"
                }
              />
            </li>
          </ul>
        </div>
        <div>
          {auth ? (
            <div className="hidden md:flex self-end">
              <p className="self-center mr-2 hidden md:block">
                Hallo, {auth.name}
              </p>
              <img
                src={
                  image
                    ? `http://localhost:3001/${image}`
                    : auth.image
                    ? `http://localhost:3001/${auth.image}`
                    : Avatar
                }
                alt="user-profile"
                className="w-[50px] h-[50px] p-1 rounded-[50px] box-border object-cover border border-blue-800 "
              />
              <Dropdown
                menu={{
                  items,
                }}
                className="hidden md:block"
              >
                <AiFillDownCircle className="self-center" />
              </Dropdown>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="hidden md:block bg-blue-700 border-none cursor-pointer px-8 py-2 h-10 text-white text-sm rounded self-center"
            >
              Login
            </button>
          )}
        </div>

        <div onClick={handleNav} className="block md:hidden">
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        <ul
          className={
            nav
              ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-blue-900 ease-in-out duration-500 z-10"
              : "ease-in-out duration-500 fixed left-[-100%]"
          }
        >
          <div className="flex justify-center gap-2 mt-10 mb-4">
            <img src={Logo} alt="icon_total_patient"></img>
            <h3 className="text-center font-semibold text-[22px] self-center text-white">
              Ardita Medical
            </h3>
          </div>

          <li
            className={
              location.pathname === "/"
                ? "self-center cursor-pointer p-4 border-r-4 border-white"
                : "self-center cursor-pointer p-4"
            }
            onClick={() => navigate("/")}
          >
            Home
          </li>
          <li
            className={
              location.pathname === "/check-visitation"
                ? "self-center cursor-pointer p-4 border-r-4 border-white"
                : "self-center cursor-pointer p-4"
            }
            onClick={() => navigate("/check-visitation")}
          >
            Visitation
          </li>
          <li
            className={
              auth.level === "Dokter" || auth.level === "Admin"
                ? "hidden"
                : location.pathname === "/my-record" ||
                  location.pathname.includes("/prescription") ||
                  location.pathname.includes("/history")
                ? "self-center cursor-pointer p-4 border-r-4 border-white"
                : "self-center cursor-pointer p-4"
            }
            onClick={() => (auth ? navigate("/my-record") : navigate("/login"))}
          >
            Medical Record
          </li>
          <li
            className={
              auth.level === "Dokter" || auth.level === "Admin"
                ? "hidden"
                : location.pathname === "/my-account/setting"
                ? "self-center cursor-pointer p-4 border-r-4 border-white"
                : "self-center cursor-pointer p-4"
            }
            onClick={() =>
              auth ? navigate("/my-account/setting") : navigate("/login")
            }
          >
            Account Settings
          </li>
          {auth ? (
            <button
              onClick={logout}
              className="block md:hidden mt-4 ml-4 bg-[#BFD2F8] hover:bg-[#c5d5f6] border-none cursor-pointer px-8 py-2 h-10 text-blue-900 text-sm rounded self-center"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="block md:hidden mt-4 ml-4 bg-[#BFD2F8] hover:bg-[#c5d5f6] border-none cursor-pointer px-8 py-2 h-10 text-blue-900 text-sm rounded self-center"
            >
              Login
            </button>
          )}
        </ul>
      </div>
    </>
  );
};

export default LandingNavbar;
