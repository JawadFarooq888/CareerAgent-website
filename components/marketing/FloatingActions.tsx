"use client";

import { useState } from "react";
import { MessageCircle, Phone, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function FloatingActions() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="fixed bottom-24 right-4 z-50 flex flex-col items-end gap-3 lg:bottom-5 lg:right-5">
      {chatOpen && (
        <div className="mb-1 w-64 max-w-[calc(100vw-2rem)] rounded-2xl border border-black/10 bg-white p-4 shadow-xl sm:w-72">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-semibold text-navy-900">Chat with us</p>
            <button
              type="button"
              onClick={() => setChatOpen(false)}
              aria-label="Close chat"
              className="text-navy-900/50 hover:text-navy-900"
            >
              <X size={16} />
            </button>
          </div>
          <p className="text-sm text-navy-900/70">
            Live chat is coming soon. In the meantime, message us on WhatsApp or book a free
            consultation and we&apos;ll respond within one business day.
          </p>
        </div>
      )}

      <a
        href={`tel:${siteConfig.phone}`}
        aria-label="Call now"
        className="hidden h-14 w-14 items-center justify-center rounded-full bg-navy-900 p-3.5 text-white shadow-lg transition-transform hover:scale-105 lg:flex"
      >
        <Phone size={22} />
      </a>

      <button
        type="button"
        onClick={() => setChatOpen((v) => !v)}
        aria-label="Open chat"
        className="hidden h-14 w-14 items-center justify-center rounded-full bg-gold-500 p-3.5 text-navy-950 shadow-lg transition-transform hover:scale-105 lg:flex"
      >
        <MessageCircle size={22} />
      </button>

      <a
        href={`https://wa.me/${siteConfig.whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] p-3 text-white shadow-lg transition-transform hover:scale-105 lg:h-14 lg:w-14 lg:p-3.5"
      >
        <svg viewBox="0 0 32 32" fill="currentColor" className="h-5 w-5 lg:h-6 lg:w-6">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.837.74 5.5 2.037 7.81L0 32l8.396-2.007A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.09c-2.548 0-4.93-.72-6.95-1.965l-.498-.296-5.086 1.217 1.246-4.94-.324-.51A13.05 13.05 0 0 1 2.91 16C2.91 8.784 8.784 2.91 16 2.91S29.09 8.784 29.09 16 23.216 29.09 16 29.09zm7.14-9.78c-.39-.196-2.31-1.14-2.67-1.27-.36-.13-.62-.196-.882.196-.26.39-1.01 1.27-1.24 1.53-.228.26-.456.293-.847.098-.39-.196-1.646-.607-3.135-1.936-1.16-1.033-1.943-2.31-2.17-2.7-.228-.39-.024-.6.172-.795.176-.175.39-.456.585-.684.196-.228.26-.39.39-.65.13-.26.065-.488-.033-.684-.098-.196-.882-2.124-1.208-2.908-.318-.762-.642-.659-.882-.671l-.75-.013c-.26 0-.684.098-1.043.488-.36.39-1.37 1.34-1.37 3.267 0 1.928 1.402 3.79 1.598 4.05.196.26 2.76 4.216 6.686 5.912.934.403 1.663.644 2.232.824.938.298 1.79.256 2.464.155.752-.112 2.31-.945 2.635-1.857.325-.912.325-1.694.228-1.857-.098-.163-.358-.26-.748-.456z" />
        </svg>
      </a>
    </div>
  );
}
