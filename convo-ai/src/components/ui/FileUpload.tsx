"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useUploadThing } from "@/utils/uploadthing";
import { cn, formatBytes } from "@/lib/utils";
import Button from "./Button";

interface FileUploadProps {
  onUploadComplete?: () => void;
}

export default function FileUpload({ onUploadComplete }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { startUpload, isUploading } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      setSelectedFile(null);
      onUploadComplete?.();
    },
    onUploadError: (err) => {
      setError(err.message || "Upload failed. Please try again.");
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null);
      const file = acceptedFiles[0];
      if (!file) return;

      if (file.type !== "application/pdf") {
        setError("Please upload a PDF file");
        return;
      }
      if (file.size > 4 * 1024 * 1024) {
        setError("File size must be less than 4MB");
        return;
      }
      setSelectedFile(file);
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    disabled: isUploading,
  });

  const handleUpload = async () => {
    if (!selectedFile) return;
    await startUpload([selectedFile]);
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200",
          isDragActive
            ? "border-brand-500 bg-brand-50 dark:bg-brand-950/50"
            : "border-border hover:border-brand-400 hover:bg-accent",
          selectedFile && "border-brand-500 bg-brand-50 dark:bg-brand-950/50",
          isUploading && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-brand-100 flex items-center justify-center">
            <svg
              className="h-6 w-6 text-brand-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          {selectedFile ? (
            <div>
              <p className="font-medium text-foreground">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {formatBytes(selectedFile.size)}
              </p>
            </div>
          ) : (
            <div>
              <p className="font-medium text-foreground">
                {isDragActive
                  ? "Drop your PDF here"
                  : "Drag & drop your PDF here"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                or click to browse (max 4MB)
              </p>
            </div>
          )}
        </div>
      </div>

      {error && (
        <p className="mt-2 text-sm text-destructive text-center">{error}</p>
      )}

      {selectedFile && (
        <div className="mt-4 flex gap-3">
          <Button
            onClick={handleUpload}
            isLoading={isUploading}
            className="flex-1"
          >
            {isUploading ? "Processing PDF..." : "Upload & Process"}
          </Button>
          {!isUploading && (
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedFile(null);
                setError(null);
              }}
            >
              Cancel
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
