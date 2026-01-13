import { useState } from "react";
import { ChevronRight } from "lucide-react";

const ServiceAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const services = [
    {
      title: "HVAC",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
      buttons: ["Thing One", "Thing Two"],
      text: "IFBERWLUELRIBEFVCKUEVAUVECIFBERWLUELRIBEFVCKUEVAUVECIFBERWLUELRIBEFVCKUEVAUVECIFBERWLUELRIBEFVCKUEVAUVEC",
    },
    {
      title: "Med Clinics",
      image:
        "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop",
      buttons: ["Thing One", "Thing Two"],
      text: "IFBERWLUELRIBEFVCKUEVAUVECIFBERWLUELRIBEFVCKUEVAUVECIFBERWLUELRIBEFVCKUEVAUVECIFBERWLUELRIBEFVCKUEVAUVEC",
    },
    {
      title: "Plumbing",
      image:
        "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&h=600&fit=crop",
      buttons: ["Thing One", "Thing Two"],
      text: "IFBERWLUELRIBEFVCKUEVAUVECIFBERWLUELRIBEFVCKUEVAUVECIFBERWLUELRIBEFVCKUEVAUVECIFBERWLUELRIBEFVCKUEVAUVEC",
    },
    {
      title: "Roofing",
      image:
        "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=800&h=600&fit=crop",
      buttons: ["Thing One", "Thing Two"],
      text: "IFBERWLUELRIBEFVCKUEVAUVECIFBERWLUELRIBEFVCKUEVAUVECIFBERWLUELRIBEFVCKUEVAUVECIFBERWLUELRIBEFVCKUEVAUVEC",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-200 p-6 flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          className="text-stone-600">
          <path
            d="M24 8L28 12L32 10L30 14L34 16L30 18L32 22L28 20L24 24L20 20L16 22L18 18L14 16L18 14L16 10L20 12L24 8Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Accordion Cards */}
      <div className="flex flex-col gap-4 max-w-2xl w-full">
        {services.map((service, index) => (
          <div
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-in-out ${
              activeIndex === index ? "h-96" : "h-32"
            }`}
            style={{
              backgroundImage: `url(${service.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}>
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="relative h-full p-8 flex flex-col">
              {/* Title */}
              <h2 className="text-white text-5xl font-bold mb-6">
                {service.title}
              </h2>

              {/* Expanded Content */}
              <div
                className={`transition-all duration-500 ${
                  activeIndex === index
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none"
                }`}>
                {/* Filter Buttons */}
                <div className="flex gap-3 mb-6">
                  {service.buttons.map((btn, btnIndex) => (
                    <button
                      key={btnIndex}
                      className="px-6 py-2 rounded-full border-2 border-white text-white text-sm font-medium hover:bg-white hover:text-black transition-colors"
                      onClick={(e) => e.stopPropagation()}>
                      {btn}
                    </button>
                  ))}
                </div>

                {/* Text Content */}
                <div className="flex items-start justify-between">
                  <p className="text-white text-lg font-medium leading-relaxed max-w-md break-words">
                    {service.text}
                  </p>

                  {/* Arrow Button */}
                  <button
                    className="flex-shrink-0 w-16 h-16 rounded-full bg-white flex items-center justify-center ml-4 hover:scale-105 transition-transform"
                    onClick={(e) => e.stopPropagation()}>
                    <ChevronRight className="w-8 h-8 text-black" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceAccordion;
