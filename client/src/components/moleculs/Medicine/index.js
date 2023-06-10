import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  medicines,
  getAllMedicine,
  getMedicineStatus,
} from "../../../features/medicineSlice";

import { useNavigate, Link } from "react-router-dom";
//UI
import { Table, Spin, Space, Input, Tag } from "antd";
import { AiFillEdit, AiFillInfoCircle } from "react-icons/ai";
import { IconTotalMedicine } from "../../../assets";
import "../../../index.css";
import dayjs from "dayjs";
import { Helmet } from "react-helmet";

const Medicine = () => {
  // Utils
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // redux
  const medicinesData = useSelector(medicines);
  const status = useSelector(getMedicineStatus);
  // State
  const [params, setParams] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(
      getAllMedicine({
        params: params,
        status: "All",
      })
    );
  }, [dispatch, params]);

  // UI
  const columns = [
    {
      title: "No",
      dataIndex: "id_medicine",
      key: "id_medicine",
      width: "4%",
      render: (value, item, index) => (currentPage - 1) * 10 + index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <p className="text-gray-700">{text}</p>,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: "15%",
      render: (image) =>
        image ? (
          <img
            src={`http://localhost:3001/${image}`}
            alt="Medicine Thumbnail"
            className="h-24 w-24 object-cover"
          />
        ) : (
          <img
            src={IconTotalMedicine}
            alt="Medicine Thumbnail"
            className="h-24 w-24 object-cover"
          />
        ),
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
      width: "10%",
      render: (text) => <p className="text-gray-700">{text}</p>,
      filters: [
        {
          text: "Tablet",
          value: "Tablet",
        },
        {
          text: "Kapsul",
          value: "Kapsul",
        },
        {
          text: "Kaplet",
          value: "Kaplet",
        },
        {
          text: "Botol",
          value: "Botol",
        },
        {
          text: "Serbuk",
          value: "Serbuk",
        },
        {
          text: "Salep",
          value: "Salep",
        },
      ],
      onFilter: (value, record) => record.unit.indexOf(value) === 0,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      width: "10%",
      sorter: (a, b) => a.stock - b.stock,
      render: (text) => (
        <div className="flex justify-end">
          <p className="text-gray-700">{text}</p>
        </div>
      ),
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
        <Tag color={text === "Available" ? "geekblue" : "volcano"}>{text}</Tag>
      ),
      filters: [
        {
          text: "Available",
          value: "Available",
        },
        {
          text: "Not Available",
          value: "Not Available",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: "Action",
      key: "id_medicine",
      dataIndex: "id_medicine",
      width: "10%",
      render: (_, { id_medicine }) => (
        <Space size="middle">
          <Link to={`/medicine/update/${id_medicine}`}>
            <AiFillEdit className="text-xl hover:text-blue-700 " />
          </Link>
          <Link to={`/medicine/detail/${id_medicine}`}>
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
        <title>Medicine | Ardita Medical</title>
      </Helmet>
      <p className="home text-gray-500 text-base font-normal">
        <span className="cursor-pointer" onClick={() => navigate("/")}>
          Home
        </span>{" "}
        {">"} <span className="font-semibold text-blue-700">Medicine</span>
      </p>
      <div className="flex justify-between gap-2 mt-12 w-full">
        <div className="flex justify-start h-10 self-end gap-2">
          <p className="self-center w-16">Search :</p>
          <Input
            placeholder="Input data medicine here.."
            size="large"
            style={{
              borderRadius: "4px",
            }}
            className="h-10 self-end w-[300px]"
            onChange={(e) => setParams(e.target.value)}
            spellCheck="false"
          />
        </div>
        <button
          className="bg-blue-700 hover:bg-blue-600 border-none cursor-pointer px-4 py-2 text-white text-sm rounded"
          onClick={() => navigate("/medicine/add")}
        >
          + Add New Medicine
        </button>
      </div>

      <div className="mt-8">
        {status === "success" ? (
          <div>
            <Table
              columns={columns}
              dataSource={medicinesData}
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

export default Medicine;
