import React, { useEffect, useState } from "react";
import withAddComponents from "../hocs/withAddComponents";
import { useDispatch, useSelector } from "react-redux";
import { sellProductRequest } from "../actions";
import { getProducts } from "../selectors/productSelector";
import { getClients } from "../selectors";

const SellModal = ({ id, closeModal }) => {
  const dispatch = useDispatch();
  const [infos, setInfos] = useState({});
  const [error, setError] = useState(false);
  const clients = useSelector((state) => getClients(state));
  const products = useSelector((state) => getProducts(state));

  const [totalPrice, setTotalPrice] = useState(0);

  const [productList, setProductList] = useState([
    {
      name: "",
      categoryName: "",
      price: "",
      tax: "",
      stock: "",
      amount: "",
    },
  ]);

  useEffect(() => {
    let price = 0;
    productList.forEach((pr) => {
      if (pr.amount && pr.price) {
        price += pr.amount * pr.price;
      }
    });
    setTotalPrice(price);
  }, [productList]);

  const handleSellProduct = (e) => {
    e.preventDefault();
    const { clientName } = infos;
    const isValid = productList.some((pl) => pl.stock < pl.amount);

    if (clientName && productList.length >= 1 && !isValid) {
      setError(false);
      dispatch(
        sellProductRequest({
          productList,
          clientName: infos.clientName,
          totalPrice,
        })
      );
      closeModal();
    } else {
      setError("Eksik veya hatalı tuşlama yaptınız.");
    }
  };

  const handleClientChange = (e) => {
    e.preventDefault();
    setInfos({ ...infos, clientName: e.target.value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    setProductList([
      ...productList,
      {
        product: {
          name: "",
          categoryName: "",
          price: "",
          tax: "",
          stock: "",
          amount: "",
        },
      },
    ]);
  };

  const handleProductChange = (e, index) => {
    const { value } = e.target;
    const selectedProductKey = products.reduce((acc, curr, key) => {
      if (curr.name === value) {
        acc = key;
        return acc;
      }
      return acc;
    }, "");
    const list = [...productList];
    list[index] = {
      ...products[selectedProductKey],
      amount: list[index].amount || 0,
    };
    setProductList(list);
  };

  const handleAmountChange = (e, index) => {
    const { value } = e.target;
    const list = [...productList];
    list[index].amount = parseInt(value) || 0;
    setProductList(list);
  };

  return (
    <div className="w-full h-full m-5 flex flex-col">
      <form>
        <label className="mt-2" htmlFor="client">
          Müşteri:
          <div>
            <select
              onChange={handleClientChange}
              className="border border-gray-600 rounded py-2 px-3 text-sm w-[350px]"
              name="client"
              id="client"
            >
              <option disabled selected value>
                Seçiniz
              </option>
              {Object.entries(clients).map((client) => (
                <option
                  selected={client[1].name === infos.clientName ? true : false}
                  value={client[1].name}
                >
                  {client[1].name}
                </option>
              ))}
            </select>
          </div>
        </label>

        {productList.map((product, index) => {
          return (
            <div key={index}>
              <label className="mt-2" htmlFor="product">
                Ürün:
                <div>
                  <select
                    onChange={(e) => handleProductChange(e, index)}
                    className="border border-gray-600 rounded py-2 px-3 text-sm w-[350px]"
                    name="product"
                    id="product"
                  >
                    <option disabled selected value>
                      Seçiniz
                    </option>
                    {Object.entries(products).map((product) => (
                      <option
                        value={product[1].name}
                        disabled={product[1]?.stock <= 0}
                      >
                        {product[1].name}
                        {product[1]?.stock <= 0 && " - Stok Yok"}
                      </option>
                    ))}
                  </select>
                </div>
              </label>

              <div>
                <div>
                  <span className="mt-2">
                    Fiyat: <span id="price">{product?.price}</span> TL
                  </span>
                </div>
                <div>
                  <span className="mt-2">Stok: {product?.stock}</span>
                </div>
                <label className="mt-2" htmlFor="amount">
                  Miktar:
                  <div>
                    <input
                      onChange={(e) => handleAmountChange(e, index)}
                      className="border border-gray-600 rounded py-2 px-3 text-sm  w-52"
                      type="number"
                      min="0"
                      max={product?.stock}
                      placeholder="10"
                      name="amount"
                      id="amount"
                    />
                  </div>
                </label>
              </div>
            </div>
          );
        })}

        <div className="text-lg font-semibold">
          Toplam Tutar: <span>{totalPrice}</span>
        </div>

        <button
          className="mt-2 flex flex-row border bg-red-600 py-2 px-4 text-white text-opacity-80 hover:text-opacity-100 hover:fill-white"
          onClick={handleAddProduct}
        >
          +
        </button>

        <button
          type="submit"
          onClick={handleSellProduct}
          className="flex flex-row items-center justify-center px-4 py-2 bg-red-600 text-slate-50 mt-4 rounded-md text-white w-40"
        >
          Kaydet
        </button>
      </form>
      {error && <span className="text-red-600 text-sm font-bold">{error}</span>}
    </div>
  );
};

export default withAddComponents(SellModal);
