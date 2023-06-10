import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMedicalRecord,
  medicalRecords,
  getMedicalRecordStatus,
} from "../../../features/medicalRecordSlice";
import { Link, useNavigate } from "react-router-dom";
//UI
import { Table, Spin, Space, Input } from "antd";
import { AiFillEdit, AiFillInfoCircle } from "react-icons/ai";
import "../../../index.css";
import dayjs from "dayjs";
import { Helmet } from "react-helmet";

const MedicalRecord = () => {
  // Utils
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // redux
  const medicalRecordData = useSelector(medicalRecords);
  const status = useSelector(getMedicalRecordStatus);
  console.log(medicalRecordData);
  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [params, setParams] = useState("");

  useEffect(() => {
    dispatch(
      getAllMedicalRecord({
        params: params,
      })
    );
  }, [dispatch, params]);

  // UI
  const columns = [
    {
      title: "No",
      dataIndex: "id_medical_record",
      key: "id_medical_record",
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
      title: "Allergy",
      dataIndex: "allergy",
      key: "allergy",
      render: (_, { allergy }) => (
        <p className="text-gray-700">{allergy ? allergy : "-"}</p>
      ),
    },
    {
      title: "Congenital Disease",
      dataIndex: "medical_history",
      key: "medical_history",
      width: "14%",
      render: (_, { medical_history }) => (
        <p className="text-gray-700">
          {medical_history ? medical_history : "-"}
        </p>
      ),
    },
    {
      title: "Height (Cm)",
      dataIndex: "height",
      key: "height",
      width: "12%",
      render: (_, { height }) => (
        <p className="text-gray-700">{height ? height : "-"}</p>
      ),
      sorter: (a, b) => b.height - a.height,
    },
    {
      title: "Weight (Kg)",
      dataIndex: "weight",
      key: "weight",
      width: "12%",
      render: (_, { weight }) => (
        <p className="text-gray-700">{weight ? weight : "-"}</p>
      ),
      sorter: (a, b) => b.weight - a.weight,
    },
    {
      title: "Blood",
      dataIndex: "blood",
      key: "blood",
      width: "8%",
      render: (_, { blood }) => (
        <p className="text-gray-700">{blood ? blood : "-"}</p>
      ),
      filters: [
        {
          text: "A",
          value: "A",
        },
        {
          text: "B",
          value: "B",
        },
        {
          text: "AB",
          value: "AB",
        },
        {
          text: "O",
          value: "O",
        },
      ],
      onFilter: (value, record) => record.blood.indexOf(value) === 0,
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
      title: "Action",
      key: "id_medical_record",
      dataIndex: "id_medical_record",
      width: "10%",
      render: (_, { id_medical_record }) => (
        <Space size="middle">
          <Link to={`/medical-record/update/${id_medical_record}`}>
            <AiFillEdit className="text-xl hover:text-blue-700 " />
          </Link>
          <Link to={`/medical-record/detail/${id_medical_record}`}>
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
        <title>Medical Record | Ardita Medical</title>
      </Helmet>
      <p className="home text-gray-500 text-base font-normal">
        <span className="cursor-pointer" onClick={() => navigate("/")}>
          Home
        </span>{" "}
        {">"}{" "}
        <span className="font-semibold text-blue-700">Medical Record</span>
      </p>
      <div className="flex justify-start mt-12 w-full gap-2">
        <p className="self-center w-16">Search :</p>
        <Input
          placeholder="Input data patient here.."
          size="large"
          style={{
            borderRadius: "4px",
          }}
          className="w-[300px]"
          onChange={(e) => setParams(e.target.value)}
          spellCheck="false"
        />
      </div>
      <div className="mt-8">
        {status === "success" ? (
          <div>
            <Table
              columns={columns}
              dataSource={medicalRecordData}
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

export default MedicalRecord;
