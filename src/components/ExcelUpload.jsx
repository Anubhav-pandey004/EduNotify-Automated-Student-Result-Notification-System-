import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SummaryApi from "../common";

const ExcelUpload = () => {
  const user = useSelector((state) => state.user.user1);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState(user?.role);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please upload an Excel file first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("excelFile", file);

    try {
      const response = await fetch("http://localhost:8080/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setFile(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload the file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearUploads = async () => {
    try {
      const response = await fetch(SummaryApi.clearData.url, {
        method: SummaryApi.clearData.method,
        credentials: "include"
      });
      const data = await response.json();

      if (data.success) {
        toast.success("Data cleared successfully.");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error clearing uploads folder:", error);
      toast.error("Failed to clear the uploads folder. Please try again.");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".xlsx, .xls",
    onDrop,
  });

  useEffect(() => {
    const initialPath = `M 10 100 Q 500 100 990 100`;
    const finalPath = `M 10 100 Q 500 100 990 100`;
    const string = document.querySelector("#string");

    const mouseMoveHandler = (e) => {
      const path = `M 10 100 Q ${e.x * 0.3} ${e.y * 0.3} 990 100`;
      gsap.to(".line path", {
        attr: { d: path },
        duration: 0.1,
        ease: "power3.out",
      });
    };

    const mouseLeaveHandler = () => {
      gsap.to(".line path", {
        attr: { d: finalPath },
        duration: 0.5,
        ease: "elastic.out(1,0.2)",
      });
    };

    string.addEventListener("mousemove", mouseMoveHandler);
    string.addEventListener("mouseleave", mouseLeaveHandler);

    return () => {
      string.removeEventListener("mousemove", mouseMoveHandler);
      string.removeEventListener("mouseleave", mouseLeaveHandler);
    };
  }, []);

  useEffect(() => {
    setUserRole(user?.role);
  }, [user?.role]);

  return (
    <div className="p-8 flex flex-col overflow-x-hidden relative">
      <h1 className="text-2xl font-bold mb-4">Upload an Excel File</h1>

      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-400 p-8 text-center cursor-pointer hover:bg-gray-100"
      >
        <input type="file" accept=".xlsx, .xls" {...getInputProps()} />
        <p className="text-gray-500">
          Drag & drop an Excel file here, or click to select one.
        </p>
      </div>

      {file && <p className="mt-4 text-gray-700">Selected file: {file.name}</p>}

      <div className="w-[100vw] flex justify-between ">
        <button
          onClick={handleUpload}
          disabled={loading}
          className={`bg-gradient-to-r mt-6 from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold md:px-6 px-1 py-1 md:py-3 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-indigo-300 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Uploading...
            </div>
          ) : (
            "Upload"
          )}
        </button>

        {userRole === "HOD" && (
          <Link
            className="w-auto ml-5 md:px-2 sm:w-auto md:w-[15vw] sm:mr-16 bg-gradient-to-r mt-6 from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold py-3 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-indigo-300 text-center"
            to={"/personalize"}
          >
            Send Personalized Message
          </Link>
        )}

        <button
          onClick={handleClearUploads}
          className="w-auto ml-5 md:px-6  bg-red-500 text-white font-semibold rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-red-300 mr-16 mt-5"
        >
          Clear Uploads
        </button>
      </div>

      <div id="string" className="h-[200px] w-[100vw] pr-14 flex justify-center">
        <svg width="1000" className="line" height="200">
          <path
            d="M 10 100 Q 500 100 990 100"
            stroke="black"
            fill="transparent"
          />
        </svg>
      </div>
    </div>
  );
};

export default ExcelUpload;
