import React, { useState } from "react";

const Navbar = () => {
  const [linksOpen, setLinksOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <style>{`
        .nav-root {
          position: absolute;
          inset: 0% 0% auto;
          z-index: 99;
          margin: 1rem 1.5rem 0;
          padding: 0.5rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 0.6rem;
          border-bottom: 0.0625rem solid rgba(255, 255, 255, 0.18);
          color: #000;
          font-family: 'Inter', 'Helvetica Neue', sans-serif;
        }

        /* Left: logo */
        .nav-logo {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #000;
          text-decoration: none;
          white-space: nowrap;
        }

        /* Center: nav links — hidden on mobile */
        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-links li {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          color: #000;
          position: relative;
          padding-bottom: 2px;
          transition: opacity 0.2s;
        }

        .nav-links li::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 1.5px;
          background: #000;
          transition: width 0.25s ease;
        }

        .nav-links li:hover::after { width: 100%; }
        .nav-links li:hover { opacity: 0.6; }

        /* Right: link-tree button */
        .nav-cta-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0.9rem;
          background: #000;
          color: #fff;
          border: none;
          border-radius: 0.4rem;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          white-space: nowrap;
          line-height: 1;
        }

        .nav-cta-btn:hover {
          background: #333;
          transform: translateY(-1px);
        }

        /* Dropdown overlay */
        .nav-dropdown {
          position: absolute;
          top: calc(100% + 0.5rem);
          right: 0;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 0.6rem;
          border: 1px solid rgba(0,0,0,0.08);
          padding: 0.5rem 0;
          min-width: 180px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          animation: dropIn 0.2s ease;
          z-index: 100;
        }

        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .nav-dropdown a {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.65rem 1.2rem;
          font-size: 0.85rem;
          font-weight: 500;
          color: #000;
          text-decoration: none;
          transition: background 0.15s;
        }

        .nav-dropdown a:hover { background: rgba(0,0,0,0.04); }
        .nav-dropdown a span.arrow { opacity: 0.4; }

        .nav-dropdown-close {
          display: flex;
          justify-content: flex-end;
          padding: 0.4rem 0.8rem 0.2rem;
        }

        .nav-dropdown-close button {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.1rem;
          color: #999;
          line-height: 1;
          padding: 0;
        }

        .nav-right {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        /* Hamburger — visible only on mobile */
        .nav-hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          width: 32px;
          height: 32px;
        }

        .nav-hamburger span {
          display: block;
          width: 100%;
          height: 1.5px;
          background: #000;
          border-radius: 2px;
          transition: transform 0.25s, opacity 0.2s;
          transform-origin: center;
        }

        .nav-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .nav-hamburger.open span:nth-child(2) { opacity: 0; }
        .nav-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* Mobile menu panel */
        .nav-mobile-menu {
          display: none;
          position: absolute;
          top: calc(100% + 0.5rem);
          left: 0;
          right: 0;
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 0.6rem;
          border: 1px solid rgba(0,0,0,0.07);
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          padding: 0.5rem 0 0.75rem;
          animation: dropIn 0.2s ease;
          z-index: 100;
        }

        .nav-mobile-menu.open { display: block; }

        .nav-mobile-menu li {
          list-style: none;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.75rem 1.4rem;
          cursor: pointer;
          transition: background 0.15s;
        }

        .nav-mobile-menu li:hover { background: rgba(0,0,0,0.04); }

        .nav-mobile-menu-links {
          border-top: 1px solid rgba(0,0,0,0.07);
          margin-top: 0.5rem;
          padding-top: 0.25rem;
        }

        .nav-mobile-menu-links a {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.65rem 1.4rem;
          font-size: 0.8rem;
          font-weight: 500;
          color: #000;
          text-decoration: none;
          transition: background 0.15s;
        }

        .nav-mobile-menu-links a:hover { background: rgba(0,0,0,0.04); }
        .nav-mobile-menu-links a span { opacity: 0.4; }

        /* ── Mobile breakpoint: iPhone 16 is 393px wide ── */
        @media (max-width: 480px) {
          .nav-root {
            margin: 0.75rem 0.75rem 0;
            padding: 0.5rem 1rem;
          }

          .nav-links { display: none; }

          .nav-cta-btn {
            padding: 0.4rem 0.7rem;
            font-size: 0.78rem;
          }

          .nav-hamburger { display: flex; }

          .nav-logo {
            font-size: 0.72rem;
          }
        }
      `}</style>

      <header style={{ position: 'relative' }}>
        <nav className="nav-root">
          {/* Logo */}
          <a href="/" className="nav-logo">Patrick S. Hoejberg</a>

          {/* Center links — desktop only */}
          <ul className="nav-links">
            <li onClick={() => scrollTo('contact')}>Contact</li>
            <li onClick={() => scrollTo('experience')}>Experience</li>
            <li onClick={() => scrollTo('projects')}>Projects</li>
          </ul>

          {/* Right side */}
          <div className="nav-right">
            {/* Link Tree button */}
            <button
              className="nav-cta-btn"
              onClick={() => { setLinksOpen(o => !o); setMobileMenuOpen(false); }}
              aria-expanded={linksOpen}
            >
              🖂&nbsp; MEDIA
            </button>

            {linksOpen && (
              <div className="nav-dropdown">
                <div className="nav-dropdown-close">
                  <button onClick={() => setLinksOpen(false)} aria-label="Close">✕</button>
                </div>
                <a href="https://linkedin.com/in/yourhandle" target="_blank" rel="noopener noreferrer">
                  LinkedIn <span className="arrow">↗</span>
                </a>
                <a href="https://github.com/yourhandle" target="_blank" rel="noopener noreferrer">
                  GitHub <span className="arrow">↗</span>
                </a>
                <a href="mailto:you@example.com">
                  Email <span className="arrow">↗</span>
                </a>
              </div>
            )}

           
          </div>
        </nav>

        {/* Mobile menu panel */}
        <ul className={`nav-mobile-menu${mobileMenuOpen ? ' open' : ''}`}>
          <li onClick={() => scrollTo('contact')}>Contact</li>
          <li onClick={() => scrollTo('experience')}>Experience</li>
          <li onClick={() => scrollTo('projects')}>Projects</li>
          <div className="nav-mobile-menu-links">
            <a href="https://linkedin.com/in/yourhandle" target="_blank" rel="noopener noreferrer">
              LinkedIn <span>↗</span>
            </a>
            <a href="https://github.com/yourhandle" target="_blank" rel="noopener noreferrer">
              GitHub <span>↗</span>
            </a>
            <a href="mailto:you@example.com">
              Email <span>↗</span>
            </a>
          </div>
        </ul>
      </header>
    </>
  );
};

export default Navbar;