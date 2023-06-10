import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getDetailMedicalHistory,
  medicalHistory,
} from "../../features/medicalHistorySlice";
//UI
import { HeroMedicalRecord } from "../../assets";
import "../../index.css";

import { LandingNavbar, LandingFooter } from "../../components";
import dayjs from "dayjs";
import { Alert } from "antd";
import { Helmet } from "react-helmet";

const PatientPrescription = () => {
  // Utils
  const dispatch = useDispatch();
  const { id } = useParams();

  // redux
  const detailHistory = useSelector(medicalHistory);
  console.log(detailHistory, "detail history");

  // state
  useEffect(() => {
    dispatch(getDetailMedicalHistory(id));
  }, [dispatch, id]);

  return (
    <div>
      <Helmet>
        <title>Prescription | Ardita Medical</title>
      </Helmet>
      {/* Navbar */}
      <LandingNavbar />
      {/* Hero */}
      <div className="flex md:h-[348px] h-[280px] items-center justify-center relative">
        <div className="hero-image-detail-medical-record" />
        <div className="relative px-4 md:px-40 w-full mt-10 md:mt-40 flex justify-center md:justify-end">
          <div>
            <h2 className="hero-motto text-2xl md:text-4xl leading-tight md:leading-snug  text-white font-extralight text-center md:text-start">
              Check The <span className="font-semibold">Prescription</span> By
              Doctor
            </h2>
            <p className="mb-10 mt-2 md:text-xl text-white text-center md:text-start">
              Ensure the best treatment for your health
            </p>
          </div>
        </div>
      </div>
      <div className="px-4 lg:px-[200px] xl:px-[400px]">
        <h2 className="text-blue-900 font-semibold text-2xl mt-10 leading-normal text-center">
          Prescription Medicine By Doctor
        </h2>
        <div>
          <div className="mt-6">
            <div className="p-2 md:p-5 rounded-sm mt-8">
              {detailHistory.Prescription &&
              dayjs().isAfter(
                dayjs(detailHistory.Prescription.prescription_end_date)
              ) ? (
                <Alert
                  message={
                    <p className="text-base">
                      This medicine prescription is no longer valid
                    </p>
                  }
                  type="error"
                  showIcon
                  closable={false}
                  className="mb-5 py-4"
                />
              ) : (
                <Alert
                  message={
                    <p className="text-base">
                      This medicine prescription is valid until{" "}
                      {detailHistory.Prescription
                        ? dayjs(
                            detailHistory.Prescription.prescription_end_date
                          ).format("D MMMM YYYY")
                        : ""}
                    </p>
                  }
                  type="info"
                  showIcon
                  closable={false}
                  className="mb-5 py-4"
                />
              )}
              <div>
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-semibold text-blue-900">
                      Dr. I Wayan Gede Ardita
                    </p>
                    <p className="text-sm font-normal text-gray-500 mt-2">
                      General Practicioner
                    </p>
                    <p className="text-sm font-normal text-gray-500 mt-1">
                      SIP No: 503/225.SIP.II/Dikes/2017
                    </p>
                  </div>
                  <div className="self-end">
                    <p className=" text-sm font-normal text-gray-500 mt-1">
                      Issued date :{" "}
                      {detailHistory.Prescription
                        ? dayjs(
                            detailHistory.Prescription.prescription_start_date
                          ).format("D MMMM YYYY")
                        : ""}
                    </p>
                  </div>
                </div>
                <hr className="mt-6 bg-gray-300 h-[2px]" />
                <div className="flex justify-between mt-4">
                  <div>
                    <p className="text-sm font-normal text-blue-900">
                      Patient name :
                    </p>
                    <p className="text-sm font-semibold text-blue-900">
                      {detailHistory.MedicalRecord
                        ? detailHistory.MedicalRecord.Patient.name
                        : ""}
                    </p>
                    <p className="text-sm font-normal text-gray-500 mt-2">
                      {detailHistory.MedicalRecord
                        ? `${
                            detailHistory.MedicalRecord.Patient.gender
                          }, ${dayjs().diff(
                            dayjs(
                              detailHistory.MedicalRecord.Patient.birth_date
                            ),
                            "year"
                          )} years old`
                        : ""}
                    </p>
                  </div>
                </div>
              </div>

              <hr className="mt-6 bg-gray-300 h-[2px]" />
              <div>
                {detailHistory.Prescription &&
                  detailHistory.Prescription.PrescriptionMedicineIntakes.map(
                    (i) => (
                      <div>
                        <div className="flex justify-between mt-10">
                          <p>R/</p>
                          <div>
                            <p className="text-sm font-semibold text-blue-900">
                              {i.name}
                            </p>
                            <p className="text-sm font-normal text-gray-500 mt-2">
                              {" "}
                              Dose : {i.dose}
                            </p>
                            <p className="text-sm font-normal text-gray-500 mt-2">
                              {" "}
                              Usage : {i.usage}
                            </p>
                          </div>
                          <div>
                            <p className="self-start text-sm font-normal text-gray-500 mt-1">
                              Quantity : {i.quantity}
                            </p>
                          </div>
                        </div>
                        <hr className="mt-6 bg-gray-300 h-[2px]" />
                      </div>
                    )
                  )}
              </div>
            </div>
            <p className=" text-sm font-normal text-gray-500 mt-6 italic text-end">
              Note :{" "}
              {detailHistory.Prescription
                ? detailHistory.Prescription.note
                : "-"}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
};

export default PatientPrescription;
