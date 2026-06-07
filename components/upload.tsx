"use client";

import { Button } from "@heroui/react";
import { useRef, useState } from "react";

export function Upload() {
  const [fileName, setFileName] = useState("invoice_scan_042.jpg");
  const [fileSize, setFileSize] = useState("1.2 mb");
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      setFileSize((file.size / (1024 * 1024)).toFixed(1) + " mb");
    }
  };

  return (
    <section className="bg-[#0d0d0d] flex justify-center p-6">
      <div className="w-[680px] flex flex-col gap-4">
        <div>
          <p className="text-[11px] tracking-[0.2em] text-zinc-500 font-mono uppercase mb-2">
            Upload Image
          </p>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`
              border border-dashed rounded-xl flex flex-col items-center justify-center
              py-10 cursor-pointer transition-colors
              ${
                isDragging
                  ? "border-[#c8ff00] bg-[#c8ff0010]"
                  : "border-zinc-700 bg-[#141414] hover:border-zinc-500"
              }
            `}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFileName(file.name);
                  setFileSize((file.size / (1024 * 1024)).toFixed(1) + " mb");
                }
              }}
            />
            {/* Upload icon */}
            <div className="w-14 h-14 rounded-xl bg-[#1e1e1e] flex items-center justify-center mb-4">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#c8ff00"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="16 16 12 12 8 16" />
                <line x1="12" y1="12" x2="12" y2="21" />
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
              </svg>
            </div>
            <p className="font-mono text-sm text-zinc-300 tracking-wider mb-1">
              drop file here
            </p>
            <p className="font-mono text-xs text-zinc-600 mb-4">
              or click to browse
            </p>
            <div className="flex gap-2">
              {["JPG", "PNG", "PDF"].map((ext) => (
                <span
                  key={ext}
                  className="font-mono text-[10px] tracking-widest text-zinc-500 border border-zinc-700 rounded px-2 py-0.5"
                >
                  {ext}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Preview Section */}
        <div>
          <p className="text-[11px] tracking-[0.2em] text-zinc-500 font-mono uppercase mb-2">
            Preview
          </p>
          <div className="bg-[#141414] rounded-xl border border-zinc-800 px-4 pt-4 pb-4">
            {/* READY badge + file icon */}
            <div className="relative flex items-center justify-center h-16 mb-3">
              <span className="absolute top-0 right-0 text-[10px] font-mono tracking-widest bg-[#c8ff00] text-black px-2 py-0.5 rounded font-bold">
                READY
              </span>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3f3f3f"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>

            {/* Filename + size */}
            <div className="flex justify-between items-center mb-3">
              <span className="font-mono text-xs text-zinc-400">
                {fileName}
              </span>
              <span className="font-mono text-xs text-zinc-600">
                {fileSize}
              </span>
            </div>

            {/* Progress bar */}
            <div className="flex items-center gap-3 mb-0">
              <div className="w-2 h-2 rounded-full bg-[#c8ff00] shrink-0" />
              <span className="font-mono text-[11px] text-zinc-500 w-36 shrink-0">
                extracting text... 65%
              </span>
              <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#c8ff00] rounded-full transition-all duration-500"
                  style={{ width: "65%" }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Run OCR Button */}
        <Button
          className="w-full bg-[#c8ff00] text-black font-mono tracking-widest text-sm font-bold rounded-xl py-6 hover:bg-[#d4ff33] transition-colors"
          size="lg"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
          </svg>
          run ocr
        </Button>
      </div>
    </section>
  );
}
