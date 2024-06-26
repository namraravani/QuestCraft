import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import MobileLogo from "../../images/loginimage/MobileLogo";
import { GoMail } from "react-icons/go";
import PasswordShowHideBtn from "./PasswordShowHideBtn";
import axios from "axios";
import { javaBaseUrl } from "../../js/api.constatnt";
import { encryptData } from "../../js/secureData";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = yup.object({
    emailOrUsername: yup
      .string()
      .required("Email or Username is required")
      .test("is-email", "Invalid email address", function (value) {
        // Check if the input value is in email format
        if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,}$/.test(value)) {
          return true; // Pass the test if it's an email
        }
        // Check if the input value is a valid username
        if (/^\w+$/.test(value)) {
          return true; // Pass the test if it's a valid username
        }
        return false; // Fail the test if it's neither email nor valid username
      }),
    password: yup
      .string()
      .min(5, "Password must be at least 5 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      emailOrUsername: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    let loginData = { password: values.password };
    if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,}$/.test(values.emailOrUsername)) {
      loginData.email = values.emailOrUsername;
    } else {
      loginData.username = values.emailOrUsername;
    }

    // Submit login data
    const response = await axios.post(
      javaBaseUrl + "/api/user/login",
      loginData
    );
    if (response.status === 200) {
      localStorage.setItem("user", encryptData(response.data.data));
      navigate("/");
      toast.success("Login Successfully.");
    } else {
      // console.log(response.data);
      toast.error(response.data.message);
    }
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-full justify-center flex-wrap items-center">
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="py-17.5 px-26 text-center">
            <NavLink className="mb-5.5 inline-block" to="/">
              <h1 className="flex text-title-xl font-bold text-black">
                Questcraft
              </h1>
            </NavLink>

            <p className="2xl:px-20">
              QuestCraft is question paper generator webapp.
            </p>

            <span className="mt-15 inline-block">
              <MobileLogo />
            </span>
          </div>
        </div>

        <div className="w-1/2 h-full flex items-center border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Sign In to QuestCraft
            </h2>

            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label className="block font-medium text-black dark:text-white">
                  Username or Email
                  <div className="mt-2.5 relative">
                    <input
                      placeholder="Enter username or email"
                      name="emailOrUsername"
                      value={formik.values.emailOrUsername}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    {/* <span className="absolute right-4 top-4">
                      <GoMail size={22} fill="#b1b9c5" />
                    </span> */}
                  </div>
                  {formik.touched.emailOrUsername &&
                  formik.errors.emailOrUsername ? (
                    <div className="error">{formik.errors.emailOrUsername}</div>
                  ) : null}
                </label>
              </div>

              <div className="mb-6">
                <label className="block font-medium text-black dark:text-white">
                  Password
                  <div className="mt-2.5 relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="6+ Characters, 1 Capital letter"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <PasswordShowHideBtn
                        width={"22px"}
                        fill={"#b1b9c5"}
                        id={"pass1"}
                        onClickPassShowHide={() => handlePasswordVisibility()}
                      />
                    </span>
                  </div>
                </label>
                {formik.touched.password && formik.errors.password ? (
                  <div className="error">{formik.errors.password}</div>
                ) : null}
              </div>

              <div className="mb-5">
                <input
                  type="submit"
                  value="Sign In"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  disabled={!formik.isValid}
                />
              </div>

              <div className="mt-6 text-center">
                <p>
                  Don't have any account?{" "}
                  <Link to="/auth/signup" className="text-primary">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
