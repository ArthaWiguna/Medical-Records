import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import {
  getDetailMedicalRecord,
  getDetailMedicalRecordStatus,
  medicalRecord,
} from "../../../features/medicalRecordSlice";
import {
  getAllMedicalHistory,
  medicalHistories,
  getAllMedicalHistoryStatus,
} from "../../../features/medicalHistorySlice";
//UI
import { Table, Spin, Space, Input, DatePicker } from "antd";
import {
  AiFillEdit,
  AiFillInfoCircle,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import "../../../index.css";
import dayjs from "dayjs";
import { Helmet } from "react-helmet";

const DetailMedicalRecord = () => {
  // Utils
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const auth =
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : "";

  // redux
  const medicalRecordData = useSelector(medicalRecord);
  const getDetailStatus = useSelector(getDetailMedicalRecordStatus);
  const medicalHistoryData = useSelector(medicalHistories);
  const getHistoryStatus = useSelector(getAllMedicalHistoryStatus);
  console.log(medicalRecordData);
  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [params, setParams] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    dispatch(getDetailMedicalRecord(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(
      getAllMedicalHistory({
        id: id,
        params: params,
        date: date,
      })
    );
  }, [dispatch, id, params, date]);

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
      sorter: (a, b) => dayjs(b.createdAt).diff(dayjs(a.createdAt)),
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
      width: "10%",
      render: (item) => (
        <p className="text-gray-700">{item ? "Available" : "Not Available"}</p>
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
      title: "Action",
      key: "id_history",
      dataIndex: "id_history",
      width: "10%",
      render: (_, { id_history }) =>
        auth.level !== "Dokter" ? (
          <Space size="middle">
            <Link to={`/medical-record/history/detail/${id_history}`}>
              <AiFillInfoCircle className="text-xl hover:text-blue-700 " />
            </Link>
          </Space>
        ) : (
          <Space size="middle">
            <Link to={`/medical-record/history/update/${id_history}`}>
              <AiFillEdit className="text-xl hover:text-blue-700 " />
            </Link>
            <Link to={`/medical-record/history/detail/${id_history}`}>
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
        <span
          className="cursor-pointer"
          onClick={() => navigate("/medical-record")}
        >
          Medical Record
        </span>{" "}
        {">"}{" "}
        <span className="font-semibold text-blue-700">
          Medical Record Details
        </span>
      </p>

      {getDetailStatus === "success" ? (
        <div>
          <div>
            <h2 className="text-blue-900 font-semibold text-2xl mt-10 leading-normal text-center">
              Patient Medical Record
            </h2>
            <p className="mb-10 mt-2 text-gray-700 text-center">
              Details of the patient medical record and history data during
              treatment
            </p>
          </div>
          <div className="py-9 bg-blue-300 mt-10 relative">
            <div className="grid grid-cols-3 justify-end gap-x-14 gap-y-10">
              <div className="border-r">
                <h4 className="text-sm font-medium text-blue-900 y-500 text-center">
                  Name
                </h4>
                {medicalRecordData.Patient.id_patient &&
                medicalRecordData.Patient.name ? (
                  <Link
                    to={`/patient/detail/${medicalRecordData.Patient.id_patient}`}
                  >
                    <p className="text-base font-normal mt-2 text-gray-500 text-center hover:text-blue-700">
                      {medicalRecordData.Patient.name}
                    </p>
                  </Link>
                ) : (
                  "-"
                )}
              </div>
              <div>
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
              <div className="border-l">
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
            </div>
          </div>
          <div className="py-4 bg-blue-300">
            <div className="grid grid-cols-3 justify-end gap-x-14 gap-y-10">
              <div className="border-r">
                <h4 className="text-sm font-medium text-blue-900 y-500 text-center ">
                  Height (Cm)
                </h4>
                <p className="text-base font-normal mt-2 text-gray-500 text-center ">
                  {medicalRecordData.height ? medicalRecordData.height : "-"}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-blue-900 y-500 text-center">
                  Weight (Kg)
                </h4>
                <p className="text-base font-normal mt-2 text-gray-500 text-center ">
                  {medicalRecordData.weight ? medicalRecordData.weight : "-"}
                </p>
              </div>
              <div className="border-l">
                <h4 className="text-sm font-medium text-gray-bluetext-blue-900  text-center">
                  Blood
                </h4>
                <p className="text-base font-normal mt-2 text-gray-500 text-center">
                  {medicalRecordData.blood ? medicalRecordData.blood : "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="mt-10 min-h-[400px]">
        <div className="flex justify-between gap-2 mt-12 w-full">
          <div className="flex justify-start h-10 self-end gap-2">
            <p className="self-center w-16">Search :</p>
            <Input
              placeholder="Input complaint or diagnosis here.."
              size="large"
              style={{
                borderRadius: "4px",
              }}
              className="h-10 self-end w-[300px]"
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

          <button
            className={
              auth.level !== "Dokter"
                ? "hidden"
                : "bg-blue-700 hover:bg-blue-600 border-none cursor-pointer px-4 py-2 text-white text-sm mt-6 rounded"
            }
            onClick={() =>
              navigate("/medical-record/history/add", {
                state: {
                  id: id,
                },
              })
            }
          >
            + Add New History
          </button>
        </div>
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
        <button
          className="bg-blue-300 group hover:text-blue-700 border-none cursor-pointer px-6 py-[10px] text-gray-700 text-sm mt-6 rounded"
          onClick={() => navigate("/medical-record")}
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

export default DetailMedicalRecord;
