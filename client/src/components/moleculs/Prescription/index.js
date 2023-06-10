import { Alert } from "antd";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  getDetailMedicalHistory,
  medicalHistory,
} from "../../../features/medicalHistorySlice";
//UI
import "../../../index.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Helmet } from "react-helmet";

const Prescription = () => {
  // Utils
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  // redux
  const detailHistory = useSelector(medicalHistory);
  console.log(detailHistory, "detail history");

  useEffect(() => {
    dispatch(getDetailMedicalHistory(id));
  }, [dispatch, id]);

  return (
    <div className="mt-10">
      <Helmet>
        <title>Prescription | Ardita Medical</title>
      </Helmet>
      <p className="home text-gray-500 text-base font-normal">
        <span className="cursor-pointer" onClick={() => navigate("/")}>
          Home
        </span>{" "}
        {">"}{" "}
        <span
          className="cursor-pointer"
          onClick={() => navigate("/medical-record")}
        >
          Medical Record
        </span>{" "}
        {">"}{" "}
        <span
          className="cursor-pointer"
          onClick={() => navigate(`/medical-record/history/detail/${id}`)}
        >
          History Details
        </span>{" "}
        {">"} <span className="font-semibold text-blue-700">Prescription</span>
      </p>
      <div className="py-9">
        <h2 className="text-blue-900 font-semibold text-2xl leading-normal text-center">
          Prescription Medicine by Doctor
        </h2>
        <div className="p-5 rounded-sm mt-8">
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
                <p className="text-sm font-normal text-gray-500 mt-1"></p>
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
                        dayjs(detailHistory.MedicalRecord.Patient.birth_date),
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
                    <div className="flex justify-between gap-28 mt-10">
                      <p>R/</p>
                      <div>
                        <p className="text-sm font-semibold text-blue-900">
                          {i.name}
                        </p>
                        <p className="text-sm font-normal text-gray-500 mt-2">
                          {" "}
                          Dose : {i.dose} / per hari
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
          <p className=" text-sm font-normal text-gray-500 mt-6 italic text-end">
            Note :{" "}
            {detailHistory.Prescription ? detailHistory.Prescription.note : "-"}
          </p>
          <button
            className="bg-blue-300 group hover:text-blue-700 border-none cursor-pointer px-6 py-[10px] text-gray-700 text-sm mt-6 rounded"
            onClick={() => navigate(`/medical-record/history/detail/${id}`)}
          >
            <div className=" flex gap-4 group">
              <AiOutlineArrowLeft className="flex self-center text-lg text-gray-700 group-hover:text-blue-700" />{" "}
              Back
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Prescription;
