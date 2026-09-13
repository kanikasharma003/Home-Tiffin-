import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  HelpCircle,
  Clock,
  ArrowRight,
} from "lucide-react";

import contactImage from "../assets/contact.jpg";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Thank you! Your message has been sent.");

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const goToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen bg-page-bg">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}
      <section className="relative min-h-[570px] overflow-hidden">

        {/* Background Image */}
        <img
          src={contactImage}
          alt="Homemade Tiffin Food"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Soft Green Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#123d2a]/90 via-[#174d35]/60 to-transparent" />

        {/* Bottom Soft Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto flex min-h-[570px] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">

          <div className="max-w-2xl text-white">

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur-md">
              <MessageSquare size={17} />
              Get in Touch
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl">
              We'd Love to
              <span className="mt-2 block text-[#bce3ca]">
                Hear From You
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base leading-8 text-white/85 sm:text-lg">
              Have a question about your meals, delivery, subscription,
              or anything else? Our friendly team is always ready to help.
            </p>

            {/* Contact Info */}
            <div className="mt-9 grid gap-5 sm:grid-cols-3">

              {/* Phone */}
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md">
                  <Phone size={19} />
                </div>

                <div>
                  <p className="text-sm font-bold">
                    Call Us
                  </p>
                  <p className="mt-1 text-xs text-white/70">
                    +91 98765 43210
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md">
                  <Mail size={19} />
                </div>

                <div>
                  <p className="text-sm font-bold">
                    Email Us
                  </p>
                  <p className="mt-1 text-xs text-white/70">
                    hello@tiffinbox.com
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md">
                  <MapPin size={19} />
                </div>

                <div>
                  <p className="text-sm font-bold">
                    Visit Us
                  </p>
                  <p className="mt-1 text-xs text-white/70">
                    Chowk, Nagpur
                  </p>
                </div>
              </div>

            </div>

            {/* Timing */}
            <div className="mt-7 flex items-center gap-2 text-sm text-white/75">
              <Clock size={16} />
              Monday - Saturday, 9 AM - 7 PM
            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          CONTACT FORM SECTION
      ===================================================== */}
      <section
        id="contact-form"
        className="px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">

          {/* Heading */}
          <div className="mb-10 text-center">

            <p
              className="text-sm font-bold uppercase tracking-[0.15em]"
              style={{ color: "var(--primary)" }}
            >
              Contact Us
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-[#174d35] sm:text-4xl">
              Send Us a Message
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-gray-600">
              Tell us how we can help and our team will get back
              to you shortly.
            </p>

          </div>


          {/* Main Contact Card */}
          <div className="grid overflow-hidden rounded-[2rem] bg-white shadow-xl lg:grid-cols-[0.75fr_1.25fr]">

            {/* LEFT PANEL */}
            <div
              className="relative overflow-hidden p-8 sm:p-10"
              style={{
                background:
                  "linear-gradient(145deg, var(--primary), var(--primary-strong))",
              }}
            >

              {/* Decorative Circle */}
              <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-white/10" />

              <div className="relative">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white">
                  <MessageSquare size={24} />
                </div>

                <h3 className="mt-6 text-3xl font-extrabold text-white">
                  Let's Talk
                </h3>

                <p className="mt-4 leading-7 text-white/80">
                  Whether you have a question about your order,
                  delivery or meal plans, we're here to help.
                </p>


                {/* Phone */}
                <div className="mt-10 flex gap-4 text-white">
                  <Phone size={20} className="mt-1 shrink-0" />

                  <div>
                    <p className="font-bold">
                      Phone
                    </p>

                    <p className="mt-1 text-sm text-white/70">
                      +91 98765 43210
                    </p>
                  </div>
                </div>


                {/* Email */}
                <div className="mt-7 flex gap-4 text-white">
                  <Mail size={20} className="mt-1 shrink-0" />

                  <div>
                    <p className="font-bold">
                      Email
                    </p>

                    <p className="mt-1 text-sm text-white/70">
                      hello@tiffinbox.com
                    </p>
                  </div>
                </div>


                {/* Location */}
                <div className="mt-7 flex gap-4 text-white">
                  <MapPin size={20} className="mt-1 shrink-0" />

                  <div>
                    <p className="font-bold">
                      Location
                    </p>

                    <p className="mt-1 text-sm text-white/70">
                      Chowk, Nagpur 440001
                    </p>
                  </div>
                </div>


                {/* Timing */}
                <div className="mt-8 flex items-center gap-2 border-t border-white/15 pt-6 text-sm text-white/70">
                  <Clock size={16} />
                  Mon - Sat, 9 AM - 7 PM
                </div>

              </div>
            </div>


            {/* RIGHT FORM */}
            <div className="p-8 sm:p-10">

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Name + Email */}
                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                      Your Name *
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your name"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-green-100"
                    />
                  </div>


                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                      Email Address *
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-green-100"
                    />
                  </div>

                </div>


                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Phone Number *
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter your phone number"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-green-100"
                  />
                </div>


                {/* Subject */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    What can we help you with?
                  </label>

                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-green-100"
                  >
                    <option value="">
                      Select an option
                    </option>

                    <option value="food">
                      Food & Menu
                    </option>

                    <option value="delivery">
                      Delivery
                    </option>

                    <option value="plans">
                      Tiffin Plans
                    </option>

                    <option value="order">
                      Order Support
                    </option>

                    <option value="other">
                      Other
                    </option>
                  </select>
                </div>


                {/* Message */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Your Message *
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Write your message..."
                    className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-green-100"
                  />
                </div>


                {/* Submit Button */}
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--primary), var(--primary-strong))",
                  }}
                >
                  Send Message
                  <Send size={18} />
                </button>

              </form>

            </div>
          </div>
        </div>
      </section>


      {/* =====================================================
          STILL HAVE A QUESTION
      ===================================================== */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">

          <div
            className="relative overflow-hidden rounded-[2rem] border px-6 py-14 text-center sm:px-12"
            style={{
              background:
                "linear-gradient(135deg, #f0f8f3 0%, #ffffff 55%, #e8f4ed 100%)",
              borderColor: "var(--primary-border)",
            }}
          >

            {/* Decorative circles */}
            <div
              className="absolute -right-20 -top-20 h-52 w-52 rounded-full opacity-20"
              style={{
                background: "var(--primary)",
              }}
            />

            <div
              className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full opacity-10"
              style={{
                background: "var(--primary)",
              }}
            />


            {/* Icon */}
            <div
              className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary), var(--primary-strong))",
              }}
            >
              <HelpCircle size={28} />
            </div>


            {/* Heading */}
            <h2 className="relative mt-6 text-3xl font-extrabold text-[#174d35] sm:text-4xl">
              Still Have a Question?
            </h2>


            {/* Description */}
            <p className="relative mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
              Can't find the answer you're looking for?
              Don't worry. Our friendly support team is ready
              to help you with anything you need.
            </p>


            {/* Buttons */}
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

              {/* Contact Support */}
              <button
                onClick={goToForm}
                className="group inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5"
                style={{
                  background:
                    "linear-gradient(135deg, var(--primary), var(--primary-strong))",
                }}
              >
                <MessageSquare size={18} />

                Contact Support

                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>


              {/* Email */}
              <a
                href="mailto:hello@tiffinbox.com"
                className="inline-flex items-center justify-center gap-2 rounded-xl border bg-white px-7 py-3.5 text-sm font-bold text-[#174d35] transition duration-300 hover:-translate-y-0.5 hover:bg-gray-50"
                style={{
                  borderColor: "var(--primary-border)",
                }}
              >
                <Mail size={18} />
                Email Us
              </a>

            </div>


            {/* Response Time */}
            <div className="relative mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
              <Clock
                size={14}
                style={{
                  color: "var(--primary)",
                }}
              />

              Usually replies within 24 hours
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}

export default Contact;