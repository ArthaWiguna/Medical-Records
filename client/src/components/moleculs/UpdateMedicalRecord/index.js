import React, { useEffect, useState } from "react";
import {
  getDetailMedicalRecord,
  medicalRecord,
  updateMedicalRecord,
  updateMedicalRecordStatus,
  updateMedicalRecordSuccessMessage,
  updateMedicalRecordErrorMessage,
} from "../../../features/medicalRecordSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// UI
import { Form, Input, Select, message, InputNumber } from "antd";
import { AiOutlineArrowLeft } from "react-icons/ai";
const { Option } = Select;

const UpdateMedicalRecord = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id } = useParams();

  //   Redux
  const oldData = useSelector(medicalRecord);
  const updateStatus = useSelector(updateMedicalRecordStatus);
  const updateErrorMessage = useSelector(updateMedicalRecordErrorMessage);
  const updateSuccessMessage = useSelector(updateMedicalRecordSuccessMessage);

  //   State
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState([]);

  const onFinish = async (values) => {
    console.log("Success:", values);
    await dispatch(
      updateMedicalRecord({
        id: id,
        data: {
          allergy: values.allergy,
          blood: values.blood,
          medical_history: values.medical_history,
          height: values.height,
          weight: values.weight,
        },
      })
    );
    setSubmitted(true);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    dispatch(getDetailMedicalRecord(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (oldData) {
      // opsi lain bisa pakai  state use navigate
      if (data.id_medical_record !== oldData.id_medical_record) {
        setData(oldData);
      }
      form.setFieldsValue({
        name: data.Patient ? data.Patient.name : "",
        allergy:
          data.allergy &&
          data.allergy !== "" &&
          data.allergy !== undefined &&
          data.allergy !== "undefined" &&
          data.allergy !== null &&
          data.allergy !== "null"
            ? data.allergy
            : "",
        blood: data.blood,
        medical_history:
          data.medical_history &&
          data.medical_history !== "" &&
          data.medical_history !== undefined &&
          data.medical_history !== "undefined" &&
          data.medical_history !== null &&
          data.medical_history !== "null"
            ? data.medical_history
            : "",
        height: data.height ? data.height : "",
        weight: data.weight ? data.weight : "",
      });
    }
  }, [dispatch, oldData, data, form]);

  useEffect(() => {
    if (updateStatus === "success" && submitted === true) {
      setTimeout(() => {
        navigate("/medical-record");
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

  return (
    <div className="mt-10">
      <p className="home text-gray-500 text-base font-normal">
        <span className="cursor-pointer" onClick={() => navigate("/")}>
          Home
        </span>{" "}
        {">"}{" "}
        <span
          className="cursor-pointer"
          onClick={() => navigate("/medical-record")}
        >
          Medical Record
        </span>{" "}
        {">"}{" "}
        <span className="font-semibold text-blue-700">
          Update Medical Record
        </span>
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
            <Form.Item label="Allergy" name="allergy">
              <Input
                placeholder="Input allergy of the patient"
                onChange={(e) => setData({ ...data, allergy: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Blood" name="blood">
              <Select
                placeholder="Select blood of the patient"
                onChange={(e) => setData({ ...data, blood: e })}
              >
                <Option value="A">A</Option>
                <Option value="B">B</Option>
                <Option value="O">O</Option>
                <Option value="AB">AB</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Congenital Disease" name="medical_history">
              <Input
                placeholder="Input congenital disease of the patient"
                onChange={(e) =>
                  setData({ ...data, medical_history: e.target.value })
                }
              />
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
                onChange={(e) => setData({ ...data, height: e.target.value })}
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
                onChange={(e) => setData({ ...data, weight: e.target.value })}
              />
            </Form.Item>

            <div className="col-span-2 flex gap-3 ml-auto">
              <Form.Item className="-mt-4">
                <button
                  type="reset"
                  className="bg-blue-300 group hover:text-blue-700 border-none cursor-pointer px-6 py-[10px] text-gray-700 text-sm mt-6 rounded w-full"
                  onClick={() => navigate("/medical-record")}
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

export default UpdateMedicalRecord;
