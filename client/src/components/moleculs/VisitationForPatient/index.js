import React, { useEffect } from "react";
import {
  getVisitation,
  visitations,
  getVisitationStatus,
} from "../../../features/visitationSlice";

import { HeroVisitation } from "../../../assets";
import "../../../index.css";
import { Table, Spin } from "antd";
import dayjs from "dayjs";
import LandingNavbar from "../LandingNavbar";
import LandingFooter from "../LandingFooter";
import { useDispatch, useSelector } from "react-redux";

const VisitationForPatient = () => {
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
      render: (text) => (
        <div className="bg-blue-900 p-4 w-12 h-12 rounded-[4px] flex justify-center font-medium">
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
      render: (text) => <p className="text-gray-700">{text}</p>,
    },
  ];

  return (
    <div>
      <div className="relative h-[300px]">
        <div
          className="absolute top-0 h-full w-full bg-no-repeat bg-contain"
          style={{ backgroundImage: `url(${HeroVisitation})` }}
        />
      </div>

      <div className="px-4 md:px-40">
        <h2 className="text-blue-900 font-semibold text-2xl mt-2 leading-normal text-center">
          Today's Visitation
        </h2>
        <p className="mb-10 mt-2 text-gray-700 text-center">
          Reservation of treatment and monitor the queue more easily
        </p>
        {getVisitationTodayStatus === "success" ? (
          <Table
            columns={columns}
            dataSource={visitationData}
            pagination={false}
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

export default VisitationForPatient;
