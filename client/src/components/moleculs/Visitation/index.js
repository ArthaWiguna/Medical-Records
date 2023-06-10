import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getVisitation,
  visitations,
  getVisitationStatus,
  updateVisitation,
  updateVisitationStatus,
} from "../../../features/visitationSlice";
import {
  getAllPatient,
  getpatients,
  getPatientStatus,
} from "../../../features/patientSlice";
//UI
import ModalSearchPatient from "../ModalSearchPatient";
import { Table, Spin, Space, Select, message, Input, Collapse } from "antd";
import dayjs from "dayjs";
import { AiFillEdit, AiFillInfoCircle } from "react-icons/ai";
import { Helmet } from "react-helmet";
const { Panel } = Collapse;

const Visitation = () => {
  // utils
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth =
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : "";
  // state
  const [open, setOpen] = useState(false);
  const [paramsSearchPatient, setParamsSearchPatient] = useState("");

  // redux
  const visitationData = useSelector(visitations);
  const getVisitationTodayStatus = useSelector(getVisitationStatus);
  const updateVisitationTodayStatus = useSelector(updateVisitationStatus);
  const patients = useSelector(getpatients);
  const getAllPatientStatus = useSelector(getPatientStatus);

  // Function
  const onUpdateStatus = async (data) => {
    await dispatch(
      updateVisitation({ id: data.id, data: { status: data.selected } })
    );
    message.success("Update Status Success");
    console.log(data.selected, "data update visitation status");
  };

  const onSearchVisitation = (params) => {
    dispatch(getVisitation({ params: params }));
  };

  useEffect(() => {
    dispatch(getVisitation({ params: "" }));
  }, [dispatch, updateVisitationTodayStatus]);

  // filter visitation
  // on going (menunggu dan diperiksa)
  const visitationOnGoing = visitationData.filter(
    (visit) => visit.status === "Menunggu" || visit.status === "Diperiksa"
  );
  // lewat
  const visitationLate = visitationData.filter(
    (visit) => visit.status === "Lewat"
  );
  const visitationFinish = visitationData.filter(
    (visit) => visit.status === "Selesai"
  );

  console.log(visitationFinish);

  useEffect(() => {
    dispatch(
      getAllPatient({
        params: paramsSearchPatient,
        status: "Active",
      })
    );
  }, [dispatch, updateVisitationTodayStatus, paramsSearchPatient]);

  const columns = [
    {
      title: "No",
      dataIndex: "queue",
      key: "queue",
      width: "5%",
      render: (text) => (
        <div className="bg-blue-700 p-4 w-12 h-12 rounded-[4px] flex justify-center font-medium">
          <p className="text-white self-center ">{text}</p>
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      render: (text, { id_patient }) => (
        <Link to={`/patient/detail/${id_patient}`}>
          <p className="text-gray-700 hover:text-blue-700 cursor-pointer">
            {text}
          </p>
        </Link>
      ),
    },
    {
      title: "Visitation Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "15%",
      render: (text) => (
        <p className="text-gray-700">
          {dayjs(text).format("D MMMM YYYY HH:mm")}
        </p>
      ),
      sorter: (a, b) => dayjs(b.updatedAt).diff(dayjs(a.updatedAt)),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "10%",
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
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "10%",
      render: (text) => <p className="text-gray-700">{text}</p>,
    },
    {
      title: "Last Modified",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: "15%",
      render: (text) => (
        <p className="text-gray-700">
          {dayjs(text).format("D MMMM YYYY HH:mm")}
        </p>
      ),
      sorter: (a, b) => dayjs(b.updatedAt).diff(dayjs(a.updatedAt)),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "15%",
      render: (_, { status, id_visitation }) =>
        auth.level === "Admin" ? (
          <Select
            value={status}
            style={{
              width: 120,
            }}
            onChange={(e) => onUpdateStatus({ selected: e, id: id_visitation })}
            options={[
              {
                value: "Menunggu",
                label: "Menunggu",
              },
              {
                value: "Diperiksa",
                label: "Diperiksa",
              },
              {
                value: "Selesai",
                label: "Selesai",
              },
              {
                value: "Lewat",
                label: "Lewat",
              },
            ]}
          />
        ) : (
          <p className="text-gray-700">{status}</p>
        ),
      filters: [
        {
          text: "Menunggu",
          value: "Menunggu",
        },
        {
          text: "Diperiksa",
          value: "Diperiksa",
        },
        {
          text: "Selesai",
          value: "Selesai",
        },
        {
          text: "Lewat",
          value: "Lewat",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: "Action",
      key: "id_visitation",
      dataIndex: "id_visitation",
      width: "15%",
      render: (_, { id_visitation }) => (
        <Space size="middle">
          {auth.level === "Admin" ? (
            <Link to={`/visitation/update/${id_visitation}`}>
              <AiFillEdit className="text-xl hover:text-blue-700 " />
            </Link>
          ) : (
            ""
          )}
          <Link to={`/visitation/detail/${id_visitation}`}>
            <AiFillInfoCircle className="text-xl hover:text-blue-700 " />
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div className="mt-10 pb-20">
      <Helmet>
        <title>Visitation | Ardita Medical</title>
      </Helmet>
      <p className="home text-gray-500 text-base font-normal">
        <span className="cursor-pointer" onClick={() => navigate("/")}>
          Home
        </span>{" "}
        {">"}{" "}
        <span className="font-semibold text-blue-700">Visitation Today</span>
      </p>

      <div className="flex justify-between gap-2 mt-12 w-full">
        <div className="flex justify-start h-10 self-end gap-2">
          <p className="self-center w-16">Search :</p>
          <Input
            placeholder="Input data patient here.."
            size="large"
            style={{
              borderRadius: "4px",
            }}
            className="h-10 self-end w-[300px]"
            onChange={(e) => onSearchVisitation(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2 w-full">
          <Link to={`/visitation/report`}>
            <button className="bg-[#E38B29] hover:bg-[#f19a36] cursor-pointer px-4 py-2 text-white text-sm rounded h-full">
              Visitation Report
            </button>
          </Link>
          {auth.level === "Admin" ? (
            <button
              className="bg-blue-700 hover:bg-blue-600 border-none cursor-pointer px-4 py-2 text-white text-sm rounded"
              onClick={() => setOpen(true)}
            >
              + Add New Visitation
            </button>
          ) : (
            ""
          )}
        </div>
      </div>

      {/* Modal */}
      <ModalSearchPatient
        open={open}
        setOpen={setOpen}
        patients={patients ? patients : ""}
        setParamsSearchPatient={setParamsSearchPatient}
        status={getAllPatientStatus}
      />
      <div className="mt-8">
        {getVisitationTodayStatus === "success" ? (
          <div>
            <Table
              columns={columns}
              dataSource={visitationOnGoing}
              pagination={false}
            />
            <Collapse>
              <Panel
                header={`Late ( ${visitationLate.length} )`}
                key="1"
                className="w-full bg-white"
              >
                <Table
                  columns={columns}
                  dataSource={visitationLate}
                  pagination={false}
                  showHeader={false}
                  className="w-full -mt-6"
                />
              </Panel>
            </Collapse>
            <Collapse>
              <Panel
                header={`Finish ( ${visitationFinish.length} )`}
                key="1"
                className="w-full bg-white"
              >
                <Table
                  columns={columns}
                  dataSource={visitationFinish}
                  pagination={false}
                  showHeader={false}
                  className="w-full -mt-6"
                />
              </Panel>
            </Collapse>
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

export default Visitation;
