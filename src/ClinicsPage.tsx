import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, ArrowRight, UserCheck, ShieldCheck, Wrench, TrendingUp } from 'lucide-react';

interface ClinicsPageProps {
  onBack: () => void;
  onGetInTouch?: () => void;
}

const FeatureSection: React.FC<{
  icon: string;
  title: string;
  system: string;
  impact: string;
  index: number;
}> = ({ icon, title, system, impact, index }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.3, once: false });

  // Spring timing for more "alive" feel
  const springTransition = {
    type: "spring" as const,
    stiffness: 100,
    damping: 20,
    mass: 1
  };

  return (
    <section className="snap-section" ref={containerRef}>
      <div className="section-decor-line" />

      <div className="benefit-inner">
        <div className="benefit-top-meta">
          <motion.span
            className="benefit-idx"
            animate={{
              letterSpacing: isInView ? "0.4em" : "0.15em",
              opacity: isInView ? 1 : 0.3
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            ARCHITECTURE 0{index + 1}
          </motion.span>

          <motion.span
            className="benefit-emoji"
            animate={isInView ? { scale: [0.8, 1.1, 1], rotate: [0, 5, 0] } : { scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {icon}
          </motion.span>
        </div>

        <motion.h2
          className="benefit-huge-title"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ ...springTransition, delay: 0.1 }}
        >
          {title}
        </motion.h2>

        <div className="benefit-info-split">
          <motion.div
            className="info-block"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="info-label">Standard Operating Procedure</span>
            <p className="info-val">{system}</p>
          </motion.div>

          <div className="info-block">
            <div className="impact-border-box">
              {/* This line grows when the section is in view */}
              <motion.div
                className="impact-line-grow"
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: "circOut" }}
              />
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ ...springTransition, delay: 0.4 }}
              >
                <span className="info-label highlight">Primary Outcome</span>
                <p className="info-val strong">{impact}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ClinicsPage: React.FC<ClinicsPageProps> = ({ onBack, onGetInTouch }) => {
  return (
    <div className="hvac-lux-root selection:bg-[#E7E5E4]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;900&display=swap');
        
        * { box-sizing: border-box; }

        .hvac-lux-root {
          position: fixed; inset: 0;
          background-color: #FDFCF8;
          color: #1C1917;
          font-family: 'Outfit', sans-serif;
          overflow-y: auto; overflow-x: hidden;
          z-index: 2000;
          scroll-behavior: smooth;
          scroll-snap-type: y mandatory;
        }

        .grain {
          position: fixed; inset: 0; pointer-events: none; z-index: 100; opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        .bg-blob {
          position: fixed;
          width: 60vmax; height: 60vmax;
          background: radial-gradient(circle, rgba(231, 229, 228, 0.4) 0%, transparent 70%);
          filter: blur(80px); z-index: -1; pointer-events: none;
        }

        /* NAVIGATION */
        .lux-nav {
          position: fixed; top: 0; width: 100%;
          background: rgba(253, 252, 248, 0.85);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          z-index: 500; padding: 1rem 1.5rem;
          display: flex; justify-content: space-between; align-items: center;
          border-bottom: 1px solid rgba(231, 229, 228, 0.5);
        }

        .back-link {
          display: flex; align-items: center; gap: 0.5rem;
          background: none; border: none; cursor: pointer;
          font-size: 0.75rem; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.1em; color: #1C1917; opacity: 0.5; transition: opacity 0.3s;
        }
        .back-link:hover { opacity: 1; }

        .cta-nav-btn {
          background: #1C1917; color: #FDFCF8;
          padding: 0.6rem 1.4rem; border-radius: 99px;
          font-size: 0.72rem; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.1em;
          border: none; cursor: pointer; white-space: nowrap;
        }

        /* SNAPPING SECTIONS */
        .snap-section {
          min-height: 100vh; scroll-snap-align: start;
          display: flex; align-items: center; padding: 0 1.5rem; position: relative;
        }

        .section-decor-line {
          position: absolute; left: 5rem; top: 0; bottom: 0;
          width: 1px; background: linear-gradient(to bottom, transparent, #E7E5E4 10%, #E7E5E4 90%, transparent);
          opacity: 0.5;
        }
        @media (max-width: 1024px) { .section-decor-line { display: none; } }

        .lux-hero {
          min-height: 100vh; display: flex; align-items: center;
          max-width: 85rem; margin: 0 auto; scroll-snap-align: start; padding: 0 1.5rem;
        }

        .hero-title-main {
          font-family: Satoshi-Bold, sans-serif;
          font-size: clamp(2.4rem, 9vw, 5.8rem);
          line-height: 1.0; font-weight: 900; letter-spacing: -0.05em;
          margin-bottom: 2rem;
        }

        .hero-subtitle-main {
          font-size: clamp(1.1rem, 2.5vw, 1.6rem);
          line-height: 1.5; color: #57534E; max-width: 44rem; font-weight: 300;
        }

        .benefit-inner { max-width: 80rem; margin: 0 auto; width: 100%; position: relative; z-index: 10; }

        .benefit-top-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; }

        .benefit-idx {
          font-family: Satoshi-Bold, sans-serif; font-size: 0.7rem; color: #A8A29E; letter-spacing: 0.2em;
        }

        .benefit-emoji { font-size: clamp(3rem, 10vw, 5rem); }

        .benefit-huge-title {
          font-family: Satoshi-Bold, sans-serif;
          font-size: clamp(1.8rem, 6vw, 3.8rem);
          font-weight: 900; margin-bottom: 5.5rem;
          letter-spacing: -0.03em; line-height: 1.1;
        }

        .benefit-info-split { display: grid; grid-template-columns: 1fr; gap: 4rem; }

        @media (min-width: 1024px) {
          .benefit-info-split { grid-template-columns: 1.2fr 1fr; gap: 10%; }
        }

        .impact-border-box {
          position: relative;
          padding-left: 2.5rem;
        }

        .impact-line-grow {
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 2px; background: #1C1917;
          transform-origin: top;
        }

        .info-label {
          font-size: 0.65rem; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.25em; color: #A8A29E; margin-bottom: 1.5rem; display: block;
        }
        .info-label.highlight { color: #1C1917; }

        .info-val { font-size: clamp(1rem, 2vw, 1.2rem); line-height: 1.7; color: #57534E; }
        .info-val.strong {
          font-family: Satoshi-Bold, sans-serif; color: #1C1917;
          font-size: clamp(1.35rem, 3.5vw, 1.85rem); line-height: 1.35;
        }

        .lux-trust-section {
          min-height: 40vh; scroll-snap-align: start;
          display: flex; align-items: center; max-width: 85rem;
          margin: 0 auto; width: 100%; padding: 4rem 1.5rem;
        }

        .lux-trust-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 4rem; width: 100%; }
        @media (min-width: 769px) { .lux-trust-grid { grid-template-columns: repeat(4, 1fr); } }

        .trust-col {
          display: flex; flex-direction: column; gap: 0.75rem;
          font-weight: 800; font-size: 0.65rem; text-transform: uppercase;
          letter-spacing: 0.15em; color: #78716C;
        }

        .lux-cta-snap {
          min-height: 90vh; scroll-snap-align: start;
          display: flex; align-items: center; justify-content: center; padding: 2rem 1rem 4rem;
        }

        .lux-cta-box {
          padding: 10rem 2rem; background: #1C1917; color: #FDFCF8;
          width: 100%; max-width: 85rem; border-radius: 3rem; text-align: center;
          position: relative; overflow: hidden;
        }

        .cta-headline {
          font-family: Satoshi-Bold, sans-serif;
          font-size: clamp(2.4rem, 10vw, 6rem);
          font-weight: 900; line-height: 1.0; margin-bottom: 4.5rem;
          position: relative; z-index: 2;
        }

        .gold-button {
          display: inline-flex; align-items: center; gap: 1rem;
          background: #FDFCF8; color: #1C1917; padding: 1.4rem 4rem;
          border-radius: 99px; font-size: 1.1rem; font-weight: 800; cursor: pointer;
          position: relative; z-index: 2;
          transition: transform 0.3s cubic-bezier(0.17, 0.67, 0.83, 0.67);
        }
        .gold-button:hover { transform: scale(1.05); }

        @media (max-width: 768px) {
          .back-link span { display: none; }
          .lux-nav { padding: 0.8rem 1rem; }
          .impact-border-box { padding-left: 1.5rem; }
        }
      `}</style>

      <div className="grain" />

      <motion.div
        className="bg-blob"
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -50, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ top: '5%', left: '-5%' }}
      />
      <motion.div
        className="bg-blob"
        animate={{
          x: [0, -50, 50, 0],
          y: [0, 50, -50, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{ bottom: '5%', right: '-5%' }}
      />

      <nav className="lux-nav">
        <button className="back-link" onClick={onBack}>
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>
        <button className="cta-nav-btn" onClick={onGetInTouch}>Get In touch</button>
      </nav>

      <section className="lux-hero">
        <div style={{ width: '100%' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ marginBottom: '2.5rem' }}
          >
            <span style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.4em', color: '#A8A29E', textTransform: 'uppercase' }}>
              Clinic Business Operations
            </span>
          </motion.div>

          <motion.h1
            className="hero-title-main"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring" as const, stiffness: 100, damping: 15, delay: 0.2 }}
          >
            Call every lead instantly, <br /> filter out tire-kickers.
          </motion.h1>

          <motion.p
            className="hero-subtitle-main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Fill your schedule with qualified patients who will show up, without hiring more staff.
          </motion.p>
        </div>
      </section>

      <FeatureSection
        index={0}
        icon="🏥"
        title="Immediate Lead Contact System"
        system="AI outbound caller calls new procedure inquiries (breast augmentation, liposuction, facelifts, etc.) within 30 seconds of form submission or web inquiry."
        impact="Patients hear from you first while they're still on your website, securing the consultation slot before they reach out to 3-5 other practices."
      />

      <FeatureSection
        index={1}
        icon="🗓️"
        title="Pre-Consultation Qualifier"
        system="AI receptionist converses with the lead to verify procedure interest, budget range and timeline."
        impact="Your patient coordinators only take calls from qualified candidates who can afford the procedure and are ready to move forward, not price shoppers or people 'just looking'."
      />

      <FeatureSection
        index={2}
        icon="⭐"
        title="Patient Journey Automation"
        system="Automated outreach system (AI outbound Calls, Email, SMS) that re-engages no-shows, follows up on post-op patients, and protects your practice's 5-star reputation."
        impact="Recovers lost bookings, increases average patient value through secondary procedures, and protects your reputation that drives organic referrals."
      />

      <section className="lux-trust-section">
        <div className="lux-trust-grid">
          {[
            { icon: UserCheck, label: "Managed by Humans" },
            { icon: ShieldCheck, label: "100% Reliability" },
            { icon: Wrench, label: "Ongoing Updates" },
            { icon: TrendingUp, label: "Performance Tracking" }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="trust-col"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <item.icon size={24} /> {item.label}
            </motion.div>
          ))}
        </div>
      </section>

      <section className="lux-cta-snap">
        <motion.div
          className="lux-cta-box"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ type: "spring" as const, stiffness: 80, damping: 15 }}
        >
          <h2 className="cta-headline">Ready to automate <br /> your clinic?</h2>
          <motion.div
            className="gold-button"
            onClick={onGetInTouch}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started Now <ArrowRight size={22} />
          </motion.div>
        </motion.div>
      </section>

      <footer style={{ padding: '4rem 2rem', textAlign: 'center', opacity: 0.2, fontSize: '0.65rem', letterSpacing: '0.3em', scrollSnapAlign: 'start' }}>
        &copy; {new Date().getFullYear()} AI BY PEOPLE. ESTABLISHED 2024.
      </footer>
    </div>
  );
};

export default ClinicsPage;
