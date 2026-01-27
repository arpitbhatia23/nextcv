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
        <label className="text-sm text-slate-300">Full name</label>
        <input
          className="w-full mt-1 rounded-lg bg-white/3 border border-white/6 p-3 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-violet-400"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm text-slate-300">Email</label>
        <input
          className="w-full mt-1 rounded-lg bg-white/3 border border-white/6 p-3 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-violet-400"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm text-slate-300">Message</label>
        <textarea
          rows={5}
          className="w-full mt-1 rounded-lg bg-white/3 border border-white/6 p-3 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-violet-400"
          placeholder="Tell us about your use-case or question"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="px-5 py-2 rounded-lg bg-linear-to-r from-violet-600 to-indigo-600 font-semibold shadow-md disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Sending…" : "Send message"}
        </button>

        {status && (
          <p
            className={`text-sm ${status.type === "error" ? "text-red-400" : "text-green-300"}`}
          >
            {status.text}
          </p>
        )}
      </div>
    </form>
  );
}
