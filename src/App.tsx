import { useState, useEffect, useRef, Suspense, lazy } from "react";
import "./App.css";

// Lazy load pages for performance optimization
const ClinicsPage = lazy(() => import("./ClinicsPage"));
const PlumbingPage = lazy(() => import("./PlumbingPage"));
const HVACPage = lazy(() => import("./HVACPage"));
const RoofingPage = lazy(() => import("./RoofingPage"));
const GetInTouchPage = lazy(() => import("./GetInTouchPage"));

function App() {
  const [loaderCount, setLoaderCount] = useState(0);
  const [isHyperSpin, setIsHyperSpin] = useState(false);
  const [hideLoaderElements, setHideLoaderElements] = useState(false); // Text & Vector
  const [hideLogoElements, setHideLogoElements] = useState(false); // Logo & Blur
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);
  const [imagesDropping, setImagesDropping] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [showClinicsPage, setShowClinicsPage] = useState(false);
  const [showPlumbingPage, setShowPlumbingPage] = useState(false);
  const [showHVACPage, setShowHVACPage] = useState(false);
  const [showRoofingPage, setShowRoofingPage] = useState(false);
  const [showGetInTouchPage, setShowGetInTouchPage] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const services = [
    {
      title: "Clinics",
      image: "/clinic-hero.png",
      buttons: ["Lead Contact", "+3 Systems"],
      text: "IFBERWLUELRIBEFVCKUEVAUVECIFBERWLUELRIBEFVCKUEVAUVECIFBERWLUELRIBEFVCKUEVAUVECIFBERWLUELRIBEFVCKUEVAUVEC",
      description:
        "Beat competitors by calling leads instantly. AI qualifies patients and automates follow-ups to fill your schedule no extra staff needed.",
    },
    {
      title: "Roofing",
      image: "/roofer-hero.png",
      buttons: ["AI Booking", "+4 Systems"],
      text: "IFBERWLUELRIBEFVCKUEVAUVECIFBERWLUELRIBEFVCKUEVAUVECIFBERWLUELRIBEFVCKUEVAUVECIFBERWLUELRIBEFVCKUEVAUVEC",
      description:
        "Capture every storm lead 24/7, wake up dead customer lists for new estimates, and automate the entire insurance supplement process from adjuster packets to final payments.",
    },
    {
      title: "HVAC",
      image: "/hvac-hero.png",
      buttons: ["Receptionist", "+3 Systems"],
      text: "IFBERWLUELRIBEFVCKUEVAUVECIFBERWLUELRIBEFVCKUEVAUVECIFBERWLUELRIBEFVCKUEVAUVECIFBERWLUELRIBEFVCKUEVAUVEC",
      description:
        "Capture every HVAC lead 24/7. AI answers instantly, qualifies customers, and drives repeat business from your existing client base.",
    },
    {
      title: "Plumbing",
      image: "/Rectangle 10.png",
      buttons: ["Lead Capture", "+3 Systems"],
      text: "IFBERWLUELRIBEFVCKUEVAUVECIFBERWLUELRIBEFVCKUEVAUVECIFBERWLUELRIBEFVCKUEVAUVECIFBERWLUELRIBEFVCKUEVAUVEC",
      description:
        'Capture every paid job. Stop missing calls. A complete "Done-For-You" AI system that handles all communication, booking, and billing.',
    },
  ];

  const [blurHidden, setBlurHidden] = useState(false);

  useEffect(() => {
    // 1. Start Loader Animation
    const isMobile = window.innerWidth <= 768;
    const duration = isMobile ? 1300 : 1800;
    const startDelay = isMobile ? 1000 : 1400;

    const timer = setTimeout(() => {
      const startTime = performance.now();

      function update(currentTime: number) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out quint
        const easedProgress = 1 - Math.pow(1 - progress, 5);
        const currentCount = 20 + Math.floor(easedProgress * 80);

        setLoaderCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          // Animation Complete: Trigger Sequence
          startExitSequence();
        }
      }
      requestAnimationFrame(update);
    }, startDelay);

    return () => clearTimeout(timer);
  }, []);

  const startExitSequence = () => {
    const isMobile = window.innerWidth <= 768;
    // 2. Trigger Hyper Spin
    setTimeout(
      () => {
        setIsHyperSpin(true);
        setBlurHidden(true);

        // 3. Disappear Loader & Vector after 0.1s (mobile) or 0.15s (laptop)
        setTimeout(
          () => {
            setHideLoaderElements(true);
          },
          isMobile ? 100 : 150
        );

        // 4. Final Clear (mobile 500ms, laptop 700ms)
        setTimeout(
          () => {
            setHideLogoElements(true); // Hides logo & screen-blur

            // 5. Reveal Navbar
            setNavbarVisible(true);

            // 6. Trigger Image Drop (mobile 300ms, laptop 400ms)
            setTimeout(
              () => {
                setGridVisible(true);
                setImagesDropping(true);

                if (isMobile) {
                  setTimeout(() => {
                    setActiveIndex(0);
                  }, 50);
                }
              },
              isMobile ? 300 : 400
            );
          },
          isMobile ? 500 : 700
        );
      },
      isMobile ? 150 : 200
    );
  };

  const handleContactNavigation = () => {
    setShowClinicsPage(false);
    setShowPlumbingPage(false);
    setShowHVACPage(false);
    setShowRoofingPage(false);
    setShowGetInTouchPage(true);
    setMenuOpen(false);
  };

  // Simple fallback loader
  const PageLoader = () => (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#FDFCF8",
        zIndex: 9999,
      }}>
      Loading...
    </div>
  );

  if (showClinicsPage)
    return (
      <Suspense fallback={<PageLoader />}>
        <ClinicsPage
          onBack={() => setShowClinicsPage(false)}
          onGetInTouch={handleContactNavigation}
        />
      </Suspense>
    );
  if (showPlumbingPage)
    return (
      <Suspense fallback={<PageLoader />}>
        <PlumbingPage
          onBack={() => setShowPlumbingPage(false)}
          onGetInTouch={handleContactNavigation}
        />
      </Suspense>
    );
  if (showHVACPage)
    return (
      <Suspense fallback={<PageLoader />}>
        <HVACPage
          onBack={() => setShowHVACPage(false)}
          onGetInTouch={handleContactNavigation}
        />
      </Suspense>
    );
  if (showRoofingPage)
    return (
      <Suspense fallback={<PageLoader />}>
        <RoofingPage
          onBack={() => setShowRoofingPage(false)}
          onGetInTouch={handleContactNavigation}
        />
      </Suspense>
    );
  if (showGetInTouchPage)
    return (
      <Suspense fallback={<PageLoader />}>
        <GetInTouchPage onBack={() => setShowGetInTouchPage(false)} />
      </Suspense>
    );

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleMenuClick = (pageSetter: (val: boolean) => void) => {
    pageSetter(true);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Menu Overlay */}
      <div className={`menu-overlay ${menuOpen ? "open" : ""}`}>
        <div className="menu-links">
          <button
            className="menu-link"
            onClick={() => handleMenuClick(setShowClinicsPage)}>
            Clinics
          </button>
          <button
            className="menu-link"
            onClick={() => handleMenuClick(setShowRoofingPage)}>
            Roofing
          </button>
          <button
            className="menu-link"
            onClick={() => handleMenuClick(setShowHVACPage)}>
            HVAC
          </button>
          <button
            className="menu-link"
            onClick={() => handleMenuClick(setShowPlumbingPage)}>
            Plumbing
          </button>
          <button
            className="menu-link"
            onClick={() => handleMenuClick(setShowGetInTouchPage)}>
            Get In Touch
          </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav
        className={`main-nav ${navbarVisible ? "visible" : ""}`}
        id="mainNav">
        {/* Left: Logo Icon */}
        <img src="/image 2.png" alt="Icon" className="nav-logo-icon" />

        {/* Center: Logo Text */}
        <img src="/Frame 2.svg" alt="AI By People" className="nav-logo-text" />

        {/* Right: Burger Menu */}
        <div
          className={`burger-menu ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          style={{ cursor: "pointer" }}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      {/* Splash Screen Elements (conditionally rendered or hidden via style) */}
      {!hideLogoElements && (
        <>
          {/* Background Vector */}
          <img
            src="/Frame 2.svg"
            className="background-vector"
            alt="Background Vector"
            style={{ display: hideLoaderElements ? "none" : "block" }}
          />

          {/* Loader Text */}
          <div
            className="loader-text"
            id="loaderPercentage"
            style={{ display: hideLoaderElements ? "none" : "block" }}>
            {loaderCount}%
          </div>

          <div className={`screen-blur ${blurHidden ? "hidden" : ""}`}></div>

          <div
            className={`image-container ${isHyperSpin ? "hyper-spin" : ""}`}
            id="logoContainer">
            {/* Simple SVG */}
            <svg
              className="locked-image"
              width="419"
              height="411"
              viewBox="0 0 419 411"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M419 195L209.5 0L0 195L209.5 410.5L419 195Z"
                fill="#F4F4F0"
              />
            </svg>
            <img
              src="/image 2.png"
              alt="Base Image"
              className="base-image"
              style={{ position: "relative", zIndex: 2 }}
            />
          </div>
        </>
      )}

      {/* Image Grid / Accordion */}
      <div
        className={`image-grid ${gridVisible ? "active" : ""}`}
        id="imageGrid">
        {services.map((service, index) => (
          <div
            key={index}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className={`grid-column ${imagesDropping ? "fall" : ""} ${
              activeIndex === index ? "active-card" : ""
            }`}
            onClick={() => {
              if (window.innerWidth > 768) {
                // Desktop navigation logic
                if (service.title === "Clinics") setShowClinicsPage(true);
                if (service.title === "Plumbing") setShowPlumbingPage(true);
                if (service.title === "HVAC") setShowHVACPage(true);
                if (service.title === "Roofing") setShowRoofingPage(true);
              } else {
                // Mobile Accordion Logic
                if (activeIndex !== index) {
                  setActiveIndex(index);
                  // Scroll to ensure visibility
                  setTimeout(() => {
                    if (cardRefs.current[index]) {
                      cardRefs.current[index]?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                        inline: "nearest",
                      });
                    }
                  }, 300);
                }
              }
            }}
            style={{
              animationDelay: `${index * 50}ms`,
              // We'll keep the backgroundImage for mobile but also use an img tag for desktop
              backgroundImage: `url(${service.image})`,
            }}>
            {/* Desktop Only Image Tag */}
            <img
              src={service.image}
              alt={service.title}
              className="desktop-only-img"
            />

            {/* Desktop Info Container */}
            <div className="desktop-info-container">
              <div className="desktop-hover-description">
                <p>{service.description}</p>
              </div>
              <div className="desktop-title">{service.title}</div>
            </div>

            {/* Content Overlay (Mobile Accordion) */}
            <div className="card-overlay">
              <div className="mobile-content-wrapper">
                {/* Title - Always Visible & Large */}
                <h2 className="mobile-card-title">{service.title}</h2>

                {/* Expanded Content (Tags, Description, Button) */}
                <div
                  className={`mobile-expanded-details ${
                    activeIndex === index ? "expanded" : ""
                  }`}>
                  {/* Tags */}
                  <div className="mobile-tags">
                    {service.buttons.map((btn, btnIndex) => (
                      <span key={btnIndex} className="mobile-tag-pill">
                        {btn}
                      </span>
                    ))}
                  </div>

                  {/* Footer with Description and Action Button */}
                  <div className="mobile-footer">
                    <p className="mobile-description">{service.description}</p>

                    <button
                      className="mobile-action-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (service.title === "Clinics")
                          setShowClinicsPage(true);
                        if (service.title === "Plumbing")
                          setShowPlumbingPage(true);
                        if (service.title === "HVAC") setShowHVACPage(true);
                        if (service.title === "Roofing")
                          setShowRoofingPage(true);
                      }}>
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}

export default App;
