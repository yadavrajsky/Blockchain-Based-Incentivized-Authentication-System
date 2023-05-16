import React, { useState } from "react";
// import axios from "axios";

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [convertedFile, setConvertedFile] = useState(null);

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleConvertClick = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
    //   const response = await axios.post("/api/convert", formData, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //     responseType: "blob",
    //   });

    //   const convertedFile = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });

    //   setConvertedFile(convertedFile);
    alert("File Converted")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-lg mx-auto">
        <div className="border-2 border-dotted border-black p-4">
        <label htmlFor="file-upload" className="block text-lg font-medium text-gray-700 mb-2">
          Select a PDF file to convert:
        </label>
        <input type="file" id="file-upload" className="hidden" onChange={handleFileInputChange} />
        </div>
        <div className="flex items-center justify-center my-2">
          <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded" onClick={handleConvertClick}>
            Convert to Word
          </button>
        </div>
        {convertedFile && (
          <div className="mt-4">
            <a href={URL.createObjectURL(convertedFile)} download="converted-file.docx" className="text-blue-500 hover:underline">
              Download converted file
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
