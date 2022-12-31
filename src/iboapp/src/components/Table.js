import React, { useCallback, useState } from "react";
import ReactModal from "react-modal";
import { useDispatch } from "react-redux";
import {
  deleteCategoryRequest,
  deleteClientRequest,
  deleteProductRequest,
} from "../actions";
import EditModal from "./EditModal";
import PrintModal from "./PrintModal";

const Table = ({ headings, content }) => {
  const dispatch = useDispatch();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editID, setEditID] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [printContent, setPrintContent] = useState(0);

  const closePrintModal = () => {
    setIsModalOpen(false);
  };

  const handlePrint = (item) => {
    setIsModalOpen(true);
    setPrintContent(item);
  };

  const defineProject = useCallback(() => {
    const pathname = window.location.pathname.slice(
      1,
      window.location.pathname.length
    );
    return {
      musteri: "musteriler",
      kategori: "kategoriler",
      urun: "urunler",
      fatura: "faturalar",
    }[pathname];
  }, [window.location.pathname]);
  const project = defineProject();

  const handleDelete = (id) => {
    if (project === "musteriler") {
      dispatch(deleteClientRequest(id));
    }
    if (project === "kategoriler") {
      dispatch(deleteCategoryRequest(id));
    }
    if (project === "urunler") {
      dispatch(deleteProductRequest(id));
    }
  };

  const openModal = (id) => {
    setEditID(id);
    setOpenEditModal(true);
  };

  const closeModal = () => {
    setEditID(false);
    setOpenEditModal(false);
  };

  return (
    <div className="w-full border rounded p-4 m-4">
      <table className="w-full">
        <thead>
          <tr>
            {headings.map((head, key) => (
              <th
                key={key}
                className="text-left bg-gray-50 text-sm font-semibold text-gray-500 p-3 border-b"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {content?.map((items, key) => (
            <tr key={key} className="group">
              {Object.keys(items).map((item, key) => {
                if (item === "products") {
                  return (
                    <td
                      key={key}
                      className="p-3 text-sm group-hover:bg-blue-50 group-hover:text-blue-600"
                    >
                      {items[item].length}
                    </td>
                  );
                }
                if (item === "date") {
                  console.log(items[item]);
                  const date = new Date(items[item]).toLocaleString("tr-TR");
                  return (
                    <td
                      key={key}
                      className="p-3 text-sm group-hover:bg-blue-50 group-hover:text-blue-600"
                    >
                      {date}
                    </td>
                  );
                }
                if (["_id", "__v"].indexOf(item) === -1) {
                  return (
                    <td
                      key={key}
                      className="p-3 text-sm group-hover:bg-blue-50 group-hover:text-blue-600"
                    >
                      {items[item]}
                    </td>
                  );
                }
              })}
              <td className="p-3 text-sm group-hover:bg-blue-50 group-hover:text-blue-600">
                {project !== "faturalar" ? (
                  <>
                    <span
                      className="cursor-pointer"
                      onClick={() => openModal(items["_id"])}
                    >
                      Düzenle
                    </span>
                    <span
                      className="ml-2 cursor-pointer"
                      onClick={() => handleDelete(items["_id"])}
                    >
                      Sil
                    </span>
                  </>
                ) : (
                  <>
                    <span
                      className="cursor-pointer"
                      onClick={() => handlePrint(items, items["_id"])}
                    >
                      Yazdır
                    </span>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactModal isOpen={isModalOpen} onRequestClose={closePrintModal}>
        <PrintModal closeModal={closePrintModal} item={printContent} />
      </ReactModal>
      <EditModal
        project={project}
        id={editID}
        openEditModal={openEditModal}
        closeModal={closeModal}
      />
    </div>
  );
};

export default Table;
