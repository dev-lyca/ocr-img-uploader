"use client";
import { useState } from "react";

const tabs = ["extracted text", "search", "export"];

const extractedText = `INVOICE #4021
Date: March 12, 2025
Bill To: <highlight>Acme Corp</highlight>

Item          Qty    Price
──────────────────────────
Web Design    1      <highlight>$2,400.00</highlight>
Hosting       12     $180.00
──────────────────────────

<total>Total: $2,580.00</total>

Due: April 1, 2025`;

const searchResults = [
  {
    filename: "invoice_scan_042.jpg",
    time: "2 min ago",
    preview: `...INVOICE #4021 · Bill To: Acme Corp · Total: <highlight>$2,580.00</highlight> ...`,
  },
  {
    filename: "receipt_march.png",
    time: "yesterday",
    preview: `...<highlight>Invoice</highlight> ref #3988 · payment confirmed · $940.00...`,
  },
];

function renderLine(line: string) {
  const parts = line.split(
    /(<highlight>.*?<\/highlight>|<total>.*?<\/total>)/g,
  );
  return parts.map((part, i) => {
    if (part.startsWith("<highlight>")) {
      return (
        <span key={i} className="text-[#c8ff00]">
          {part.replace(/<\/?highlight>/g, "")}
        </span>
      );
    }
    if (part.startsWith("<total>")) {
      return (
        <span key={i} className="text-[#c8ff00] font-bold">
          {part.replace(/<\/?total>/g, "")}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function renderPreview(text: string) {
  return renderLine(text);
}

export function Details() {
  const [activeTab, setActiveTab] = useState("extracted text");
  const [query, setQuery] = useState("invoice");

  return (
    <div className="flex flex-col w-full font-mono text-zinc-300 bg-[#0d0d0d] min-h-screen p-4 gap-4">
      {/* Tabs */}
      <div className="flex gap-6 border-b border-zinc-800 pb-0">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-xs tracking-widest pb-2 transition-colors ${
              activeTab === tab
                ? "text-zinc-100 border-b-2 border-zinc-100"
                : "text-zinc-600 hover:text-zinc-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Extracted Text Box */}
      <div className="bg-[#111214] border border-zinc-800 rounded-xl p-5 text-xs leading-7 whitespace-pre-wrap">
        {extractedText.split("\n").map((line, i) => (
          <div key={i}>{renderLine(line)}</div>
        ))}
      </div>

      {/* Search Results Label */}
      <p className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
        Search Results
      </p>

      {/* Search Input */}
      <div className="flex gap-2 items-center">
        {/* <Input
          classNames={{
            base: "flex-1",
            inputWrapper:
              "bg-[#141414] border border-zinc-700 rounded-lg hover:border-zinc-500 focus-within:border-zinc-400 h-9",
            input: "font-mono text-xs text-zinc-300 placeholder:text-zinc-600",
          }}
        /> */}
        <button className="w-9 h-9 flex items-center justify-center bg-[#141414] border border-zinc-700 rounded-lg hover:border-zinc-500 transition-colors shrink-0">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#a1a1aa"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>

      {/* Search Result Cards */}
      <div className="flex flex-col gap-2">
        {searchResults.map((result, i) => (
          <div
            key={i}
            className="bg-[#111214] border border-zinc-800 rounded-xl px-4 py-3 hover:border-zinc-600 transition-colors cursor-pointer"
          >
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2 text-zinc-300 text-xs">
                {/* File icon */}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#71717a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                {result.filename}
              </div>
              <span className="text-[10px] text-zinc-600">{result.time}</span>
            </div>
            <p className="text-[11px] text-zinc-500 leading-5">
              {renderPreview(result.preview)}
            </p>
          </div>
        ))}
      </div>

      {/* Export Buttons */}
      <div className="flex gap-2 mt-auto pt-2">
        {[
          {
            label: "copy",
            icon: (
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            ),
          },
          {
            label: ".txt",
            icon: (
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            ),
          },
          {
            label: "pdf",
            icon: (
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            ),
          },
        ].map(({ label, icon }) => (
          <button
            key={label}
            className="flex-1 flex items-center justify-center gap-2 bg-[#141414] border border-zinc-700 rounded-xl py-2.5 text-xs text-zinc-400 hover:border-zinc-500 hover:text-zinc-200 transition-colors"
          >
            {icon}
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
