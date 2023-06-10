import React from "react";

import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { Avatar } from "../../../assets";

const Navbar = ({ level, name, image, sidebar, setSidebar }) => {
  const auth =
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : "";

  return (
    <div className="flex justify-between bg-white items-center">
      <button onClick={() => setSidebar(!sidebar)}>
        {sidebar ? (
          <AiOutlineMenuFold className="text-2xl font-bold text-blue-900 cursor-pointer" />
        ) : (
          <AiOutlineMenuUnfold className="text-2xl font-bold text-blue-900 cursor-pointer" />
        )}
      </button>
      <div className="flex gap-3 items-center">
        <p className="text-blue-900 font-medium">
          {level || auth.level}, {name || auth.name}
        </p>

        <img
          src={
            image
              ? `http://localhost:3001/${image}`
              : auth.image
              ? `http://localhost:3001/${auth.image}`
              : Avatar
          }
          alt="user-profile"
          className="w-[50px] h-[50px] p-1 rounded-[50px] box-border object-cover border border-blue-800 "
        />
      </div>
    </div>
  );
};

export default Navbar;
