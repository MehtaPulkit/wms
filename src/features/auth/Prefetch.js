import { store } from "../../app/store";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { userApiSlice } from "../dashboard/account/user/userApiSlice";
const Prefetch = () => {
  useEffect(() => {
    // store.dispatch(
    //   userApiSlice.util.prefetch("getUsers", "usersList", { force: true })
    // );
    // store.dispatch(
    //   addressApiSlice.util.prefetch("getAddresses", "addressesList", { force: true })
    // );
  }, []);

  return <Outlet />;
};
export default Prefetch;
