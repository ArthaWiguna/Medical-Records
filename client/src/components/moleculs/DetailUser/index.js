import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailUser, detailUser } from "../../../features/userSlice";
// UI
import { Badge, Descriptions } from "antd";
import dayjs from "dayjs";
import { AiOutlineArrowLeft } from "react-icons/ai";

const DetailUser = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const user = useSelector(detailUser);
  console.log(user);

  useEffect(() => {
    dispatch(getDetailUser({ id: id }));
  }, [dispatch, id]);

  return (
    <div className="mt-10">
      <p className="home text-gray-500 text-sm font-normal">
        Home {">"} User {"> "}
        <span className="font-semibold text-blue-700">User Details</span>
      </p>
      <div className="py-9">
        <div className="mb-5">
          <h2 className="text-blue-900 font-semibold text-2xl leading-normal text-center">
            User Details
          </h2>
        </div>

        <div className="mt-6">
          <Descriptions
            layout="horizontal"
            column={1}
            bordered
            labelStyle={{ color: "#0D1458", fontWeight: 600, width: "42%" }}
          >
            <Descriptions.Item label="Name">
              {user.name ? user.name : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Username">
              {user.username ? user.username : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Level">
              {user.level ? user.level : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Joined Since">
              {user.createdAt
                ? dayjs(user.createdAt).format("D MMMM YYYY")
                : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Badge
                status={
                  user.status && user.status === "Active"
                    ? "processing"
                    : "default"
                }
                text={user.status ? user.status : "-"}
              />
            </Descriptions.Item>
          </Descriptions>
          <button
            className="bg-blue-300 group hover:text-blue-700 border-none cursor-pointer px-6 py-[10px] text-gray-700 text-sm mt-6 rounded"
            onClick={() => navigate("/user")}
          >
            <div className=" flex gap-2 group">
              <AiOutlineArrowLeft className="flex self-center text-lg text-gray-700 group-hover:text-blue-700" />{" "}
              Back
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailUser;
