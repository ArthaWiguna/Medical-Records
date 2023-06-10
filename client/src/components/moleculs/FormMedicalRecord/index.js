import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createPatient,
  getNewPatient,
  getCreatePatientStatus,
  getCreatePatientSuccessMessage,
  getCreatePatientErrorMessage,
} from "../../../features/patientSlice";

// UI
import { Form, Input, Select, InputNumber, message } from "antd";
import { AiOutlineArrowLeft } from "react-icons/ai";
const { Option } = Select;

const FormMedicalRecord = ({
  current,
  next,
  prev,
  personalData,
  basicHealthData,
  setBasicHealthData,
}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // redux
  const newPatient = useSelector(getNewPatient);
  const createPatientStatus = useSelector(getCreatePatientStatus);
  const createPatientSuccessMessage = useSelector(
    getCreatePatientSuccessMessage
  );
  const createPatientErrorMessage = useSelector(getCreatePatientErrorMessage);
  // state
  const [submitted, setSubmitted] = useState(false);

  const onFinish = async (values) => {
    await dispatch(
      createPatient({
        name: personalData.name,
        birth_place: personalData.birth_place,
        birth_date: personalData.birth_date,
        gender: personalData.gender,
        address: personalData.address,
        profession: personalData.profession,
        identity_number: personalData.identity_number,
        category: personalData.category,
        insurance_number: personalData.insurance_number,
        phone: personalData.phone,
        allergy: basicHealthData.allergy,
        blood: basicHealthData.blood,
        height: basicHealthData.height,
        weight: basicHealthData.weight,
        medical_history: basicHealthData.medical_history,
      })
    );
    setSubmitted(true);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (basicHealthData) {
      form.setFieldsValue({
        allergy: basicHealthData.allergy ? basicHealthData.allergy : "",
        blood: basicHealthData.blood,
        height: basicHealthData.height ? basicHealthData.height : "",
        weight: basicHealthData.weight ? basicHealthData.weight : "",
        medical_history: basicHealthData.medical_history
          ? basicHealthData.medical_history
          : "",
      });
    }
  }, [form, basicHealthData]);

  useEffect(() => {
    if (createPatientStatus === "success" && submitted === true) {
      next();
      message.success(createPatientSuccessMessage);
    } else if (createPatientStatus === "rejected" && submitted === true) {
      message.error(createPatientErrorMessage);
    }
    setSubmitted(false);
  }, [
    createPatientStatus,
    submitted,
    createPatientSuccessMessage,
    createPatientErrorMessage,
    navigate,
    newPatient,
  ]);

  return (
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
          <Form.Item label="Allergy" name="allergy">
            <Input
              placeholder="Input allergy of the patient"
              onChange={(e) =>
                setBasicHealthData({
                  ...basicHealthData,
                  allergy: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Blood" name="blood">
            <Select
              placeholder="Select blood of the patient"
              onChange={(e) =>
                setBasicHealthData({ ...basicHealthData, blood: e })
              }
            >
              <Option value="A">A</Option>
              <Option value="B">B</Option>
              <Option value="O">O</Option>
              <Option value="AB">AB</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Height (Cm)"
            name="height"
            rules={[
              {
                pattern: new RegExp(/^[1-9]\d*$/),
                message: "Height must be greater than 0!",
              },
            ]}
          >
            <InputNumber
              placeholder="Input height of the patient"
              className="w-full"
              onChange={(e) =>
                setBasicHealthData({
                  ...basicHealthData,
                  height: e,
                })
              }
            />
          </Form.Item>
          <Form.Item
            label="Weight (Kg)"
            name="weight"
            rules={[
              {
                pattern: new RegExp(/^[1-9]\d*$/),
                message: "Weight must be greater than 0!",
              },
            ]}
          >
            <InputNumber
              placeholder="Input weight of the patient"
              className="w-full"
              onChange={(e) =>
                setBasicHealthData({
                  ...basicHealthData,
                  weight: e,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Congenital Disease" name="medical_history">
            <Input
              placeholder="Input congenital disease of the patient"
              onChange={(e) =>
                setBasicHealthData({
                  ...basicHealthData,
                  medical_history: e.target.value,
                })
              }
            />
          </Form.Item>
          <div className="col-span-2 flex gap-3 ml-auto">
            <Form.Item className="-mt-4">
              {current > 0 && (
                <button
                  className="bg-blue-300 group hover:text-blue-700 border-none cursor-pointer px-6 py-[10px] text-gray-700 text-sm mt-6 rounded"
                  onClick={() => prev()}
                >
                  <div className=" flex gap-2 group">
                    <AiOutlineArrowLeft className="flex self-center text-lg text-gray-700 group-hover:text-blue-700" />{" "}
                    Previous
                  </div>
                </button>
              )}
              {current === 2 && (
                <button className="bg-blue-700 hover:bg-blue-600 border-none cursor-pointer px-8 py-2 text-white text-sm mt-6 rounded ml-3">
                  Done
                </button>
              )}
              {current < 2 && (
                <button
                  type="submit"
                  className="bg-blue-700 hover:bg-blue-600 border-none cursor-pointer px-8 py-2 text-white text-sm mt-6 rounded ml-3"
                >
                  Save
                </button>
              )}
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default FormMedicalRecord;
