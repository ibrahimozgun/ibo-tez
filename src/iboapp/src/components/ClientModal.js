import React, { useEffect, useState } from "react";
import withAddComponents from "../hocs/withAddComponents";
import cities from "../data/cities.json";
import taxAdministrations from "../data/tax_administration.json";
import { useDispatch, useSelector } from "react-redux";
import { addClientRequest, editClientRequest } from "../actions";
import { getClients } from "../selectors/clientSelector";
const AddClient = ({ isEdit, id, closeModal }) => {
  const dispatch = useDispatch();
  const [infos, setInfos] = useState({});
  const [error, setError] = useState(false);
  const [taxes, setTaxes] = useState([]);
  const [client, setClient] = useState([]);
  const clients = useSelector((state) => getClients(state));

  useEffect(() => {
    if (isEdit) {
      const cl = clients.filter((c) => c._id === id);
      const { data } = taxAdministrations;

      if (cl[0].city) {
        const city = Object.entries(cities).reduce((acc, curr) => {
          if (curr[1] === cl[0].city) {
            acc.push(curr[0]);
          }
          return acc;
        }, []);
        const newAdministrations = data.filter((tax) => {
          return tax.city_id == city[0];
        });
        setTaxes(newAdministrations);
      }

      setInfos({
        id,
        taxNumber: cl[0].taxNumber,
        name: cl[0].name,
        city: cl[0].city,
        administration: cl[0].administration,
        address: cl[0].address,
        phoneNumber: cl[0].phoneNumber,
        budget: cl[0].budget,
      });
    }
  }, []);

  const handleCityChange = (e) => {
    const { data } = taxAdministrations;
    const cityID = e.target.value;

    const newAdministrations = data.filter((tax) => {
      return tax.city_id == cityID;
    });

    setInfos({ ...infos, city: cities[cityID] });
    setTaxes(newAdministrations);
  };

  const handleAddClient = async (e) => {
    e.preventDefault();
    const {
      taxNumber,
      name,
      city,
      administration,
      address,
      phoneNumber,
      budget,
    } = infos;
    if (
      taxNumber?.match(/[0-9]{10}/gs) &&
      name &&
      city &&
      administration &&
      address &&
      phoneNumber &&
      budget
    ) {
      setError(false);
      dispatch(addClientRequest(infos));
      closeModal();
      return;
    } else {
      setError("Eksik veya hatalı tuşlama yaptınız.");
      return;
    }
  };

  const handleEditClient = (e) => {
    e.preventDefault();
    const {
      taxNumber,
      name,
      city,
      administration,
      address,
      phoneNumber,
      budget,
    } = infos;
    if (
      taxNumber?.match(/[0-9]{10}/gs) &&
      name &&
      city &&
      administration &&
      address &&
      phoneNumber &&
      budget
    ) {
      setError(false);
      dispatch(editClientRequest(infos));
      closeModal();
    } else {
      setError("Eksik veya hatalı tuşlama yaptınız.");
    }
  };

  return (
    <div className="w-full h-full m-5 flex flex-col">
      <form>
        <label htmlFor="taxNumber">
          Vergi Numarası:
          <div>
            <input
              value={infos.taxNumber}
              onChange={(e) =>
                setInfos({ ...infos, taxNumber: e.target.value })
              }
              className="border border-gray-600 rounded py-2 px-3 text-sm w-52"
              type="text"
              placeholder="0123456789"
              name="taxNumber"
              id="taxNumber"
            />
          </div>
        </label>
        <label className="mt-2" htmlFor="name">
          İsim:
          <div>
            <input
              value={infos.name}
              onChange={(e) => setInfos({ ...infos, name: e.target.value })}
              className="border border-gray-600 rounded py-2 px-3 text-sm  w-52"
              type="text"
              placeholder="Dükkan Adı"
              name="name"
              id="name"
              maxLength="100"
            />
          </div>
        </label>
        <label className="mt-2" htmlFor="city">
          Şehir:
          <div>
            <select
              onChange={handleCityChange}
              className="border border-gray-600 rounded py-2 px-3 text-sm  w-52"
              name="city"
              id="city"
            >
              <option disabled selected value>
                Seçiniz
              </option>
              {Object.entries(cities).map((city) => (
                <option
                  selected={city[1] === infos.city ? true : false}
                  value={city[0]}
                  city={city[1]}
                >
                  {city[1]}
                </option>
              ))}
            </select>
          </div>
        </label>
        <label className="mt-2" htmlFor="city">
          Vergi Dairesi:
          <div>
            <select
              onChange={(e) =>
                setInfos({ ...infos, administration: e.target.value })
              }
              className="border border-gray-600 rounded py-2 px-3 text-sm  w-52"
              name="city"
              id="city"
            >
              <option disabled selected value>
                Seçiniz
              </option>
              {Object.entries(taxes).map((tax) => {
                return (
                  <option
                    selected={
                      tax[1].administration === infos.administration
                        ? true
                        : false
                    }
                    value={tax[1].administration}
                  >
                    {tax[1].administration}
                  </option>
                );
              })}
            </select>
          </div>
        </label>
        <label className="mt-2" htmlFor="address">
          Adres:
          <div>
            <textarea
              onChange={(e) => setInfos({ ...infos, address: e.target.value })}
              className="resize-none w-4/6 h-24 border border-gray-600 rounded py-2 px-3 text-sm"
              name="address"
              id="address"
              cols="30"
              rows="10"
              placeholder="Adresiniz"
              value={infos.address}
            ></textarea>
          </div>
        </label>
        <label htmlFor="phoneNumber">
          Telefon Numarası:
          <div>
            <input
              value={infos.phoneNumber}
              onChange={(e) =>
                setInfos({ ...infos, phoneNumber: e.target.value })
              }
              className="border border-gray-600 rounded py-2 px-3 text-sm  w-52"
              type="text"
              placeholder="555 555 55 55"
              name="phoneNumber"
              id="phoneNumber"
            />
          </div>
        </label>
        <label htmlFor="budget">
          Bakiye:
          <div>
            <input
              value={infos.budget}
              onChange={(e) => setInfos({ ...infos, budget: e.target.value })}
              className="border border-gray-600 rounded py-2 px-3 text-sm w-52"
              type="number"
              placeholder="Yeni müşteri için 0 yazınız"
              name="budget"
              id="budget"
            />
          </div>
        </label>

        <button
          type="submit"
          onClick={!isEdit ? handleAddClient : handleEditClient}
          className="flex flex-row items-center justify-center px-4 py-2 bg-red-600 text-slate-50 mt-4 rounded-md text-white w-40"
        >
          {!isEdit ? "Ekle" : "Kaydet"}
        </button>
      </form>
      {error && <span className="text-red-600 text-sm font-bold">{error}</span>}
    </div>
  );
};

export default withAddComponents(AddClient);
