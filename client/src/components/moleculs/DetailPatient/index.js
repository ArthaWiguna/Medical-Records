import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDetailPatient, getPatient } from "../../../features/patientSlice";
import {
  getAllMedicalHistory,
  medicalHistories,
  getAllMedicalHistoryStatus,
} from "../../../features/medicalHistorySlice";
// UI
import { Badge, Descriptions, Spin, Table } from "antd";

import dayjs from "dayjs";
import { AiFillInfoCircle, AiOutlineArrowLeft } from "react-icons/ai";

const DetailPatient = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const patient = useSelector(getPatient);
  const medicalHistoryData = useSelector(medicalHistories);
  const getHistoryStatus = useSelector(getAllMedicalHistoryStatus);
  console.log(medicalHistoryData);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getDetailPatient({ id: id, username: "" }));
  }, [dispatch, id]);

  useEffect(() => {
    if (patient.MedicalRecord) {
      dispatch(
        getAllMedicalHistory({
          id: patient.MedicalRecord.id_medical_record,
          params: "",
          date: "",
        })
      );
    }
  }, [dispatch, patient.MedicalRecord]);

  const columns = [
    {
      title: "No",
      dataIndex: "id_history",
      key: "id_history",
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
      render: (_, { createdAt }) => (
        <p className="text-gray-700">
          {dayjs(createdAt).format("D MMMM YYYY")}
        </p>
      ),
    },
    // {
    //   title: "Medicine",
    //   dataIndex: "medicine",
    //   key: "medicine",
    //   render: (_, { medicine }) =>
    //     medicine.length > 0 ? (
    //       medicine.map((item) => <p>{item.name}</p>)
    //     ) : (
    //       <p>-</p>
    //     ),
    // },
    {
      title: "Prescription",
      dataIndex: "prescription",
      key: "prescription",
      render: (item) => (
        <p className="text-gray-700">{item ? "Available" : "Not Available"}</p>
      ),
    },
    {
      title: "Action",
      key: "id_history",
      dataIndex: "id_history",
      render: (_, { id_history }) => (
        <Link to={`/medical-record/history/detail/${id_history}`}>
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
    <div className="mt-10">
      <p className="home text-gray-500 text-base font-normal">
        <span className="cursor-pointer" onClick={() => navigate("/")}>
          Home
        </span>{" "}
        {">"}{" "}
        <span className="cursor-pointer" onClick={() => navigate("/patient")}>
          Patient
        </span>{" "}
        {"> "}
        <span className="font-semibold text-blue-700">Patient Details</span>
      </p>
      <div className="py-9">
        <h2 className="text-blue-900 font-semibold text-2xl leading-normal text-center">
          Patient Details
        </h2>

        <div className="mt-6">
          <Descriptions
            layout="horizontal"
            column={1}
            bordered
            labelStyle={{ color: "#0D1458", fontWeight: 600, width: "42%" }}
          >
            <Descriptions.Item label="Name">
              {patient.name ? patient.name : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              {patient.address ? patient.address : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Gender">
              {patient.gender ? patient.gender : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Birth Place">
              {patient.birth_place &&
              patient.birth_place !== "" &&
              patient.birth_place !== undefined &&
              patient.birth_place !== "undefined" &&
              patient.birth_place !== null &&
              patient.birth_place !== "null"
                ? patient.birth_place
                : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Birth Date">
              {patient.birth_date
                ? dayjs(patient.birth_date).format("D MMMM YYYY")
                : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Category">
              {patient.category ? patient.category : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Insurrance Number">
              {patient.insurance_number &&
              patient.insurance_number !== "" &&
              patient.insurance_number !== undefined &&
              patient.insurance_number !== "undefined" &&
              patient.insurance_number !== null &&
              patient.insurance_number !== "null"
                ? patient.insurance_number
                : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Identity Number">
              {patient.identity_number &&
              patient.identity_number !== "" &&
              patient.identity_number !== undefined &&
              patient.identity_number !== "undefined" &&
              patient.identity_number !== null &&
              patient.identity_number !== "null"
                ? patient.identity_number
                : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {patient.phone &&
              patient.phone !== "" &&
              patient.phone !== undefined &&
              patient.phone !== "undefined" &&
              patient.phone !== null &&
              patient.phone !== "null"
                ? patient.phone
                : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Username">
              {patient.username ? patient.username : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Registration Since">
              {patient.createdAt
                ? dayjs(patient.createdAt).format("D MMMM YYYY")
                : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Badge
                status={
                  patient.status && patient.status === "Active"
                    ? "processing"
                    : "default"
                }
                text={patient.status ? patient.status : "-"}
              />
            </Descriptions.Item>
          </Descriptions>
        </div>
        <div className="mt-12">
          <h2 className="text-blue-900 font-semibold text-2xl mt-2 leading-normal text-center">
            Patient History
          </h2>
          {getHistoryStatus === "success" ? (
            <div>
              <Table
                columns={columns}
                dataSource={medicalHistoryData}
                style={{ marginTop: "20px" }}
                pagination={true}
                onChange={onTableChange}
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
        <button
          className="bg-blue-300 group hover:text-blue-700 border-none cursor-pointer px-6 py-[10px] text-gray-700 text-sm mt-6 rounded"
          onClick={() => navigate("/patient")}
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

export default DetailPatient;
