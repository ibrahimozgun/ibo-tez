import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./views/Login";
import { INIT_APP_REQUEST } from "./actionTypes";
import Home from "./views/Home";
import { getAppReady, _getApp } from "./selectors/appSelector";
import { initAppRequest } from "./actions";
import Loading from "./components/Loading";
import Client from "./views/Client";
import Category from "./views/Category";
import Product from "./views/Product";
import Transaction from "./views/Transaction";

/** TODO:
 * RECEIPTS - filter
 */

function App() {
  const dispatch = useDispatch();
  const isAppReady = useSelector((state) => getAppReady(state));

  useEffect(() => {
    dispatch(initAppRequest());
  }, []);

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [window.location.pathname]);

  if (!isAppReady) {
    return (
      <div className="w-full h-full bg-white">
        <Loading />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/anasayfa" element={<Home />} />
        <Route exact path="/musteri" element={<Client />} />
        <Route exact path="/kategori" element={<Category />} />
        <Route exact path="/urun" element={<Product />} />
        <Route exact path="/fatura" element={<Transaction />} />
        <Route exact path="/giris" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
