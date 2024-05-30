import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../elements/Input";
import { useForm } from "react-hook-form";
import {
  emailPattern,
  mobilePattern,
  namePattern,
} from "../../config/regexPatterns";
import { MaxNameLength, MinNameLength } from "../../config/minMax";
import Stepper from "../../hooks/Stepper";
import SignupConfirmation from "./SignupConfirmation";
import Checkbox from "../../elements/Checkbox";
import { useCheckDuplicateMutation } from "../dashboard/account/user/userApiSlice";
import SignupSecurity from "./SignupSecurity";
import { useLocation } from "react-router-dom";
import { toastAlerts } from "../../hooks/utils";

import logo from "../../assets/w-logo.svg";
const Signup = () => {
  const [step, setStep] = useState({
    shortName: "Personal",
    addOnToName: "Info",
    order: 1,
    stepNo: "1",
  });
  const [steps, setSteps] = useState([
    { shortName: "Personal", addOnToName: "Info", order: 1, stepNo: "1" },
    { shortName: "Security", addOnToName: "Info", order: 2, stepNo: "2" },
    {
      shortName: "Confirmation",
      addOnToName: "",
      order: 3,
      stepNo: "3",
    },
  ]);
  const [signupData, setSignUpData] = useState();
  const features = [
    "Track your wealth",
    "Manage your investments",
    "Manage your trust",
    "Manage your Super",
  ];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const [checkDuplicate, { isLoading, isSuccess, isError, error }] =
    useCheckDuplicateMutation();
  const handleSignupSubmit = async (data) => {
    // Check if user exist
    const res = await checkDuplicate({ email: data.email });
    if (res.error) {
      return toastAlerts({
        type: "error",
        message: `${res.error.data.message}`,
      });
    } else {
      setSignUpData(data);
      setStep({
        shortName: "Security",
        addOnToName: "Info",
        order: 2,
        stepNo: "2",
      });
    }
    //
  };
  const location = useLocation();

  useEffect(() => {
    // Add event listener for beforeunload event
    const handleBeforeUnload = (event) => {
      // Check if form fields are filled
      if (location.pathname.includes("signup")) {
        // Cancel the event
        event.preventDefault();
        // Chrome requires returnValue to be set
        event.returnValue = "";
        // Show alert to the user
        return "Are you sure you want to leave? Your changes may not be saved.";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up by removing the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  return (
    <section>
      <div className="h-screen w-screen flex flex-col items-center justify-center px-6 py-8 mx-auto signup-bg">
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold text-white"
        >
          <img src={logo} alt="logo" className="w-8 h-8 rounded mr-4" />
          WMS
        </Link>

        <div className="bg-white rounded-lg shadow md:w-4/5 sm:p-8">
          <div className="p-6 space-y-4 md:space-y-6 ">
            <h1 className="mt-4 mb-6 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Join us{" "}
            </h1>
            <Stepper step={step} steps={steps} />
            <div className="p-2 space-y-4 md:space-y-6 ">
              {step.shortName === "Personal" ? (
                <form onSubmit={handleSubmit(handleSignupSubmit)}>
                  <div className="grid grid-cols-6 gap-6">
                    <>
                      <Input
                        id="profile-firstName"
                        name="firstName"
                        label="First Name"
                        placeholder="Your first name"
                        key="profile-firstName"
                        type="text"
                        errors={errors}
                        pattern={namePattern}
                        register={register}
                        min={MinNameLength}
                        max={MaxNameLength}
                        required={true}
                      />
                      <Input
                        id="profile-lastName"
                        name="lastName"
                        label="Last Name"
                        placeholder="Your last name"
                        key="profile-lastName"
                        type="text"
                        errors={errors}
                        pattern={namePattern}
                        register={register}
                        min={MinNameLength}
                        max={MaxNameLength}
                        required={true}
                      />
                      <Input
                        id="profile-email"
                        name="email"
                        label="Email"
                        placeholder="Your email address"
                        key="profile-email"
                        type="email"
                        errors={errors}
                        pattern={emailPattern}
                        register={register}
                        required={true}
                      />
                      <Input
                        id="profile-mobileNo"
                        name="mobileNo"
                        label="Mobile Number"
                        placeholder="e.g. XXX XXX XXXX"
                        key="profile-mobileNo"
                        type="text"
                        errors={errors}
                        pattern={mobilePattern}
                        register={register}
                        required={true}
                      />
                      <Input
                        id="profile-birthday"
                        name="birthday"
                        label="Birthday"
                        key="profile-birthday"
                        type="date"
                        errors={errors}
                        register={register}
                        required={true}
                      />
                    </>

                    <div className="col-span-6 sm:col-span-6">
                      <div className="flex mb-4">
                        <Checkbox
                          id="singup-terms"
                          name="terms"
                          errors={errors}
                          register={register}
                          label={
                            <>
                              By signing up, you are creating a wms account, and
                              you agree to wms's{" "}
                              <a
                                className="text-blue-600 text-primary-600 dark:text-primary-500 font-semibold"
                                href="#"
                              >
                                Terms of Use
                              </a>{" "}
                              and{" "}
                              <a
                                className="text-blue-600 text-primary-600 dark:text-primary-500 font-semibold"
                                href="#"
                              >
                                Privacy Policy
                              </a>
                              .
                            </>
                          }
                          required={true}
                        />
                      </div>
                      <div className="flex ">
                        <Checkbox
                          id="singup-newsletter"
                          name="newsletter"
                          errors={errors}
                          register={register}
                          label="Subscribe to newsletter to know all about our product offers and services."
                          required={false}
                        />
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-full">
                      <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800"
                        type="submit"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </form>
              ) : step.shortName === "Security" ? (
                <SignupSecurity signupData={signupData} setStep={setStep} />
              ) : (
                <SignupConfirmation />
              )}
            </div>
          </div>
          {step.shortName != "Confirmation" && (
            <p className="text-sm font-light text-gray-500 mt-8 mx-6">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="font-medium text-blue-500 hover:underline "
              >
                Login
              </Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Signup;
