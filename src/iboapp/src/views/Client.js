import React, { useState } from "react";
import ReactModal from "react-modal";
import withCommonComponents from "../hocs/withCommonComponents";
import { ReactComponent as Add } from "../assets/add.svg";
import ClientModal from "../components/ClientModal";
import Table from "../components/Table";
import { useSelector } from "react-redux";
import { getClients } from "../selectors/clientSelector";

const Client = () => {
  ReactModal.setAppElement("body");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const clients = useSelector((state) => getClients(state));

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
      <button
        className="flex flex-row border bg-[#4e73df] py-2 px-4 text-white text-opacity-80 hover:text-opacity-100 hover:fill-white"
        onClick={handleOpenModal}
      >
        <Add className="mr-2 fill-white" />
        Müşteri Ekle
      </button>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <ClientModal closeModal={closeModal} />
      </ReactModal>
      <div>
        {clients && (
          <Table
            headings={[
              "İsim",
              "Vergi Numarası",
              "Şehir",
              "Vergi Dairesi",
              "Adres",
              "Telefon Numarası",
              "Bakiye",
              "İşlemler",
            ]}
            content={clients}
          />
        )}
      </div>
    </div>
  );
};

export default withCommonComponents(Client);
