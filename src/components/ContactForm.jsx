"use client";

import axios from "axios";
import React, { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus({ type: "error", text: "Please fill in all fields." });
      return;
    }
    setLoading(true);
    setStatus(null);

    // Simulate network request — replace with real API in production
    const form = { name: name, email: email, message: message };
    try {
      const res = await axios.post("/api/contact", form);

      console.log(res);
      setLoading(false);
      setName("");
      setEmail("");
      setMessage("");
      setStatus({
        type: "success",
        text: "Thanks — we will get back to you soon.",
      });
    } catch (err) {
      console.log(err);
      setLoading(false);

      setStatus({
        type: "failed",
        text: "something went wrong",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div>
        <label className="text-sm font-medium text-slate-700">Full name</label>
        <input
          className="w-full mt-1 rounded-lg bg-slate-50 border border-slate-200 p-3 text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Full name"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">Email</label>
        <input
          className="w-full mt-1 rounded-lg bg-slate-50 border border-slate-200 p-3 text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">Message</label>
        <textarea
          rows={5}
          className="w-full mt-1 rounded-lg bg-slate-50 border border-slate-200 p-3 text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium resize-none"
          placeholder="Tell us about your use-case or question"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-label="Message"
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-500/20 disabled:opacity-50 transition-all duration-200"
          disabled={loading}
        >
          {loading ? "Sending…" : "Send message"}
        </button>

        {status && (
          <p
            className={`text-sm font-medium ${status.type === "error" ? "text-red-500" : "text-emerald-600"}`}
          >
            {status.text}
          </p>
        )}
      </div>
    </form>
  );
}
