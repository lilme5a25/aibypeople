import React from 'react';
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';
import './App.css';

// Reusing general styles or defining specific ones
// Assuming global styles in App.css handle fonts/resets

interface GetInTouchPageProps {
  onBack: () => void;
}

const GetInTouchPage: React.FC<GetInTouchPageProps> = ({ onBack }) => {
  return (
    <div className="get-in-touch-container">
      <style>{`
        .get-in-touch-container {
          height: 100vh;
          width: 100vw;
          background-color: #ffffff;
          color: #1c1917;
          font-family: 'Outfit', sans-serif;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 2000;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }

        .git-nav {
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          /* Ensure minimal height for nav */
          flex-shrink: 0;
        }

        .git-back-btn {
          background: none;
          border: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          color: #1c1917;
          padding: 8px; /* Touch target */
        }

        .git-content {
          flex: 1;
          padding: 2rem;
          max-width: 800px;
          margin: 0 auto;
          width: 100%;
          display: flex;
          flex-direction: column;
          /* center vertically but allow scrolling if tall */
          justify-content: center;
          box-sizing: border-box; 
        }

        .git-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          font-family: 'Satoshi-Bold', sans-serif;
          line-height: 1.1;
        }

        .git-text {
          font-size: 1.2rem;
          color: #44403c;
          margin-bottom: 2.5rem;
          line-height: 1.5;
        }

        .contact-methods {
          display: grid;
          gap: 1.5rem;
          width: 100%;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 1.1rem;
          padding: 1.25rem;
          background: #fcfcfc;
          border: 1px solid #e7e5e4;
          border-radius: 12px;
          transition: transform 0.2s;
        }
        
        .contact-item:hover {
          transform: translateY(-2px);
          border-color: #d6d3d1;
        }

        /* Mobile Responsive Adjustments */
        @media (max-width: 768px) {
          .git-content {
            padding: 1.5rem;
            justify-content: flex-start; /* Start from top on mobile */
            padding-top: 2rem;
          }
          
          .git-title {
            font-size: 2.2rem;
          }
          
          .git-text {
            font-size: 1rem;
            margin-bottom: 2rem;
          }

          .contact-item {
            padding: 1rem;
            font-size: 1rem;
          }
        }
      `}</style>

      <nav className="git-nav">
        <button className="git-back-btn" onClick={onBack}>
          <ArrowLeft size={20} />
          Back
        </button>
      </nav>

      <main className="git-content">
        <h1 className="git-title">Get in Touch</h1>
        <p className="git-text">
          Ready to transform your business? Reach out to us directly.
        </p>

        <div className="contact-methods">
          <div className="contact-item">
            <Mail size={24} />
            <span>hello@aibypeople.com</span>
          </div>
          <div className="contact-item">
            <Phone size={24} />
            <span>(914) 709-2605</span>
          </div>
          <div className="contact-item">
            <MapPin size={24} />
            <span>New Rochelle, NY</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GetInTouchPage;
