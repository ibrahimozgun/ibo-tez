import React, { useState } from "react";
import ReactModal from "react-modal";
import withCommonComponents from "../hocs/withCommonComponents";
import { ReactComponent as Add } from "../assets/add.svg";
import ProductModal from "../components/ProductModal";
import Table from "../components/Table";
import { useSelector } from "react-redux";
import { getProducts } from "../selectors/productSelector";
import SellModal from "../components/SellModal";
import CategoryModal from "../components/CategoryModal";

const Product = () => {
  ReactModal.setAppElement("body");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSellModalOpan, setIsSellModalOpan] = useState(false);
  const [isCategoryModalOpan, setIsCategoryModalOpan] = useState(false);
  const products = useSelector((state) => getProducts(state));

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSellModalOpan(false);
    setIsCategoryModalOpan(false);
  };

  const handleCategoryModalOpen = () => {
    setIsCategoryModalOpan(true);
  };

  const handleOpenSellModal = () => {
    setIsSellModalOpan(true);
  };

  const customStyles = {
    content: {
      width: "%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div className="w-full m-5">
      <div className="flex w-full">
        <button
          className="flex flex-row border bg-[#4e73df] py-2 px-4 text-white text-opacity-80 hover:text-opacity-100 hover:fill-white"
          onClick={handleOpenModal}
        >
          <Add className="mr-2 fill-white" />
          Ürün Ekle
        </button>
        <button
          className="flex flex-row border bg-[#4e73df] py-2 px-4 text-white text-opacity-80 hover:text-opacity-100 hover:fill-white"
          onClick={handleCategoryModalOpen}
        >
          <Add className="mr-2 fill-white" />
          Kategori Ekle
        </button>
        <button
          className="flex flex-row border bg-[#4e73df] py-2 px-4 text-white text-opacity-80 hover:text-opacity-100 hover:fill-white ml-2"
          onClick={handleOpenSellModal}
        >
          <Add className="mr-2 fill-white" />
          Ürün Satışı
        </button>
      </div>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <ProductModal closeModal={closeModal} />
      </ReactModal>
      <ReactModal
        isOpen={isCategoryModalOpan}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <CategoryModal closeModal={closeModal} />
      </ReactModal>
      <ReactModal
        isOpen={isSellModalOpan}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <SellModal closeModal={closeModal} />
      </ReactModal>
      <div>
        {products && (
          <Table
            headings={[
              "Ürün",
              "Kategori",
              "Fiyat",
              "KDV Oranı",
              "Stok",
              "İşlemler",
            ]}
            content={products}
          />
        )}
      </div>
    </div>
  );
};

export default withCommonComponents(Product);
