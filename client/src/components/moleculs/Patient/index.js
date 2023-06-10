import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPatient,
  getpatients,
  getPatientStatus,
} from "../../../features/patientSlice";

import { useNavigate, Link } from "react-router-dom";
//UI
import { Table, Spin, Space, Input, Tag } from "antd";
import { AiFillEdit, AiFillInfoCircle } from "react-icons/ai";
import "../../../index.css";
import dayjs from "dayjs";
import { Helmet } from "react-helmet";

const Patient = () => {
  // Utils
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth =
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : "";

  // redux
  const patients = useSelector(getpatients);
  const getAllPatientStatus = useSelector(getPatientStatus);
  console.log(patients);

  // state
  const [currentPage, setCurrentPage] = useState(1);
  const [params, setParams] = useState("");

  useEffect(() => {
    dispatch(getAllPatient({ params: params, status: "All" }));
  }, [dispatch, params]);

  // UI
  const columns = [
    {
      title: "No",
      dataIndex: "id_patient",
      key: "id_petient",
      width: "4%",
      render: (value, item, index) => (currentPage - 1) * 10 + index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, { id_patient }) => (
        <Link to={`/patient/detail/${id_patient}`}>
          <p className="text-gray-700 hover:text-blue-700 cursor-pointer">
            {text}
          </p>
        </Link>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text) => <p className="text-gray-700">{text}</p>,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: "12%",
      render: (text) => <p className="text-gray-700">{text}</p>,
      filters: [
        {
          text: "Laki-laki",
          value: "Laki-laki",
        },
        {
          text: "Perempuan",
          value: "Perempuan",
        },
      ],
      onFilter: (value, record) => record.gender.indexOf(value) === 0,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "12%",
      render: (text) => <p className="text-gray-700">{text}</p>,
      filters: [
        {
          text: "Umum",
          value: "Umum",
        },
        {
          text: "BPJS",
          value: "BPJS",
        },
      ],
      onFilter: (value, record) => record.category.indexOf(value) === 0,
    },

    {
      title: "Last Modified",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: "14%",
      render: (text) => (
        <p className="text-gray-700">{dayjs(text).format("D MMMM YYYY")}</p>
      ),
      sorter: (a, b) => dayjs(b.updatedAt).diff(dayjs(a.updatedAt)),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      width: "10%",
      render: (text) => (
        <Tag color={text === "Active" ? "geekblue" : "volcano"}>{text}</Tag>
      ),
      filters: [
        {
          text: "Active",
          value: "Active",
        },
        {
          text: "Nonactive",
          value: "Nonactive",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: "Action",
      key: "id_patient",
      dataIndex: "id_patient",
      width: "10%",
      render: (_, { id_patient }) => (
        <Space size="middle">
          {auth.level === "Admin" ? (
            <Link to={`/patient/update/${id_patient}`}>
              <AiFillEdit className="text-xl hover:text-blue-700 " />
            </Link>
          ) : (
            ""
          )}
          <Link to={`/patient/detail/${id_patient}`}>
            <AiFillInfoCircle className="text-xl hover:text-blue-700 " />
          </Link>
        </Space>
      ),
    },
  ];

  const onTableChange = (pagination, filters, sorter, extra) => {
    setCurrentPage(pagination.current);
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div className="mt-10 pb-8">
      <Helmet>
        <title>Patient | Ardita Medical</title>
      </Helmet>
      <p className="home text-gray-500 text-base font-normal">
        <span className="cursor-pointer" onClick={() => navigate("/")}>
          Home
        </span>{" "}
        {"> "} <span className="font-semibold text-blue-700">Patient</span>
      </p>

      <div className="flex justify-between gap-2 mt-12 w-full ">
        <div className="flex justify-start h-10 self-end gap-2">
          <p className="self-center w-16">Search :</p>
          <Input
            placeholder="Input data patient here.."
            size="large"
            style={{
              borderRadius: "4px",
            }}
            className="h-10 self-end w-[300px]"
            spellCheck="false"
            onChange={(e) => setParams(e.target.value)}
          />
        </div>
        {auth.level === "Admin" ? (
          <button
            className="bg-blue-700 hover:bg-blue-600 border-none cursor-pointer px-4 py-2 text-white text-sm rounded"
            onClick={() => navigate("/patient/add")}
          >
            + Add New Patient
          </button>
        ) : (
          ""
        )}
      </div>

      <div className="mt-8">
        {getAllPatientStatus === "success" ? (
          <div>
            <Table
              columns={columns}
              dataSource={patients}
              pagination={true}
              onChange={onTableChange}
            />
          </div>
        ) : (
          <div>
            <Spin tip="Loading" size="large" className="mt-40">
              <div className="content" />
            </Spin>
          </div>
        )}
      </div>
    </div>
  );
};

export default Patient;
