import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Showreel.css";

gsap.registerPlugin(ScrollTrigger);

export default function Showreel() {
  const [isOpen, setIsOpen] = useState(false);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const btnRef = useRef(null);
  const tagRef = useRef(null);
  const modalRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // Scroll animations
    gsap.fromTo(tagRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: tagRef.current, start: "top 85%" } }
    );
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: titleRef.current, start: "top 85%" } }
    );
    gsap.fromTo(btnRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)",
        scrollTrigger: { trigger: btnRef.current, start: "top 85%" } }
    );

    // Pulse animation on play button
    gsap.to(".play-ring", {
      scale: 1.4,
      opacity: 0,
      duration: 1.8,
      repeat: -1,
      ease: "power2.out",
    });
  }, []);

  // Open modal
  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      gsap.fromTo(modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(videoRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.2 }
      );
    }, 10);
  };

  // Close modal
  const closeModal = () => {
    gsap.to(modalRef.current, {
      opacity: 0, duration: 0.3, ease: "power2.in",
      onComplete: () => {
        setIsOpen(false);
        document.body.style.overflow = "";
      },
    });
  };

  return (
    <>
      <section ref={sectionRef} className="showreel" id="showreel">
        {/* Background text */}
        <p className="showreel-bg-text">REEL</p>

        {/* Content */}
        <div className="showreel-content">
          <p ref={tagRef} className="showreel-tag">2024 Showreel</p>
          <h2 ref={titleRef} className="showreel-title">
            Watch the<br /><em>Reel</em>
          </h2>

          {/* Play Button */}
          <div
            ref={btnRef}
            className="play-btn"
            onClick={openModal}
          >
            <div className="play-ring" />
            <div className="play-ring play-ring-2" />
            <div className="play-circle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M8 5.14v14l11-7-11-7z" fill="currentColor" />
              </svg>
            </div>
          </div>

          <p className="showreel-hint">Click to watch</p>
        </div>

        {/* Decorative lines */}
        <div className="showreel-line left" />
        <div className="showreel-line right" />
      </section>

      {/* Modal */}
      {isOpen && (
        <div ref={modalRef} className="reel-modal" onClick={closeModal}>
          <button className="modal-close" onClick={closeModal}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <div
            ref={videoRef}
            className="modal-video-wrapper"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              className="modal-video"
              src="https://res.cloudinary.com/ddm0xsugl/video/upload/v1775292185/Ashish_reel_gjr5xu.mp4"
              controls
              autoPlay
            />
          </div>
        </div>
      )}
    </>
  );
}