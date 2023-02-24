import { useState, useContext } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import AuthServices from "../services/AuthServices";
import { notifyError, notifySuccess } from "../utils/toast";
import Cookies from "js-cookie";

const useLoginSubmit = () => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);

    if (data.email && data.password && data.phone && data.password) {
      AuthServices.register(data)
        .then((res) => {
          notifySuccess(res.message);
          setLoading(false);
          dispatch({ type: "USER_LOGIN", payload: res.data });
          Cookies.set("userInfo", JSON.stringify(res.data));

          navigate("/homepage");
        })
        .catch((err) => {
          notifyError(
            err.response.data.message ? err.response.data.message : err.message
          );
        });
    } else {
      AuthServices.login({ email: data.email, password: data.password })
        .then((res) => {
          notifySuccess(res.message);
          setLoading(false);
          dispatch({ type: "USER_LOGIN", payload: res.data });
          Cookies.set("userInfo", JSON.stringify(res.data));
          navigate("/homepage");
        })
        .catch((err) => {
          notifyError(
            err.response.data.message ? err.response.data.message : err.message
          );
        });
    }
  };

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    loading,
  };
};

export default useLoginSubmit;
