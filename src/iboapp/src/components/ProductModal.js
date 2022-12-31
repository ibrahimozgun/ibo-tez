import React, { useEffect, useState } from "react";
import withAddComponents from "../hocs/withAddComponents";
import { useDispatch, useSelector } from "react-redux";
import { addProductRequest, editProductRequest } from "../actions";
import { getProducts } from "../selectors/productSelector";
import { getCategories } from "../selectors";

const AddProduct = ({ isEdit, id, closeModal }) => {
  const dispatch = useDispatch();
  const [infos, setInfos] = useState({});
  const [error, setError] = useState(false);
  const products = useSelector((state) => getProducts(state));
  const categories = useSelector((state) => getCategories(state));

  useEffect(() => {
    if (isEdit) {
      const ct = products.filter((c) => c._id === id);

      setInfos({
        id,
        name: ct[0].name,
        categoryName: ct[0].categoryName,
        price: ct[0].price,
        tax: ct[0].tax,
        stock: ct[0].stock,
      });
    }
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const { name } = infos;
    if (name) {
      setError(false);
      dispatch(addProductRequest(infos));
      closeModal();
      return;
    } else {
      setError("Eksik veya hatalı tuşlama yaptınız.");
      return;
    }
  };

  const handleEditProduct = (e) => {
    e.preventDefault();
    const { name } = infos;
    if (name) {
      setError(false);
      dispatch(editProductRequest(infos));
      closeModal();
    } else {
      setError("Eksik veya hatalı tuşlama yaptınız.");
    }
  };

  return (
    <div className="w-full h-full m-5 flex flex-col">
      <form>
        <label className="mt-2" htmlFor="category">
          Kategori:
          <div>
            <select
              onChange={(e) =>
                setInfos({ ...infos, categoryName: e.target.value })
              }
              className="border border-gray-600 rounded py-2 px-3 text-sm  w-52"
              name="category"
              id="category"
            >
              <option disabled selected value>
                Seçiniz
              </option>
              {Object.entries(categories).map((category) => (
                <option
                  selected={
                    category[1].name === infos.categoryName ? true : false
                  }
                  value={category[1].name}
                >
                  {category[1].name}
                </option>
              ))}
            </select>
          </div>
        </label>

        <label className="mt-2" htmlFor="name">
          Ürün:
          <div>
            <input
              value={infos.name}
              onChange={(e) => setInfos({ ...infos, name: e.target.value })}
              className="border border-gray-600 rounded py-2 px-3 text-sm  w-52"
              type="text"
              placeholder="Ürün Adı"
              name="name"
              id="name"
              maxLength="50"
            />
          </div>
        </label>

        <label className="mt-2" htmlFor="price">
          Fiyat:
          <div>
            <input
              value={infos.price}
              onChange={(e) => setInfos({ ...infos, price: e.target.value })}
              className="border border-gray-600 rounded py-2 px-3 text-sm  w-52"
              type="number"
              min="0"
              placeholder="100"
              name="price"
              id="price"
            />
          </div>
        </label>

        <label className="mt-2" htmlFor="tax">
          KDV (%):
          <div>
            <input
              value={infos.tax}
              onChange={(e) => setInfos({ ...infos, tax: e.target.value })}
              className="border border-gray-600 rounded py-2 px-3 text-sm  w-52"
              type="number"
              min="0"
              placeholder="%"
              name="tax"
              id="tax"
              maxLength={2}
            />
          </div>
        </label>

        <label className="mt-2" htmlFor="stock">
          Stok:
          <div>
            <input
              value={infos.stock}
              onChange={(e) => setInfos({ ...infos, stock: e.target.value })}
              className="border border-gray-600 rounded py-2 px-3 text-sm  w-52"
              type="number"
              min="0"
              placeholder="Ürün Adeti"
              name="stock"
              id="stock"
            />
          </div>
        </label>

        <button
          type="submit"
          onClick={!isEdit ? handleAddProduct : handleEditProduct}
          className="flex flex-row items-center justify-center px-4 py-2 bg-red-600 text-slate-50 mt-4 rounded-md text-white w-40"
        >
          {!isEdit ? "Ekle" : "Kaydet"}
        </button>
      </form>
      {error && <span className="text-red-600 text-sm font-bold">{error}</span>}
    </div>
  );
};

export default withAddComponents(AddProduct);
