import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  getLoginStatus,
  getLoginErrorMessage,
} from "../../features/userSlice";
// UI
import { BannerLogin, BannerLogin2, Logo } from "../../assets";
import { Form, Input } from "antd";
import { Helmet } from "react-helmet";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginStatus = useSelector(getLoginStatus);
  const loginErrorMessage = useSelector(getLoginErrorMessage);

  const auth =
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : "";

  const onFinish = (values) => {
    dispatch(login(values));
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (loginStatus === "success" || auth !== "") {
      if (auth.level === "Admin" || auth.level === "Dokter") {
        navigate("/overview");
      } else {
        navigate("/");
      }
    } else {
      navigate("/login");
    }
    // loginStatus === "success" || auth !== ""
    //   ? navigate("/overview")
    //   : navigate("/login");
  }, [loginStatus, auth, navigate]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full">
      <Helmet>
        <title>Login | Ardita Medical</title>
      </Helmet>
      <div className="hidden lg:block h-screen">
        <img
          className="object-cover w-full h-full"
          alt="img"
          src={BannerLogin}
        />
      </div>
      <div className="flex flex-col justify-center px-8 lg:px-40">
        <div
          className="flex gap-2 cursor-pointer lg:hidden justify-center mb-10"
          onClick={() => navigate("/")}
        >
          <img src={Logo} alt="icon_total_patient"></img>
          <h3 className="text-center font-bold text-[22px] self-center text-blue-900">
            Ardita Medical
          </h3>
        </div>
        <h1 className="text-lg lg:text-3xl text-start lg:text-center font-medium lg:font-bold text-blue-900 mb-4 lg:mb-10 hidden lg:block">
          Account Login
        </h1>
        {loginErrorMessage ? (
          <div
            class="flex justify-center p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
            role="alert"
          >
            <span class="font-medium">{loginErrorMessage}!</span>
          </div>
        ) : (
          ""
        )}
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
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
            className="mb-0"
          >
            <Input placeholder="Input your username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Input your password" />
          </Form.Item>

          <Form.Item className="-mt-4">
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-600 border-none cursor-pointer px-8 py-2 text-white text-sm mt-6 rounded w-full h-full"
            >
              Login
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
