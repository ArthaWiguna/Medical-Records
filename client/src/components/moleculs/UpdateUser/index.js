import React, { useEffect, useState } from "react";
import { Form, Input, Select, message } from "antd";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDetailUser,
  detailUser,
  updateUser,
  getUpdateUserStatus,
  getUpdateUserErrorMessage,
  getUpdateUserSuccessMessage,
} from "../../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

const { Option } = Select;

const UpdateUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id } = useParams();

  // redux
  const oldData = useSelector(detailUser);
  const updateUserStatus = useSelector(getUpdateUserStatus);
  const updateUserErrorMessage = useSelector(getUpdateUserErrorMessage);
  const updateUserSuccessMessage = useSelector(getUpdateUserSuccessMessage);
  // state
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState([]);

  // function
  const onFinish = async (values) => {
    console.log("Success:", values);
    await dispatch(
      updateUser({
        id: id,
        data: {
          name: values.name,
          level: values.level,
          status: values.status,
        },
      })
    );
    setSubmitted(true);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    dispatch(getDetailUser({ id: id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (oldData) {
      if (data.id_user !== oldData.id_user) {
        setData(oldData);
      }
      form.setFieldsValue({
        name: data.name ? data.name : "",
        level: data.level ? data.level : "",
        status: data.status ? data.status : "",
      });
    }
  }, [dispatch, oldData, data, form]);

  useEffect(() => {
    if (updateUserStatus === "success" && submitted === true) {
      setTimeout(() => {
        navigate("/user");
      }, 1000);
      message.success(updateUserSuccessMessage);
    } else if (updateUserStatus === "rejected" && submitted === true) {
      message.error(updateUserErrorMessage);
    }
    setSubmitted(false);
  }, [
    updateUserStatus,
    updateUserErrorMessage,
    updateUserSuccessMessage,
    submitted,
    navigate,
  ]);

  return (
    <div className="mt-10">
      <p className="home text-gray-500 text-base font-normal">
        <span className="cursor-pointer" onClick={() => navigate("/")}>
          Home
        </span>{" "}
        {">"}{" "}
        <span className="cursor-pointer" onClick={() => navigate("/user")}>
          User
        </span>{" "}
        {"> "}
        <span className="font-semibold text-blue-700">Update User</span>
      </p>
      <div className="mt-10">
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          form={form}
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
                <Option value="Nonactive">Nonactive</Option>
              </Select>
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

export default UpdateUser;
