"use client";

import { X, Download } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
};

export default function CertificateModal({ isOpen, onClose, imageSrc }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/80 backdrop-blur-md">

      {/* MODAL BOX */}
      <div className="relative w-[90%] md:w-200 bg-[#0b0b0b] border border-white/10 rounded-2xl p-5 shadow-[0_0_60px_rgba(255,0,0,0.25)] animate-fadeIn">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white text-lg font-semibold tracking-wide">
            Internship Certificate
          </h3>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 transition"
          >
            <X size={18} className="text-white" />
          </button>
        </div>

        {/* IMAGE */}
        <div className="w-full overflow-hidden rounded-lg border border-white/10">
          <img
            src={imageSrc}
            alt="Certificate"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-5">
          
          <a
            href={imageSrc}
            download
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-black transition"
          >
            <Download size={16} />
            Download
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition"
          >
            Close
          </button>

        </div>
      </div>

      {/* ANIMATION */}
      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}