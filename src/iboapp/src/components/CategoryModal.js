import React, { useEffect, useState } from "react";
import withAddComponents from "../hocs/withAddComponents";
import { useDispatch, useSelector } from "react-redux";
import { addCategoryRequest, editCategoryRequest } from "../actions";
import { getCategories } from "../selectors/categorySelector";

const AddCategory = ({ isEdit, id, closeModal }) => {
  const dispatch = useDispatch();
  const [infos, setInfos] = useState({});
  const [error, setError] = useState(false);
  const [taxes, setTaxes] = useState([]);
  const [category, setCategory] = useState([]);
  const categories = useSelector((state) => getCategories(state));

  useEffect(() => {
    if (isEdit) {
      const ct = categories.filter((c) => c._id === id);

      setInfos({
        id,
        name: ct[0].name,
      });
    }
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const { name } = infos;
    if (name) {
      setError(false);
      dispatch(addCategoryRequest(infos));
      closeModal();
      return;
    } else {
      setError("Eksik veya hatalı tuşlama yaptınız.");
      return;
    }
  };

  const handleEditCategory = (e) => {
    e.preventDefault();
    const { name } = infos;
    if (name) {
      setError(false);
      dispatch(editCategoryRequest(infos));
      closeModal();
    } else {
      setError("Eksik veya hatalı tuşlama yaptınız.");
    }
  };

  return (
    <div className="w-full h-full m-5 flex flex-col">
      <form>
        <label className="mt-2" htmlFor="name">
          Kategori:
          <div>
            <input
              value={infos.name}
              onChange={(e) => setInfos({ ...infos, name: e.target.value })}
              className="border border-gray-600 rounded py-2 px-3 text-sm  w-52"
              type="text"
              placeholder="Kategori"
              name="name"
              id="name"
              maxLength="25"
            />
          </div>
        </label>

        <button
          type="submit"
          onClick={!isEdit ? handleAddCategory : handleEditCategory}
          className="flex flex-row items-center justify-center px-4 py-2 bg-red-600 text-slate-50 mt-4 rounded-md text-white w-40"
        >
          {!isEdit ? "Ekle" : "Güncelle"}
        </button>
      </form>
      {error && <span className="text-red-600 text-sm font-bold">{error}</span>}
    </div>
  );
};

export default withAddComponents(AddCategory);
