import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  getDetailMedicalHistory,
  medicalHistory,
} from "../../../features/medicalHistorySlice";
//UI
import { Descriptions, Table } from "antd";
import "../../../index.css";
import dayjs from "dayjs";
import { CiViewTimeline } from "react-icons/ci";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Helmet } from "react-helmet";

const DetailMedicalHistory = () => {
  // Utils
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // redux
  const detailHistory = useSelector(medicalHistory);
  console.log(detailHistory, "detail history");

  useEffect(() => {
    dispatch(getDetailMedicalHistory(id));
  }, [dispatch, id]);

  const columnsMedicineByDoctor = [
    {
      title: "No",
      dataIndex: "Medicines",
      key: "Medicines",
      width: "4%",
      render: (value, item, index) => index + 1,
    },
    {
      title: "Medicine Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Quantity",
      dataIndex: "MedicineIntakes",
      key: "id_medicine",
      width: "10%",
      render: (item) => item.quantity,
    },
    {
      title: "Dose",
      dataIndex: "MedicineIntakes",
      key: "id_medicine",
      render: (item) => item.dose,
    },
    {
      title: "Usage",
      dataIndex: "usage",
      key: "usage",
      width: "20%",
      render: (text) => <p>{text}</p>,
    },
  ];

  return (
    <div className="mt-10">
      <Helmet>
        <title>Medical Record | Ardita Medical</title>
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
          onClick={() =>
            navigate(
              `/medical-record/detail/${detailHistory.MedicalRecord.id_medical_record}`
            )
          }
        >
          Medical Record Details
        </span>{" "}
        {">"}{" "}
        <span className="font-semibold text-blue-700">History Details</span>
      </p>
      <div className="py-9">
        <h2 className="text-blue-900 font-semibold text-2xl leading-normal text-center">
          Tretment Details
        </h2>
        <div className="mt-6">
          <Descriptions
            layout="horizontal"
            column={1}
            bordered
            labelStyle={{ color: "#0D1458", fontWeight: 600, width: "42%" }}
          >
            <Descriptions.Item label="Patient Name">
              {detailHistory.MedicalRecord ? (
                <Link
                  to={`/patient/detail/${detailHistory.MedicalRecord.Patient.id_patient}`}
                >
                  <p className="hover:text-blue-700 cursor-pointer">
                    {detailHistory.MedicalRecord.Patient.name}
                  </p>
                </Link>
              ) : (
                ""
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Complaint">
              {detailHistory.complaint ? detailHistory.complaint : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Tension (mm/hg)">
              {detailHistory.tension ? detailHistory.tension : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Body Temperature (c)">
              {detailHistory.body_temperature
                ? detailHistory.body_temperature
                : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Diagnosis">
              {detailHistory.diagnosis ? detailHistory.diagnosis : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Treatment">
              {detailHistory.treatment ? detailHistory.treatment : "-"}
            </Descriptions.Item>

            <Descriptions.Item label="Treatment Date">
              {detailHistory.createdAt
                ? dayjs(detailHistory.createdAt).format("D MMMM YYYY")
                : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Prescription">
              {detailHistory.Prescription ? (
                <div
                  className="flex gap-1 cursor-pointer"
                  onClick={() =>
                    navigate(`/medical-record/history/prescription/${id}`)
                  }
                >
                  <CiViewTimeline className="text-blue-700 font-bold text-xl hover:text-blue-600" />{" "}
                  <p className="text-blue-700 hover:text-blue-600 font-semibold">
                    {" "}
                    View Prescription
                  </p>
                </div>
              ) : (
                "-"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {detailHistory.description ? detailHistory.description : "-"}
            </Descriptions.Item>
          </Descriptions>
        </div>
        <h2 className="text-blue-900 font-semibold text-2xl mt-12 leading-normal text-center">
          Medicine by Doctor
        </h2>
        <div className="mt-6">
          <Table
            columns={columnsMedicineByDoctor}
            dataSource={detailHistory.Medicines}
            pagination={false}
          />
        </div>
        <button
          className="bg-blue-300 group hover:text-blue-700 border-none cursor-pointer px-6 py-[10px] text-gray-700 text-sm mt-6 rounded"
          onClick={() =>
            navigate(
              `/medical-record/detail/${detailHistory.MedicalRecord.id_medical_record}`
            )
          }
        >
          <div className=" flex gap-4 group">
            <AiOutlineArrowLeft className="flex self-center text-lg text-gray-700 group-hover:text-blue-700" />{" "}
            Back
          </div>
        </button>
      </div>
    </div>
  );
};

export default DetailMedicalHistory;
