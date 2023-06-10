import React, { useEffect, useState } from "react";
import { getDetailPatient, getPatient } from "../../../features/patientSlice";
import {
  createMedicalRecord,
  createMedicalRecordStatus,
  createMedicalRecordErrorMessage,
  createMedicalRecordSuccessMessage,
} from "../../../features/medicalRecordSlice";
// UI
import { Form, Input, Select, message, InputNumber } from "antd";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const { Option } = Select;

const AddMedicalRecord = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  // Redux
  const patient = useSelector(getPatient);
  const status = useSelector(createMedicalRecordStatus);
  const successMessage = useSelector(createMedicalRecordSuccessMessage);
  const errorMessage = useSelector(createMedicalRecordErrorMessage);
  // State
  const [submitted, setSubmitted] = useState(false);

  const onFinish = async (values) => {
    await dispatch(
      createMedicalRecord({
        data: {
          allergy: values.allergy,
          blood: values.blood,
          height: values.height,
          weight: values.weight,
          medical_history: values.medical_history,
          id_patient: state.id,
        },
      })
    );
    setSubmitted(true);
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    dispatch(getDetailPatient(state.id));
  }, [dispatch, state.id]);

  useEffect(() => {
    if (patient) {
      form.setFieldsValue({
        name: patient.name,
      });
    }
  }, [form, patient]);

  useEffect(() => {
    if (status === "success" && submitted === true) {
      setTimeout(() => {
        navigate("/medical-record");
      }, 1000);
      message.success(successMessage);
    } else if (status === "rejected" && submitted === true) {
      message.error(errorMessage);
    }
    setSubmitted(false);
  }, [status, submitted, successMessage, errorMessage, navigate]);

  return (
    <div className="mt-10">
      <p className="home text-gray-500 text-sm font-normal">
        Home {">"} Medical Record {"> "}
        <span className="font-semibold text-blue-700">Add Medical Record</span>
      </p>
      <div className="mt-20">
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
            <Form.Item label="Allergy" name="allergy">
              <Input placeholder="Input allergy of the patient" />
            </Form.Item>
            <Form.Item label="Blood" name="blood">
              <Select placeholder="Select blood of the patient">
                <Option value="A">A</Option>
                <Option value="B">B</Option>
                <Option value="O">O</Option>
                <Option value="AB">AB</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Congenital Disease" name="medical_history">
              <Input placeholder="Input congenital disease of the patient" />
            </Form.Item>
            <Form.Item label="Height (Cm)" name="height">
              <InputNumber
                placeholder="Input height of the patient"
                min={1}
                defaultValue={0}
                className="w-full"
              />
            </Form.Item>
            <Form.Item label="Weight (Kg)" name="weight">
              <InputNumber
                placeholder="Input weight of the patient"
                min={1}
                defaultValue={0}
                className="w-full"
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

export default AddMedicalRecord;
