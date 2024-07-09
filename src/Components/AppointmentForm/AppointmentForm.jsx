import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { UniversalBtn } from "../UniversalBtn/UniversalBtn";
// import { Icon } from "../Icon/Icon";
import css from "./AppointmentForm.module.css";

export const AppointmentForm = ({ psychologist }) => {
  const { avatar_url, name } = psychologist;

  const getYupValidationObj = () => {
    const obj = {
      name: yup
        .string()
        .required("Name is required")
        .min(3, "Must be 3 characters or more"),
      email: yup
        .string()
        .required("Email is required")
        .matches(
          /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Email must match name@mail.com"
        ),
      phone: yup
        .string()
        .required("Phone is required")
        .matches(
          /^(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$)/,
          "Phone must match +380507778899"
        ),
      time: yup.string().required("Time is required"),
      comment: yup
        .string()
        .required("Comment is required")
        .max(160, "Must be 160 characters or less"),
    };
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

  const onSubmit = () => {
    window.location.reload();
  };
  return (
    <div>
      <div className={css.psychologistWrapper}>
        <img className={css.userImg} src={avatar_url} alt={name} width="44" />
        <div className={css.titleWrapper}>
          <p className={css.profession}>Your psychologists</p>
          <h2 className={css.titleName}>{name}</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className={css.wrapper}>
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
          <div className={css.phoneAndTimeWrapper}>
            <div className={css.fieldWrapper}>
              <label htmlFor="phone"></label>
              <div
                className={
                  errors.name
                    ? `${css.inputWrapper} ${css.inputWrapperError}`
                    : css.inputWrapper
                }
              >
                <input
                  defaultValue="+380"
                  {...register("phone")}
                  placeholder="+380"
                  id="phone"
                  type="tel"
                  className={css.input}
                />
              </div>
              {errors.phone?.message && (
                <p className={css.inputError}>{errors.phone?.message}</p>
              )}
            </div>
            <div className={css.fieldWrapper}>
              <label htmlFor="time"></label>
              <div
                className={
                  errors.name
                    ? `${css.inputWrapper} ${css.inputWrapperError}`
                    : css.inputWrapper
                }
              >
                <input
                  // defaultValue="+380"
                  {...register("time")}
                  defaultValue={"00:00"}
                  id="time"
                  type="time"
                  className={css.input}
                />
              </div>
              {errors.time?.message && (
                <p className={css.inputError}>{errors.time?.message}</p>
              )}
            </div>
          </div>

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
            <label htmlFor="comment"></label>
            <div
              className={
                errors.name
                  ? `${css.inputWrapper} ${css.inputWrapperError}`
                  : css.inputWrapper
              }
            >
              <textarea
                {...register("comment")}
                placeholder="Comment"
                id="comment"
                type="text"
                className={`${css.input} ${css.textarea}`}
              />
            </div>
            {errors.comment?.message && (
              <p className={css.inputError}>{errors.comment?.message}</p>
            )}
          </div>
        </div>
        <UniversalBtn
          type="submit"
          height={52}
          disabled={Object.keys(errors).length > 0}
        >
          Send
        </UniversalBtn>
      </form>
    </div>
  );
};
