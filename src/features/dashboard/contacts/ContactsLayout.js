import React from "react";
import Breadcrumbs from "../../../hooks/Breadcrumbs";
import { Outlet } from "react-router-dom";

const ContactsLayout = () => {
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
      bcName: "Contacts",
      link: "/dashboard/contacts",
      isDisabled: false,
    },
  ];
  return (
    <main className="lg:ml-64 ">
      <div className="p-4 w-full h-full bg-gray-50 dark:bg-gray-900">
        <Breadcrumbs breadcrumbList={breadcrumbList} />
        <Outlet />
      </div>
    </main>
  );
};

export default ContactsLayout;
