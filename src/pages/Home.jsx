import { useState } from "react";

import {
  Badge,
  SectionHeading,
  Stars,
} from "../components/ui.jsx";

import {
  FAQS,
  KITCHEN_POINTS,
  MEAL_PARTS,
  STEPS,
  TESTIMONIALS,
  FEATURES,
  MENU_ITEMS,
  MENU_TABS,
  STATS,
} from "../data.js";

import tiffinHero from "../assets/tiffin-hero.jpg";

/* =========================
   HERO
========================= */

function Hero({ mode }) {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section id="home" className="relative overflow-hidden">
      <div
        className="relative min-h-[680px] bg-cover bg-center"
        style={{ backgroundImage: `url(${tiffinHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/20" />

        <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-white">

            <span className="mb-5 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
              🍱 Ghar Jaisa Swaad, Har Din ❤️
            </span>

            <h1 className="font-display text-5xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl">
              Freshly Cooked.
              <br />

              <span
                className={
                  mode === "veg"
                    ? "text-veg-green"
                    : "text-nonveg-red"
                }
              >
                Lovingly Packed.
              </span>

              <br />
              Delivered Daily.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
              Enjoy authentic home-cooked meals made with fresh
              ingredients, packed with love and delivered straight to
              your doorstep every day.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <button
                onClick={() => scrollTo("menu")}
                className="btn btn-primary rounded-xl px-7 py-3.5 text-sm font-bold"
              >
                Order Today's Tiffin →
              </button>

              <button
                onClick={() => scrollTo("how-it-works")}
                className="rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold backdrop-blur transition hover:bg-white/20"
              >
                How It Works
              </button>

            </div>

            <div className="mt-9 flex flex-wrap items-center gap-6">

              <div className="flex -space-x-3">
                {["👩🏻", "👨🏻", "👩🏽", "👨🏽", "👩🏻"].map(
                  (avatar, index) => (
                    <div
                      key={index}
                      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-white text-lg"
                    >
                      {avatar}
                    </div>
                  )
                )}
              </div>

              <div>
                <p className="font-bold">
                  10,000+ Happy Customers
                </p>

                <div className="mt-1 flex items-center gap-2 text-sm text-white/80">
                  <span className="text-rating-yellow">
                    ★★★★★
                  </span>

                  <span>4.8/5 (500+ Reviews)</span>
                </div>
              </div>

            </div>
          </div>

          <div className="absolute right-6 top-20 hidden flex-col gap-3 xl:flex">

            <div className="rounded-full bg-white/90 px-5 py-3 text-sm font-semibold text-heading shadow-lg backdrop-blur">
              🥗 100% Fresh Ingredients
            </div>

            <div className="rounded-full bg-white/90 px-5 py-3 text-sm font-semibold text-heading shadow-lg backdrop-blur">
              👨‍🍳 Cooked Daily
            </div>

            <div className="rounded-full bg-white/90 px-5 py-3 text-sm font-semibold text-heading shadow-lg backdrop-blur">
              🚴 Delivered with Care
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================
   STATS
========================= */

function StatsStrip() {
  return (
    <section className="relative z-10 -mt-8 px-4">

      <div className="mx-auto grid max-w-6xl grid-cols-2 overflow-hidden rounded-2xl bg-white shadow-xl sm:grid-cols-4">

        {STATS.map((stat, index) => (
          <div
            key={index}
            className="border-b border-border p-6 text-center last:border-0 sm:border-b-0 sm:border-r"
          >
            <div className="text-2xl font-extrabold text-primary-500">
              {stat.value}
            </div>

            <div className="mt-1 text-xs font-medium text-muted sm:text-sm">
              {stat.label}
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}

/* =========================
   FEATURES
========================= */

function Features() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        <SectionHeading
          label="WHY TIFFINBOX"
          title="Homely food. Hassle-free delivery."
          description="Everything you need for fresh, healthy and delicious everyday meals."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className="card card-hover rounded-2xl border border-border bg-white p-7"
            >

              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-2xl">
                {feature.icon === "leaf" && "🌿"}
                {feature.icon === "home" && "🏠"}
                {feature.icon === "shield" && "🛡️"}
                {feature.icon === "truck" && "🚚"}
              </div>

              <h3 className="font-display text-xl font-bold text-heading">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-text">
                {feature.description}
              </p>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

/* =========================
   TODAY'S MENU
========================= */

function Menu() {
  const [tab, setTab] = useState("All");

  const filteredItems =
    tab === "All"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) =>
          item.categories?.includes(tab)
        );

  return (
    <section
      id="menu"
      className="scroll-mt-20 bg-light-peach px-4 py-20 sm:px-6 lg:px-8"
    >

      <div className="mx-auto max-w-7xl">

        <SectionHeading
          label="TODAY'S MENU"
          title="Freshly cooked for you today"
          description="Choose from our delicious homemade meals, prepared fresh every day."
        />

        <div className="mt-8 flex flex-wrap justify-center gap-2">

          {MENU_TABS.map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                tab === item
                  ? "bg-primary-500 text-white"
                  : "border border-border bg-white text-text hover:border-primary-300 hover:text-primary-500"
              }`}
            >
              {item}
            </button>
          ))}

        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="card card-hover overflow-hidden rounded-2xl border border-border bg-white"
            >

              <div className="relative h-52 overflow-hidden">

                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-7xl bg-primary-50">
                    {item.emoji || "🍱"}
                  </div>
                )}

                <div className="absolute left-3 top-3">
                  <Badge type={item.type} />
                </div>

              </div>

              <div className="p-5">

                <div className="flex items-start justify-between gap-3">

                  <h3 className="font-display text-lg font-bold text-heading">
                    {item.name}
                  </h3>

                  <span className="whitespace-nowrap font-bold text-primary-500">
                    ₹{item.price}
                  </span>

                </div>

                <p className="mt-2 min-h-12 text-sm leading-5 text-text">
                  {item.description}
                </p>

                <button className="mt-5 w-full rounded-xl bg-primary-500 py-3 text-sm font-bold text-white transition hover:bg-primary-600">
                  Add to Order
                </button>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

/* =========================
   HOW IT WORKS
========================= */

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 bg-light-peach px-4 py-20 sm:px-6 lg:px-8"
    >

      <div className="mx-auto max-w-7xl">

        <SectionHeading
          label="HOW IT WORKS"
          title="From our kitchen to your door"
          description="Simple, convenient, delicious — in four easy steps."
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {STEPS.map((step, index) => (
            <div
              key={index}
              className="relative text-center"
            >

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-2xl font-extrabold text-primary-500 shadow-md">
                {step.num}
              </div>

              <h3 className="mt-5 font-display text-xl font-bold text-heading">
                {step.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-text">
                {step.description}
              </p>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

/* =========================
   MEAL BOX
========================= */

function MealBox() {
  return (
    <section
      id="about"
      className="scroll-mt-20 bg-white px-4 py-20 sm:px-6 lg:px-8"
    >

      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">

        <div>

          <span className="section-label">
            WHAT'S IN YOUR BOX
          </span>

          <h2 className="mt-3 font-display text-3xl font-extrabold text-heading sm:text-4xl">
            A complete homemade meal
          </h2>

          <p className="mt-3 max-w-xl text-text">
            Balanced, delicious and freshly prepared with the comfort
            of home-cooked food.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">

            {MEAL_PARTS.map((part, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-border bg-white"
              >

                <div className="h-32 overflow-hidden">

                  {part.image ? (
                    <img
                      src={part.image}
                      alt={part.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-primary-50 text-5xl">
                      {part.emoji}
                    </div>
                  )}

                </div>

                <div className="p-3 text-center">
                  <h3 className="font-semibold text-heading">
                    {part.name}
                  </h3>
                </div>

              </div>
            ))}

          </div>
        </div>

        <div
          className="relative overflow-hidden rounded-3xl bg-cover bg-center p-8 text-white sm:p-10"
          style={{
            backgroundImage: `url(${tiffinHero})`,
          }}
        >

          <div className="absolute inset-0 bg-black/70" />

          <div className="relative">

            <span className="text-sm font-bold uppercase tracking-[0.2em] text-white/70">
              OUR KITCHEN
            </span>

            <h2 className="mt-3 font-display text-3xl font-extrabold">
              Cooked with love, packed with care
            </h2>

            <p className="mt-4 max-w-lg leading-7 text-white/80">
              Every meal is prepared fresh using quality ingredients
              and hygienic cooking practices.
            </p>

            <div className="mt-8 space-y-4">

              {KITCHEN_POINTS.map((point, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3"
                >

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
                    ✓
                  </div>

                  <span className="text-sm font-medium">
                    {point}
                  </span>

                </div>
              ))}

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* =========================
   TESTIMONIALS
========================= */

function Testimonials() {
  return (
    <section className="bg-light-peach px-4 py-20 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        <SectionHeading
          label="WHAT OUR CUSTOMERS SAY"
          title="Loved by our customers across the city"
          description="Real feedback from people who enjoy our meals every day."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {TESTIMONIALS.map((review, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border bg-white p-6"
            >

              <Stars rating={review.rating} />

              <p className="mt-5 text-sm leading-6 text-text">
                "{review.text}"
              </p>

              <div className="mt-6 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-100 font-bold text-primary-600">
                  {review.name?.charAt(0) || "C"}
                </div>

                <div>

                  <h4 className="font-bold text-heading">
                    {review.name}
                  </h4>

                  <p className="text-xs text-muted">
                    {review.city}
                  </p>

                </div>

              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

/* =========================
   DELIVERY + FAQ
========================= */

function DeliveryAndFaq() {
  const [pincode, setPincode] = useState("");
  const [checked, setChecked] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const checkDelivery = () => {
    if (pincode.trim().length === 6) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };

  return (
    <section
      id="faq"
      className="scroll-mt-20 bg-white px-4 py-20 sm:px-6 lg:px-8"
    >

      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">

        <div className="rounded-3xl bg-light-peach p-8 sm:p-10">

          <span className="section-label">
            DO WE DELIVER TO YOU?
          </span>

          <h2 className="mt-3 font-display text-3xl font-extrabold text-heading">
            Check delivery availability
          </h2>

          <p className="mt-3 text-text">
            Enter your pincode and check whether TiffinBox delivers
            to your area.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">

            <input
              type="text"
              value={pincode}
              onChange={(e) =>
                setPincode(
                  e.target.value.replace(/\D/g, "")
                )
              }
              maxLength={6}
              placeholder="Enter your pincode"
              className="theme-input flex-1 rounded-xl border border-border bg-white px-4 py-3 outline-none focus:border-primary-500"
            />

            <button
              onClick={checkDelivery}
              className="rounded-xl bg-primary-500 px-6 py-3 font-bold text-white hover:bg-primary-600"
            >
              Check
            </button>

          </div>

          {checked && (
            <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700">
              ✓ Great! We deliver fresh tiffins to your area.
            </div>
          )}

        </div>

        <div>

          <span className="section-label">
            FAQ
          </span>

          <h2 className="mt-3 font-display text-3xl font-extrabold text-heading">
            Frequently asked questions
          </h2>

          <div className="mt-7 divide-y divide-border rounded-2xl border border-border bg-white">

            {FAQS.map((faq, index) => (
              <div key={index}>

                <button
                  onClick={() =>
                    setOpenFaq(
                      openFaq === index ? -1 : index
                    )
                  }
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left"
                >

                  <span className="text-sm font-bold text-heading">
                    {faq.question}
                  </span>

                  <span className="text-xl text-primary-500">
                    {openFaq === index ? "−" : "+"}
                  </span>

                </button>

                {openFaq === index && (
                  <div className="px-5 pb-5 text-sm leading-6 text-text">
                    {faq.answer}
                  </div>
                )}

              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}

/* =========================
   CTA
========================= */

function CtaBanner() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section
      id="contact"
      className="scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8"
    >

      <div className="banner-grad mx-auto max-w-7xl overflow-hidden rounded-3xl bg-primary-500 px-6 py-14 text-center text-white sm:px-10">

        <h2 className="font-display text-4xl font-extrabold sm:text-5xl">
          Ready for a meal that feels like home?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-white/80">
          Order your first tiffin today and enjoy freshly cooked,
          homemade food delivered right to your door.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

          <button
            onClick={() => scrollTo("menu")}
            className="rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-primary-600 transition hover:bg-primary-50"
          >
            Order Today's Tiffin
          </button>

          <button
            onClick={() => scrollTo("how-it-works")}
            className="rounded-xl border border-white/30 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
          >
            How It Works
          </button>

        </div>

      </div>
    </section>
  );
}

/* =========================
   HOME
========================= */

export default function Home({ mode = "veg" }) {
  return (
    <main className="min-h-screen bg-page-bg text-heading">

      <Hero mode={mode} />

      <StatsStrip />

      <Features />

      <Menu />

      <HowItWorks />

      <MealBox />

      <Testimonials />

      <DeliveryAndFaq />

      <CtaBanner />

    </main>
  );
}