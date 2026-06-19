"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      let res = await axios.get("/api/views");
      if (res.data && typeof res.data.count === "number") {
        setCount(res.data.count);
      }
    };
    fetchCount();
  }, []);

  return (
    <div className="flex items-center gap-2 px-3.5 py-1.5 bg-[#0d0d0d] border border-zinc-800/60 rounded-full text-xs text-zinc-500 font-mono w-fit">
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span>
        {count !== null
          ? `${count.toLocaleString()} total visitors`
          : "loading views..."}
      </span>
    </div>
  );
}
