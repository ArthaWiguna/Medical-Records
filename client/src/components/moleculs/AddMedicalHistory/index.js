import React, { useEffect, useState } from "react";
import { getAllMedicine, medicines } from "../../../features/medicineSlice";
import {
  getDetailMedicalRecord,
  medicalRecord,
} from "../../../features/medicalRecordSlice";
import {
  createMedicalHistory,
  createMedicalHistoryStatus,
  createMedicalHistorySuccessMessage,
  createMedicalHistoryErrorMessage,
} from "../../../features/medicalHistorySlice";
// UI
import {
  Form,
  Input,
  Select,
  message,
  Space,
  InputNumber,
  DatePicker,
  Checkbox,
} from "antd";
import { AiOutlineArrowLeft, AiOutlineMinusCircle } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
const { Option } = Select;

const AddMedicalHistory = () => {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  // Redux
  const medicinesData = useSelector(medicines);
  const medicalRecordData = useSelector(medicalRecord);
  const status = useSelector(createMedicalHistoryStatus);
  const errorMessage = useSelector(createMedicalHistoryErrorMessage);
  const successMessage = useSelector(createMedicalHistorySuccessMessage);

  // State
  const [submitted, setSubmitted] = useState(false);
  const [failedMedicine, setFailedMedicine] = useState([]);
  const [isPrescriptionRequired, setIsPrescriptionRequired] = useState(false);

  // precription toggle
  const handlePrescriptionToggle = (checked) => {
    setIsPrescriptionRequired(checked);
  };
  // validate the stock
  const onInputMedicine = ({ id_medicine, quantity, key }) => {
    let medicine = medicinesData.find((i) => {
      return i.id_medicine === id_medicine;
    });
    if (medicine.stock < quantity) {
      setFailedMedicine((failedMedicine) => [
        ...failedMedicine,
        { key: key, failed: true },
      ]);
      form.validateFields();
    } else {
      setFailedMedicine((failedMedicine) =>
        failedMedicine.filter((item) => item.key !== key)
      );
      form.validateFields();
    }
  };

  const onFinish = async (values) => {
    console.log("Success:", values);
    if (values.prescription_end_date) {
      await dispatch(
        createMedicalHistory({
          id_medical_record: state.id,
          complaint: values.complaint,
          tension: values.tension,
          body_temperature: values.body_temperature,
          diagnosis: values.diagnosis,
          treatment: values.treatment,
          description: values.description,
          medicineIntake: values.medicineIntake,
          prescription: [
            {
              prescription_start_date: dayjs().format("YYYY-MM-DD"),
              prescription_end_date: dayjs(
                values.prescription_end_date.$d
              ).format("YYYY-MM-DD"),
              prescription_note: values.prescription_note,
              prescription_medicineIntake: values.prescription_medicineIntake,
            },
          ],
        })
      );
    } else {
      await dispatch(
        createMedicalHistory({
          id_medical_record: state.id,
          complaint: values.complaint,
          tension: values.tension,
          body_temperature: values.body_temperature,
          diagnosis: values.diagnosis,
          treatment: values.treatment,
          description: values.description,
          medicineIntake: values.medicineIntake,
        })
      );
    }
    setSubmitted(true);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    dispatch(getDetailMedicalRecord(state.id));
    dispatch(
      getAllMedicine({
        params: "",
        status: "Available",
      })
    );
  }, [dispatch, state.id]);

  useEffect(() => {
    if (medicalRecordData) {
      form.setFieldsValue({
        name: medicalRecordData.Patient ? medicalRecordData.Patient.name : "",
      });
    }
  }, [form, medicalRecordData]);

  useEffect(() => {
    if (status === "success" && submitted === true) {
      setTimeout(() => {
        navigate(`/medical-record/detail/${state.id}`);
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
          onClick={() => navigate("/medical-record")}
        >
          Medical Record
        </span>{" "}
        {">"}{" "}
        <span
          className="cursor-pointer"
          onClick={() => navigate(`/medical-record/detail/${state.id}`)}
        >
          Medical Record Details
        </span>{" "}
        {">"}{" "}
        <span className="font-semibold text-blue-700">Add New History</span>
      </p>
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-blue-900 mb-6">
          Add Patient Treatment History
        </h2>
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
            <Form.Item
              label="Complaint"
              name="complaint"
              rules={[
                {
                  required: true,
                  message: "Please input complaint of the patient",
                },
              ]}
            >
              <Input placeholder="Input complaint of the patient" />
            </Form.Item>
            <Form.Item label="Tension (mm/hg)" name="tension">
              <Input placeholder="Input tension of the patient" />
            </Form.Item>
            <Form.Item label="Body Temperature (c)" name="body_temperature">
              <InputNumber
                min={0}
                max={100}
                step={0.1}
                precision={1}
                className="w-full"
                placeholder="Input body temperature of patient"
              />
            </Form.Item>
            <Form.Item
              label="Diagnosis"
              name="diagnosis"
              rules={[
                {
                  required: true,
                  message: "Please input diagnosis of the patient",
                },
              ]}
            >
              <Input placeholder="Input diagnosis of the patient" />
            </Form.Item>
            <Form.Item
              label="Treatment"
              name="treatment"
              rules={[
                {
                  required: true,
                  message: "Please input treatment of the patient",
                },
              ]}
            >
              <Input placeholder="Input treatment of the patient" />
            </Form.Item>
            <div className="col-span-2">
              <p className="mt-2">Medicine</p>
              <Form.List name="medicineIntake">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{
                          display: "flex",
                          alignItems: "start",
                          marginTop: 22,
                        }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "id_medicine"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing medicine name",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Select medicne for patient"
                            style={{ width: 550 }}
                            onChange={() =>
                              onInputMedicine({
                                id_medicine: form.getFieldValue([
                                  "medicineIntake",
                                  name,
                                  "id_medicine",
                                ]),
                                quantity: form.getFieldValue([
                                  "medicineIntake",
                                  name,
                                  "quantity",
                                ]),
                                key: key,
                              })
                            }
                          >
                            {medicinesData &&
                              medicinesData.map((item) => (
                                <Option
                                  value={item.id_medicine}
                                  disabled={form
                                    .getFieldValue("medicineIntake")
                                    .some(
                                      (medicine) =>
                                        medicine &&
                                        medicine.id_medicine &&
                                        medicine.id_medicine ===
                                          item.id_medicine
                                    )}
                                >
                                  {`${item.name} (${item.unit})`}{" "}
                                  {` - Stock : ${item.stock}`}
                                </Option>
                              ))}
                          </Select>
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, "quantity"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing quantity",
                            },
                            {
                              validator: (rule, value) => {
                                let error = failedMedicine.find(
                                  (x) => x.key === key && x.failed === true
                                );
                                if (error) {
                                  return Promise.reject(
                                    "Quantity over the stock"
                                  );
                                } else {
                                  return Promise.resolve();
                                }
                              },
                            },
                          ]}
                        >
                          <InputNumber
                            placeholder="Quantity"
                            style={{ width: 270 }}
                            onChange={(e) =>
                              onInputMedicine({
                                id_medicine: form.getFieldValue([
                                  "medicineIntake",
                                  name,
                                  "id_medicine",
                                ]),
                                quantity: e,
                                key: key,
                              })
                            }
                            disabled={
                              form.getFieldValue([
                                "medicineIntake",
                                name,
                                "id_medicine",
                              ]) === undefined ||
                              null ||
                              ""
                                ? true
                                : false
                            }
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "dose"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing dose",
                            },
                          ]}
                        >
                          <Input
                            placeholder="Dose"
                            style={{ width: 280 }}
                            disabled={
                              form.getFieldValue([
                                "medicineIntake",
                                name,
                                "id_medicine",
                              ]) === undefined ||
                              null ||
                              ""
                                ? true
                                : false
                            }
                          />
                        </Form.Item>
                        <AiOutlineMinusCircle
                          onClick={() => remove(name)}
                          style={{ cursor: "pointer", marginTop: "70%" }}
                        />
                      </Space>
                    ))}

                    <Form.Item>
                      <button
                        type="button"
                        className="cursor-pointer px-8 py-2 text-sm mt-4 rounded-md border border-dashed border-gray-400 w-full"
                        onClick={() => add()}
                      >
                        + Add Medicine
                      </button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>
            <Form.Item
              label="Description"
              name="description"
              className="col-span-2"
            >
              <TextArea rows={4} placeholder="Input description..." />
            </Form.Item>
          </div>
          <div className="flex justify-start mt-4">
            <Checkbox
              onChange={(e) => handlePrescriptionToggle(e.target.checked)}
              className="checkbox-prescription"
            >
              Prescription
            </Checkbox>
          </div>
          {isPrescriptionRequired && (
            <div>
              <h2 className="text-lg font-semibold text-blue-900 mb-6 mt-10">
                Add Patient Prescription History
              </h2>
              <div className="grid grid-cols-2 gap-x-10">
                <Form.Item label="Start Date" name="prescription_start_date">
                  <DatePicker
                    format="DD/MM/YYYY"
                    disabled
                    defaultValue={dayjs()}
                    className="w-full"
                  />
                </Form.Item>
                <Form.Item
                  label="End Date"
                  name="prescription_end_date"
                  rules={[
                    {
                      required: true,
                      message: "Please input treatment of the patient",
                    },
                  ]}
                >
                  <DatePicker format="DD/MM/YYYY" className="w-full" />
                </Form.Item>
                <div className="col-span-2">
                  <div className="flex">
                    <span className="mr-1 text-xl self-center text-red-400">
                      *
                    </span>
                    <p>Prescription Medicine</p>
                  </div>
                  <Form.List
                    name="prescription_medicineIntake"
                    rules={[
                      {
                        required: true,
                        message: "Please add at least one medicine",
                      },
                    ]}
                  >
                    {(fields, { add, remove }, { errors }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space
                            key={key}
                            style={{
                              display: "flex",
                              alignItems: "start",
                              marginTop: 22,
                            }}
                            align="baseline"
                          >
                            <Form.Item
                              {...restField}
                              name={[name, "name"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Missing prescription medicine name",
                                },
                              ]}
                            >
                              <Input
                                placeholder="Input prescription medicine name"
                                style={{ width: 550 }}
                              />
                            </Form.Item>

                            <Form.Item
                              {...restField}
                              name={[name, "quantity"]}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Missing prescription medicine quantity",
                                },
                              ]}
                            >
                              <InputNumber
                                placeholder="Quantity"
                                style={{ width: 140 }}
                              />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, "dose"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Missing prescription medicine dose",
                                },
                              ]}
                            >
                              <Input
                                placeholder="Dose"
                                style={{ width: 140 }}
                              />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, "usage"]}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Missing prescription medicine usage",
                                },
                              ]}
                            >
                              <Select
                                placeholder="Usage"
                                style={{ width: 260 }}
                              >
                                <Option value="Sebelum makan">
                                  Sebelum makan
                                </Option>
                                <Option value="Sesudah makan">
                                  Sesudah makan
                                </Option>
                              </Select>
                            </Form.Item>

                            <AiOutlineMinusCircle
                              onClick={() => remove(name)}
                              style={{ cursor: "pointer", marginTop: "70%" }}
                            />
                          </Space>
                        ))}
                        <Form.Item>
                          <button
                            type="button"
                            className="cursor-pointer px-8 py-2 text-sm mt-4 rounded-md border border-dashed border-gray-400 w-full"
                            onClick={() => add()}
                          >
                            + Add Medicine
                          </button>
                          <Form.ErrorList errors={errors} />
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </div>
                <Form.Item
                  label="Prescription Notes"
                  name="prescription_note"
                  className="col-span-2"
                >
                  <TextArea
                    rows={4}
                    placeholder="Input prescription notes..."
                  />
                </Form.Item>
              </div>
            </div>
          )}

          <div className="col-span-2 flex gap-3 ml-auto justify-end">
            <Form.Item className="-mt-4">
              <button
                type="reset"
                className="bg-blue-300 group hover:text-blue-700 border-none cursor-pointer px-6 py-[10px] text-gray-700 text-sm mt-6 rounded w-full"
                onClick={() => navigate(`/medical-record/detail/${state.id}`)}
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
        </Form>
      </div>
    </div>
  );
};

export default AddMedicalHistory;
