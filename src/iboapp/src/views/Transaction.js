import React from "react";
import ReactModal from "react-modal";
import withCommonComponents from "../hocs/withCommonComponents";
import Table from "../components/Table";
import { useSelector } from "react-redux";
import { getTransactions } from "../selectors";

const Transaction = () => {
  ReactModal.setAppElement("body");
  const transactions = useSelector((state) => getTransactions(state));
  console.log("transaction: ", transactions);

  return (
    <div className="w-full m-5">
      <div>
        {transactions && (
          <Table
            headings={[
              "Müşteri ismi",
              "Ürün Sayısı",
              "Tür",
              "Toplam Tutar",
              "Tarih",
              "İşlemler",
            ]}
            content={transactions}
          />
        )}
      </div>
    </div>
  );
};

export default withCommonComponents(Transaction);
