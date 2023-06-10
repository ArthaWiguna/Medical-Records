import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailMedicine, medicine } from "../../../features/medicineSlice";
// UI
import { Badge, Descriptions } from "antd";
import dayjs from "dayjs";
import { IconTotalMedicine } from "../../../assets";
import { AiOutlineArrowLeft } from "react-icons/ai";

const DetailMedicine = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  //redux
  const medicineData = useSelector(medicine);
  console.log(medicineData);

  useEffect(() => {
    dispatch(getDetailMedicine(id));
  }, [dispatch, id]);

  return (
    <div className="mt-10">
      <p className="home text-gray-500 text-base font-normal">
        <span className="cursor-pointer" onClick={() => navigate("/")}>
          Home
        </span>{" "}
        {">"}{" "}
        <span className="cursor-pointer" onClick={() => navigate("/medicine")}>
          Medicine
        </span>{" "}
        {"> "}
        <span className="font-semibold text-blue-700">Medicine Details</span>
      </p>
      <div className="py-9">
        <h2 className="text-blue-900 font-semibold text-2xl leading-normal text-center">
          Medicine Details
        </h2>
        <div className="mt-6">
          <Descriptions
            layout="horizontal"
            column={1}
            bordered
            labelStyle={{ color: "#0D1458", fontWeight: 600, width: "42%" }}
          >
            <Descriptions.Item label="Name">
              {medicineData.name ? medicineData.name : ""}
            </Descriptions.Item>
            <Descriptions.Item label="Image">
              {medicineData.image ? (
                <img
                  src={`http://localhost:3001/${medicineData.image}`}
                  alt="Medicine Thumbnail"
                  className="h-36 w-h-36 object-cover"
                />
              ) : (
                <img
                  src={IconTotalMedicine}
                  alt="Medicine Thumbnail"
                  className="h-24 w-24 object-cover"
                />
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Unit">
              {medicineData.unit ? medicineData.unit : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Class">
              {medicineData.class ? medicineData.class : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Age Category">
              {medicineData.age_category ? medicineData.age_category : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Composition">
              {medicineData.composition ? medicineData.composition : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="General Indication">
              {medicineData.general_indication
                ? medicineData.general_indication
                : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Contra Indication">
              {medicineData.contra_indication
                ? medicineData.contra_indication
                : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Side Effect">
              {medicineData.side_effect &&
              medicineData.side_effect !== "" &&
              medicineData.side_effect !== undefined &&
              medicineData.side_effect !== "undefined" &&
              medicineData.side_effect !== null &&
              medicineData.side_effect !== "null"
                ? medicineData.side_effect
                : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Usage">
              {medicineData.usage ? medicineData.usage : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Expired Date">
              {medicineData.expired
                ? dayjs(medicineData.expired).format("D MMMM YYYY")
                : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Stock">
              {medicineData.stock ? medicineData.stock : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {medicineData.description &&
              medicineData.description !== "" &&
              medicineData.description !== undefined &&
              medicineData.description !== "undefined" &&
              medicineData.description !== null &&
              medicineData.description !== "null"
                ? medicineData.description
                : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Badge
                status={
                  medicineData.status && medicineData.status === "Available"
                    ? "processing"
                    : "default"
                }
                text={medicineData.status ? medicineData.status : "-"}
              />
            </Descriptions.Item>
          </Descriptions>
          <button
            className="bg-blue-300 group hover:text-blue-700 border-none cursor-pointer px-6 py-[10px] text-gray-700 text-sm mt-6 rounded"
            onClick={() => navigate("/medicine")}
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

export default DetailMedicine;
