import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetailPatient, getPatient } from "../../../features/patientSlice";
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
import { Table, Spin, Input, DatePicker } from "antd";
import { AiFillInfoCircle } from "react-icons/ai";
import "../../../index.css";
import dayjs from "dayjs";
import { HeroMedicalRecord } from "../../../assets";

const DetailMedicalRecordForPatient = () => {
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
  console.log(patientData);
  console.log(medicalRecordData);
  console.log(medicalHistoryData);
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
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
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
    {
      title: "Medicine",
      dataIndex: "medicine",
      key: "medicine",
      render: (_, { medicine }) =>
        medicine.length > 0 ? (
          medicine.map((item) => <p>{item.name}</p>)
        ) : (
          <p>-</p>
        ),
    },
    {
      title: "Action",
      key: "id_history",
      dataIndex: "id_history",
      render: (_, { id_history }) => (
        <Link to={`/patient/medical-record/history/detail2/${id_history}`}>
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
      <div className="relative h-[300px]">
        <div
          className="absolute top-0 h-full w-full bg-no-repeat bg-contain"
          style={{ backgroundImage: `url(${HeroMedicalRecord})` }}
        />
      </div>

      <div className="mt-10 pb-8 md:px-40 px-4">
        {getMedicalRecordStatus === "success" ? (
          <div>
            <div className="py-9 bg-blue-300 mt-10 relative">
              <div>
                <h2 className="text-lg text-center font-semibold text-blue-900">
                  Patient Record
                </h2>
                <p className="text-sm font-normal mt-2 text-gray-500 text-center ">
                  Details of the patient's medical record data and history
                  during treatment
                </p>
              </div>
              <div className="grid grid-cols-3 justify-end gap-x-14 gap-y-10 mt-8">
                <div className="border-r">
                  <h4 className="text-sm font-medium text-blue-900 y-500 text-center">
                    Name
                  </h4>
                  <p className="text-base font-normal mt-2 text-gray-500 text-center ">
                    {medicalRecordData.Patient.name
                      ? medicalRecordData.Patient.name
                      : "-"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-blue-900 y-500 text-center">
                    Allergy
                  </h4>
                  <p className="text-base font-normal mt-2 text-gray-500 text-center ">
                    {medicalRecordData.allergy
                      ? medicalRecordData.allergy
                      : "-"}
                  </p>
                </div>
                <div className="border-l">
                  <h4 className="text-sm font-medium text-blue-900 y-500 text-center">
                    Congenital Disease
                  </h4>
                  <p className="text-base font-normal mt-2 text-gray-500 text-center">
                    {medicalRecordData.medical_history
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
        <div className="mt-10">
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
        </div>
      </div>
    </div>
  );
};

export default DetailMedicalRecordForPatient;
