"use client";

import React from "react";
import Link from "next/link";

const SystemData = () => {
  return (
    <div className="bg-[#0c1428] rounded-xl py-1 text-white flex flex-col h-full w-full">

      {/* Buttons Section */}
      <div className="flex justify-center gap-7">
        {/* Export CSV Button */}
        <Link href="https://example.com/dummy-csv" target="_blank">
          <button className="px-2 py-0.5 text-xs border-2 border-cyan-400 text-cyan-400 bg-[#0c1428] rounded-md transition-all hover:bg-cyan-400 hover:text-[#0c1428]">
            Export CSV
          </button>
        </Link>
        {/* Export PDF Button */}
        <Link href="https://example.com/dummy-pdf" target="_blank">
          <button className="px-2 py-0.5 text-xs   border-2 border-pink-400 text-pink-400 bg-[#0c1428] rounded-lg transition-all hover:bg-pink-400 hover:text-[#0c1428]">
            Export PDF
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SystemData;
