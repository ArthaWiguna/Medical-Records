import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";

import {
  getDetailMedicalHistory,
  medicalHistory,
} from "../../../features/medicalHistorySlice";
//UI
import { Descriptions, Table } from "antd";
import "../../../index.css";
import dayjs from "dayjs";

const DetailMedicalHistoryForPatient = () => {
  // Utils
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  // redux
  const detailHistory = useSelector(medicalHistory);
  console.log(detailHistory, "detail history");

  useEffect(() => {
    dispatch(getDetailMedicalHistory(id));
  }, [dispatch, id]);

  const columns = [
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
      render: (item) => item.quantity,
    },
    {
      title: "Dose",
      dataIndex: "MedicineIntakes",
      key: "id_medicine",
      render: (item) => item.dose,
    },
  ];
  return (
    <div className="mt-10">
      <p className="home text-gray-500 text-sm font-normal">
        Home {">"} Medical Record {"> "} History {"> "}
        <span className="font-semibold text-blue-700">Detail History</span>
      </p>
      <div className="py-9 mt-10">
        <h2 className="text-lg text-center font-semibold text-blue-900">
          Treatment History
        </h2>
        <div className="mt-6">
          <Descriptions
            layout="horizontal"
            column={1}
            bordered
            labelStyle={{ color: "#0D1458", fontWeight: 600 }}
          >
            <Descriptions.Item label="Patient Name">
              {detailHistory.MedicalRecord
                ? detailHistory.MedicalRecord.Patient.name
                : ""}
            </Descriptions.Item>
            <Descriptions.Item label="Complaint">
              {detailHistory.complaint ? detailHistory.complaint : "-"}
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
            <Descriptions.Item label="Description">
              {detailHistory.description ? detailHistory.description : "-"}
            </Descriptions.Item>
          </Descriptions>
        </div>
        <h2 className="text-lg text-center mt-8 font-semibold text-blue-900">
          Medicine History
        </h2>
        <div className="mt-6">
          <Table
            columns={columns}
            dataSource={detailHistory.Medicines}
            pagination={false}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailMedicalHistoryForPatient;
