import React, { useState } from "react";
import { UploadCloud, FileText, X } from "lucide-react";
import axios from "axios";

const UploadPage = () => {

  // 🔥 STATES
  const [file, setFile] = useState(null);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const [loading, setLoading] = useState(false);

  // 🔥 FILE HANDLE
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // 🔥 UPLOAD API
  const handleUpload = async () => {
    if (!file || !subject) {
      alert("Please select file and subject ❌");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      // 🔥 FORM DATA (IMPORTANT)
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", subject);
      formData.append("subject", subject);
      formData.append("description", description);
      formData.append("tags", tags);

      const res = await axios.post(
        "http://localhost:5000/api/notes/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload Success:", res.data);
      alert("Note uploaded successfully 🚀");

      // reset
      setFile(null);
      setSubject("");
      setDescription("");
      setTags("");

    } catch (err) {
      console.log("Upload error:", err);
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      
      {/* HEADER */}
      <h1 className="text-2xl font-semibold mb-1">Upload Notes</h1>
      <p className="text-gray-500 mb-6">
        Upload your study material and let AI help you learn better
      </p>

      {/* UPLOAD BOX */}
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center hover:border-blue-500 transition">

        <input
          type="file"
          className="hidden"
          id="fileInput"
          onChange={handleFileChange}
        />

        <label htmlFor="fileInput" className="cursor-pointer">
          <div className="flex flex-col items-center gap-3">
            <UploadCloud size={40} className="text-blue-500" />
            <p className="text-lg font-medium">
              Drag & drop files here
            </p>
            <p className="text-gray-500 text-sm">
              or click to browse (PDF, DOCX)
            </p>
          </div>
        </label>
      </div>

      {/* FILE PREVIEW */}
      {file && (
        <div className="mt-6 bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="text-blue-500" />
            <div>
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-gray-500">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>

          <X
            className="cursor-pointer text-gray-400 hover:text-red-500"
            onClick={() => setFile(null)}
          />
        </div>
      )}

      {/* FORM SECTION */}
      <div className="mt-6 bg-white p-6 rounded-xl shadow-sm">
        
        {/* Subject */}
        <div className="mb-4">
          <label className="text-sm font-medium">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Data Structures"
            className="w-full mt-1 px-3 py-2 bg-gray-100 rounded-lg outline-none"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add some details..."
            className="w-full mt-1 px-3 py-2 bg-gray-100 rounded-lg outline-none"
            rows="3"
          />
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="text-sm font-medium">Tags</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. DSA, Trees, Graph"
            className="w-full mt-1 px-3 py-2 bg-gray-100 rounded-lg outline-none"
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Uploading..." : "Upload & Process"}
        </button>

      </div>

    </div>
  );
};

export default UploadPage;