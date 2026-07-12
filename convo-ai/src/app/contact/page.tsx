"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Contact Us</h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Have a question or need help? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                <div className="h-12 w-12 rounded-xl bg-brand-100 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Email</h3>
                <a href="mailto:vaibhavsingh292005@gmail.com" className="text-sm text-brand-600 hover:underline">
                  vaibhavsingh292005@gmail.com
                </a>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                <div className="h-12 w-12 rounded-xl bg-brand-100 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-brand-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">GitHub</h3>
                <a href="https://github.com/vaibhav29-ed" target="_blank" rel="noopener noreferrer" className="text-sm text-brand-600 hover:underline">
                  github.com/vaibhav29-ed
                </a>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                <div className="h-12 w-12 rounded-xl bg-brand-100 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-brand-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">LinkedIn</h3>
                <a href="https://www.linkedin.com/in/vaibhav-singh-680910217/" target="_blank" rel="noopener noreferrer" className="text-sm text-brand-600 hover:underline">
                  linkedin.com/in/vaibhav-singh-680910217
                </a>
              </div>

              {/* Developer Card */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold">
                    VS
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Vaibhav Singh</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Full Stack + AI Developer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {sent ? (
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-12 text-center">
                  <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Message Sent!</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">We&apos;ll get back to you within 24 hours.</p>
                  <Button onClick={() => setSent(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form
                  action="https://formsubmit.co/vaibhavsingh292005@gmail.com"
                  method="POST"
                  onSubmit={() => setSent(true)}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 space-y-5"
                >
                  {/* FormSubmit config */}
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_subject" value="New contact form submission" />
                  <input type="hidden" name="_template" value="table" />

                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Send us a message</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      id="name"
                      name="name"
                      label="Name"
                      placeholder="Your name"
                      required
                    />
                    <Input
                      id="email"
                      name="email"
                      label="Email"
                      type="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <Input
                    id="subject"
                    name="subject"
                    label="Subject"
                    placeholder="How can we help?"
                    required
                  />
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Tell us more..."
                      required
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
