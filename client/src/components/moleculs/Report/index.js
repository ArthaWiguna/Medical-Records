import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getReport,
  reports,
  getVisitationReportStatus,
} from "../../../features/visitationSlice";
//UI
import { Table, Spin, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { AiOutlineDownload } from "react-icons/ai";
// import jsPDF from "jspdf";
import jsPDFInvoiceTemplate from "jspdf-invoice-template";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Report = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { RangePicker } = DatePicker;

  // state
  const [start, setStart] = useState(
    dayjs().startOf("month").format("YYYY-MM-DD")
  );
  const [end, setEnd] = useState(dayjs().endOf("month").format("YYYY-MM-DD"));
  const [category, setCategory] = useState("All");
  console.log(category);
  const [currentPage, setCurrentPage] = useState(1);

  // redux
  const reportData = useSelector(reports);
  const status = useSelector(getVisitationReportStatus);

  const onSelectDate = (date) => {
    setStart(dayjs(date[0]).format("YYYY-MM-DD"));
    setEnd(dayjs(date[1]).format("YYYY-MM-DD"));
    dispatch(
      getReport({
        start: dayjs(date[0]).format("YYYY-MM-DD"),
        end: dayjs(date[1]).format("YYYY-MM-DD"),
        category: category,
      })
    );
  };

  const onSelectCategory = (category) => {
    setCategory(category);
    dispatch(
      getReport({
        start: start,
        end: end,
        category: category,
      })
    );
  };

  const generatePdf = () => {
    jsPDFInvoiceTemplate(props);
  };

  const logoUrl = `http://localhost:3001/images/logo.png`;

  var props = {
    returnJsPDFDocObject: true,
    fileName: `Report ${dayjs().format("D MMMM YYYY")}-${category}`,
    orientationLandscape: false,
    compress: true,
    logo: {
      src: logoUrl,
      type: "PNG", //optional, when src= data:uri (nodejs case)
      width: 82, //aspect ratio = width/height
      height: 24,
      margin: {
        top: 0, //negative or positive num, from the current position
        left: 0, //negative or positive num, from the current position
      },
    },
    business: {
      name: "Dr. I Wayan Gede Ardita",
      address:
        "Address: Jl. Dokter Ir. Soekarno, Pejeng, Kabupaten Gianyar, Bali",
      phone: "License Number: SIP No. 503/225.SIP.II/Dikes/2017",
      email: "Phone: +6285238879055",
    },
    contact: {
      label: "Report issued for category:",
      name: category,
      address: "",
      phone: `Period of ${dayjs(start).format("D MMMM YYYY")} - ${dayjs(
        end
      ).format("D MMMM YYYY")}`,
      email: " ",
      otherInfo: " ",
    },
    invoice: {
      label: "",
      num: "",
      invDate: `Download in: ${dayjs().format("D MMMM YYYY HH:mm")}`,
      header:
        category === "BPJS" || category === "All"
          ? [
              {
                title: "No",
                style: {
                  width: 10,
                },
              },
              {
                title: "Name",
                style: {
                  width: 40,
                },
              },
              {
                title: "Visitation Date",
                style: {
                  width: 40,
                },
              },
              {
                title: "Category",
                style: {
                  width: 30,
                },
              },
              {
                title: "Inssurance Number",
                style: {
                  width: 40,
                },
              },
              {
                title: "Description",
                style: {
                  width: 30,
                },
              },
            ]
          : [
              {
                title: "No",
                style: {
                  width: 10,
                },
              },
              {
                title: "Name",
                style: {
                  width: 55,
                },
              },
              {
                title: "Visitation Date",
                style: {
                  width: 50,
                },
              },
              {
                title: "Category",
                style: {
                  width: 40,
                },
              },
              {
                title: "Description",
                style: {
                  width: 40,
                },
              },
            ],
      table:
        category === "BPJS" || category === "All"
          ? reportData.map((item, index) => [
              index + 1,
              item.Patient.name,
              dayjs(item.createdAt).format("D MMMM YYYY"),
              item.Patient.category,
              item.Patient.insurance_number
                ? item.Patient.insurance_number
                : "-",
              item.description,
            ])
          : reportData.map((item, index) => [
              index + 1,
              item.Patient.name,
              dayjs(item.createdAt).format("D MMMM YYYY"),
              item.Patient.category,
              item.description,
            ]),
      additionalRows: [
        {
          col1: "",
        },
        {
          col1: "",
        },
        {
          col1: "",
        },
        {
          col1: "",
        },
        {
          col1: "",
          col2: `Gianyar, ${dayjs().format("D MMMM YYYY")}`,
          style: {
            fontSize: 10, //optional, default 12
          },
        },
        {
          col1: "",
        },
        {
          col1: "",
        },
        {
          col1: "",
        },
        {
          col1: "",
          col2: "(Dr. I Wayan Gede Ardita)",
          style: {
            fontSize: 10, //optional, default 12
          },
        },
      ],
    },
    pageEnable: true,
    pageLabel: "Page ",
  };

  useEffect(() => {
    dispatch(getReport({ start: start, end: end, category: "All" }));
  }, [dispatch]);

  const columns = [
    {
      title: "No",
      dataIndex: "id_visitation",
      key: "id_visitation",
      width: "4%",
      render: (value, item, index) => (currentPage - 1) * 10 + index + 1,
    },
    {
      title: "Name",
      dataIndex: "Patient",
      key: "id_patient",
      render: (item) => item.name,
    },
    {
      title: "Visitation Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (
        <p className="text-gray-700">{dayjs(text).format("D MMMM YYYY")}</p>
      ),
    },
    {
      title: "Category",
      dataIndex: "Patient",
      key: "id_patient",
      render: (item) => item.category,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <p className="text-gray-700">{text}</p>,
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    setCurrentPage(pagination.current);
  };
  return (
    <div className="mt-10 pb-20">
      <Helmet>
        <title>Report | Ardita Medical</title>
      </Helmet>
      <p className="home text-gray-500 text-base font-normal">
        <span className="cursor-pointer" onClick={() => navigate("/")}>
          Home
        </span>{" "}
        {">"}{" "}
        <span
          className="cursor-pointer"
          onClick={() => navigate("/visitation")}
        >
          Visitation
        </span>{" "}
        {">"} <span className="font-semibold text-blue-700">Report</span>
      </p>
      <div className="flex justify-between gap-2 mt-12 w-full">
        <div className="flex justify-start h-10 self-end gap-2">
          <p className="self-center w-16">Filter :</p>
          <RangePicker
            onChange={onSelectDate}
            size="large"
            className="h-10 self-end"
            defaultValue={[dayjs().startOf("month"), dayjs().endOf("month")]}
            format="DD/MM/YYYY"
          />
          <Select
            defaultValue="All Category"
            onChange={onSelectCategory}
            size="large"
            className="h-10 w-40 self-end"
            options={[
              { value: "All", label: "All Category" },
              { value: "Umum", label: "Umum" },
              { value: "BPJS", label: "BPJS" },
            ]}
          />
        </div>
        <button
          className="bg-[#E38B29] hover:bg-[#f19a36] cursor-pointer px-4 py-2 text-white text-sm rounded"
          onClick={generatePdf}
        >
          <div className="flex gap-2">
            <AiOutlineDownload className="flex self-center text-lg text-white" />
            Download Report
          </div>
        </button>
      </div>

      <div className="mt-8">
        {status === "success" ? (
          <Table
            columns={columns}
            dataSource={reportData}
            onChange={onChange}
            rowKey={(record) => record.id_visitation}
          />
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

export default Report;
