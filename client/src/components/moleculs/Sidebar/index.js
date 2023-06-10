import React from "react";
import { AiFillMedicineBox, AiFillSetting } from "react-icons/ai";
import {
  BsFillBarChartLineFill,
  BsFillPeopleFill,
  BsPersonPlusFill,
  BsFillArrowLeftSquareFill,
} from "react-icons/bs";
import { FaAddressBook, FaFileMedical } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { Logo } from "../../../assets";

const Sidebar = ({ sidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth =
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : "";

  const logout = () => {
    navigate("/");
    localStorage.removeItem("user");
    window.location.reload();
  };

  if (auth.level === "Admin") {
    return (
      <div
        className={
          sidebar
            ? "bg-blue-300 h-screen fixed w-[260px] pt-8 top-0 ease-in-out duration-300"
            : "bg-blue-300 h-screen fixed w-[260px] pt-8 top-0 ml-[-500px] ease-in-out duration-300"
        }
      >
        <div>
          <div
            className="flex justify-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={Logo} alt="icon_total_patient"></img>
            <h3 className="text-center font-semibold text-[22px] self-center text-blue-900">
              Ardita Medical
            </h3>
          </div>

          <p className="text-sm font-normal text-gray-500 mt-14 px-9">
            Daily Use
          </p>
          <div className="mt-6">
            {location.pathname === "/overview" ? (
              <div
                className="flex justify-start gap-4 items-center cursor-pointer px-9 py-1 border-r-4 border-blue-700"
                onClick={() => navigate("/overview")}
              >
                <BsFillBarChartLineFill className="text-blue-700 font-medium text-[26px]" />
                <p className="text-base font-medium text-blue-700">Overview</p>
              </div>
            ) : (
              <div
                className="flex justify-start gap-4 items-center cursor-pointer px-9 py-1 group"
                onClick={() => navigate("/overview")}
              >
                <BsFillBarChartLineFill className="text-gray-500 font-medium text-[26px] group-hover:text-blue-700" />
                <p className="text-base font-medium text-gray-500 group-hover:text-blue-700">
                  Overview
                </p>
              </div>
            )}
            {location.pathname === "/user" ||
            location.pathname === "/user/add" ||
            location.pathname.includes("/user/update") ||
            location.pathname.includes("/user/detail") ? (
              <div
                className="flex justify-start gap-4 mt-6 items-center cursor-pointer px-9 py-1 border-r-4 border-blue-700"
                onClick={() => navigate("/user")}
              >
                <BsFillPeopleFill className="text-blue-700 font-medium text-[26px]" />
                <p className="text-base font-medium text-blue-700">Users</p>
              </div>
            ) : (
              <div
                className="flex justify-start gap-4 mt-6 items-center cursor-pointer px-9 py-1 group"
                onClick={() => navigate("/user")}
              >
                <BsFillPeopleFill className="text-gray-500 font-medium text-[26px] group-hover:text-blue-700" />
                <p className="text-base font-medium text-gray-500 group-hover:text-blue-700">
                  Users
                </p>
              </div>
            )}
            {location.pathname === "/patient" ||
            location.pathname === "/patient/add" ||
            location.pathname.includes("/patient/update") ||
            location.pathname.includes("/patient/detail") ? (
              <div
                className=" flex justify-start gap-4 mt-6 items-center cursor-pointer px-9 py-1 border-r-4 border-blue-700"
                onClick={() => navigate("/patient")}
              >
                <BsPersonPlusFill className="text-blue-700 font-medium text-[26px]" />
                <p className="text-base font-medium text-blue-700">Patients</p>
              </div>
            ) : (
              <div
                className=" flex justify-start gap-4 mt-6 items-center cursor-pointer px-9 py-1 group"
                onClick={() => navigate("/patient")}
              >
                <BsPersonPlusFill className="text-gray-500 font-medium text-[26px] group-hover:text-blue-700" />
                <p className="text-base font-medium text-gray-500 group-hover:text-blue-700">
                  Patients
                </p>
              </div>
            )}
            {location.pathname === "/visitation" ||
            location.pathname === "/visitation/add" ||
            location.pathname.includes("/visitation/update") ||
            location.pathname.includes("/visitation/detail") ||
            location.pathname === "/visitation/report" ? (
              <div
                className=" flex justify-start gap-4 mt-6 items-center cursor-pointer px-9 py-1 border-r-4 border-blue-700"
                onClick={() => navigate("/visitation")}
              >
                <FaAddressBook className="text-blue-700 font-medium text-[26px]" />
                <p className="text-base font-medium text-blue-700">
                  Visitations
                </p>
              </div>
            ) : (
              <div
                className=" flex justify-start gap-4 mt-6 items-center cursor-pointer px-9 py-1 group"
                onClick={() => navigate("/visitation")}
              >
                <FaAddressBook className="text-gray-500 font-medium text-[26px] group-hover:text-blue-700" />
                <p className="text-base font-medium text-gray-500 group-hover:text-blue-700">
                  Visitations
                </p>
              </div>
            )}
            {location.pathname === "/medical-record" ||
            location.pathname === "/medical-record/add" ||
            location.pathname.includes("/medical-record/update") ||
            location.pathname.includes("/medical-record/detail") ||
            location.pathname === "/medical-record/history/add" ||
            location.pathname.includes("/medical-record/history/update") ||
            location.pathname.includes("/medical-record/history/detail") ||
            location.pathname.includes("/prescription") ? (
              <div
                className="flex justify-start gap-4 mt-6 items-center cursor-pointer px-9 py-1 border-r-4 border-blue-700"
                onClick={() => navigate("/medical-record")}
              >
                <FaFileMedical className="text-blue-700 font-medium text-[26px]" />
                <p className="text-base font-medium text-blue-700">
                  Medical Records
                </p>
              </div>
            ) : (
              <div
                className="flex justify-start gap-4 mt-6 items-center cursor-pointer px-9 py-1 group"
                onClick={() => navigate("/medical-record")}
              >
                <FaFileMedical className="text-gray-500 font-medium text-[26px] group-hover:text-blue-700" />
                <p className="text-base font-medium text-gray-500 group-hover:text-blue-700">
                  Medical Records
                </p>
              </div>
            )}
            {location.pathname === "/medicine" ||
            location.pathname === "/medicine/add" ||
            location.pathname.includes("/medicine/update") ||
            location.pathname.includes("/medicine/detail") ? (
              <div
                className=" flex justify-start gap-4 mt-6 items-center cursor-pointer px-9 py-1 border-r-4 border-blue-700"
                onClick={() => navigate("/medicine")}
              >
                <AiFillMedicineBox className="text-blue-700 text-[26px]" />
                <p className="text-base font-medium text-blue-700">Medicines</p>
              </div>
            ) : (
              <div
                className=" flex justify-start gap-4 mt-6 items-center cursor-pointer px-9 py-1 group"
                onClick={() => navigate("/medicine")}
              >
                <AiFillMedicineBox className="text-gray-500 text-[26px] group-hover:text-blue-700" />
                <p className="text-base font-medium text-gray-500 group-hover:text-blue-700">
                  Medicines
                </p>
              </div>
            )}
          </div>
          <p className="text-sm font-normal text-gray-500 mt-20 px-9">Other</p>
          <div className="mt-6">
            {location.pathname === "/account/settings" ? (
              <div
                className=" flex justify-start gap-4 mt-6 items-center cursor-pointer px-9 py-1 border-r-4 border-blue-700"
                onClick={() => navigate("/account/settings")}
              >
                <AiFillSetting className="text-blue-700 text-[26px]" />
                <p className="text-base font-medium text-blue-700">
                  Account Settings
                </p>
              </div>
            ) : (
              <div
                className=" flex justify-start gap-4 mt-6 items-center cursor-pointer px-9 py-1 group"
                onClick={() => navigate("/account/settings")}
              >
                <AiFillSetting className="text-gray-500 text-[26px] group-hover:text-blue-700" />
                <p className="text-base font-medium text-gray-500 group-hover:text-blue-700">
                  Account Settings
                </p>
              </div>
            )}
            <div
              className="flex justify-start gap-4 mt-6 items-center cursor-pointer px-9 py-1 group"
              onClick={logout}
            >
              <BsFillArrowLeftSquareFill className="text-gray-500 font-medium text-[26px] group-hover:text-blue-700" />
              <p className="text-base font-medium text-gray-500 group-hover:text-blue-700">
                Logout
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (auth.level === "Dokter") {
    return (
      <div
        className={
          sidebar
            ? "bg-blue-300 h-screen fixed w-[260px] pt-8 top-0 ease-in-out duration-300"
            : "bg-blue-300 h-screen fixed w-[260px] pt-8 top-0 ml-[-500px] ease-in-out duration-300"
        }
      >
        <div>
          <div
            className="flex justify-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={Logo} alt="icon_total_patient"></img>
            <h3 className="text-center font-semibold text-[22px] self-center text-blue-900">
              Ardita Medical
            </h3>
          </div>
          <p className="text-sm font-normal text-gray-500 mt-14 px-9">
            Daily Use
          </p>
          <div className="mt-6">
            {location.pathname === "/overview" ? (
              <div
                className="flex justify-start gap-4 items-center cursor-pointer px-9 py-1 border-r-4 border-blue-700"
                onClick={() => navigate("/overview")}
              >
                <BsFillBarChartLineFill className="text-blue-700 font-medium text-[26px]" />
                <p className="text-base font-medium text-blue-700">Overview</p>
              </div>
            ) : (
              <div
                className="flex justify-start gap-4 items-center cursor-pointer px-9 py-1 group"
                onClick={() => navigate("/overview")}
              >
                <BsFillBarChartLineFill className="text-gray-500 font-medium text-[26px] group-hover:text-blue-700" />
                <p className="text-base font-medium text-gray-500 group-hover:text-blue-700">
                  Overview
                </p>
              </div>
            )}

            {location.pathname === "/patient" ||
            location.pathname === "/patient/add" ||
            location.pathname.includes("/patient/update") ||
            location.pathname.includes("/patient/detail") ? (
              <div
                className=" flex justify-start gap-4 mt-6 items-center cursor-pointer px-9 py-1 border-r-4 border-blue-700"
                onClick={() => navigate("/patient")}
              >
                <BsPersonPlusFill className="text-blue-700 font-medium text-[26px]" />
                <p className="text-base font-medium text-blue-700">Patients</p>
              </div>
            ) : (
              <div
                className=" flex justify-start gap-4 mt-6 items-center cursor-pointer px-9 py-1 group"
                onClick={() => navigate("/patient")}
              >
                <BsPersonPlusFill className="text-gray-500 font-medium text-[26px] group-hover:text-blue-700" />
                <p className="text-base font-medium text-gray-500 group-hover:text-blue-700">
                  Patients
                </p>
              </div>
            )}
            {location.pathname === "/visitation" ||
            location.pathname === "/visitation/add" ||
            location.pathname.includes("/visitation/detail") ||
            location.pathname === "/visitation/report" ? (
              <div
                className=" flex justify-start gap-4 mt-6 items-center cursor-pointer px-9 py-1 border-r-4 border-blue-700"
                onClick={() => navigate("/visitation")}
              >
                <FaAddressBook className="text-blue-700 font-medium text-[26px]" />
                <p className="text-base font-medium text-blue-700">
                  Visitations
                </p>
              </div>
            ) : (
              <div
                className=" flex justify-start gap-4 mt-6 items-center cursor-pointer px-9 py-1 group"
                onClick={() => navigate("/visitation")}
              >
                <FaAddressBook className="text-gray-500 font-medium text-[26px] group-hover:text-blue-700" />
                <p className="text-base font-medium text-gray-500 group-hover:text-blue-700">
                  Visitations
                </p>
              </div>
            )}
            {location.pathname === "/medical-record" ||
            location.pathname === "/medical-record/add" ||
            location.pathname.includes("/medical-record/update") ||
            location.pathname.includes("/medical-record/detail") ||
            location.pathname === "/medical-record/history/add" ||
            location.pathname.includes("/medical-record/history/update") ||
            location.pathname.includes("/medical-record/history/detail") ||
            location.pathname.includes("/prescription") ? (
              <div
                className="flex justify-start gap-4 mt-6 items-center cursor-pointer px-9 py-1 border-r-4 border-blue-700"
                onClick={() => navigate("/medical-record")}
              >
                <FaFileMedical className="text-blue-700 font-medium text-[26px]" />
                <p className="text-base font-medium text-blue-700">
                  Medical Records
                </p>
              </div>
            ) : (
              <div
                className="flex justify-start gap-4 mt-6 items-center cursor-pointer px-9 py-1 group"
                onClick={() => navigate("/medical-record")}
              >
                <FaFileMedical className="text-gray-500 font-medium text-[26px] group-hover:text-blue-700" />
                <p className="text-base font-medium text-gray-500 group-hover:text-blue-700">
                  Medical Records
                </p>
              </div>
            )}
            {location.pathname === "/medicine" ||
            location.pathname === "/medicine/add" ||
            location.pathname.includes("/medicine/update") ||
            location.pathname.includes("/medicine/detail") ? (
              <div
                className=" flex justify-start gap-4 mt-6 items-center cursor-pointer px-9 py-1 border-r-4 border-blue-700"
                onClick={() => navigate("/medicine")}
              >
                <AiFillMedicineBox className="text-blue-700 text-[26px]" />
                <p className="text-base font-medium text-blue-700">Medicines</p>
              </div>
            ) : (
              <div
                className=" flex justify-start gap-4 mt-6 items-center cursor-pointer px-9 py-1 group"
                onClick={() => navigate("/medicine")}
              >
                <AiFillMedicineBox className="text-gray-500 text-[26px] group-hover:text-blue-700" />
                <p className="text-base font-medium text-gray-500 group-hover:text-blue-700">
                  Medicines
                </p>
              </div>
            )}
          </div>
          <p className="text-sm font-normal text-gray-500 mt-32 px-9">Other</p>
          <div className="mt-6">
            {location.pathname === "/account/settings" ? (
              <div
                className=" flex justify-start gap-4 mt-6 items-center cursor-pointer px-9 py-1 border-r-4 border-blue-700"
                onClick={() => navigate("/account/settings")}
              >
                <AiFillSetting className="text-blue-700 text-[26px]" />
                <p className="text-base font-medium text-blue-700">
                  Account Settings
                </p>
              </div>
            ) : (
              <div
                className=" flex justify-start gap-4 mt-6 items-center cursor-pointer px-9 py-1 group"
                onClick={() => navigate("/account/settings")}
              >
                <AiFillSetting className="text-gray-500 text-[26px] group-hover:text-blue-700" />
                <p className="text-base font-medium text-gray-500 group-hover:text-blue-700">
                  Account Settings
                </p>
              </div>
            )}
            <div
              className="flex justify-start gap-4 mt-6 items-center cursor-pointer px-9 py-1 group"
              onClick={logout}
            >
              <BsFillArrowLeftSquareFill className="text-gray-500 font-medium text-[26px] group-hover:text-blue-700" />
              <p className="text-base font-medium text-gray-500 group-hover:text-blue-700">
                Logout
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (auth.level === "Pasien") {
    return (
      <div
        className={
          sidebar
            ? "bg-blue-300 h-screen fixed w-[260px] pt-8 top-0 ease-in-out duration-300"
            : "bg-blue-300 h-screen fixed w-[260px] pt-8 top-0 ml-[-500px] ease-in-out duration-300"
        }
      >
        <div>
          <div className="flex justify-center gap-2 ">
            <img src={Logo} alt="icon_total_patient"></img>
            <h3 className="text-center font-semibold text-[22px] self-center text-blue-900">
              Ardita Medical
            </h3>
          </div>
          <p className="text-sm font-normal text-gray-500 mt-14 px-9">
            Daily Use
          </p>
          <div className="mt-6">
            {location.pathname === "/overview" ? (
              <div
                className="flex justify-start gap-4 items-center cursor-pointer px-9 py-1 border-r-4 border-blue-700"
                onClick={() => navigate("/overview")}
              >
                <BsFillBarChartLineFill className="text-blue-700 font-medium text-[26px]" />
                <p className="text-base font-medium text-blue-700">Overview</p>
              </div>
            ) : (
              <div
                className="flex justify-start gap-4 items-center cursor-pointer px-9 py-1 group"
                onClick={() => navigate("/overview")}
              >
                <BsFillBarChartLineFill className="text-gray-500 font-medium text-[26px] group-hover:text-blue-700" />
                <p className="text-base font-medium text-gray-500 group-hover:text-blue-700">
                  Overview
                </p>
              </div>
            )}
            {location.pathname.includes("patient/medical-record") ? (
              <div
                className="flex justify-start gap-4 mt-6 items-center cursor-pointer px-9 py-1 border-r-4 border-blue-700"
                onClick={() => navigate("patient/medical-record")}
              >
                <FaFileMedical className="text-blue-700 font-medium text-[26px]" />
                <p className="text-base font-medium text-blue-700">
                  Medical Records
                </p>
              </div>
            ) : (
              <div
                className="flex justify-start gap-4 mt-6 items-center cursor-pointer px-9 py-1 group"
                onClick={() => navigate(`patient/medical-record`)}
              >
                <FaFileMedical className="text-gray-500 font-medium text-[26px] group-hover:text-blue-700" />
                <p className="text-base font-medium text-gray-500 group-hover:text-blue-700">
                  Medical Records
                </p>
              </div>
            )}
          </div>
          <div className="mt-[300px]">
            <p className="text-sm font-normal text-gray-500 mt-14 px-9">
              Others
            </p>
            <div className="mt-6">
              {location.pathname === "/patient/account/settings" ? (
                <div
                  className=" flex justify-start gap-4 mt-6 items-center cursor-pointer px-9 py-1 border-r-4 border-blue-700"
                  onClick={() => navigate("/patient/account/settings")}
                >
                  <AiFillSetting className="text-blue-700 text-[26px]" />
                  <p className="text-base font-medium text-blue-700">
                    Account Settings
                  </p>
                </div>
              ) : (
                <div
                  className=" flex justify-start gap-4 mt-6 items-center cursor-pointer px-9 py-1 group"
                  onClick={() => navigate("/patient/account/settings")}
                >
                  <AiFillSetting className="text-gray-500 text-[26px] group-hover:text-blue-700" />
                  <p className="text-base font-medium text-gray-500 group-hover:text-blue-700">
                    Account Settings
                  </p>
                </div>
              )}
              <div
                className="flex justify-start gap-4 mt-6 items-center cursor-pointer px-9 py-1 group"
                onClick={logout}
              >
                <BsFillArrowLeftSquareFill className="text-gray-500 font-medium text-[26px] group-hover:text-blue-700" />
                <p className="text-base font-medium text-gray-500 group-hover:text-blue-700">
                  Logout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Sidebar;
