import { Result } from "antd";
import React from "react";
import { Helmet } from "react-helmet";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center">
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
    </div>
  );
};

export default NotFound;
