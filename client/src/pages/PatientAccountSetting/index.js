import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailPatient, getPatient } from "../../features/patientSlice";
import {
  accountSetting,
  account,
  getAccountSettingStatus,
  getAccountSettingErrorMessage,
  getAccountSettingSuccessMessage,
} from "../../features/userSlice";
// UI
import { Form, Input, Select, DatePicker, message, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import TabPane from "antd/es/tabs/TabPane";
import { HeroAccountSetting } from "../../assets";
import { LandingFooter, LandingNavbar } from "../../components";
import { Helmet } from "react-helmet";

const { Option } = Select;

const PatientAccountSetting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const auth =
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : "";

  console.log(auth);

  // redux
  const oldData = useSelector(getPatient);
  const accountUpdatedData = useSelector(account);
  const accountSettingStatus = useSelector(getAccountSettingStatus);
  const accountSettingSuccessMessage = useSelector(
    getAccountSettingSuccessMessage
  );
  const accountSettingErrorMessage = useSelector(getAccountSettingErrorMessage);
  // state
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState([]);
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  console.log(image);

  // function
  const onFinishProfile = async (values) => {
    console.log("Success:", values);
    const data = new FormData();
    data.append("name", values.name);
    data.append("birth_place", values.birth_place);
    data.append("birth_date", values.birth_date);
    data.append("gender", values.gender);
    data.append("address", values.address);
    data.append("identity_number", values.identity_number);
    data.append("category", values.category);
    data.append("insurance_number", values.insurance_number);
    data.append("phone", values.phone);
    data.append("level", auth.level);
    data.append("username", auth.username);
    data.append("image", image);
    data.append("status", "Active");
    await dispatch(
      accountSetting({
        id: auth.id_user,
        data: data,
      })
    );
    setSubmitted(true);
  };
  const onFinishFailedProfile = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinishPassword = async (values) => {
    console.log("Success:", values);
    await dispatch(
      accountSetting({
        id: auth.id_user,
        data: {
          name: auth.name,
          level: auth.level,
          username: auth.username,
          old_password: values.old_password,
          new_password: values.new_password,
        },
      })
    );
    setSubmitted(true);
  };
  const onFinishFailedPassword = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onImageUpload = (e) => {
    setImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
  useEffect(() => {
    dispatch(getDetailPatient({ id: "", username: auth.username }));
  }, [dispatch, auth.username]);

  useEffect(() => {
    if (oldData) {
      if (data.id_patient !== oldData.id_patient) {
        setData(oldData);
      }
      form.setFieldsValue({
        name: data.name ? data.name : "",
        address: data.address ? data.address : "",
        gender: data.gender ? data.gender : "",
        birth_place: data.birth_place ? data.birth_place : "",
        birth_date: data.birth_date ? dayjs(data.birth_date) : null,
        category: data.category,
        insurance_number: data.category === "Umum" ? "" : data.insurance_number,
        identity_number: data.identity_number ? data.identity_number : "",
        phone: data.phone ? data.phone : "",
      });
    }
  }, [dispatch, oldData, data, form]);

  useEffect(() => {
    if (accountSettingStatus === "success" && submitted === true) {
      message.success(accountSettingSuccessMessage);
    } else if (accountSettingStatus === "rejected" && submitted === true) {
      message.error(accountSettingErrorMessage);
    }
    setSubmitted(false);
  }, [
    accountSettingStatus,
    accountSettingErrorMessage,
    accountSettingSuccessMessage,
    submitted,
    navigate,
  ]);
  console.log(data, "ini data baru");
  return (
    <div>
      <Helmet>
        <title>Account Setting | Ardita Medical</title>
      </Helmet>
      {/* Navbar */}
      <LandingNavbar
        image={accountUpdatedData ? accountUpdatedData.image : ""}
      />
      {/* Hero */}
      <div className="flex md:h-[348px] h-[280px] items-center justify-center relative">
        <div className="hero-image-account-setting" />
        <div className="relative px-4 md:px-40 w-full mt-10 md:mt-40 flex justify-center md:justify-end">
          <div>
            <h2 className="hero-motto text-2xl md:text-4xl leading-tight md:leading-snug  text-white font-extralight text-center md:text-start">
              Customize Your <span className="font-semibold">Account</span>{" "}
            </h2>
            <p className="mb-10 mt-2 md:text-xl text-white text-center md:text-start">
              Ensure security and manage preferences in one
            </p>
          </div>
        </div>
      </div>
      <h2 className="text-blue-900 font-semibold text-2xl mt-10 leading-normal text-center">
        Account Settings
      </h2>
      <div className="mt-10 px-4 md:px-40">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Update Profile" key="1">
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              form={form}
              onFinish={onFinishProfile}
              onFinishFailed={onFinishFailedProfile}
              autoComplete="off"
              layout="vertical"
              size="large"
              spellCheck="false"
            >
              <div className="md:grid md:grid-cols-2 md:gap-x-10">
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
                    onChange={(e) =>
                      setData({ ...data, address: e.target.value })
                    }
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
                <Form.Item label="Birth Date" name="birth_date">
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
                    onChange={(e) =>
                      setData({ ...data, phone: e.target.value })
                    }
                  />
                </Form.Item>
                <div className="flex">
                  <Form.Item label="Image ( png / jpg / jpeg)" name="image">
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
                  {imagePreview || auth.image ? (
                    <img
                      src={
                        imagePreview
                          ? imagePreview
                          : `http://localhost:3001/${auth.image}`
                      }
                      alt="Medicine Thumbnail"
                      className="h-24 w-24 object-cover"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-span-2 flex gap-3 ml-auto">
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
          </TabPane>
          <TabPane tab="Update Password" key="2">
            <Form
              name="password"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinishPassword}
              onFinishFailed={onFinishFailedPassword}
              autoComplete="off"
              layout="vertical"
              size="large"
              spellCheck="false"
            >
              <div className="md:grid md:grid-cols-2 gap-x-10">
                <Form.Item
                  label="Old Password"
                  name="old_password"
                  rules={[
                    {
                      required: true,
                      message: "Please input old password!",
                    },
                    {
                      min: 8,
                      message: "Password must be between 8 - 12 characters",
                    },
                    {
                      max: 12,
                      message: "Password must be between 8 - 12 characters",
                    },
                    {
                      pattern: new RegExp(/^\S*$/),
                      message: "Password cannot contain spaces!",
                    },
                  ]}
                >
                  <Input.Password placeholder="Input password of the user" />
                </Form.Item>
                <Form.Item
                  label="New Password"
                  name="new_password"
                  rules={[
                    {
                      required: true,
                      message: "Please input new password!",
                    },
                    {
                      min: 8,
                      message: "Password must be between 8 - 12 characters",
                    },
                    {
                      max: 12,
                      message: "Password must be between 8 - 12 characters",
                    },
                    {
                      pattern: new RegExp(/^\S*$/),
                      message: "Password cannot contain spaces!",
                    },
                  ]}
                >
                  <Input.Password placeholder="Input password of the user" />
                </Form.Item>
                <div className="col-span-2 flex gap-3 ml-auto">
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
          </TabPane>
        </Tabs>
      </div>
      {/* Footer */}
      <LandingFooter />
    </div>
  );
};

export default PatientAccountSetting;
