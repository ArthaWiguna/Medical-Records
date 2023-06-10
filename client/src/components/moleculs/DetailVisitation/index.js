import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDetailVisitation,
  visitation,
} from "../../../features/visitationSlice";
// UI
import { Badge, Descriptions } from "antd";
import dayjs from "dayjs";
import { AiOutlineArrowLeft } from "react-icons/ai";

const DetailVisitation = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const visitationData = useSelector(visitation);
  console.log(visitationData);

  useEffect(() => {
    dispatch(getDetailVisitation(id));
  }, [dispatch, id]);

  return (
    <div className="mt-10">
      <p className="home text-gray-500 text-base font-normal">
        Home {">"} Visitation Today {"> "}
        <span className="font-semibold text-blue-700">Visitation Details</span>
      </p>
      <div className="py-9">
        <div className="mb-5">
          <h2 className="text-blue-900 font-semibold text-2xl leading-normal text-center">
            Visitation Details
          </h2>
        </div>
        <div className="mt-6">
          <Descriptions
            layout="horizontal"
            column={1}
            bordered
            labelStyle={{ color: "#0D1458", fontWeight: 600, width: "42%" }}
          >
            <Descriptions.Item label="Queue Number">
              <div className="bg-blue-700 flex justify-center rounded p-6 w-24 h-24">
                <h2 className="text-white font-medium self-center text-5xl">
                  {visitationData.queue ? visitationData.queue : "-"}
                </h2>
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="Name">
              {visitationData.Patient ? visitationData.Patient.name : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              {visitationData.Patient ? visitationData.Patient.address : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Visitation Date">
              {visitationData.createdAt
                ? dayjs(visitationData.createdAt).format("D MMMM YYYY")
                : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Category">
              {visitationData.Patient ? visitationData.Patient.category : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Insurrance Number">
              {visitationData.Patient && visitationData.Patient.insurance_number
                ? visitationData.Patient.insurance_number
                : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {visitationData.description ? visitationData.description : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Badge
                status={
                  visitationData.status &&
                  (visitationData.status === "Selesai" ||
                    visitationData.status === "Diperiksa")
                    ? "success"
                    : visitationData.status &&
                      visitationData.status === "Menunggu"
                    ? "processing"
                    : visitationData.status && visitationData.status === "Lewat"
                    ? "warning"
                    : "default"
                }
                text={visitationData.status ? visitationData.status : "-"}
              />
            </Descriptions.Item>
          </Descriptions>
          <button
            className="bg-blue-300 group hover:text-blue-700 border-none cursor-pointer px-6 py-[10px] text-gray-700 text-sm mt-6 rounded"
            onClick={() => navigate("/visitation")}
          >
            <div className=" flex gap-4 group">
              <AiOutlineArrowLeft className="flex self-center text-lg text-gray-700 group-hover:text-blue-700" />{" "}
              Back
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailVisitation;
