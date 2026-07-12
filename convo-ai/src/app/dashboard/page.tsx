"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Button from "@/components/ui/Button";
import FileUpload from "@/components/ui/FileUpload";
import Badge from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

interface Pdf {
  id: string;
  name: string;
  pageCount: number;
  createdAt: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [pdfs, setPdfs] = useState<Pdf[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  const fetchPdfs = useCallback(async () => {
    try {
      const res = await fetch("/api/upload");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setPdfs(data.pdfs || []);
    } catch {
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      fetchPdfs();
    }
  }, [status, fetchPdfs]);

  const pollRef = useRef<NodeJS.Timeout | null>(null);

  const handleUploadComplete = () => {
    toast.success("PDF uploaded successfully!");
    let attempts = 0;
    if (pollRef.current) clearInterval(pollRef.current);
    pollRef.current = setInterval(() => {
      fetchPdfs();
      attempts++;
      if (attempts >= 5) {
        clearInterval(pollRef.current!);
        pollRef.current = null;
      }
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  const handleDelete = async (e: React.MouseEvent, pdfId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this document?")) return;

    try {
      const res = await fetch(`/api/upload/${pdfId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setPdfs((prev) => prev.filter((p) => p.id !== pdfId));
      toast.success("Document deleted");
    } catch {
      toast.error("Failed to delete document");
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <div className="pt-24 flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-brand-600 border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Upload and chat with your PDF documents
            </p>
          </div>

          {/* Upload Section */}
          <div className="mb-10 max-w-xl">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Upload a new PDF
            </h2>
            <FileUpload
              onUploadComplete={handleUploadComplete}
            />
          </div>

          {/* PDFs List */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Your Documents
            </h2>
            {fetchError ? (
              <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
                <p className="text-red-500 mb-2">Failed to load documents</p>
                <Button variant="ghost" size="sm" onClick={() => { setFetchError(false); setLoading(true); fetchPdfs(); }}>
                  Try again
                </Button>
              </div>
            ) : pdfs.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
                <svg
                  className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-gray-500 dark:text-gray-400 mb-2">No documents yet</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Upload your first PDF to get started
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pdfs.map((pdf) => (
                  <Link
                    key={pdf.id}
                    href={`/dashboard/${pdf.id}`}
                    className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:border-brand-300 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
                        <svg
                          className="h-5 w-5 text-red-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 dark:text-gray-100 truncate group-hover:text-brand-600 transition-colors">
                          {pdf.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="info">
                            {pdf.pageCount} pages
                          </Badge>
                          <span className="text-xs text-gray-400 dark:text-gray-500">
                            {formatDate(pdf.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center text-sm text-brand-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Chat with document
                        <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      <button
                        onClick={(e) => handleDelete(e, pdf.id)}
                        className="text-sm text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        Delete
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
