import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../hooks/Breadcrumbs";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { useGetContactsQuery } from "../contacts/contactApiSlice";

const Sos = () => {
  const { id, firstname, lastname, mobileNumber } = useAuth();
  const breadcrumbList = [
    {
      id: "bc1",
      type: "home",
      index: 1,
      bcName: "Dashboard",
      link: "/dashboard",
      isDisabled: false,
    },
    {
      id: "bc2",
      type: "branch",
      index: 2,
      bcName: "SOS",
      link: "/dashboard/sos",
      isDisabled: false,
    },
  ];
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(false);
  const [eContact, setEContact] = useState([]);
  const { data, isError, isLoading, isFetching, isSuccess } =
    useGetContactsQuery();

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setError(null);
        },
        (error) => {
          setError(error.message);
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  };
  const handleClick = async () => {
    try {
      // Make an HTTP POST request to our backend when the button is clicked
      setloading(true);
      const res = await axios.post(
        "http://localhost:3500/send-email",
        eContact
      );
      if (res) {
        alert("Email sent successfully!");
        setloading(false);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again later.");
    }
  };
  useEffect(() => {
    getLocation();
  }, []);
  useEffect(() => {
    if (!data?.entities) return;

    let filteredData = Object.values(data.entities).filter(
      (d) => d.isEmergencyContact
    );
    setEContact(
      filteredData.map((d) => {
        return {
          from: "vivien.halvorson@ethereal.email",
          to: d.email,
          subject: `Urgent Help needed - ${firstname} ${lastname}`,
          html: `<p>Hi,<br/> This is ${firstname} ${lastname}, reaching out to you for urgent help. <br/> <br/> Please track my location: latitude:${latitude},longitude:${longitude} and mobile number :${mobileNumber} <br/> Call anyone for help! <br/> Thanks!
    </p>`,
        };
      })
    );
  }, [data, latitude, longitude]);
  return (
    <main className="lg:ml-64 ">
      <div className="p-4 w-full h-full bg-gray-50 dark:bg-gray-900">
        <Breadcrumbs breadcrumbList={breadcrumbList} />
        <div className="flex justify-center items-center flex-col gap-6">
          <div className="bg-red-600 w-64 h-64 text-9xl rounded-full flex justify-center items-center text-white m-auto">
            sos
          </div>
          <p className="text-sm">
            *Emergency contacts and local authorities will be reached out
          </p>
          <div>
            <button
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
              onClick={handleClick}
              disabled={loading}
            >
              {!loading ? "Send Alerts" : "Sending..."}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Sos;
