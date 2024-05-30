import React from "react";
import {
  ArrowRightIcon,
  ClockIcon,
  MapIcon,
  MapPinIcon,
  MicrophoneIcon,
} from "@heroicons/react/24/outline";
import MyLocation from "../../hooks/MyLocation";
import { Link } from "react-router-dom";

const Welcome = () => {
  const currentTime = new Date();
  currentTime.getHours();
  const currentHour = currentTime.getHours();

  return (
    <>
      <div className="mt-4 mb-8 flex justify-between">
        <div>
          <h1 className="font-semibold text-2xl tracking-wide dark:text-white">
            {currentHour < 12
              ? "Good morning!"
              : currentHour > 12 && currentHour < 17
              ? "Good afternoon!"
              : "Good evening!"}
          </h1>
          <h2 className="text-gray-500 dark:text-gray-400">
            Your safety is our priority. <br /> You are safe anywhere{" "}
            <span>
              <MapPinIcon className="w-6 h-6 inline-flex" />
            </span>
            , anytime{" "}
            <span>
              <ClockIcon className="w-6 h-6 inline-flex" />
            </span>{" "}
            with WMS
          </h2>
          <p className="text-gray-500 dark:text-gray-400 pt-8"> </p>
          <Link
            to="/dashboard/contacts"
            className="bg-white p-4 rounded-lg dark:bg-gray-800 dark:text-white mt-6 cursor-pointer border-2 border-gray-400 block hover:text-blue-600"
          >
            Looking for emergency contacts?
            <ArrowRightIcon className="w-6 inline-flex ml-6" />
          </Link>
          <Link
            to="/dashboard/account"
            className="bg-white p-4 rounded-lg dark:bg-gray-800 dark:text-white mt-6 cursor-pointer border-2 border-gray-400 block hover:text-blue-600"
          >
            Update account details?
            <ArrowRightIcon className="w-6 inline-flex ml-6" />
          </Link>
          <Link
            to="/dashboard"
            className="bg-white p-4 rounded-lg dark:bg-gray-800 dark:text-white mt-6 cursor-pointer border-2 border-gray-400 block hover:text-blue-600"
          >
            <MicrophoneIcon className="w-6 h-6 inline-flex self-center" />
            Want to use voice commands?
            <ArrowRightIcon className="w-6 inline-flex ml-6" />
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center">
          <MyLocation />
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Welcome;
