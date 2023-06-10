import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetailPatient,
  getPatient,
  updatePatient,
  getUpdatePatientStatus,
  getUpdatePatientSuccessMessage,
  getUpdatePatientErrorMessage,
} from "../../../features/patientSlice";
// UI
import { Form, Input, Select, DatePicker, message } from "antd";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

const { Option } = Select;

const UpdatePatient = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id } = useParams();

  // redux
  const oldData = useSelector(getPatient);
  const updatePatientStatus = useSelector(getUpdatePatientStatus);
  const updatePatientSuccessMessage = useSelector(
    getUpdatePatientSuccessMessage
  );
  const updatePatientErrorMessage = useSelector(getUpdatePatientErrorMessage);
  // state
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState([]);

  // function
  const onFinish = async (values) => {
    console.log("Success:", values.birth_date);
    await dispatch(
      updatePatient({
        id: id,
        data: {
          name: values.name,
          birth_place: values.birth_place,
          birth_date: values.birth_date,
          gender: values.gender,
          address: values.address,
          identity_number: values.identity_number,
          category: values.category,
          insurance_number: values.insurance_number,
          phone: values.phone,
          username: oldData.username,
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
    dispatch(getDetailPatient({ id: id, username: "" }));
  }, [dispatch, id]);

  useEffect(() => {
    if (oldData) {
      // opsi lain bisa pakai  state use navigate
      // if (data.length === 0 || data.id_patient !== oldData.id_patient) {
      //   setData(oldData);
      // }
      if (data.id_patient !== oldData.id_patient) {
        setData(oldData);
      }
      form.setFieldsValue({
        name: data.name ? data.name : "",
        address: data.address ? data.address : "",
        gender: data.gender ? data.gender : "",
        birth_place:
          data.birth_place &&
          data.birth_place !== "" &&
          data.birth_place !== undefined &&
          data.birth_place !== "undefined" &&
          data.birth_place !== null &&
          data.birth_place !== "null"
            ? data.birth_place
            : "",
        birth_date: data.birth_date ? dayjs(data.birth_date) : null,
        category: data.category,
        insurance_number: data.category === "Umum" ? "" : data.insurance_number,
        identity_number:
          data.identity_number &&
          data.identity_number !== "" &&
          data.identity_number !== undefined &&
          data.identity_number !== "undefined" &&
          data.identity_number !== null &&
          data.identity_number !== "null"
            ? data.identity_number
            : "",
        phone:
          data.phone &&
          data.phone !== "" &&
          data.phone !== undefined &&
          data.phone !== "undefined" &&
          data.phone !== null &&
          data.phone !== "null"
            ? data.phone
            : "",
        status: data.status ? data.status : "",
      });
    }
  }, [dispatch, oldData, data, form]);

  useEffect(() => {
    if (updatePatientStatus === "success" && submitted === true) {
      setTimeout(() => {
        navigate("/patient");
      }, 1000);
      message.success(updatePatientSuccessMessage);
    } else if (updatePatientStatus === "rejected" && submitted === true) {
      message.error(updatePatientErrorMessage);
    }
    setSubmitted(false);
  }, [
    updatePatientStatus,
    updatePatientErrorMessage,
    updatePatientSuccessMessage,
    submitted,
    navigate,
  ]);
  console.log(data, "ini data baru");
  return (
    <div className="mt-10">
      <p className="home text-gray-500 text-base font-normal">
        <span className="cursor-pointer" onClick={() => navigate("/")}>
          Home
        </span>{" "}
        {">"}{" "}
        <span className="cursor-pointer" onClick={() => navigate("/patient")}>
          Patient
        </span>{" "}
        {"> "}
        <span className="font-semibold text-blue-700">Update Patient</span>
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
                  message: "Please input name of the patient!",
                },
              ]}
            >
              <Input
                placeholder="Input name of the patient"
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input address of the patient!",
                },
              ]}
            >
              <Input
                placeholder="Input address of the patient"
                onChange={(e) => setData({ ...data, address: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Birth Place" name="birth_place">
              <Input
                placeholder="Input birth place of the patient"
                onChange={(e) =>
                  setData({ ...data, birth_place: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item
              label="Birth Date"
              name="birth_date"
              rules={[
                {
                  required: true,
                  message: "Please input birth date of the patient!",
                },
              ]}
            >
              <DatePicker
                onChange={(e) =>
                  setData({
                    ...data,
                    birth_date: dayjs(e.$d).format("YYYY-MM-DD"),
                  })
                }
                format="DD/MM/YYYY"
                className="w-full"
              />
            </Form.Item>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[
                {
                  required: true,
                  message: "Please input gender of the patient!",
                },
              ]}
            >
              <Select
                placeholder="Select gender of the patient"
                onChange={(e) => setData({ ...data, gender: e })}
              >
                <Option value="Laki-laki">Laki-laki</Option>
                <Option value="Perempuan">Perempuan</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Identity Number"
              name="identity_number"
              rules={[
                {
                  pattern: new RegExp(/^[0-9\b]+$/),
                  message: "Identity number must be a number!",
                },
              ]}
            >
              <Input
                placeholder="Input identity number of the patient"
                className="w-full"
                onChange={(e) =>
                  setData({ ...data, identity_number: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item
              label="Category"
              name="category"
              rules={[
                {
                  required: true,
                  message: "Please select category of the patient!",
                },
              ]}
            >
              <Select
                placeholder="Select category of the patient"
                onChange={(e) => setData({ ...data, category: e })}
              >
                <Option value="Umum">Umum</Option>
                <Option value="BPJS">BPJS</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Insurance Number"
              name="insurance_number"
              rules={[
                data.category === "Umum" ||
                (data.category === "" && oldData.category === "Umum")
                  ? {
                      required: false,
                    }
                  : {
                      required: true,
                      message: "Please insurance number of the patient!",
                    },

                {
                  pattern: new RegExp(/^[0-9\b]+$/),
                  message: "Insurance number must be a number!",
                },
              ]}
            >
              {data.category === "Umum" ||
              (data.category === "" && oldData.category === "Umum") ? (
                <Input
                  disabled
                  placeholder="Input insurance number disabled"
                  className="w-full"
                />
              ) : (
                <Input
                  placeholder="Input insurance number of the patient"
                  className="w-full"
                  onChange={(e) =>
                    setData({ ...data, insurance_number: e.target.value })
                  }
                />
              )}
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  pattern: new RegExp(/^[0-9\b]+$/),
                  message: "Phone number must be a number!",
                },
              ]}
            >
              <Input
                placeholder="Input phone number of the patient"
                className="w-full"
                onChange={(e) => setData({ ...data, phone: e.target.value })}
              />
            </Form.Item>
            <Form.Item
              label="Status"
              name="status"
              rules={[
                {
                  required: true,
                  message: "Please select status of the patient!",
                },
              ]}
            >
              <Select
                placeholder="Select status of the patient"
                onChange={(e) => setData({ ...data, status: e })}
              >
                <Option value="Active">Active</Option>
                <Option value="Nonactive">Nonactive</Option>
              </Select>
            </Form.Item>
            <div className="col-span-2 flex gap-3 ml-auto">
              <Form.Item className="-mt-4">
                <button
                  type="reset"
                  className="bg-blue-300 group hover:text-blue-700 border-none cursor-pointer px-6 py-[10px] text-gray-700 text-sm mt-6 rounded w-full"
                  onClick={() => navigate("/patient")}
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

export default UpdatePatient;
