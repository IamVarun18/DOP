import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import LensLogo from "./LensLogo";
import "./Preloader.css";

export default function Preloader({ onComplete }) {
  const preloaderRef = useRef(null);
  const progressRef = useRef(null);
  const percentRef = useRef(null);
  const logoRef = useRef(null);
  const taglineRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Logo fades in
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
    )
    // Tagline fades in
    .fromTo(
      taglineRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    )
    // Progress bar fills
    .fromTo(
      progressRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 2,
        ease: "power1.inOut",
        onUpdate: function () {
          const progress = Math.round(this.progress() * 100);
          if (percentRef.current) {
            percentRef.current.textContent = progress + "%";
          }
        },
      },
      "+=0.2"
    )
    // Hold for a moment
    .to({}, { duration: 0.3 })
    // Slide up and exit
    .to(preloaderRef.current, {
      yPercent: -100,
      duration: 1,
      ease: "power4.inOut",
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });
  }, []);

  return (
    <div ref={preloaderRef} className="preloader">
      {/* Lens logo */}
      <div ref={logoRef} className="preloader-logo">
        <LensLogo size={90} spin={true} />
      </div>

      {/* Name */}
      <div ref={taglineRef} className="preloader-name">
        <h1 className="preloader-title">ASHISH</h1>
        <p className="preloader-tagline">Life in a Lens</p>
      </div>

      {/* Progress */}
      <div className="preloader-progress-wrapper">
        <div className="preloader-progress-bar">
          <div ref={progressRef} className="preloader-progress-fill" />
        </div>
        <span ref={percentRef} className="preloader-percent">0%</span>
      </div>

      {/* Corner decorations */}
      <div className="preloader-corner tl" />
      <div className="preloader-corner tr" />
      <div className="preloader-corner bl" />
      <div className="preloader-corner br" />
    </div>
  );
}