import React, { useState } from "react";
import { account } from "../../features/userSlice";

// UI
import { Routes, Route, Navigate } from "react-router-dom";
import {
  Navbar,
  Sidebar,
  Patient,
  User,
  Home,
  AddUser,
  UpdateUser,
  DetailUser,
  AddPatient,
  UpdatePatient,
  DetailPatient,
  Visitation,
  AddVisitation,
  DetailVisitation,
  UpdateVisitation,
  Medicine,
  AddMedicine,
  UpdateMedicine,
  DetailMedicine,
  MedicalRecord,
  AddMedicalRecord,
  UpdateMedicalRecord,
  DetailMedicalRecord,
  AddMedicalHistory,
  UpdateMedicalHistory,
  DetailMedicalHistory,
  Report,
  AccountSetting,
  Prescription,
} from "../../components";
import { useSelector } from "react-redux";
import NotFound from "../NotFoundPage";

const MainApp = () => {
  // redux
  const accountUpdatedData = useSelector(account);
  // state
  const [sidebar, setSidebar] = useState(true);
  return (
    <div className="bg-blue-300 h-screen">
      <div>
        <div>
          <Sidebar sidebar={sidebar} />
          <div
            className={
              sidebar
                ? "ml-[260px] rounded-tl-[54px] h-screen bg-white py-10 px-16 ease-in-out duration-300"
                : "rounded-tl-[54px] h-screen bg-white py-10 px-16 ease-in-out duration-300"
            }
          >
            <Navbar
              level={accountUpdatedData ? accountUpdatedData.level : ""}
              name={accountUpdatedData ? accountUpdatedData.name : ""}
              image={accountUpdatedData ? accountUpdatedData.image : ""}
              sidebar={sidebar}
              setSidebar={setSidebar}
            />
            <div className="mt-6">
              <Routes>
                <Route path="/overview" element={<Home />}></Route>
                <Route path="/user" element={<User />}></Route>
                <Route path="/user/add" element={<AddUser />}></Route>
                <Route path="/user/update/:id" element={<UpdateUser />}></Route>
                <Route path="/user/detail/:id" element={<DetailUser />}></Route>
                <Route path="/patient" element={<Patient />}></Route>
                <Route path="/patient/add" element={<AddPatient />}></Route>
                <Route
                  path="/patient/update/:id"
                  element={<UpdatePatient />}
                ></Route>
                <Route
                  path="/patient/detail/:id"
                  element={<DetailPatient />}
                ></Route>
                <Route path="/visitation" element={<Visitation />}></Route>
                <Route
                  path="/visitation/add"
                  element={<AddVisitation />}
                ></Route>
                <Route
                  path="/visitation/detail/:id"
                  element={<DetailVisitation />}
                ></Route>
                <Route
                  path="/visitation/update/:id"
                  element={<UpdateVisitation />}
                ></Route>
                <Route path="/visitation/report" element={<Report />}></Route>
                <Route path="/medicine" element={<Medicine />}></Route>
                <Route path="/medicine/add" element={<AddMedicine />}></Route>
                <Route
                  path="/medicine/update/:id"
                  element={<UpdateMedicine />}
                ></Route>
                <Route
                  path="/medicine/detail/:id"
                  element={<DetailMedicine />}
                ></Route>
                <Route
                  path="/medical-record"
                  element={<MedicalRecord />}
                ></Route>
                <Route
                  path="/medical-record/add"
                  element={<AddMedicalRecord />}
                ></Route>
                <Route
                  path="/medical-record/update/:id"
                  element={<UpdateMedicalRecord />}
                ></Route>
                <Route
                  path="/medical-record/detail/:id"
                  element={<DetailMedicalRecord />}
                ></Route>
                <Route
                  path="/medical-record/history/add"
                  element={<AddMedicalHistory />}
                ></Route>
                <Route
                  path="/medical-record/history/update/:id"
                  element={<UpdateMedicalHistory />}
                ></Route>
                <Route
                  path="/medical-record/history/detail/:id"
                  element={<DetailMedicalHistory />}
                ></Route>
                <Route
                  path="/account/settings"
                  element={<AccountSetting />}
                ></Route>
                <Route
                  path="/medical-record/history/prescription/:id"
                  element={<Prescription />}
                ></Route>
                <Route path="*" element={<NotFound />}></Route>
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainApp;
