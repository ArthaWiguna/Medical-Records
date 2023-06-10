import React, { useEffect, useState } from "react";
import {
  getDetailVisitation,
  visitation,
  updateVisitation,
  updateVisitationStatus,
  updateVisitationSuccessMessage,
  updateVisitationErrorMessage,
} from "../../../features/visitationSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// UI
import { Form, Input, DatePicker, message, Select } from "antd";
import { AiOutlineArrowLeft } from "react-icons/ai";
import dayjs from "dayjs";

const { Option } = Select;

const UpdateVisitation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const { id } = useParams();

  //   Redux
  const oldData = useSelector(visitation);
  const updateStatus = useSelector(updateVisitationStatus);
  const updateErrorMessage = useSelector(updateVisitationErrorMessage);
  const updateSuccessMessage = useSelector(updateVisitationSuccessMessage);

  //   State
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState([]);

  const onFinish = async (values) => {
    console.log("Success:", values);
    await dispatch(
      updateVisitation({
        id: id,
        data: { status: values.status, description: values.description },
      })
    );
    setSubmitted(true);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    dispatch(getDetailVisitation(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (oldData) {
      // opsi lain bisa pakai  state use navigate
      if (data.id_visitation !== oldData.id_visitation) {
        setData(oldData);
      }
      form.setFieldsValue({
        name: data.Patient ? data.Patient.name : "",
        address: data.Patient ? data.Patient.address : "",
        visitation_date: data.createdAt ? dayjs(data.createdAt) : null,
        identity_number: data.Patient ? data.Patient.identity_number : "",
        category: data.Patient ? data.Patient.category : "",
        status: data.status ? data.status : "",
        description: data.description ? data.description : "",
      });
    }
  }, [dispatch, oldData, data, form]);

  useEffect(() => {
    if (updateStatus === "success" && submitted === true) {
      setTimeout(() => {
        navigate("/visitation");
      }, 1000);
      message.success(updateSuccessMessage);
    } else if (updateStatus === "rejected" && submitted === true) {
      message.error(updateErrorMessage);
    }
    setSubmitted(false);
  }, [
    updateStatus,
    updateErrorMessage,
    updateSuccessMessage,
    submitted,
    navigate,
  ]);

  console.log(data);
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
        <span className="font-semibold text-blue-700">Update Visitation</span>
      </p>
      <div className="mt-10">
        <div className="bg-blue-700 flex justify-center rounded p-6 w-24 h-24 mb-5">
          <h2 className="text-white font-medium self-center text-5xl">
            {data.queue ? data.queue : ""}
          </h2>
        </div>
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
              label="Status"
              name="status"
              rules={[
                {
                  required: true,
                  message: "Please select status of the visitation!",
                },
              ]}
            >
              <Select
                placeholder="Select status of the visitation"
                onChange={(e) => setData({ ...data, status: e })}
              >
                <Option value="Menunggu">Menunggu</Option>
                <Option value="Diperiksa">Diperiksa</Option>
                <Option value="Selesai">Selesai</Option>
                <Option value="Lewat">Lewat</Option>
              </Select>
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
              <TextArea
                rows={4}
                placeholder="Input description..."
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
              />
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
                  Update
                </button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UpdateVisitation;
