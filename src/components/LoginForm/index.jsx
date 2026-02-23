import { useCallback, useEffect, useMemo } from "react";

import { Form, Input, notification } from "antd";

import { useForm, Controller } from "react-hook-form";

import { Button } from "../../shared/Button";
import { Loader } from "../../shared/Loader";

import { useNavigate } from "react-router";

import { authService } from "../../services/authService";

import { useAuth } from "../../hooks/useAuth";

import signUpImage from "../../assets/signUp.svg";

import style from "./index.module.css";

export const LoginForm = () => {
  const { state, dispatch } = useAuth();
  const { loading, error, message } = state;

  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (error) {
      api.error({
        title: "Ошибка",
        description: message || "Произошла ошибка при входе в систему",
        placement: "topRight",
        duration: 2,
      });
    }
  }, [error, message, api]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("userEmail");
    };
  }, []);

  const formConfig = {
    defaultValues: {
      email: localStorage.getItem("userEmail") || "",
      password: "",
    },
    mode: "onBlur",
  };

  const formRules = useMemo(
    () => ({
      email: {
        required: "Email is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email",
        },
      },
      password: {
        required: true,
        validate: (value) => {
          if (value.length < 8) {
            return "Password must be at least 8 characters";
          }
          if (!(/\d/.test(value) && /[@#$%^&*()]/.test(value))) {
            return "Must be contain at number and special character";
          }

          return true;
        },
      },
    }),
    [],
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm(formConfig);

  const handleLogin = useCallback(
    async (credentials) => {
      try {
        await authService.login(dispatch, credentials);

        navigate("/");
      } catch (e) {
        console.error(e);
      }
    },
    [dispatch, navigate],
  );

  return (
    <div>
      {contextHolder}
      <div className={style.loginForm}>
        <h1>Вход</h1>
        <Form
          onFinish={handleSubmit(handleLogin)}
          layout="vertical"
          name="basic"
          autoComplete="off"
        >
          <Form.Item
            label="email"
            required
            validateStatus={errors.email ? "error" : ""}
            help={errors.email?.message}
          >
            <Controller
              control={control}
              name="email"
              rules={formRules.email}
              render={({ field }) => <Input placeholder="email" {...field} />}
            />
          </Form.Item>
          <Form.Item
            label="password"
            required
            validateStatus={errors.password ? "error" : ""}
            help={errors.password?.message}
          >
            <Controller
              control={control}
              name="password"
              rules={formRules.password}
              render={({ field }) => (
                <Input type="password" placeholder="password" {...field} />
              )}
            />
          </Form.Item>
          <Button disabled={!isValid} className={style.button} type="submit">
            {loading ? <Loader size={{ width: 25, height: 25 }} /> : "Submit"}
          </Button>
        </Form>
      </div>
      <Button
        onClick={() => navigate("/register")}
        className={style.buttonRegistration}
      >
        <img
          className={style.signUpImage}
          src={signUpImage}
          alt="Sign Up"
        ></img>
        Sign Up
      </Button>
    </div>
  );
};
