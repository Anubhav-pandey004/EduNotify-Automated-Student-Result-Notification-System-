import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { IoExitOutline } from "react-icons/io5";
import SummaryApi from "../common/index";
import { toast } from "react-toastify";
import Context from "../Context/context";
import { setUserDetails } from "../store/userSlice";
import Logo from "../assets/Logo.png"


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user1);
  const { fetchUserDetails } = useContext(Context);
  console.log("Current user is: ",user);
  
  const handleLogout = async () => {
    try {
      const res = await fetch(SummaryApi.logout.url, {
        method: SummaryApi.logout.method,
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null));
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  const handleTransition = (e) => {
    e.preventDefault();
    document.body.classList.add("transitioning");
    setTimeout(() => {
      navigate("/login");
      document.body.classList.remove("transitioning");
    }, 200);
  };

  return (
    <div className="flex lg:h-14 h-10 max-w-[100vw] bg-[#284b63] lg:px-36 px-6 py-1 shadow-lg">
      <img src={Logo} onClick={()=>{
        navigate("/")
      }} className="cursor-pointer"/>
      <div className="w-full flex justify-around items-center text-xl md:text-2xl font-semibold text-slate-600 cursor-pointer"></div>
      {!user ? (
        <div className="w-60 flex justify-center items-center ml-4">
          <Link
            to="/login"
            onClick={handleTransition}
            className="sm:py-1 px-2 rounded-md lg:text-base text-xs border bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center"
          >
            Login
          </Link>
        </div>
      ) : (
        <div className="flex items-center ml-3">

            <button
              onClick={() => navigate("/create-result")}
              className="mr-4 py-1 text-nowrap px-4 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Create Result
            </button>

            <button onClick={handleLogout} className="ml-2 flex items-center text-white">
              <IoExitOutline size={24} />
            </button>

        </div>
      )}
    </div>
  );
};

export default Header;
