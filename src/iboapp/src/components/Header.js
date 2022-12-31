import React from "react";
import { useSelector } from "react-redux";
import { ReactComponent as User } from "../assets/user.svg";
import { getUser } from "../selectors";

const Header = () => {
  const user = useSelector(getUser);
  return (
    <nav className="flex justify-end items-center w-full h-[70px] bg-white drop-shadow-lg">
      <div className="flex justify-end w-full mr-4 hover:cursor-pointer">
        <User className="mr-2" />
        {user.fullName || "Ali Veli"}
      </div>
    </nav>
  );
};

export default Header;
