import React, { useEffect, useState } from "react";
import { Form, Input, Select, message } from "antd";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import {
  createUser,
  getCreateUserStatus,
  getCreateUserSuccessMessage,
  getCreateUserErrorMessage,
} from "../../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

const { Option } = Select;

const AddUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createUserStatus = useSelector(getCreateUserStatus);
  const createUserSuccessMessage = useSelector(getCreateUserSuccessMessage);
  const createUserErrorMessage = useSelector(getCreateUserErrorMessage);

  const [submitted, setSubmitted] = useState(false);

  const onFinish = async (values) => {
    await dispatch(createUser(values));
    setSubmitted(true);
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (createUserStatus === "success" && submitted === true) {
      setTimeout(() => {
        navigate("/user");
      }, 1000);
      message.success(createUserSuccessMessage);
    } else if (createUserStatus === "rejected" && submitted === true) {
      message.error(createUserErrorMessage);
    }
    setSubmitted(false);
  }, [
    createUserStatus,
    submitted,
    createUserSuccessMessage,
    createUserErrorMessage,
    navigate,
  ]);
  return (
    <div className="mt-10 hehe">
      <p className="home text-gray-500 text-base font-normal">
        <span className="cursor-pointer" onClick={() => navigate("/")}>
          Home
        </span>{" "}
        {">"}{" "}
        <span className="cursor-pointer" onClick={() => navigate("/user")}>
          User
        </span>{" "}
        {"> "}
        <span className="font-semibold text-blue-700">Add New user</span>
      </p>
      <div className="mt-10">
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          size="large"
          spellCheck="false"
        >
          <div className="grid grid-cols-2 gap-x-10">
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  pattern: new RegExp(/^[a-zA-Z ]*$/),
                  message: "Name must be a letter!",
                },
                {
                  required: true,
                  message: "Please input name of the user!",
                },
              ]}
            >
              <Input placeholder="Input name of the user" />
            </Form.Item>
            <Form.Item
              label="Level"
              name="level"
              rules={[
                {
                  required: true,
                  message: "Please select level of the user!",
                },
              ]}
            >
              <Select placeholder="Select level of the user">
                <Option value="Admin">Admin</Option>
                <Option value="Dokter">Dokter</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  pattern: new RegExp(/^\S*$/),
                  message: "Username cannot contain spaces!",
                },
                {
                  required: true,
                  message: "Please input usename of the user!",
                },
              ]}
            >
              <Input
                placeholder="Input username of the user"
                autoComplete="new-password"
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input password of the user!",
                },
                {
                  min: 8,
                  message: "Password must be between 8 - 12 characters",
                },
                {
                  max: 12,
                  message: "Password must be between 8 - 12 characters",
                },
                {
                  pattern: new RegExp(/^\S*$/),
                  message: "Password cannot contain spaces!",
                },
              ]}
            >
              <Input.Password
                placeholder="Input password of the user"
                autoComplete="new-password"
              />
            </Form.Item>
            <div className="col-span-2 flex gap-3 ml-auto">
              <Form.Item className="-mt-4">
                <button
                  type="reset"
                  className="bg-blue-300 group hover:text-blue-700 border-none cursor-pointer px-6 py-[10px] text-gray-700 text-sm mt-6 rounded w-full"
                  onClick={() => navigate("/user")}
                >
                  <div className=" flex gap-2 group">
                    <AiOutlineArrowLeft className="flex self-center text-lg text-gray-700 group-hover:text-blue-700" />{" "}
                    Back
                  </div>
                </button>
              </Form.Item>

              <Form.Item className="-mt-4">
                <button
                  type="submit"
                  className="bg-blue-700 hover:bg-blue-600 border-none cursor-pointer px-8 py-2 text-white text-sm mt-6 rounded w-full"
                >
                  Save
                </button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddUser;
