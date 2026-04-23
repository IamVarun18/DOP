import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./navbar.css";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Showreel", href: "#showreel" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: -20, letterSpacing: "0.6em" },
      { opacity: 1, y: 0, letterSpacing: "0.3em", duration: 1.2, ease: "power3.out" }
    ).fromTo(
      linksRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" },
      "-=0.6"
    );
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    gsap.to(navRef.current, {
      backgroundColor: scrolled ? "rgba(5,5,5,0.92)" : "rgba(5,5,5,0)",
      backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
      duration: 0.5,
      ease: "power2.out",
    });
  }, [scrolled]);

  useEffect(() => {
    if (menuOpen) {
      gsap.fromTo(".mobile-menu", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.4 });
      gsap.fromTo(".mobile-link", { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.08, delay: 0.1 });
    }
  }, [menuOpen]);

  return (
    <>
      <nav ref={navRef} className="navbar">
        <a href="#hero" className="nav-logo" ref={logoRef}>DOP</a>

        <ul className="nav-links">
          {navLinks.map((link, i) => (
            <li key={link.label} ref={(el) => (linksRef.current[i] = el)}>
              <a href={link.href} className="nav-link">
                {link.label}
                <span className="link-underline" />
              </a>
            </li>
          ))}
          <li ref={(el) => (linksRef.current[navLinks.length] = el)}>
            <a href="#contact" className="nav-cta">Hire Me</a>
          </li>
        </ul>

        <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(v => !v)}>
          <span /><span /><span />
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          <ul>
            {navLinks.map(link => (
              <li key={link.label}>
                <a href={link.href} className="mobile-link" onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" className="mobile-link mobile-cta" onClick={() => setMenuOpen(false)}>
                Hire Me
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}