import React from "react";
// UI
import { AiFillCheckCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { IconSuccess } from "../../../assets";

const SuccessRegistration = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-10">
      <div>
        <div className="flex justify-center">
          <div>
            {/* <AiFillCheckCircle className="text-[140px] text-[#52C41A] mx-auto" /> */}
            <img
              src={IconSuccess}
              alt="icon_success"
              className="h-72 w-72"
            ></img>
            <h3 className="font-medium text-lg text-blue-900 text-center">
              Registration Success !
            </h3>

            <button
              className="bg-blue-700 hover:bg-blue-600 border-none cursor-pointer px-8 py-2 text-white text-sm mt-6 rounded block mx-auto"
              onClick={() => navigate("/patient")}
            >
              Patient List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessRegistration;
