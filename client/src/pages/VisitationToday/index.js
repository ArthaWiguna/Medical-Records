import React, { useEffect } from "react";
import {
  getVisitation,
  visitations,
  getVisitationStatus,
} from "../../features/visitationSlice";

import "../../index.css";
import { Table, Spin } from "antd";
import dayjs from "dayjs";
import { LandingNavbar, LandingFooter } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { Helmet } from "react-helmet";

const VisitationToday = () => {
  const dispatch = useDispatch();

  const visitationData = useSelector(visitations);
  const getVisitationTodayStatus = useSelector(getVisitationStatus);

  useEffect(() => {
    dispatch(getVisitation({ params: "" }));
  }, [dispatch]);

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
      render: (text) => <p className="text-gray-700">{text}</p>,
    },

    {
      title: "Visitation Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "26%",
      render: (text) => (
        <p className="text-gray-700">
          {dayjs(text).format("D MMMM YYYY HH:mm")}
        </p>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "20%",
      render: (text) => <p className="text-gray-700">{text}</p>,
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Today Visitation | Ardita Medical</title>
      </Helmet>
      {/* Navbar */}
      <LandingNavbar />
      {/* Hero */}
      <div className="flex md:h-[348px] h-[280px] items-center justify-center relative">
        <div className="hero-image-visitation" />
        <div className="relative px-4 md:px-40 w-full mt-10 md:mt-40 flex justify-center md:justify-end">
          <div>
            <h2 className="hero-motto text-2xl md:text-4xl leading-tight md:leading-snug  text-white font-extralight text-center md:text-start">
              Monitoring Current{" "}
              <span className="font-semibold">Visitation</span>{" "}
            </h2>
            <p className="mb-10 mt-2 md:text-xl text-white text-center md:text-start">
              With more easily from anywhere
            </p>
          </div>
        </div>
      </div>
      <div className="px-4 lg:px-[200px] xl:px-[400px] w-full">
        <h2 className="text-blue-900 font-semibold text-2xl mt-10 leading-normal text-center mb-6">
          Today's Visitation
        </h2>
        {getVisitationTodayStatus === "success" ? (
          <div style={{ overflowX: "auto" }}>
            <Table
              columns={columns}
              dataSource={visitationData}
              pagination={false}
              scroll={{ x: "max-content" }}
            />
            <a
              href="https://api.whatsapp.com/send?phone=6285238879055&text=Hi Ardita Medical!"
              target="blank"
            >
              <button className="bg-blue-700 mt-6 border-none cursor-pointer px-8 h-12 text-white text-base rounded block mx-auto">
                <div className="flex gap-2">
                  <AiOutlineWhatsApp className="self-center text-2xl" />
                  Book Appoinment
                </div>
              </button>
            </a>
          </div>
        ) : (
          <div>
            <Spin tip="Loading" size="large" className="mt-40">
              <div className="content" />
            </Spin>
          </div>
        )}
      </div>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
};

export default VisitationToday;
