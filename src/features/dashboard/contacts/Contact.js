import React, { useEffect, useState } from "react";
import Heading from "../../../hooks/Heading";
import Subheading from "../../../hooks/Subheading";
import Input from "../../../elements/Input";
import { useForm } from "react-hook-form";
import {
  MaxNameLength,
  MaxURLLength,
  MinNameLength,
  MinURLLength,
} from "../../../config/minMax";
import {
  abnPattern,
  emailPattern,
  mobilePattern,
  namePattern,
  phonePattern,
} from "../../../config/regexPatterns";
import RadioGrp from "../../../elements/RadioGrp";
import FormCheckbox from "../../../elements/FormCheckbox";
import ContactAddress from "./ContactAddress";
import TextArea from "../../../elements/TextArea";
import {
  useAddNewContactMutation,
  useDeleteContactMutation,
  useGetContactQuery,
  useUpdateContactMutation,
} from "./contactApiSlice";
import useAuth from "../../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { useNavigate, u } from "react-router-dom";
import SubmitBtn from "../../../elements/SubmitBtn";
import CancelBtn from "../../../elements/CancelBtn";
import ErrorMsg from "../../../hooks/ErrorMsg";
import LoadingMsg from "../../../hooks/LoadingMsg";
import DeleteBtn from "../../../elements/DeleteBtn";
import DeleteConfirmationDialog from "../../../hooks/DeleteConfirmationDialog";
import { toastAlerts } from "../../../hooks/utils";

const Contact = () => {
  const { id } = useAuth();
  const { cID } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: !cID && {
      contactType: "Personal",
      contactisEmergencyContact: true,
    },
  });

  const {
    data,
    isLoading: contactIsLoading,
    isError: contactIsError,
  } = useGetContactQuery(cID, {
    refetchOnMountOrArgChange: true,
    skip: !cID,
  });

  const options = ["Personal", "Emergency Services", "Local Authority"];
  const sameAddress = watch("contactAddIsSame");
  const watchDesignation = watch("contactDesignation");

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [
    updateContact,
    {
      isLoading: updateIsLoading,
      isSuccess: updateIsSuccess,
      isError: updateIsError,
      error,
    },
  ] = useUpdateContactMutation();

  const [addNewContact, { isLoading, isError, isSuccess }] =
    useAddNewContactMutation();

  const [
    deleteContact,
    // { isLoading: deleteloading, isSuccess, isError, error },
  ] = useDeleteContactMutation();

  const handleContactForm = async ({
    abn,
    add1,
    add2,
    postcode,
    state,
    city,
    contactId,
    contactisEmergencyContact,
    contactType,
    email,
    firstName,
    lastName,
    mobileNo,
  }) => {
    //TODO: Add conditional logic
    const res = cID
      ? await updateContact({
          cID: cID,
          userId: id,
          contactType: contactType,
          isEmergencyContact: contactisEmergencyContact,
          firstName: firstName,
          lastName: lastName,
          email: email,
          mobileNo: mobileNo,
          address: {
            addressLine1: add1,
            addressLine2: add2,
            city: city,
            state: state,
            postalCode: postcode,
          },
        })
      : await addNewContact({
          userId: id,
          contactType: contactType,
          isEmergencyContact: contactisEmergencyContact,
          firstName: firstName,
          lastName: lastName,
          email: email,
          mobileNo: mobileNo,
          address: {
            addressLine1: add1,
            addressLine2: add2,
            city: city,
            state: state,
            postalCode: postcode,
          },
        });
    if (res?.data?.isError || res?.error) {
      toastAlerts({ type: "error", message: "There was some error!" });
    } else {
      toastAlerts({
        type: "success",
        message: cID ? "Contact is updated!" : "New contact created!",
      });
      navigate("/dashboard/contacts");
    }
  };

  useEffect(() => {
    if (data) {
      reset({
        abn: data?.abn,
        add1: data?.billingAddress?.addressLine1,
        add2: data?.billingAddress?.addressLine2,
        postcode: data?.billingAddress?.postalCode,
        state: data?.billingAddress?.state,
        city: data?.billingAddress?.city,
        postalAdd1: data?.shippingAddress?.addressLine1,
        postalAdd2: data?.shippingAddress?.addressLine2,
        postalPostCode: data?.shippingAddress?.postalCode,
        postalCity: data?.shippingAddress?.city,
        postalState: data?.shippingAddress?.state,
        phoneNo: data?.phoneNo,
        contactDesignation: data?.designation,
        contactId: data?.contactId,
        contactisEmergencyContact: data?.isEmergencyContact,
        companyName: data?.companyName,
        contactNotes: data?.notes,
        contactType: data?.contactType,
        email: data?.email,
        firstName: data?.firstName,
        lastName: data?.lastName,
        mobileNo: data?.mobileNo,
        websiteURL: data?.websiteURL,
      });
    }
  }, [data]);

  const handleDeleteContact = async () => {
    const res = await deleteContact({ id: cID });

    setShowDeletePopup(false);

    if (res?.data?.isError || res?.error) {
      toastAlerts({ type: "error", message: "There was some error!" });
    } else {
      toastAlerts({
        type: "success",
        message: "Contact deleted successfully!",
      });
      navigate("/dashboard/contacts");
    }
  };
  if (contactIsLoading && cID) {
    return <LoadingMsg />;
  }
  if (contactIsError && cID) {
    return <ErrorMsg />;
  }
  return (
    <div>
      <Heading heading={cID ? "Update contact" : "Create new contact"} />
      <form className="w-full" onSubmit={handleSubmit(handleContactForm)}>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow md:flex md:flex-col md:items-start md:justify-center md:p-6 xl:p-8">
          <Subheading subheading="Details" />
          <div className="grid grid-cols-6 gap-6">
            <RadioGrp
              id="contact-type"
              register={register}
              errors={errors}
              name="contactType"
              required={true}
              requiredMessage="Contact Type is required"
              options={options}
              needHeading={true}
              heading="Contact Type"
            />

            <Input
              id="contact-firstName"
              name="firstName"
              label="First Name"
              placeholder=""
              key="contact-firstName"
              type="text"
              errors={errors}
              pattern={namePattern}
              register={register}
              min={MinNameLength}
              max={MaxNameLength}
              required={true}
            />
            <Input
              id="contact-lastName"
              name="lastName"
              label="Last Name"
              placeholder=""
              key="contact-lastName"
              type="text"
              errors={errors}
              pattern={namePattern}
              register={register}
              min={MinNameLength}
              max={MaxNameLength}
              required={true}
            />

            <Input
              id="contact-email"
              name="email"
              label="Email"
              key="contact-email"
              type="email"
              errors={errors}
              pattern={emailPattern}
              register={register}
              required={false}
            />
            <Input
              id="contact-mobileNo"
              name="mobileNo"
              label="Mobile Number"
              placeholder="e.g. XXXX XXX XXX"
              key="contact-mobileNo"
              type="text"
              errors={errors}
              pattern={mobilePattern}
              register={register}
              required={false}
            />

            <FormCheckbox
              id="contact-isEmergencyContact"
              key="contact-isEmergencyContact"
              name="contactisEmergencyContact"
              errors={errors}
              register={register}
              required={false}
              label="is Emergency Contact"
            />
          </div>
        </div>
        <div className="p-4 mt-6 bg-white dark:bg-gray-800 rounded-lg shadow md:flex md:flex-col md:items-start md:justify-center md:p-6 xl:p-8">
          <Subheading subheading="Address" />
          <ContactAddress errors={errors} register={register} />
        </div>

        <div className="col-span-6 mt-6 flex gap-4 justify-between sm:col-full">
          <div>
            <CancelBtn handleClick={() => navigate("/dashboard/contacts")} />
            <SubmitBtn text={cID ? "Update" : "Save"} />
          </div>
          {cID && <DeleteBtn handleClick={() => setShowDeletePopup(true)} />}
        </div>
      </form>
      <DeleteConfirmationDialog
        open={showDeletePopup}
        onClose={() => setShowDeletePopup(!showDeletePopup)}
        onConfirm={handleDeleteContact}
      />
    </div>
  );
};

export default Contact;
