import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Login,
  MainApp,
  LandingPage,
  VisitationToday,
  PatientMedicalRecord,
  PatientDetailMedicalHistory,
  PatientAccountSetting,
  PatientPrescription,
  NotFound,
  AccessDenied,
} from "../../pages";
import PrivateRoutes from "./privateRoute";
import PrivateRoutesPatient from "./privateRoutePatient";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* admin and doctor access only */}
        <Route element={<PrivateRoutes />}>
          <Route path="/*" element={<MainApp />}></Route>
        </Route>
        {/* anonim access */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/check-visitation" element={<VisitationToday />}></Route>
        <Route path="/check-visitation" element={<VisitationToday />}></Route>
        {/* patient access */}
        <Route element={<PrivateRoutesPatient />}>
          <Route path="/my-record" element={<PatientMedicalRecord />}></Route>
          <Route
            path="/my-record/history/detail/:id"
            element={<PatientDetailMedicalHistory />}
          ></Route>
          <Route
            path="/my-account/setting"
            element={<PatientAccountSetting />}
          ></Route>
          <Route
            path="/my-record/history/prescription/:id"
            element={<PatientPrescription />}
          ></Route>
        </Route>
        {/* page not found */}
        <Route path="/page-not-found" element={<NotFound />}></Route>
        {/* access denied */}
        <Route path="/access-denied" element={<AccessDenied />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
