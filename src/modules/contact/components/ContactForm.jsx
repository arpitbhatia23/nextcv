"use client";

import axios from "axios";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: "error", text: "Please fill in all fields." });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      await axios.post("/api/contact", { name, email, message });
      setName("");
      setEmail("");
      setMessage("");
      setStatus({ type: "success", text: "Thanks. We will get back to you soon." });
    } catch {
      setStatus({ type: "error", text: "We could not send your message. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-5" aria-busy={loading}>
      <div className="space-y-2">
        <label htmlFor="contact-name" className="nc-label text-foreground">
          Full name
        </label>
        <Input
          id="contact-name"
          name="name"
          autoComplete="name"
          placeholder="Your name"
          value={name}
          onChange={event => setName(event.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-email" className="nc-label text-foreground">
          Email
        </label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={event => setEmail(event.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-message" className="nc-label text-foreground">
          Message
        </label>
        <Textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="Tell us about your question"
          value={message}
          onChange={event => setMessage(event.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Button type="submit" size="lg" disabled={loading}>
          {loading ? "Sending..." : "Send message"}
        </Button>
        {status && (
          <p
            role={status.type === "error" ? "alert" : "status"}
            aria-live="polite"
            className={`text-sm font-medium ${status.type === "error" ? "text-danger" : "text-success"}`}
          >
            {status.text}
          </p>
        )}
      </div>
    </form>
  );
}
