import React, { useState } from "react";
import { Link } from "react-router-dom";
import PopUpModal from "../hooks/PopupModal";

const SelectWithAdd = ({
  options,
  id,
  label,
  register,
  errors,
  name,
  optWithGrp,
  objvalue,
  required,
  addTitle,
  reset,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const errorMessage = errors[name]?.message;

  const validateSelectOption = (value) => {
    // Custom validation logic based on the selected value
    if (value === "") {
      return `${label} is required`; // Return an error message
    }
    return true; // Return true if validation passes
  };
  const handleSelectChange = (e) => {
    const selectedOption = e.target.value;
    console.log(selectedOption);
    if (selectedOption === "add") {
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    
  };
  return (
    <div className="col-span-6 sm:col-span-3">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>
      <select
        {...register(name, {
          required: { value: required, message: `${label} is required` },
          validate: required ? validateSelectOption : true,
        })}
        id={id}
        className={`shadow-sm border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 ${
          errors[name]
            ? "bg-red-50 border-red-400 focus:ring-red-500 focus:border-red-500 dark:border-red-600 dark:placeholder-red-400   dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
            : "bg-gray-50 border-gray-300 focus-visible:border-blue-500 focus:border-blue-500   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        }   `}
        onChange={handleSelectChange}
      >
        {" "}
        <option disabled value="" selected>
          {" "}
          Select
        </option>
        <option value="add"> + {addTitle}</option>
        {optWithGrp
          ? options?.map((grp) => (
              <optgroup label={grp}>
                {grp.map((opt) => (
                  <option key={opt} value={opt} className="p-2">
                    {opt}
                  </option>
                ))}
              </optgroup>
            ))
          : options?.map((opt, i) => (
              <option key={opt[objvalue]} value={opt[objvalue]} className="p-2">
                {opt[objvalue]}
              </option>
            ))}
      </select>
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {errorMessage}
        </p>
      )}
      <PopUpModal openModal={openModal} setOpenModal={setOpenModal} reset={reset} />
    </div>
  );
};

export default SelectWithAdd;
