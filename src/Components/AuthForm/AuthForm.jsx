import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../hooks/useAuth";

import { toast } from "react-toastify";
import { UniversalBtn } from "../UniversalBtn/UniversalBtn";
import { ACTION_OPTIONS } from "../../constants/actionOptionsConstants";
import { Icon } from "../Icon/Icon";
import css from "./AuthForm.module.css";

export const AuthForm = ({ actionOption }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { signIn, signUp, isUserLoading } = useAuth();

  const getYupValidationObj = () => {
    const obj = {
      email: yup
        .string()
        .required("Email is required")
        .matches(
          /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Email must match name@mail.com"
        ),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "Must be 6 characters or more"),
    };
    if (actionOption.type === ACTION_OPTIONS.signUp.type) {
      obj.name = yup
        .string()
        .required("Name is required")
        .min(3, "Must be 3 characters or more");
    }
    return obj;
  };

  const schema = yup.object().shape(getYupValidationObj()).required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const handlePasswordBtnClick = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const onSubmit = async (credential) => {
    try {
      const action =
        actionOption.type === ACTION_OPTIONS.signUp.type ? signUp : signIn;

      await action(credential);

      const toastMsg =
        actionOption.type === ACTION_OPTIONS.signUp.type
          ? `User ${credential.name} was succesfully registered.`
          : `User ${credential.email} was succesfully logged in.`;

      toast.success(toastMsg);
    } catch (error) {
      toast.error(`Ooops, something went wrong! ${error.message}`);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className={css.wrapper}>
        {actionOption.type === ACTION_OPTIONS.signUp.type && (
          <div className={css.fieldWrapper}>
            <label htmlFor="name"></label>
            <div
              className={
                errors.name
                  ? `${css.inputWrapper} ${css.inputWrapperError}`
                  : css.inputWrapper
              }
            >
              <input
                {...register("name")}
                placeholder="Name"
                id="name"
                type="text"
                className={css.input}
              />
            </div>
            {errors.name?.message && (
              <p className={css.inputError}>{errors.name?.message}</p>
            )}
          </div>
        )}

        <div className={css.fieldWrapper}>
          <label htmlFor="email"></label>
          <div
            className={
              errors.email
                ? `${css.inputWrapper} ${css.inputWrapperError}`
                : css.inputWrapper
            }
          >
            <input
              {...register("email")}
              placeholder="Email"
              id="email"
              type="email"
              className={css.input}
            />
          </div>
          {errors.email && (
            <p className={css.inputError}>{errors.email?.message}</p>
          )}
        </div>

        <div className={css.fieldWrapper}>
          <label htmlFor="password"></label>
          <div
            className={
              errors.password
                ? `${css.inputWrapper} ${css.inputWrapperError}`
                : css.inputWrapper
            }
          >
            <input
              {...register("password")}
              placeholder="Password"
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              className={css.input}
            />
            <button
              type="button"
              className={css.inputIcon}
              onClick={handlePasswordBtnClick}
            >
              {isPasswordVisible ? (
                <Icon iconName={"icon-eye"} />
              ) : (
                <Icon iconName={"icon-eye-off"} />
              )}
            </button>
          </div>
          {errors.password?.message && (
            <p className={css.inputError}>{errors.password?.message}</p>
          )}
        </div>
      </div>
      <UniversalBtn
        type="submit"
        height={52}
        isLoading={isUserLoading}
        disabled={Object.keys(errors).length > 0}
      >
        {actionOption.title}
      </UniversalBtn>
    </form>
  );
};
