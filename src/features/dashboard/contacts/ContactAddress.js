import React from "react";
import Input from "../../../elements/Input";

const ContactAddress = ({ errors, register, sameaddress }) => {
  return (
    <div className="grid grid-cols-6 gap-6">
      <Input
        id={`contact-add1`}
        name={`add1`}
        label="Address Line 1"
        placeholder=""
        key={`contact-add1`}
        type="text"
        errors={errors}
        register={register}
        required={false}
      />
      <Input
        id={`contact-add2`}
        name={`add2`}
        label="Address Line 2"
        placeholder=""
        key={`contact-add2`}
        type="text"
        errors={errors}
        register={register}
        required={false}
      />
      <Input
        id={`contact-city`}
        name={`city`}
        label="City"
        placeholder=""
        key={`contact-city`}
        type="text"
        errors={errors}
        register={register}
        required={false}
      />
      <Input
        id={`contact-state`}
        name={`state`}
        label="State"
        placeholder=""
        key={`contact-state`}
        type="text"
        errors={errors}
        register={register}
        required={false}
      />
      <Input
        id={`contact-postCode`}
        name={`postCode`}
        label="Postal Code"
        placeholder=""
        key={`contact-postCode`}
        type="text"
        errors={errors}
        register={register}
        required={false}
      />
    </div>
  );
};

export default ContactAddress;
