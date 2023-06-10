import React, { useEffect, useState } from "react";
import { getDetailPatient, getPatient } from "../../../features/patientSlice";
import {
  getVisitation,
  createVisitation,
  createVisitationStatus,
  createVisitationSuccessMessage,
  createVisitationErrorMessage,
} from "../../../features/visitationSlice";
// UI
import { Form, Input, DatePicker, message, Select } from "antd";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

const AddVisitation = () => {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  // Redux
  const patient = useSelector(getPatient);
  const status = useSelector(createVisitationStatus);
  console.log(status, "create visitation status");
  const successMessage = useSelector(createVisitationSuccessMessage);
  const errorMessage = useSelector(createVisitationErrorMessage);

  // State
  const [submitted, setSubmitted] = useState(false);

  const onFinish = async (values) => {
    await dispatch(
      createVisitation({
        data: { description: values.description, id_patient: state.id },
      })
    );
    setSubmitted(true);
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    dispatch(getDetailPatient({ id: state.id, username: "" }));
  }, [dispatch, state.id]);

  useEffect(() => {
    if (patient) {
      form.setFieldsValue({
        name: patient.name,
        address: patient.address,
        identity_number: patient.identity_number ? patient.identity_number : "",
        category: patient.category ? patient.category : "",
        visitation_date: dayjs(),
      });
    }
  }, [form, patient]);

  useEffect(() => {
    if (status === "success" && submitted === true) {
      setTimeout(() => {
        navigate("/visitation");
      }, 1000);
      message.success(successMessage);
    } else if (status === "rejected" && submitted === true) {
      message.error(errorMessage);
    }
    setSubmitted(false);
  }, [status, submitted, successMessage, errorMessage, navigate]);

  return (
    <div className="mt-10">
      <p className="home text-gray-500 text-base font-normal">
        <span className="cursor-pointer" onClick={() => navigate("/")}>
          Home
        </span>{" "}
        {">"}{" "}
        <span
          className="cursor-pointer"
          onClick={() => navigate("/visitation")}
        >
          Visitation Today
        </span>{" "}
        {">"}{" "}
        <span className="font-semibold text-blue-700">Add New Visitation</span>
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
            <Form.Item label="Name" name="name">
              <Input placeholder="Input name of the patient" disabled />
            </Form.Item>
            <Form.Item label="Address" name="address">
              <Input placeholder="Input address of the patient" disabled />
            </Form.Item>
            <Form.Item label="Visitation Date" name="visitation_date">
              <DatePicker className="w-full" disabled format="DD/MM/YYYY" />
            </Form.Item>
            <Form.Item label="Category" name="category">
              <Select
                placeholder="Select category of the patient"
                disabled
              ></Select>
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input description of the visitation!",
                },
              ]}
            >
              <TextArea rows={4} placeholder="Input description..." />
            </Form.Item>

            <div className="col-span-2 flex gap-3 ml-auto">
              <Form.Item className="-mt-4">
                <button
                  type="reset"
                  className="bg-blue-300 group hover:text-blue-700 border-none cursor-pointer px-6 py-[10px] text-gray-700 text-sm mt-6 rounded w-full"
                  onClick={() => navigate("/visitation")}
                >
                  <div className=" flex gap-4 group">
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

export default AddVisitation;
