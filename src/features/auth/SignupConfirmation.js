import { Link } from "react-router-dom";
import logo from "../../assets/w-logo.svg"
const SignupConfirmation = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-gray-600 flex justify-center items-center">
        Welcome to WMS!
      </h2>
      <img src={logo} alt="logo" className="mb-4 mt-4"/>
      <Link
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        to="/auth/login"
      >
        Lets go!
      </Link>
    </div>
  );
};

export default SignupConfirmation;