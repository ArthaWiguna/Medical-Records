import React, { useState } from "react";

// UI
import { Steps } from "antd";
import FormPatient from "../FormPatient";
import FormMedicalRecord from "../FormMedicalRecord";
import SuccessRegistration from "../SuccessRegistration";
import "../../../index.css";
import { useNavigate } from "react-router-dom";

const AddPatient = () => {
  // utils
  const navigate = useNavigate();
  // state
  const [current, setCurrent] = useState(0);
  const [personalData, setPersonalData] = useState([]);
  const [basicHealthData, setBasicHealthData] = useState([]);

  console.log(personalData);
  const next = () => {
    setCurrent(current + 1);
    console.log(personalData, "ini personalData di next");
    console.log(basicHealthData, "ini basih health data di next");
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const steps = [
    {
      title: "Personal Information",
      content: (
        <FormPatient
          current={current}
          setCurrent={setCurrent}
          next={next}
          prev={prev}
          personalData={personalData}
          setPersonalData={setPersonalData}
          basicHealthData={basicHealthData}
          setBasicHealthData={setBasicHealthData}
        />
      ),
    },
    {
      title: "Health Information",
      content: (
        <FormMedicalRecord
          current={current}
          setCurrent={setCurrent}
          next={next}
          prev={prev}
          personalData={personalData}
          setPersonalData={setPersonalData}
          basicHealthData={basicHealthData}
          setBasicHealthData={setBasicHealthData}
        />
      ),
    },
    {
      title: "Done",
      content: (
        <SuccessRegistration
          current={current}
          setCurrent={setCurrent}
          next={next}
          prev={prev}
          personalData={personalData}
          setPersonalData={setPersonalData}
          basicHealthData={basicHealthData}
          setBasicHealthData={setBasicHealthData}
        />
      ),
    },
  ];
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <div className="mt-10 pb-5">
      <p className="home text-gray-500 text-base font-normal">
        <span className="cursor-pointer" onClick={() => navigate("/")}>
          Home
        </span>{" "}
        {">"}{" "}
        <span className="cursor-pointer" onClick={() => navigate("/patient")}>
          Patient
        </span>{" "}
        {"> "}
        <span className="font-semibold text-blue-700">Registration</span>
      </p>

      {/* step */}
      <div className="mt-20">
        <Steps size="small" progressDot current={current} items={items} />
        <div>{steps[current].content}</div>
      </div>
    </div>
  );
};

export default AddPatient;
