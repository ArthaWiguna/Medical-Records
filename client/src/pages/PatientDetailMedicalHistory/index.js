import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDetailMedicalHistory,
  medicalHistory,
} from "../../features/medicalHistorySlice";
//UI
import { Descriptions, Table } from "antd";
import "../../index.css";
import dayjs from "dayjs";

import { LandingNavbar, LandingFooter } from "../../components";
import { CiViewTimeline } from "react-icons/ci";
import { Helmet } from "react-helmet";

const PatientDetailMedicalHistory = () => {
  // Utils
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  // redux
  const detailHistory = useSelector(medicalHistory);
  console.log(detailHistory, "detail history");

  // state
  useEffect(() => {
    dispatch(getDetailMedicalHistory(id));
  }, [dispatch, id]);

  const columns = [
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
    <div>
      <Helmet>
        <title>Medical Record | Ardita Medical</title>
      </Helmet>
      {/* Navbar */}
      <LandingNavbar />
      {/* Hero */}
      <div className="flex md:h-[348px] h-[280px] items-center justify-center relative">
        <div className="hero-image-detail-medical-record" />
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
          Treatment Details
        </h2>
        <div>
          <div className="mt-6">
            <Descriptions
              layout="horizontal"
              column={1}
              bordered
              labelStyle={{ color: "#0D1458", fontWeight: 600, width: "42%" }}
            >
              <Descriptions.Item label="Patient Name">
                {detailHistory.MedicalRecord
                  ? detailHistory.MedicalRecord.Patient.name
                  : ""}
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
                      navigate(`/my-record/history/prescription/${id}`)
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
          <h2 className="text-blue-900 font-semibold text-2xl leading-normal text-center mt-10 mb-6">
            Medicine by Doctor
          </h2>
          <div style={{ overflowX: "auto" }}>
            <Table
              columns={columns}
              dataSource={detailHistory.Medicines}
              pagination={false}
              scroll={{ x: "max-content" }}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
};

export default PatientDetailMedicalHistory;
