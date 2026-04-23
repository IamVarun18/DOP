import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./hero.css";

export default function Hero() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const scrollRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Overlay fades out to reveal video
    tl.fromTo(
      overlayRef.current,
      { opacity: 1 },
      { opacity: 0.45, duration: 2, ease: "power2.out" }
    )
    // Title drops in letter by letter feel
    .fromTo(
      titleRef.current,
      { opacity: 0, y: 60, letterSpacing: "0.5em" },
      { opacity: 1, y: 0, letterSpacing: "0.15em", duration: 1.4, ease: "power3.out" },
      "-=1"
    )
    // Subtitle fades up
    .fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      "-=0.6"
    )
    // Scroll indicator pulses in
    .fromTo(
      scrollRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    );

    // Continuous scroll indicator bounce
    gsap.to(scrollRef.current, {
      y: 10,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2.5,
    });

    // Parallax on mouse move
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      gsap.to(videoRef.current, {
        x: x,
        y: y,
        duration: 1.5,
        ease: "power1.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section ref={heroRef} className="hero" id="hero">
      {/* Video Background */}
      <div className="hero-video-wrapper">
        <video
          ref={videoRef}
          className="hero-video"
          src="https://res.cloudinary.com/ddm0xsugl/video/upload/v1775292185/Ashish_reel_gjr5xu.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      {/* Dark overlay so text is readable */}
      <div ref={overlayRef} className="hero-overlay" />

      {/* Content */}
      <div className="hero-content">
        <p className="hero-tag">Director of Photography</p>
        <h1 ref={titleRef} className="hero-title">ASHISH</h1>
        <p ref={subtitleRef} className="hero-subtitle">
          Crafting visual stories — one frame at a time
        </p>
        <a href="#work" className="hero-btn">
          View Work
          <span className="btn-line" />
        </a>
      </div>

      {/* Scroll Indicator */}
      <div ref={scrollRef} className="scroll-indicator">
        <span className="scroll-text">Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}