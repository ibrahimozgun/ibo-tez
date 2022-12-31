import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Gear } from "../assets/gear.svg";
import { ReactComponent as Home } from "../assets/home.svg";
import { ReactComponent as Category } from "../assets/category.svg";
import { ReactComponent as Product } from "../assets/product.svg";
import logo2 from "../assets/logoo.png";

const Sidebar = () => {
  return (
    <div className="w-1/5 bg-[#4e73df] bg-gradient-to-b from-[#4e73df] to-[#224abe]">
      <div className="flex w-full h-[70px] justify-center pt-3">
        {/* <Logo className="w-12 h-12 fill-white" /> */}
        <img src={logo2} alt="Logo" className="w-12 h-12" />
      </div>
      <ul className="flex flex-col border-t-2 border-t-white border-opacity-10">
        <li className="flex flex-row align items-center text-white opacity-[0.8] hover:opacity-100 cursor-pointer pt-4 pl-4 text-[16px]">
          <Home className="pr-2 fill-white w-6" />
          <Link to={"/anasayfa"}>Anasayfa</Link>
        </li>
        <li className="flex flex-row align items-center text-white opacity-[0.8] hover:opacity-100 cursor-pointer pt-4 pl-4 text-[16px]">
          <Gear className="pr-2 fill-white w-6" />
          <Link to={"/musteri"}>Müşteri</Link>
        </li>
        <li className="flex flex-row align items-center text-white opacity-[0.8] hover:opacity-100 cursor-pointer pt-4 pl-4 text-[16px]">
          <Category className="pr-2 fill-white w-6" />
          <Link to={"/kategori"}>Kategori</Link>
        </li>
        <li className="flex flex-row align items-center text-white opacity-[0.8] hover:opacity-100 cursor-pointer pt-4 pl-4 text-[16px]">
          <Product className="pr-2 fill-white w-6" />
          <Link to={"/urun"}>Ürün</Link>
        </li>
        <li className="flex flex-row align items-center text-white opacity-[0.8] hover:opacity-100 cursor-pointer pt-4 pl-4 text-[16px]">
          <Product className="pr-2 fill-white w-6" />
          <Link to={"/fatura"}>Fatura</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
