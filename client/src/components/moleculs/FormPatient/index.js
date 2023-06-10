import React, { useEffect } from "react";
// UI
import { Form, Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const FormPatient = ({
  current,
  next,
  prev,
  personalData,
  setPersonalData,
}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (personalData) {
      form.setFieldsValue({
        name: personalData.name ? personalData.name : "",
        address: personalData.address ? personalData.address : "",
        gender: personalData.gender,
        birth_place: personalData.birth_place ? personalData.birth_place : "",
        birth_date: personalData.birth_date
          ? dayjs(personalData.birth_date)
          : null,
        category: personalData.category,
        insurance_number:
          personalData.category === "Umum" ? "" : personalData.insurance_number,
        identity_number: personalData.identity_number
          ? personalData.identity_number
          : "",
        phone: personalData.phone ? personalData.phone : "",
      });
    }
  }, [form, personalData]);

  const onFinish = (values) => {
    next();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
              onChange={(e) =>
                setPersonalData({ ...personalData, name: e.target.value })
              }
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
              onChange={(e) =>
                setPersonalData({ ...personalData, address: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item label="Birth Place" name="birth_place">
            <Input
              placeholder="Input birth place of the patient"
              onChange={(e) =>
                setPersonalData({
                  ...personalData,
                  birth_place: e.target.value,
                })
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
                setPersonalData({
                  ...personalData,
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
              onChange={(e) => setPersonalData({ ...personalData, gender: e })}
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
                setPersonalData({
                  ...personalData,
                  identity_number: e.target.value,
                })
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
              onChange={(e) =>
                setPersonalData({
                  ...personalData,
                  category: e,
                })
              }
            >
              <Option value="Umum">Umum</Option>
              <Option value="BPJS">BPJS</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Insurance Number"
            name="insurance_number"
            rules={[
              personalData.length === 0 ||
              personalData.category === undefined ||
              personalData.category === "Umum"
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
            {personalData.length === 0 ||
            personalData.category === undefined ||
            personalData.category === "Umum" ? (
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
                  setPersonalData({
                    ...personalData,
                    insurance_number: e.target.value,
                  })
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
              onChange={(e) =>
                setPersonalData({
                  ...personalData,
                  phone: e.target.value,
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
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate("/patient")}
                    className="bg-blue-300 group hover:text-blue-700 border-none cursor-pointer px-6 py-[10px] text-gray-700 text-sm mt-6 rounded"
                  >
                    <div className=" flex gap-2 group">
                      <AiOutlineArrowLeft className="flex self-center text-lg text-gray-700 group-hover:text-blue-700" />{" "}
                      Back
                    </div>
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-300 group hover:text-blue-700 border-none cursor-pointer px-6 py-[10px] text-gray-700 text-sm mt-6 rounded"
                  >
                    <div className=" flex gap-2 group">
                      Next
                      <AiOutlineArrowRight className="flex self-center text-lg text-gray-700 group-hover:text-blue-700" />{" "}
                    </div>
                  </button>
                </div>
              )}
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default FormPatient;
