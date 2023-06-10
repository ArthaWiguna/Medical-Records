import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVisitationYearlyOverview,
  visitationYearlyOverview,
  getVisitationTodayOverview,
  visitationTodayOverview,
  getTotalVisitationPatient,
  totalVisitationPatient,
  getTotalVisitationPatientStatus,
  getVisitationYearlyOverviewPatient,
  visitationYearlyOverviewPatient,
  getVisitationYearlyOverviewPatientStatus,
  getVisitationComparasion,
  visitationComparasion,
} from "../../../features/visitationSlice";
import {
  getMedicalHistoryYearlyOverview,
  medicalHistoryYearlyOverview,
} from "../../../features/medicalHistorySlice";
import { getDetailPatient, getPatient } from "../../../features/patientSlice";
import {
  getAllMedicine,
  medicines,
  getMostGivenMedicineOverview,
  mostGivenMedicineOverview,
  getMostReceivedMedicineOverview,
  mostReceivedMedicineOverview,
  getLowStockMedicine,
  lowStockMedicine,
} from "../../../features/medicineSlice";

//UI
import { DatePicker, Spin, Table } from "antd";

import {
  IconFinish,
  IconTotalVisitation,
  IconTreatment,
  IconWaiting,
  IconActiveMedicine,
  HeroOverview,
} from "../../../assets";
import "../../../index.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";
import { Helmet } from "react-helmet";

const Home = () => {
  // Utils
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth =
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : "";

  // Redux
  // Admin
  const medicineData = useSelector(medicines);
  // const outOfStockMedicine =
  //   medicineData && medicineData.filter((medicine) => medicine.stock === 0);
  const lowStockMedicineData = useSelector(lowStockMedicine);
  const visitationYearlyData = useSelector(visitationYearlyOverview);
  const visitationComparasionData = useSelector(visitationComparasion);

  // Dokter
  const visitationTodayData = useSelector(visitationTodayOverview);
  const medicalHistoryYearlyData = useSelector(medicalHistoryYearlyOverview);
  const mostGivenMedicineOverviewData = useSelector(mostGivenMedicineOverview);
  console.log(visitationTodayData);
  // Patient
  const patientLoggedData = useSelector(getPatient);
  const totalVisitationPatientData = useSelector(totalVisitationPatient);
  const getTotalVisitationStatus = useSelector(getTotalVisitationPatientStatus);
  const visitationYearlyOverviewPatientData = useSelector(
    visitationYearlyOverviewPatient
  );
  const getVisitationYearlyOverviewStatus = useSelector(
    getVisitationYearlyOverviewPatientStatus
  );
  const mostReceivedMedicineOverviewData = useSelector(
    mostReceivedMedicineOverview
  );
  console.log(mostReceivedMedicineOverviewData);
  // State
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  let lowStockMedicineDataLength = lowStockMedicineData.rows
    ? lowStockMedicineData.rows.length
    : "";
  const paginatedData =
    lowStockMedicineData.rows &&
    lowStockMedicineData.rows.slice(0, pageSize * currentPage);

  const columns = [
    {
      title: "No",
      dataIndex: "id_medicine",
      key: "id_medicine",
      width: "4%",
      render: (value, item, index) => (currentPage - 1) * 5 + index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <p className="text-gray-700">{text}</p>,
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
      width: "15%",
      render: (text) => <p className="text-gray-700">{text}</p>,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      width: "15%",
      render: (text) => (
        <div className="flex justify-end">
          <p className="text-gray-700">{text}</p>
        </div>
      ),
    },
  ];

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );

  const Option = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        title: {
          display: true,
          padding: 2,
        },
      },
    },
  };

  // admin
  const visitationChartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],

    datasets: [
      {
        label: "General",
        data:
          visitationYearlyData &&
          visitationYearlyData.general &&
          visitationYearlyData.general.map((i) => i.totalVisitation),
        borderColor: "#3547AC",
        backgroundColor: "#3547AC",
      },
      {
        label: "BPJS",
        data:
          visitationYearlyData &&
          visitationYearlyData.bpjs &&
          visitationYearlyData.bpjs.map((i) => i.totalVisitation),
        borderColor: "#E38B29",
        backgroundColor: "#E38B29",
      },
    ],
  };

  const visitationComparasionChartData = {
    labels: ["New Patient", "Old Patient"],
    datasets: [
      {
        label: "Total Visitation",
        data: [
          visitationComparasionData.newPatientVisitation,
          visitationComparasionData.oldPatientVisitation,
        ],
        backgroundColor: ["#3547AC", "#E38B29"],
        borderwidth: 0,
      },
    ],
  };

  // dokter
  const medicalHistoryChartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Treatment",
        data: medicalHistoryYearlyData.map((i) => i.totalHistory),
        borderColor: "#3547AC",
        backgroundColor: "#3547AC",
      },
    ],
  };

  const medicineChartData = {
    labels: mostGivenMedicineOverviewData.map((i) => i.Medicine.name),
    datasets: [
      {
        label: "Total Used",
        data: mostGivenMedicineOverviewData.map((i) => i.num_intakes),
        backgroundColor: ["#3547AC", "#DCE2F4", "#E38B29"],
        borderwidth: 0,
      },
    ],
  };

  // patient
  const visitationChartDataPatient = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Visitations",
        data: visitationYearlyOverviewPatientData.map((i) => i.totalVisitation),
        borderColor: "#3547AC",
        backgroundColor: "#3547AC",
      },
    ],
  };

  const medicineChartDataPatient = {
    labels: mostReceivedMedicineOverviewData.map((i) => i.name),
    datasets: [
      {
        label: "Total Received",
        data: mostReceivedMedicineOverviewData.map((i) => i.num_intakes),
        backgroundColor: ["#3547AC", "#DCE2F4", "#E38B29"],
        borderwidth: 0,
      },
    ],
  };

  //Function
  const onSelectOverviewVisitationYear = (year) => {
    setCurrentYear(year.$y);
    dispatch(getVisitationYearlyOverview({ year: year.$y }));
  };
  const onSelectOverviewMedicalHistoryYear = (year) => {
    setCurrentYear(year.$y);
    dispatch(getMedicalHistoryYearlyOverview({ year: year.$y }));
  };
  const onSelectOverviewVisitationPatientYear = (year) => {
    setCurrentYear(year.$y);
    dispatch(getVisitationYearlyOverviewPatient({ year: year.$y }));
  };
  const handleLoadMore = () => {
    setPageSize((prev) => prev + 5);
  };

  // Admin
  useEffect(() => {
    if (auth.level === "Admin") {
      dispatch(getVisitationTodayOverview());
      dispatch(
        getAllMedicine({
          params: "",
          status: "Available",
        })
      );
      dispatch(getLowStockMedicine());
      dispatch(getVisitationYearlyOverview({ year: currentYear }));
      dispatch(getVisitationComparasion({ year: currentYear }));
    }
  }, [dispatch, currentYear]);

  // Dokter
  useEffect(() => {
    if (auth.level === "Dokter") {
      dispatch(getVisitationTodayOverview());
      dispatch(
        getAllMedicine({
          params: "",
          status: "Available",
        })
      );
      dispatch(getMedicalHistoryYearlyOverview({ year: currentYear }));
      dispatch(getMostGivenMedicineOverview({ year: currentYear }));
      dispatch(getLowStockMedicine());
    }
  }, [dispatch, currentYear]);

  // Patient
  useEffect(() => {
    if (auth.level === "Pasien") {
      dispatch(getDetailPatient({ id: "", username: auth.username }));
    }
  }, [dispatch, auth.username, auth.level]);

  useEffect(() => {
    if (
      auth.level === "Pasien" &&
      patientLoggedData &&
      patientLoggedData.MedicalRecord
    ) {
      dispatch(getTotalVisitationPatient({ id: patientLoggedData.id_patient }));
      dispatch(
        getVisitationYearlyOverviewPatient({
          id: patientLoggedData.id_patient,
          year: currentYear,
        })
      );
      dispatch(
        getMostReceivedMedicineOverview({
          id: patientLoggedData.MedicalRecord.id_medical_record,
          year: currentYear,
        })
      );
    }
  }, [dispatch, patientLoggedData, currentYear]);

  //admin
  if (auth.level === "Admin") {
    return (
      <div className="mt-10 pb-10">
        <Helmet>
          <title>Overview | Ardita Medical</title>
        </Helmet>
        <div className="relative h-[100px] md:h-[300px]">
          <div
            className="absolute top-0  h-full w-full bg-no-repeat bg-contain"
            style={{ backgroundImage: `url(${HeroOverview})` }}
          />
          <p className="home text-white text-base font-normal z-40 absolute mt-[5%] ml-8">
            <span className="cursor-pointer" onClick={() => navigate("/")}>
              Home
            </span>{" "}
            {">"} <span className="font-semibold text-blue-700">Overview</span>
          </p>
          <h2 className="text-4xl font-semibold text-blue-900 z-40 absolute mt-[10%] ml-8">
            {" "}
            Overview's
          </h2>
        </div>

        <div className="-mt-10">
          <h2 className="text-xl font-semibold text-blue-900">
            Today's Overview
          </h2>
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div
              className="bg-blue-300 px-6 py-4 rounded-sm cursor-pointer"
              onClick={() => navigate("/visitation")}
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    Patient Waiting
                  </p>
                  <h2 className="text-2xl font-medium text-blue-700 mt-4">
                    {visitationTodayData ? visitationTodayData.waiting : ""}
                  </h2>
                </div>
                <img
                  src={IconWaiting}
                  alt="icon_total_patient"
                  className="h-12 w-12 self-center"
                ></img>
              </div>
            </div>
            <div
              className="bg-blue-300 px-6 py-4 rounded-sm cursor-pointer"
              onClick={() => navigate("/visitation")}
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    Patient On Treatment
                  </p>
                  <h2 className="text-2xl font-medium text-blue-700 mt-4">
                    {visitationTodayData ? visitationTodayData.onTreatment : ""}
                  </h2>
                </div>
                <img
                  src={IconTreatment}
                  alt="icon_total_patient"
                  className="h-12 w-12 self-center"
                ></img>
              </div>
            </div>
            <div
              className="bg-blue-300 px-6 py-4 rounded-sm cursor-pointer"
              onClick={() => navigate("/visitation")}
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    Patient Finish Treatment
                  </p>
                  <h2 className="text-2xl font-medium text-blue-700 mt-4">
                    {visitationTodayData ? visitationTodayData.finish : ""}
                  </h2>
                </div>
                <img
                  src={IconFinish}
                  alt="icon_total_patient"
                  className="h-12 w-12 self-center"
                ></img>
              </div>
            </div>
            <div
              className="bg-blue-300 px-6 py-4 rounded-sm cursor-pointer"
              onClick={() => navigate("/medicine")}
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    Available Medicines
                  </p>
                  <h2 className="text-2xl font-medium text-blue-700 mt-4">
                    {medicineData ? medicineData.length : ""}
                  </h2>
                </div>
                <img
                  src={IconActiveMedicine}
                  alt="icon_total_patient"
                  className="h-12 w-12 self-center"
                ></img>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <div>
              <h2 className="text-xl font-semibold text-blue-900 mb-8">
                Low Stock Medicine
              </h2>
              <div className="w-[65%]">
                <Table
                  columns={columns}
                  dataSource={paginatedData}
                  pagination={false}
                />

                <div className="mt-6 flex justify-center gap-6">
                  {pageSize * currentPage < lowStockMedicineDataLength && (
                    <button
                      onClick={handleLoadMore}
                      className="flex items-center gap-2 bg-blue-700 hover:bg-blue-600 border-none cursor-pointer px-8 py-2 text-white text-sm rounded"
                    >
                      Load More
                      <AiFillCaretDown />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <div>
              <div className="flex justify-end mb-8 gap-2">
                <p className="self-center">Select Year : </p>
                <DatePicker
                  onChange={onSelectOverviewVisitationYear}
                  picker="year"
                  defaultValue={dayjs().year(currentYear)}
                />
              </div>
              <div className="flex justify-between gap-8">
                <div className="w-[72%] h-full">
                  <h2 className="text-xl font-semibold text-blue-900 mb-8">
                    {"Visitation by Category in " + currentYear}
                  </h2>
                  <Line data={visitationChartData} options={Option} />
                </div>
                <div className="w-[28%]">
                  <h2 className="text-xl font-semibold text-blue-900 mb-8">
                    {"Visitation by Patient in " + currentYear}
                  </h2>

                  {visitationComparasionData.newPatientVisitation === 0 &&
                  visitationComparasionData.oldPatientVisitation === 0 ? (
                    <div>
                      <p className="text-center ">No data</p>
                      <Doughnut
                        data={visitationComparasionChartData}
                        options={Option}
                      />
                    </div>
                  ) : (
                    <Doughnut
                      data={visitationComparasionChartData}
                      options={Option}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    // Dokter
  } else if (auth.level === "Dokter") {
    return (
      <div className="mt-10 pb-10">
        <Helmet>
          <title>Overview | Ardita Medical</title>
        </Helmet>
        <div className="relative h-[100px] md:h-[300px]">
          <div
            className="absolute top-0  h-full w-full bg-no-repeat bg-contain"
            style={{ backgroundImage: `url(${HeroOverview})` }}
          />
          <p className="home text-white text-sm font-normal z-40 absolute mt-[5%] ml-8">
            Home {">"}{" "}
            <span className="font-semibold text-blue-700">Overview</span>
          </p>
          <h2 className="text-4xl font-semibold text-blue-900 z-40 absolute mt-[10%] ml-8">
            {" "}
            Overview's
          </h2>
        </div>
        <div className="-mt-10">
          <h2 className="text-xl font-semibold text-blue-900">
            Today's Overview
          </h2>
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div
              className="bg-blue-300 px-6 py-4 rounded-sm cursor-pointer"
              onClick={() => navigate("/visitation")}
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    Patient Waiting
                  </p>
                  <h2 className="text-2xl font-medium text-blue-700 mt-4">
                    {visitationTodayData ? visitationTodayData.waiting : ""}
                  </h2>
                </div>
                <img
                  src={IconWaiting}
                  alt="icon_total_patient"
                  className="h-12 w-12 self-center"
                ></img>
              </div>
            </div>
            <div
              className="bg-blue-300 px-6 py-4 rounded-sm cursor-pointer"
              onClick={() => navigate("/visitation")}
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    Patient On Treatment
                  </p>
                  <h2 className="text-2xl font-medium text-blue-700 mt-4">
                    {visitationTodayData ? visitationTodayData.onTreatment : ""}
                  </h2>
                </div>
                <img
                  src={IconTreatment}
                  alt="icon_total_patient"
                  className="h-12 w-12 self-center"
                ></img>
              </div>
            </div>
            <div
              className="bg-blue-300 px-6 py-4 rounded-sm cursor-pointer"
              onClick={() => navigate("/visitation")}
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    Patient Finish Treatment
                  </p>
                  <h2 className="text-2xl font-medium text-blue-700 mt-4">
                    {visitationTodayData ? visitationTodayData.finish : ""}
                  </h2>
                </div>
                <img
                  src={IconFinish}
                  alt="icon_total_patient"
                  className="h-12 w-12 self-center"
                ></img>
              </div>
            </div>
            <div
              className="bg-blue-300 px-6 py-4 rounded-sm cursor-pointer"
              onClick={() => navigate("/medicine")}
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    Available Medicines
                  </p>
                  <h2 className="text-2xl font-medium text-blue-700 mt-4">
                    {medicineData ? medicineData.length : ""}
                  </h2>
                </div>
                <img
                  src={IconActiveMedicine}
                  alt="icon_total_patient"
                  className="h-12 w-12 self-center"
                ></img>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <div>
              <h2 className="text-xl font-semibold text-blue-900 mb-8">
                Low Stock Medicine
              </h2>
              <div className="w-[65%]">
                <Table
                  columns={columns}
                  dataSource={paginatedData}
                  pagination={false}
                />

                <div className="mt-6 flex justify-center gap-6">
                  {pageSize * currentPage < lowStockMedicineDataLength && (
                    <button
                      onClick={handleLoadMore}
                      className="flex gap-2 items-center bg-blue-700 hover:bg-blue-600 border-none cursor-pointer px-8 py-2 text-white text-sm rounded"
                    >
                      Load More
                      <AiFillCaretDown />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-14">
            <div>
              <div className="flex justify-end gap-2 mb-8">
                <p className="self-center">Select Year : </p>
                <DatePicker
                  onChange={onSelectOverviewMedicalHistoryYear}
                  picker="year"
                  defaultValue={dayjs().year(currentYear)}
                />
              </div>
              <div className="flex justify-between gap-8">
                <div className="w-[72%] h-full">
                  <h2 className="text-xl font-semibold text-blue-900 mb-8">
                    {"Treatment Given in " + currentYear}
                  </h2>
                  <Line data={medicalHistoryChartData} options={Option} />
                </div>
                <div className="w-[28%]">
                  <h2 className="text-xl font-semibold text-blue-900 mb-8">
                    {"Most Given Medicine in " + currentYear}
                  </h2>
                  {mostGivenMedicineOverviewData.length === 0 ? (
                    <div>
                      <p className="text-center ">No data</p>
                      <Doughnut
                        data={medicineChartData}
                        options={Option}
                      />{" "}
                    </div>
                  ) : (
                    <Doughnut data={medicineChartData} options={Option} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (auth.level === "Pasien") {
    return (
      <div className="mt-10 pb-10">
        <p className="home text-gray-500 text-sm font-normal">
          Home {">"}{" "}
          <span className="font-semibold text-blue-700">Overview</span>
        </p>
        {getTotalVisitationStatus === "success" &&
        getVisitationYearlyOverviewStatus === "success" ? (
          <div className="mt-8">
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-blue-300 px-6 py-4 rounded-sm w-[34%]">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-900">
                      Total Visitation
                    </p>
                    <h2 className="text-xl font-medium text-blue-700 mt-4">
                      {totalVisitationPatientData
                        ? totalVisitationPatientData.count
                        : ""}
                    </h2>
                  </div>
                  <img
                    src={IconTotalVisitation}
                    alt="icon_total_visitation"
                    className="h-12 w-12 self-center"
                  ></img>
                </div>
              </div>
            </div>
            <div className="mt-14">
              <div>
                <div className="flex justify-end gap-2 mb-8">
                  <p>Select Year : </p>
                  <DatePicker
                    onChange={onSelectOverviewVisitationPatientYear}
                    picker="year"
                    defaultValue={dayjs().year(currentYear)}
                  />
                </div>
                <div className="flex justify-between gap-8">
                  <div className="w-[72%] h-full">
                    <h2 className="text-xl font-semibold text-blue-900 mb-8">
                      {"Total Visitation in " + currentYear}
                    </h2>
                    <Line data={visitationChartDataPatient} options={Option} />
                  </div>
                  <div className="w-[28%]">
                    <h2 className="text-xl font-semibold text-blue-900 mb-8">
                      Most Received Medicine
                    </h2>
                    {mostReceivedMedicineOverviewData.length === 0 ? (
                      <div>
                        <p className="text-center ">No data</p>
                        <Doughnut
                          data={medicineChartDataPatient}
                          options={Option}
                        />
                      </div>
                    ) : (
                      <Doughnut
                        data={medicineChartDataPatient}
                        options={Option}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Spin tip="Loading" size="large" className="mt-40">
              <div className="content" />
            </Spin>
          </div>
        )}
      </div>
    );
  }
};

export default Home;
