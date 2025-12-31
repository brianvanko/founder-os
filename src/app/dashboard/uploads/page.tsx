"use client";

import { useState, useEffect } from "react";
import { formatDate } from "@/lib/utils";

interface Upload {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  category: string | null;
  uploadedAt: Date;
}

const CATEGORIES = [
  { value: "past_annual_reviews", label: "Past Annual Reviews" },
  { value: "notes", label: "Notes & Documents" },
  { value: "reference", label: "Reference Materials" },
  { value: "other", label: "Other" },
];

export default function UploadsPage() {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUploads();
  }, []);

  const fetchUploads = async () => {
    try {
      const response = await fetch("/api/uploads");
      const data = await response.json();
      setUploads(data);
    } catch (error) {
      console.error("Failed to fetch uploads:", error);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError("File size exceeds 10MB limit");
        return;
      }

      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
        "text/markdown",
      ];
      if (!allowedTypes.includes(file.type)) {
        setError("Invalid file type. Allowed: PDF, DOCX, TXT, MD");
        return;
      }

      setSelectedFile(file);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      if (selectedCategory) {
        formData.append("category", selectedCategory);
      }

      const response = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Upload failed");
      }

      // Reset form
      setSelectedFile(null);
      setSelectedCategory("");
      (document.getElementById("file-input") as HTMLInputElement).value = "";

      // Refresh uploads list
      await fetchUploads();
    } catch (error) {
      console.error("Upload error:", error);
      setError(error instanceof Error ? error.message : "Failed to upload file");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = async (upload: Upload) => {
    try {
      const response = await fetch(`/api/uploads/${upload.id}`);
      const data = await response.json();

      if (data.url) {
        window.open(data.url, "_blank");
      }
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download file");
    }
  };

  const handleDelete = async (uploadId: string) => {
    if (!confirm("Are you sure you want to delete this file?")) return;

    try {
      const response = await fetch(`/api/uploads/${uploadId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      await fetchUploads();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete file");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const getFileIcon = (fileType: string) => {
    if (fileType === "application/pdf") return "📄";
    if (fileType.includes("wordprocessing")) return "📝";
    if (fileType === "text/plain") return "📋";
    if (fileType === "text/markdown") return "📋";
    return "📎";
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">File Uploads</h1>
        <p className="text-slate-600 mt-2">
          Upload past annual reviews, notes, and reference materials
        </p>
      </div>

      {/* Upload Form */}
      <div className="bg-white rounded-lg border-2 border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Upload File
        </h2>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="file-input"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Select File (PDF, DOCX, TXT, MD - Max 10MB)
            </label>
            <input
              id="file-input"
              type="file"
              accept=".pdf,.docx,.txt,.md"
              onChange={handleFileSelect}
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
            />
          </div>

          <div>
            <label
              htmlFor="category-select"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Category (Optional)
            </label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              <option value="">No category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className="px-6 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isUploading ? "Uploading..." : "Upload File"}
          </button>
        </div>
      </div>

      {/* Uploads List */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Your Files ({uploads.length})
        </h2>

        {uploads.length === 0 ? (
          <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
            <p className="text-slate-600">
              No files uploaded yet. Upload your first file above.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {uploads.map((upload) => (
              <div
                key={upload.id}
                className="bg-white rounded-lg border border-slate-200 p-4 flex items-center justify-between hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-2xl">
                    {getFileIcon(upload.fileType)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-slate-900 truncate">
                      {upload.fileName}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                      <span>{formatFileSize(upload.fileSize)}</span>
                      {upload.category && (
                        <>
                          <span>•</span>
                          <span className="capitalize">
                            {upload.category.replace(/_/g, " ")}
                          </span>
                        </>
                      )}
                      <span>•</span>
                      <span>{formatDate(new Date(upload.uploadedAt))}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDownload(upload)}
                    className="px-3 py-1 text-sm text-slate-600 hover:text-slate-900 font-medium"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => handleDelete(upload.id)}
                    className="px-3 py-1 text-sm text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
