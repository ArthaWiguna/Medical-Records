import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetailPatient, getPatient } from "../../features/patientSlice";
import {
  getDetailMedicalRecord,
  getDetailMedicalRecordStatus,
  medicalRecord,
} from "../../features/medicalRecordSlice";
import {
  getAllMedicalHistory,
  medicalHistories,
  getAllMedicalHistoryStatus,
} from "../../features/medicalHistorySlice";
//UI
import { Table, Spin, Input, DatePicker } from "antd";
import "../../index.css";
import dayjs from "dayjs";
import { LandingNavbar, LandingFooter } from "../../components";
import { AiFillInfoCircle } from "react-icons/ai";
import { Helmet } from "react-helmet";

const PatientMedicalRecord = () => {
  // Utils
  const dispatch = useDispatch();

  const auth =
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : "";

  // redux
  const patientData = useSelector(getPatient);
  const medicalRecordData = useSelector(medicalRecord);
  const getMedicalRecordStatus = useSelector(getDetailMedicalRecordStatus);
  const medicalHistoryData = useSelector(medicalHistories);
  const getHistoryStatus = useSelector(getAllMedicalHistoryStatus);

  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [params, setParams] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    dispatch(getDetailPatient({ id: "", username: auth.username }));
  }, [dispatch, auth.username]);

  useEffect(() => {
    if (patientData.MedicalRecord) {
      dispatch(
        getDetailMedicalRecord(patientData.MedicalRecord.id_medical_record)
      );
    }
  }, [dispatch, patientData.MedicalRecord]);

  useEffect(() => {
    if (patientData.MedicalRecord) {
      dispatch(
        getAllMedicalHistory({
          id: patientData.MedicalRecord.id_medical_record,
          params: params,
          date: date,
        })
      );
    }
  }, [dispatch, patientData.MedicalRecord, date, params]);

  // UI
  const columns = [
    {
      title: "No",
      dataIndex: "id_history",
      key: "id_history",
      width: "4%",
      render: (value, item, index) => (currentPage - 1) * 10 + index + 1,
    },
    {
      title: "Complaint",
      dataIndex: "complaint",
      key: "complaint",
      render: (text) => <p className="text-gray-700">{text}</p>,
    },
    {
      title: "Diagnosis",
      dataIndex: "diagnosis",
      key: "diagnosis",
      render: (text) => <p className="text-gray-700">{text}</p>,
    },
    {
      title: "Treatment",
      dataIndex: "treatment",
      key: "treatment",
      render: (text) => <p className="text-gray-700">{text}</p>,
    },
    {
      title: "Treatment Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "14%",
      render: (_, { createdAt }) => (
        <p className="text-gray-700">
          {dayjs(createdAt).format("D MMMM YYYY")}
        </p>
      ),
    },
    {
      title: "Prescription",
      dataIndex: "prescription",
      key: "prescription",
      width: "12%",
      render: (item) => (
        <p className="text-gray-700">{item ? "Available" : "Not Available"}</p>
      ),
    },
    {
      title: "Action",
      key: "id_history",
      dataIndex: "id_history",
      width: "12%",
      render: (_, { id_history }) => (
        <Link to={`/my-record/history/detail/${id_history}`}>
          <AiFillInfoCircle className="text-xl hover:text-blue-700 " />
        </Link>
      ),
    },
  ];

  const onTableChange = (pagination, filters, sorter, extra) => {
    setCurrentPage(pagination.current);
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div>
      <Helmet>
        <title>Medical Record | Ardita Medical</title>
      </Helmet>
      {/* Navbar */}
      <LandingNavbar />
      {/* Hero */}
      <div className="flex md:h-[348px] h-[280px] items-center justify-center relative">
        <div className="hero-image-medical-record" />
        <div className="relative px-4 md:px-40 w-full mt-10 md:mt-40 flex justify-center md:justify-end">
          <div>
            <h2 className="hero-motto text-2xl md:text-4xl leading-tight md:leading-snug  text-white font-extralight text-center md:text-start">
              See Your <span className="font-semibold">Health</span> Journey
            </h2>
            <p className="mb-10 mt-2 md:text-xl text-white text-center md:text-start">
              Growing with us
            </p>
          </div>
        </div>
      </div>
      <div className="px-4 md:px-40">
        <h2 className="text-blue-900 font-semibold text-2xl mt-10 leading-normal text-center">
          Patient Medical Record
        </h2>
        {getMedicalRecordStatus === "success" ? (
          <div className="py-9 bg-blue-300 mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 justify-end gap-x-14 gap-y-10">
              <div className>
                <h4 className="text-sm font-medium text-blue-900 y-500 text-center">
                  Name
                </h4>
                <p className="text-base font-normal mt-2 text-gray-500 text-center ">
                  {medicalRecordData.Patient.name
                    ? medicalRecordData.Patient.name
                    : "-"}
                </p>
              </div>
              <div className>
                <h4 className="text-sm font-medium text-blue-900 y-500 text-center">
                  Allergy
                </h4>
                <p className="text-base font-normal mt-2 text-gray-500 text-center ">
                  {medicalRecordData.allergy &&
                  medicalRecordData.allergy !== "" &&
                  medicalRecordData.allergy !== undefined &&
                  medicalRecordData.allergy !== "undefined" &&
                  medicalRecordData.allergy !== null &&
                  medicalRecordData.allergy !== "null"
                    ? medicalRecordData.allergy
                    : "-"}
                </p>
              </div>
              <div className>
                <h4 className="text-sm font-medium text-blue-900 y-500 text-center">
                  Congenital Disease
                </h4>
                <p className="text-base font-normal mt-2 text-gray-500 text-center">
                  {medicalRecordData.medical_history &&
                  medicalRecordData.medical_history !== "" &&
                  medicalRecordData.medical_history !== undefined &&
                  medicalRecordData.medical_history !== "undefined" &&
                  medicalRecordData.medical_history !== null &&
                  medicalRecordData.medical_history !== "null"
                    ? medicalRecordData.medical_history
                    : "-"}
                </p>
              </div>
              <div className>
                <h4 className="text-sm font-medium text-blue-900 y-500 text-center">
                  Height (Cm)
                </h4>
                <p className="text-base font-normal mt-2 text-gray-500 text-center ">
                  {medicalRecordData.height ? medicalRecordData.height : "-"}
                </p>
              </div>
              <div className>
                <h4 className="text-sm font-medium text-blue-900 y-500 text-center">
                  Weight (Kg)
                </h4>
                <p className="text-base font-normal mt-2 text-gray-500 text-center ">
                  {medicalRecordData.weight ? medicalRecordData.weight : "-"}
                </p>
              </div>
              <div className>
                <h4 className="text-sm font-medium text-blue-900 y-500 text-center">
                  Blood
                </h4>
                <p className="text-base font-normal mt-2 text-gray-500 text-center ">
                  {medicalRecordData.blood ? medicalRecordData.blood : "-"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="mt-10 min-h-[420px] md:min-h-[300px]">
          <p className="self-center w-16 block md:hidden">Search :</p>
          <div className="flex justify-between gap-2 mt-2 md:mt-12 w-full">
            <div className="flex justify-start h-10 self-end gap-2">
              <p className="self-center w-16 hidden md:block">Search :</p>
              <Input
                placeholder="Input complaint or diagnosis here.."
                size="large"
                style={{
                  borderRadius: "4px",
                }}
                className="h-10 self-end md:w-[300px]"
                onChange={(e) => setParams(e.target.value)}
                spellCheck="false"
              />
              <DatePicker
                className="w-48"
                placeholder="Select treatment date"
                onChange={(e) =>
                  setDate(e ? dayjs(e.$d).format("YYYY-MM-DD") : "")
                }
                format="DD/MM/YYYY"
              />
            </div>
          </div>
          {getHistoryStatus === "success" ? (
            <div style={{ overflowX: "auto" }}>
              <Table
                columns={columns}
                dataSource={medicalHistoryData}
                style={{ marginTop: "20px" }}
                pagination={true}
                onChange={onTableChange}
                scroll={{ x: "max-content" }}
              />
            </div>
          ) : (
            <div>
              <Spin tip="Loading" size="large" className="mt-[150px]">
                <div className="content" />
              </Spin>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
};

export default PatientMedicalRecord;
