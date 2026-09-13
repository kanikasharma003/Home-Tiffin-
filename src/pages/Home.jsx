import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Menu as MenuIcon,
  Package,
  ShieldCheck,
  Star,
  Truck,
  Utensils,
} from "lucide-react";

import heroImage from "../assets/tiffin-hero.jpg";
import kitchenImage from "../assets/kitchen.jpg";

import sabziImg from "../assets/sabzi.jpg";
import dalImg from "../assets/dal.jpg";
import riceImg from "../assets/rice.jpg";
import rotiImg from "../assets/roti.jpg";
import saladImg from "../assets/salad.jpg";
import sweetImg from "../assets/sweet.jpg";

import menuDalThali from "../assets/menu-dal-thali.jpg";
import menuPaneer from "../assets/menu-paneer.jpg";
import menuBiryani from "../assets/menu-biryani.jpg";
import menuChole from "../assets/menu-chole.jpg";
import menuAlooGobi from "../assets/menu-aloo-gobi.jpg";
import menuEggCurry from "../assets/menu-egg-curry.jpg";
import menuButterChicken from "../assets/menu-butter-chicken.jpg";
import menuSoya from "../assets/menu-soya.jpg";

const menuItems = [
  {
    name: "Dal Tadka Thali",
    desc: "Dal tadka, jeera rice, 3 phulkas, salad & pickle",
    price: 99,
    tag: "Veg",
    img: menuDalThali,
    categories: ["All", "Veg", "Healthy"],
  },
  {
    name: "Paneer Tikka Masala",
    desc: "Paneer tikka, rumali roti, jeera rice & mint chutney",
    price: 109,
    tag: "Veg",
    img: menuPaneer,
    categories: ["All", "Veg", "Special"],
  },
  {
    name: "Vegetable Biryani",
    desc: "Saffron veg biryani, boondi raita & papad",
    price: 99,
    tag: "Veg",
    img: menuBiryani,
    categories: ["All", "Veg"],
  },
  {
    name: "Chole Bhature",
    desc: "Amritsari chole, fluffy bhature & onion salad",
    price: 99,
    tag: "Veg",
    img: menuChole,
    categories: ["All", "Veg", "Special"],
  },
  {
    name: "Aloo Gobi Thali",
    desc: "Aloo gobi, 2 rotis, dal, rice & salad",
    price: 89,
    tag: "Jain",
    img: menuAlooGobi,
    categories: ["All", "Veg", "Jain", "Healthy"],
  },
  {
    name: "Egg Curry Thali",
    desc: "Egg curry, rice, 2 parathas & salad",
    price: 119,
    tag: "Non-Veg",
    img: menuEggCurry,
    categories: ["All", "Non-Veg"],
  },
  {
    name: "Butter Chicken Thali",
    desc: "Butter chicken, naan, rice & pickle",
    price: 149,
    tag: "Non-Veg",
    img: menuButterChicken,
    categories: ["All", "Non-Veg", "Special"],
  },
  {
    name: "Soya Chunk Curry",
    desc: "Protein-rich soya curry, rice & 3 rotis",
    price: 95,
    tag: "Veg",
    img: menuSoya,
    categories: ["All", "Veg", "Healthy"],
  },
];

const mealParts = [
  {
    name: "Sabzi",
    img: sabziImg,
  },
  {
    name: "Dal",
    img: dalImg,
  },
  {
    name: "Rice",
    img: riceImg,
  },
  {
    name: "Roti",
    img: rotiImg,
  },
  {
    name: "Salad",
    img: saladImg,
  },
  {
    name: "Sweet",
    img: sweetImg,
  },
];

const reviews = [
  {
    name: "Priya Sharma",
    role: "Working Professional",
    text: "The food genuinely tastes like home. Fresh, simple and always delivered on time.",
  },
  {
    name: "Rahul Verma",
    role: "Student",
    text: "The tiffin is fresh, tasty and filling. It has become my everyday lunch.",
  },
  {
    name: "Sneha Patil",
    role: "Customer",
    text: "Very hygienic packaging and the food is always fresh. Highly recommended.",
  },
  {
    name: "Amit Joshi",
    role: "Working Professional",
    text: "Amazing homemade taste and great delivery service. I love the food.",
  },
  {
    name: "Neha Gupta",
    role: "Customer",
    text: "The quality is consistent and the homemade taste makes every meal special.",
  },
];

const faqs = [
  {
    question: "Is the food freshly cooked every day?",
    answer:
      "Yes. Our meals are freshly prepared every day using quality ingredients.",
  },
  {
    question: "Can I choose Veg, Non-Veg or Jain meals?",
    answer:
      "Yes. You can choose your preferred food type according to your requirement.",
  },
  {
    question: "Do you deliver every day?",
    answer:
      "Yes. We provide fresh tiffin delivery 7 days a week in our service areas.",
  },
  {
    question: "Can I pause my tiffin service?",
    answer:
      "Yes. Subscription pauses can be managed according to the applicable service rules.",
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
  },
};

function SectionHeading({ label, title, text }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.2,
      }}
      className="mx-auto mb-12 max-w-3xl text-center"
    >
      <div className="mb-3 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)]">
        <span className="h-px w-8 bg-[var(--primary)]" />
        {label}
        <span className="h-px w-8 bg-[var(--primary)]" />
      </div>

      <h2 className="font-display text-3xl font-bold text-[var(--color-heading)] sm:text-4xl md:text-5xl">
        {title}
      </h2>

      {text && (
        <p className="mt-4 text-sm leading-7 text-[var(--color-text)] sm:text-base">
          {text}
        </p>
      )}
    </motion.div>
  );
}

export default function Home({ setMode }) {
  const [activeTab, setActiveTab] = useState("All");
  const [reviewIndex, setReviewIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    if (activeTab === "Non-Veg") {
      document.documentElement.setAttribute("data-mode", "nonveg");
    } else {
      document.documentElement.setAttribute("data-mode", "veg");
    }
  }, [activeTab]);

  const filteredMenu = menuItems.filter((item) =>
    item.categories.includes(activeTab)
  );

  const handleTab = (tab) => {
    setActiveTab(tab);

    if (tab === "Non-Veg") {
      setMode?.("nonveg");
      document.documentElement.setAttribute("data-mode", "nonveg");
    }

    if (tab === "Veg" || tab === "All") {
      setMode?.("veg");
      document.documentElement.setAttribute("data-mode", "veg");
    }
  };

  const scrollReviews = (direction) => {
    const container = document.getElementById("review-scroll");

    if (!container) return;

    const card = container.children[0];

    if (!card) return;

    const amount = card.offsetWidth + 24;

    container.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });

    setReviewIndex((prev) => {
      if (direction === "next") {
        return prev >= reviews.length - 1 ? 0 : prev + 1;
      }

      return prev <= 0 ? reviews.length - 1 : prev - 1;
    });
  };

  const goToReview = (index) => {
    const container = document.getElementById("review-scroll");

    if (!container) return;

    const card = container.children[index];

    if (!card) return;

    container.scrollTo({
      left: card.offsetLeft,
      behavior: "smooth",
    });

    setReviewIndex(index);
  };

  return (
    <main className="overflow-hidden bg-white">
      {/* HERO */}

      <section
        id="home"
        className="relative min-h-[720px] overflow-visible"
      >
        <img
          src={heroImage}
          alt="Fresh homemade tiffin"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#06140b]/95 via-[#07170d]/85 via-[58%] to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

        <div className="relative mx-auto max-w-7xl px-5 pb-36 pt-24 sm:px-8 lg:px-10">
          <div className="max-w-[700px]">
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/60 bg-[var(--primary)]/20 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--primary)]" />
              Freshly prepared every morning
            </motion.div>

            <motion.h1
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.75,
                delay: 0.1,
              }}
              className="font-display text-5xl font-bold leading-[1.04] sm:text-6xl lg:text-7xl"
            >
              <span className="text-white">Freshly Cooked.</span>

              <br />

              <span className="text-[var(--primary)]">
                Lovingly Packed.
              </span>

              <br />

              <span className="text-white">Delivered Daily.</span>
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.65,
                delay: 0.25,
              }}
              className="mt-7 max-w-xl text-sm leading-7 text-white sm:text-base"
            >
              Experience the authentic taste of home-cooked meals delivered
              right to your doorstep. Nutritious, delicious, and made with
              love — pure vegetarian goodness in every bite.
            </motion.p>

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.65,
                delay: 0.35,
              }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <button className="btn btn-primary">
                Order Today's Tiffin
                <ArrowRight size={17} />
              </button>

              <a
                href="#menu"
                className="btn btn-ghost-light"
              >
                View Menu
                <MenuIcon size={17} />
              </a>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.6,
                delay: 0.5,
              }}
              className="mt-7 flex items-center gap-3"
            >
              <div className="flex gap-1 text-[var(--color-rating-yellow)]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={15}
                    fill="currentColor"
                  />
                ))}
              </div>

              <span className="text-sm text-white">
                <strong>4.8/5</strong> (500+ Reviews)
              </span>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.5,
            duration: 0.7,
          }}
          className="absolute right-[7%] top-[24%] hidden rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--primary)] shadow-xl lg:block"
        >
          Ghar Jaisa Swaad, Har Din ❤️
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.65,
            duration: 0.7,
          }}
          className="absolute right-[7%] top-[60%] hidden rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--primary)] shadow-xl lg:block"
        >
          <Leaf
            size={16}
            className="mr-2 inline"
          />
          100% Fresh Ingredients
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.8,
            duration: 0.7,
          }}
          className="absolute right-[7%] top-[68%] hidden rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--primary)] shadow-xl lg:block"
        >
          <Utensils
            size={16}
            className="mr-2 inline"
          />
          Cooked Daily
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.95,
            duration: 0.7,
          }}
          className="absolute right-[7%] top-[76%] hidden rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--primary)] shadow-xl lg:block"
        >
          <Truck
            size={16}
            className="mr-2 inline"
          />
          Delivered with Care
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.45,
          }}
          className="absolute bottom-[-55px] left-1/2 z-30 w-[92%] max-w-6xl -translate-x-1/2 rounded-[25px] border border-gray-100 bg-white px-5 py-6 shadow-[0_22px_45px_rgba(0,0,0,0.14)] sm:px-8 lg:px-12"
        >
          <div className="grid grid-cols-2 gap-7 md:grid-cols-4 md:gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-[var(--primary)]">
                <Package size={25} />
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-[var(--color-heading)]">
                  10K+
                </h3>

                <p className="text-sm text-gray-400">
                  Meals Delivered
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-[var(--primary)]">
                <Star
                  size={25}
                  fill="currentColor"
                />
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-[var(--color-heading)]">
                  4.8/5
                </h3>

                <p className="text-sm text-gray-400">
                  Customer Rating
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-[var(--primary)]">
                <Leaf size={25} />
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-[var(--color-heading)]">
                  100%
                </h3>

                <p className="text-sm text-gray-400">
                  Fresh & Healthy
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-[var(--primary)]">
                <CalendarDays size={25} />
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-[var(--color-heading)]">
                  7 Days
                </h3>

                <p className="text-sm text-gray-400">
                  Delivery Per Week
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* WHY CHOOSE US */}

      <section className="bg-[var(--primary-soft)] px-5 pb-20 pt-32 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="Why Choose Us"
            title="Good Food. Good Mood."
            text="The comfort of homemade food, delivered to your everyday routine."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Leaf size={27} />,
                title: "Fresh & Healthy",
                desc: "Fresh ingredients and balanced meals prepared every day.",
              },
              {
                icon: <Utensils size={27} />,
                title: "Homestyle Taste",
                desc: "Simple and delicious food that feels just like home.",
              },
              {
                icon: <ShieldCheck size={27} />,
                title: "Hygiene First",
                desc: "Clean kitchens and hygienic food preparation.",
              },
              {
                icon: <Truck size={27} />,
                title: "Dabba Delivery",
                desc: "Fresh meals delivered safely to your doorstep.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                className="rounded-3xl border border-[var(--primary-border)] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-[var(--primary)]">
                  {item.icon}
                </div>

                <h3 className="font-display text-xl font-bold text-[var(--color-heading)]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TODAY'S MENU */}

      <section
        id="menu"
        className="px-5 py-20 sm:px-8 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="Today's Menu"
            title="Made Fresh, Served Fresh"
            text="Choose from our delicious homemade meals."
          />

          <div className="mb-10 flex justify-center">
            <div className="flex flex-wrap justify-center gap-2 rounded-full border border-[var(--primary-border)] bg-[var(--primary-softer)] p-1">
              {[
                "All",
                "Veg",
                "Jain",
                "Healthy",
                "Special",
                "Non-Veg",
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTab(tab)}
                  className={`rounded-full px-5 py-2 text-xs font-semibold transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-[var(--primary)] text-white shadow-md"
                      : "text-[var(--color-text)] hover:bg-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            layout
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredMenu.map((item) => (
                <motion.div
                  layout
                  key={item.name}
                  initial={{
                    opacity: 0,
                    scale: 0.94,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.94,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="h-full w-full object-cover transition duration-500 hover:scale-110"
                    />

                    <span
                      className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold text-white ${
                        item.tag === "Jain"
                          ? "bg-[#7C3AED]"
                          : item.tag === "Non-Veg"
                            ? "bg-[var(--color-nonveg-red)]"
                            : "bg-[var(--color-veg-green)]"
                      }`}
                    >
                      {item.tag}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-[var(--color-heading)]">
                      {item.name}
                    </h3>

                    <p className="mt-2 min-h-[48px] text-xs leading-5">
                      {item.desc}
                    </p>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="font-display text-xl font-bold text-[var(--primary)]">
                        ₹{item.price}
                      </span>

                      <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary-soft)] text-[var(--primary)] transition hover:bg-[var(--primary)] hover:text-white">
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* WHAT'S INSIDE */}

      <section className="px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.85fr]">
            <motion.div
              initial={{
                opacity: 0,
                x: -45,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.7,
              }}
            >
              <div className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)]">
                <span className="h-px w-7 bg-[var(--primary)]" />
                WHAT'S INSIDE
                <span className="h-px w-7 bg-[var(--primary)]" />
              </div>

              <h2 className="font-display text-4xl font-bold leading-tight text-[var(--color-heading)] sm:text-5xl">
                A complete meal{" "}
                <span className="text-[var(--primary)]">
                  in every box.
                </span>
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-7">
                We're not containers and delicious meal boxes — you're in
                every box throughout the day.
              </p>

              <div className="mt-10 rounded-[2rem] border border-dashed border-[var(--primary-border)] bg-[var(--primary-softer)] p-7">
                <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
                  {mealParts.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        delay: index * 0.08,
                      }}
                      className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
                    >
                      <div className="h-24 overflow-hidden">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="h-full w-full object-cover transition duration-500 hover:scale-110"
                        />
                      </div>

                      <div className="px-2 py-3 text-center">
                        <h4 className="font-display text-sm font-bold text-[var(--color-heading)]">
                          {item.name}
                        </h4>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 45,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.7,
              }}
            >
              <div
                className="relative min-h-[500px] overflow-hidden rounded-[2rem] bg-cover bg-center"
                style={{
                  backgroundImage: `url(${kitchenImage})`,
                }}
              >
                <div className="absolute inset-0 bg-black/50" />

                <div className="relative flex min-h-[500px] flex-col justify-center p-8 sm:p-10">
                  <div className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-white">
                    <span className="h-px w-7 bg-[var(--primary)]" />
                    OUR KITCHEN
                    <span className="h-px w-7 bg-[var(--primary)]" />
                  </div>

                  <h3 className="font-display text-3xl font-bold text-white sm:text-4xl">
                    Made with care, in a clean kitchen.
                  </h3>

                  <div className="mt-7 space-y-4">
                    {[
                      "FSSAI certified kitchens",
                      "Fresh ingredients daily",
                      "No artificial preservatives",
                      "Roasted, not fried",
                    ].map((point) => (
                      <div
                        key={point}
                        className="flex items-center gap-3 text-sm font-semibold text-white"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]">
                          <Check size={15} />
                        </span>

                        {point}
                      </div>
                    ))}
                  </div>

                  <a
                    href="#menu"
                    className="btn btn-primary mt-8 w-fit"
                  >
                    View Menu
                    <MenuIcon size={17} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}

      <section className="bg-[var(--primary-soft)] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="How It Works"
            title="From Kitchen to Your Door"
            text="Getting your daily tiffin is super simple."
          />

          <div className="grid gap-6 md:grid-cols-4">
            {[
              ["01", "Choose Your Meal", "Pick your preferred tiffin."],
              ["02", "Select Your Food", "Choose Veg, Non-Veg or Jain."],
              ["03", "We Cook & Pack", "Fresh meals cooked every day."],
              ["04", "We Deliver", "Your meal reaches your doorstep."],
            ].map(([number, title, description], index) => (
              <motion.div
                key={number}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                className="rounded-3xl border border-[var(--primary-border)] bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary)] font-display text-xl font-bold text-white">
                  {number}
                </div>

                <h3 className="font-display text-lg font-bold text-[var(--color-heading)]">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-6">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}

      <section
        id="reviews"
        className="px-5 py-20 sm:px-8 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="Reviews"
            title="Loved By Our Customers"
            text="Real food. Real customers. Real happiness."
          />

          <div className="relative">
            <div
              id="review-scroll"
              className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {reviews.map((review) => (
                <motion.div
                  key={review.name}
                  whileHover={{
                    y: -7,
                  }}
                  className="min-w-[calc(100%-10px)] snap-start rounded-3xl border border-[var(--color-border)] bg-white p-7 shadow-sm transition-shadow hover:shadow-xl md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)]"
                >
                  <div className="flex gap-1 text-[var(--color-rating-yellow)]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        fill="currentColor"
                      />
                    ))}
                  </div>

                  <p className="mt-6 min-h-[105px] text-sm leading-7 text-[var(--color-text)]">
                    "{review.text}"
                  </p>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--primary)] font-bold text-white">
                      {review.name.charAt(0)}
                    </div>

                    <div>
                      <h4 className="font-display font-bold text-[var(--color-heading)]">
                        {review.name}
                      </h4>

                      <p className="text-xs text-[var(--color-muted)]">
                        {review.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => scrollReviews("prev")}
              className="absolute -left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--primary-border)] bg-white text-[var(--primary)] shadow-md transition hover:bg-[var(--primary)] hover:text-white lg:-left-5"
            >
              <ChevronLeft size={19} />
            </button>

            <button
              onClick={() => scrollReviews("next")}
              className="absolute -right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--primary-border)] bg-white text-[var(--primary)] shadow-md transition hover:bg-[var(--primary)] hover:text-white lg:-right-5"
            >
              <ChevronRight size={19} />
            </button>
          </div>

          <div className="mt-5 flex justify-center gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToReview(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  reviewIndex === index
                    ? "w-7 bg-[var(--primary)]"
                    : "w-2 bg-[var(--primary-border)]"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}

      <section className="bg-[var(--primary-soft)] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            label="FAQ"
            title="Frequently Asked Questions"
          />

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <motion.div
                  key={faq.question}
                  layout
                  className="overflow-hidden rounded-2xl border border-[var(--primary-border)] bg-white"
                >
                  <button
                    onClick={() =>
                      setOpenFaq(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                  >
                    <span className="text-sm font-semibold text-[var(--color-heading)]">
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-[var(--primary)] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                      >
                        <p className="px-5 pb-5 text-sm leading-6">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="px-5 py-20 sm:px-8 lg:px-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="mx-auto max-w-7xl rounded-[2rem] bg-gradient-to-br from-[var(--primary)] via-[var(--primary-strong)] to-[var(--primary-dark)] px-7 py-14 text-center text-white shadow-[0_25px_60px_color-mix(in_srgb,var(--primary)_30%,transparent)] sm:px-12"
        >
          <h2 className="font-display text-4xl font-bold sm:text-5xl">
            Ready To Taste Homemade Goodness?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/85">
            Enjoy fresh, homemade food delivered straight to your doorstep.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href="#menu"
              className="btn btn-light"
            >
              Explore Menu
              <MenuIcon size={17} />
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}