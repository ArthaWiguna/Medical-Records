import { Result } from "antd";
import React from "react";
import { Helmet } from "react-helmet";

const AccessDenied = () => {
  return (
    <div className="h-screen flex flex-col justify-center">
      <Helmet>
        <title>Access Denied</title>
      </Helmet>
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
      />
    </div>
  );
};

export default AccessDenied;
