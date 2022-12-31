import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, addUser } from "../actions";
import { getUser } from "../selectors";

const Login = () => {
  const user = useSelector(getUser);

  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const [isLogin, setIsLogin] = useState("login");

  const handleClickButton = (e) => {
    e.preventDefault();
    const isCorrectLoginCreds = credentials.email && credentials.password;
    const isCorrectSignupCreds = isCorrectLoginCreds && credentials.fullName;
    if (isLogin === "login" && isCorrectLoginCreds) {
      dispatch(loginUser(credentials));
    } else if (isLogin === "signup" && isCorrectSignupCreds) {
      dispatch(addUser(credentials));
    }
  };

  if (user.email) {
    window.location.href = "/anasayfa";
    return;
  }
  const loginRenderer = () => {
    if (isLogin === "signup") {
      return (
        <>
          <input
            type="email"
            placeholder="ornek@ornek.com"
            className="text-sm border rounded-sm border-slate-300 m-4 px-2 py-1 w-60"
            name="email"
            id="email"
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Sifre"
            className="text-sm border rounded-sm border-slate-300 m-4 px-2 py-1 w-60"
            name="password"
            id="password"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
          <input
            type="fullName"
            placeholder="Ali Veli"
            className="text-sm border rounded-sm border-slate-300 m-4 px-2 py-1 w-60"
            name="fullName"
            id="fullName"
            onChange={(e) =>
              setCredentials({ ...credentials, fullName: e.target.value })
            }
          />
          <button
            type="submit"
            className="flex flex-row items-center justify-center px-4 py-2 bg-red-600 text-slate-50 m-4 w-24 rounded-md"
            onClick={handleClickButton}
          >
            Kaydol
          </button>
          <span>
            Hesabin var mi?{" "}
            <span className="text-red-600" onClick={() => setIsLogin("login")}>
              Giriş yap
            </span>
          </span>
        </>
      );
    } else {
      return (
        <>
          <input
            type="email"
            placeholder="ornek@ornek.com"
            className="text-sm border rounded-sm border-slate-300 m-4 px-2 py-1 w-60"
            name="email"
            id="email"
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Sifre"
            className="text-sm border rounded-sm border-slate-300 m-4 px-2 py-1 w-60"
            name="password"
            id="password"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
          <button
            type="submit"
            className="flex flex-row items-center justify-center px-4 py-2 bg-red-600 text-slate-50 m-4 w-24 rounded-md"
            onClick={handleClickButton}
          >
            Giriş yap
          </button>
          <span>
            Hesabin yok mu?{" "}
            <span className="text-red-600" onClick={() => setIsLogin("signup")}>
              Sign Up
            </span>
          </span>
        </>
      );
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <h2 className="font-bold">{isLogin?.toUpperCase()}</h2>
      {loginRenderer()}
    </div>
  );
};

export default Login;
