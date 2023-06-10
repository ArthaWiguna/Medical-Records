import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createMedicine,
  createMedicineStatus,
  createMedicineErrorMessage,
  createMedicineSuccessMessage,
} from "../../../features/medicineSlice";
// UI
import { Form, Input, Select, message, InputNumber, DatePicker } from "antd";
import { AiOutlineArrowLeft } from "react-icons/ai";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
const { Option } = Select;

const AddMedicine = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // redux
  const status = useSelector(createMedicineStatus);
  const successMessage = useSelector(createMedicineSuccessMessage);
  const errorMessage = useSelector(createMedicineErrorMessage);
  // state
  const [submitted, setSubmitted] = useState(false);
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  //   Function
  const onImageUpload = (e) => {
    setImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const onFinish = async (values) => {
    console.log("Success:", values);
    console.log(image);
    let expired = dayjs(values.expired.$d).format("YYYY-MM-DD");
    const data = new FormData();
    data.append("name", values.name);
    data.append("unit", values.unit);
    data.append("general_indication", values.general_indication);
    data.append("composition", values.composition);
    data.append("age_category", values.age_category);
    data.append("usage", values.usage);
    data.append("contra_indication", values.contra_indication);
    data.append("side_effect", values.side_effect);
    data.append("classMedicine", values.class);
    data.append("stock", values.stock);
    data.append("expired", expired);
    data.append("image", image);
    data.append("description", values.description);
    await dispatch(createMedicine(data));
    setSubmitted(true);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (status === "success" && submitted === true) {
      setTimeout(() => {
        navigate("/medicine");
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
        <span className="cursor-pointer" onClick={() => navigate("/medicine")}>
          Medicine
        </span>{" "}
        {"> "}
        <span className="font-semibold text-blue-700">Add New Medicine</span>
      </p>
      <div className="mt-10">
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
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
                  required: true,
                  message: "Please input name of the medicine!",
                },
              ]}
            >
              <Input placeholder="Input name of the medicine" />
            </Form.Item>
            <Form.Item
              label="Unit"
              name="unit"
              rules={[
                {
                  required: true,
                  message: "Please select unit of the medicine!",
                },
              ]}
            >
              <Select placeholder="Select unit of the medicine">
                <Option value="Tablet">Tablet</Option>
                <Option value="Kapsul">Kapsul</Option>
                <Option value="Kaplet">Kaplet</Option>
                <Option value="Botol">Botol</Option>
                <Option value="Serbuk">Serbuk</Option>
                <Option value="Salep">Salep</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Class"
              name="class"
              rules={[
                {
                  required: true,
                  message: "Please class of the medicine!",
                },
              ]}
            >
              <Select placeholder="Select class of the medicine">
                <Option value="Obat bebas">Obat bebas</Option>
                <Option value="Obat bebas terbatas">Obat bebas terbatas</Option>
                <Option value="Obat keras">Obat keras</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Age Category"
              name="age_category"
              rules={[
                {
                  required: true,
                  message: "Please age category of the medicine!",
                },
              ]}
            >
              <Select placeholder="Select age category of the medicine">
                <Option value="Anak-anak">Anak-anak</Option>
                <Option value="Dewasa">Dewasa</Option>
                <Option value="Semua usia">Semua usia</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Composition"
              name="composition"
              rules={[
                {
                  required: true,
                  message: "Please composition of the medicine!",
                },
              ]}
            >
              <Input placeholder="Input composition of the medicine" />
            </Form.Item>
            <Form.Item
              label="General Indication"
              name="general_indication"
              rules={[
                {
                  required: true,
                  message: "Please general indication of the medicine!",
                },
              ]}
            >
              <Input placeholder="Input general indication of the medicine" />
            </Form.Item>
            <Form.Item
              label="Contra Indication"
              name="contra_indication"
              rules={[
                {
                  required: true,
                  message: "Please contra indication of the medicine!",
                },
              ]}
            >
              <Input placeholder="Input contra indication of the medicine" />
            </Form.Item>
            <Form.Item label="Side Effect" name="side_effect">
              <Input placeholder="Input side effect  of the medicine" />
            </Form.Item>
            <Form.Item
              label="Usage"
              name="usage"
              rules={[
                {
                  required: true,
                  message: "Please usage of the medicine!",
                },
              ]}
            >
              <Select placeholder="Select usage category of the medicine">
                <Option value="Sebelum makan">Sebelum makan</Option>
                <Option value="Sesudah makan">Sesudah makan</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Expired Date"
              name="expired"
              rules={[
                {
                  required: true,
                  message: "Please input expired date of the medicine!",
                },
              ]}
            >
              <DatePicker format="DD/MM/YYYY" className="w-full" />
            </Form.Item>

            <Form.Item
              label="Stock"
              name="stock"
              rules={[
                {
                  pattern: new RegExp(/^[1-9]\d*$/),
                  message: "Stock must be greater than 0!",
                },
                {
                  required: true,
                  message: "Please input the stock of the medicine!",
                },
              ]}
            >
              <InputNumber
                placeholder="Input stock of the medicine"
                className="w-full"
              />
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
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Medicine Thumbnail"
                  className="h-24 w-24 object-cover"
                />
              ) : (
                ""
              )}
            </div>

            <Form.Item label="Description" name="description">
              <TextArea rows={4} placeholder="Input description..." />
            </Form.Item>

            <div className="col-span-2 flex gap-3 ml-auto">
              <Form.Item className="-mt-4">
                <button
                  type="reset"
                  className="bg-blue-300 group hover:text-blue-700 border-none cursor-pointer px-6 py-[10px] text-gray-700 text-sm mt-6 rounded w-full"
                  onClick={() => navigate("/medicine")}
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

export default AddMedicine;
