import { useCallback, useEffect, useMemo } from "react";

import { useNavigate } from "react-router";

import { Form, Input, Select, notification, ConfigProvider } from "antd";

import { useForm, Controller } from "react-hook-form";

import { Button } from "../../shared/Button";

import { authService } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";

import loginImage from "../../assets/login.svg";

import style from "./index.module.css";

const DALAY_NAVIGATE_VALUE = 1500;

export const RegisterForm = () => {
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  const {
    state: { error, message },
    dispatch,
  } = useAuth();

  useEffect(() => {
    if (error) {
      api.error({
        title: "Ошибка",
        description: message || "Произошла ошибка при регистрации",
        placement: "topRight",
        duration: 2,
      });
    }
  }, [error, message, api, dispatch]);

  const formConfig = {
    defaultValues: {
      username: "",
      email: "",
      password: "",
      gender: "male",
      age: null,
    },
    mode: "onBlur",
  };

  const formRules = useMemo(
    () => ({
      login: {
        required: "Login is required",
        pattern: {
          value: /^[A-Za-z0-9]+$/,
          message: "Invalid login",
        },
      },
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
            return "Password must be at least 6 characters";
          }
          if (!(/\d/.test(value) && /[@#$%^&*()]/.test(value))) {
            return "Must be contain at number and special character";
          }
        },
      },
      age: {
        required: {
          value: true,
          message: "User age is required",
        },
        validate: (value) => {
          if (Number(value) < 18) {
            return "Minimum age 18 years";
          }
        },
      },
    }),
    [],
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm(formConfig);

  const handleRegisterUser = useCallback(
    async (userData) => {
      try {
        await authService.register(dispatch, userData);

        localStorage.setItem("userEmail", userData.email);

        api.success({
          message: "Успех",
          description: "Регистрация прошла успешно!",
          placement: "topRight",
          duration: 3,
        });
        reset();
        setTimeout(() => navigate("/login"), DALAY_NAVIGATE_VALUE);
      } catch (e) {
        console.error(e);
      }
    },
    [dispatch, navigate, reset, api],
  );

  return (
    <div>
      <div className={style.registerForm}>
        {contextHolder}
        <h1>Регистрация</h1>
        <ConfigProvider
          theme={{
            components: {
              Select: {
                selectorBg: "rgba(255, 255, 255, 0.08)",
                colorBorder: "rgba(255, 255, 255, 0.15)",
                colorText: "white",
                colorTextPlaceholder: "rgba(255, 255, 255, 0.5)",
                borderRadius: 8,
                controlHeight: 30,
                paddingInline: 14,
                paddingBlock: 8,
                fontSize: 13,
                optionSelectedBg: "rgba(255, 107, 157, 0.25)",
                optionActiveBg: "rgba(255, 107, 157, 0.15)",
                colorPrimaryHover: "#ff6b9d",
                colorPrimary: "#ff6b9d",
                optionSelectedColor: "white",
                optionFontSize: 13,
                optionPadding: "8px 12px",
                optionLineHeight: 1.3,
              },
            },
          }}
        >
          <Form
            onFinish={handleSubmit(handleRegisterUser)}
            layout="vertical"
            name="basic"
            autoComplete="off"
          >
            <Form.Item
              label="username"
              required
              validateStatus={errors.username ? "error" : ""}
              help={errors.username?.message}
            >
              <Controller
                control={control}
                name="username"
                rules={formRules.username}
                render={({ field }) => <Input placeholder="login" {...field} />}
              />
            </Form.Item>
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

            <Form.Item name="gender" label="gender" required>
              <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                  <Select placeholder="Select gender" {...field}>
                    <Select.Option value="male">Man</Select.Option>
                    <Select.Option value="women">Women</Select.Option>
                  </Select>
                )}
              />
            </Form.Item>

            <Form.Item
              label="age"
              required
              validateStatus={errors.age ? "error" : ""}
              help={errors.age?.message}
            >
              <Controller
                control={control}
                name="age"
                required
                rules={formRules.age}
                render={({ field }) => <Input type="number" {...field} />}
              />
            </Form.Item>
            <Button
              disabled={!isDirty || !isValid}
              className={style.button}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </ConfigProvider>
      </div>
      <Button onClick={() => navigate("/login")} className={style.buttonLogin}>
        <img className={style.loginImage} src={loginImage} alt="Login"></img>
        Log in
      </Button>
    </div>
  );
};
