import React from "react";
import ReactModal from "react-modal";
import CategoryModal from "./CategoryModal";
import ClientModal from "./ClientModal";
import ProductModal from "./ProductModal";

const EditModal = ({ project, id, openEditModal, closeModal }) => {
  ReactModal.setAppElement("body");

  switch (project) {
  }

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

  const modalRenderer = () => {
    switch (project) {
      case "musteriler":
        return <ClientModal closeModal={closeModal} isEdit={true} id={id} />;
      case "kategoriler":
        return <CategoryModal closeModal={closeModal} isEdit={true} id={id} />;
      case "urunler":
        return <ProductModal closeModal={closeModal} isEdit={true} id={id} />;
    }
  };

  return (
    <ReactModal
      isOpen={openEditModal}
      onRequestClose={closeModal}
      style={customStyles}
    >
      {modalRenderer()}
    </ReactModal>
  );
};

export default EditModal;
