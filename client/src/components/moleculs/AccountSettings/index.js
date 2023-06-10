import React, { useEffect, useState } from "react";
import { Form, Input, Select, message, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import {
  getDetailUser,
  detailUser,
  accountSetting,
  getAccountSettingStatus,
  getAccountSettingErrorMessage,
  getAccountSettingSuccessMessage,
} from "../../../features/userSlice";

import { useDispatch, useSelector } from "react-redux";
import TabPane from "antd/es/tabs/TabPane";
import { Helmet } from "react-helmet";

const { Option } = Select;

const AccountSetting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const auth =
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : "";

  // redux
  const oldData = useSelector(detailUser);
  const accountSettingStatus = useSelector(getAccountSettingStatus);
  const accountSettingSuccessMessage = useSelector(
    getAccountSettingSuccessMessage
  );
  const accountSettingErrorMessage = useSelector(getAccountSettingErrorMessage);
  console.log(oldData);
  // state
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState([]);
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  console.log(image);

  // function
  const onFinishProfile = async (values) => {
    console.log("Success:", values);
    const data = new FormData();
    data.append("name", values.name);
    data.append("level", values.level);
    data.append("username", values.username);
    data.append("status", values.status);
    data.append("image", image);

    await dispatch(
      accountSetting({
        id: auth.id_user,
        data: data,
      })
    );
    setSubmitted(true);
  };
  const onFinishFailedProfile = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinishPassword = async (values) => {
    console.log("Success:", values);
    await dispatch(
      accountSetting({
        id: auth.id_user,
        data: {
          name: auth.name,
          level: auth.level,
          username: auth.username,
          old_password: values.old_password,
          new_password: values.new_password,
        },
      })
    );
    setSubmitted(true);
  };
  const onFinishFailedPassword = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onImageUpload = (e) => {
    setImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    dispatch(getDetailUser({ id: auth.id_user }));
  }, [dispatch, auth.id_user]);

  useEffect(() => {
    if (oldData) {
      if (data.id_user !== oldData.id_user) {
        setData(oldData);
      }
      form.setFieldsValue({
        name: data.name ? data.name : "",
        level: data.level ? data.level : "",
        username: data.username ? data.username : "",
        status: data.status ? data.status : "",
      });
    }
  }, [dispatch, oldData, data, form]);

  useEffect(() => {
    if (accountSettingStatus === "success" && submitted === true) {
      message.success(accountSettingSuccessMessage);
    } else if (accountSettingStatus === "rejected" && submitted === true) {
      message.error(accountSettingErrorMessage);
    }
    setSubmitted(false);
  }, [
    accountSettingStatus,
    accountSettingErrorMessage,
    accountSettingSuccessMessage,
    submitted,
    navigate,
  ]);

  return (
    <div className="mt-10">
      <Helmet>
        <title>Account Setting | Ardita Medical</title>
      </Helmet>
      <p className="home text-gray-500 text-base font-normal">
        <span className="cursor-pointer" onClick={() => navigate("/")}>
          Home
        </span>{" "}
        {">"}{" "}
        <span className="font-semibold text-blue-700">Account Settings</span>
      </p>
      <div className="mt-10">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Update Profile" key="1">
            <Form
              name="profile"
              initialValues={{
                remember: true,
              }}
              form={form}
              onFinish={onFinishProfile}
              onFinishFailed={onFinishFailedProfile}
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
                  <Input placeholder="Input username of the user" />
                </Form.Item>
                <div className="flex">
                  <Form.Item label="Image ( png / jpg / jpeg )" name="image">
                    <label className="block">
                      <input
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-blue-700
      hover:file:bg-violet-100
    "
                        onChange={(e) => onImageUpload(e)}
                      />
                    </label>
                  </Form.Item>
                  {imagePreview || data.image ? (
                    <img
                      src={
                        imagePreview
                          ? imagePreview
                          : `http://localhost:3001/${data.image}`
                      }
                      alt="Medicine Thumbnail"
                      className="h-24 w-24 object-cover"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <Form.Item
                  label="Status"
                  name="status"
                  rules={[
                    {
                      required: true,
                      message: "Please select status of the user!",
                    },
                  ]}
                >
                  <Select placeholder="Select status of the user">
                    <Option value="Active">Active</Option>
                    <Option value="NonActive">NonActive</Option>
                  </Select>
                </Form.Item>
                <div className="col-span-2 flex gap-3 ml-auto">
                  <Form.Item className="-mt-4">
                    <button
                      type="submit"
                      className="bg-blue-700 hover:bg-blue-600 border-none cursor-pointer px-8 py-2 text-white text-sm mt-6 rounded w-full"
                    >
                      Update
                    </button>
                  </Form.Item>
                </div>
              </div>
            </Form>
          </TabPane>
          <TabPane tab="Update Password" key="2">
            <Form
              name="password"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinishPassword}
              onFinishFailed={onFinishFailedPassword}
              autoComplete="off"
              layout="vertical"
              size="large"
              spellCheck="false"
            >
              <div className="grid grid-cols-2 gap-x-10">
                <Form.Item
                  label="Old Password"
                  name="old_password"
                  rules={[
                    {
                      required: true,
                      message: "Please input old password!",
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
                  <Input.Password placeholder="Input password of the user" />
                </Form.Item>
                <Form.Item
                  label="New Password"
                  name="new_password"
                  rules={[
                    {
                      required: true,
                      message: "Please input new password!",
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
                  <Input.Password placeholder="Input password of the user" />
                </Form.Item>
                <div className="col-span-2 flex gap-3 ml-auto">
                  <Form.Item className="-mt-4">
                    <button
                      type="submit"
                      className="bg-blue-700 hover:bg-blue-600 border-none cursor-pointer px-8 py-2 text-white text-sm mt-6 rounded w-full"
                    >
                      Update
                    </button>
                  </Form.Item>
                </div>
              </div>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default AccountSetting;
