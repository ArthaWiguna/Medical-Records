import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUser,
  getUsers,
  getUserStatus,
} from "../../../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
//UI
import { Table, Spin, Input, Space, Tag } from "antd";
import { AiFillEdit, AiFillInfoCircle } from "react-icons/ai";
import dayjs from "dayjs";
import { Helmet } from "react-helmet";

const User = () => {
  // Utils
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // rerdux
  const users = useSelector(getUsers);
  const status = useSelector(getUserStatus);
  console.log(users);
  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [params, setParams] = useState("");

  useEffect(() => {
    dispatch(
      getAllUser({
        params: params,
      })
    );
  }, [dispatch, params]);

  // UI
  const columns = [
    {
      title: "No",
      dataIndex: "id_user",
      key: "id_user",
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
      title: "Level",
      dataIndex: "level",
      key: "level",
      width: "15%",
      render: (text) => <p className="text-gray-700">{text}</p>,
      filters: [
        {
          text: "Admin",
          value: "Admin",
        },
        {
          text: "Dokter",
          value: "Dokter",
        },
      ],
      onFilter: (value, record) => record.level.indexOf(value) === 0,
    },
    {
      title: "Last Modified",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: "20%",
      render: (text) => (
        <p className="text-gray-700">{dayjs(text).format("D MMMM YYYY")}</p>
      ),
      sorter: (a, b) => dayjs(b.updatedAt).diff(dayjs(a.updatedAt)),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      width: "15%",
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
      key: "id_user",
      dataIndex: "id_user",
      width: "10%",
      render: (_, { id_user }) => (
        <Space size="middle">
          <Link to={`/user/update/${id_user}`}>
            <AiFillEdit className="text-xl hover:text-blue-700" />
          </Link>
          <Link to={`/user/detail/${id_user}`}>
            <AiFillInfoCircle className="text-xl hover:text-blue-700" />
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
        <title>User | Ardita Medical</title>
      </Helmet>
      <p className="home text-gray-500 text-base font-normal">
        <span className="cursor-pointer" onClick={() => navigate("/")}>
          Home
        </span>{" "}
        {">"} <span className="font-semibold text-blue-700">User</span>
      </p>
      <div className="flex justify-between gap-2 mt-12 w-full">
        <div className="flex justify-start h-10 self-end gap-2">
          <p className="self-center w-16">Search :</p>
          <Input
            placeholder="Input data user here.."
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
          onClick={() => navigate("/user/add")}
        >
          + Add New User
        </button>
      </div>

      <div className="mt-8">
        {status === "success" ? (
          <div>
            <Table
              columns={columns}
              dataSource={users}
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

export default User;
