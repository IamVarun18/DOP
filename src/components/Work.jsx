import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Work.css";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Echoes of Light",
    category: "Ad Film",
    year: "2024",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  },
  {
    id: 2,
    title: "Wildfire",
    category: "Music Video",
    year: "2024",
    gradient: "linear-gradient(135deg, #2d1b00 0%, #6b3a00 50%, #c17f24 100%)",
  },
  {
    id: 3,
    title: "The Last Frame",
    category: "Short Film",
    year: "2023",
    gradient: "linear-gradient(135deg, #0d0d0d 0%, #1a0a0a 50%, #3d1515 100%)",
  },
  {
    id: 4,
    title: "Noor",
    category: "Ad Film",
    year: "2023",
    gradient: "linear-gradient(135deg, #0a1628 0%, #1e3a5f 50%, #2d5a8e 100%)",
  },
  {
    id: 5,
    title: "Resonance",
    category: "Music Video",
    year: "2023",
    gradient: "linear-gradient(135deg, #1a0a2e 0%, #3d1560 50%, #6b2fa0 100%)",
  },
  {
    id: 6,
    title: "Concrete Dreams",
    category: "Short Film",
    year: "2022",
    gradient: "linear-gradient(135deg, #0d1a0d 0%, #1a3a1a 50%, #2d6b2d 100%)",
  },
  {
    id: 7,
    title: "Golden Hour",
    category: "Ad Film",
    year: "2022",
    gradient: "linear-gradient(135deg, #1a1200 0%, #4a3500 50%, #b48c50 100%)",
  },
  {
    id: 8,
    title: "Silence Between",
    category: "Short Film",
    year: "2022",
    gradient: "linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #333333 100%)",
  },
];

export default function Work() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Section title animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
        },
      }
    );

    gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 85%",
        },
      }
    );

    // Cards stagger in on scroll
    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
          delay: (i % 3) * 0.12,
        }
      );
    });
  }, []);

  const handleMouseEnter = (card) => {
    gsap.to(card.querySelector(".work-img"), {
      scale: 1.08,
      duration: 0.6,
      ease: "power2.out",
    });
    gsap.to(card.querySelector(".work-info"), {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(card.querySelector(".work-overlay"), {
      opacity: 1,
      duration: 0.4,
    });
  };

  const handleMouseLeave = (card) => {
    gsap.to(card.querySelector(".work-img"), {
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
    });
    gsap.to(card.querySelector(".work-info"), {
      y: 20,
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(card.querySelector(".work-overlay"), {
      opacity: 0,
      duration: 0.4,
    });
  };

  return (
    <section ref={sectionRef} className="work" id="work">
      {/* Section Header */}
      <div className="work-header">
        <p className="work-tag">Selected Work</p>
        <h2 ref={titleRef} className="work-title">
          THE PROJECTS
        </h2>
        <div ref={lineRef} className="work-line" />
      </div>

      {/* Grid */}
      <div className="work-grid">
        {projects.map((project, i) => (
          <div
            key={project.id}
            className="work-card"
            ref={(el) => (cardsRef.current[i] = el)}
            onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
          >
            {/* Placeholder image */}
            <div
              className="work-img"
              style={{ background: project.gradient }}
            >
              {/* Swap this div with <img> when you have real images */}
              <div className="work-placeholder-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 10l4.553-2.277A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
                    stroke="rgba(180,140,80,0.4)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Hover overlay */}
            <div className="work-overlay" />

            {/* Info slides up on hover */}
            <div className="work-info">
              <p className="work-category">{project.category}</p>
              <h3 className="work-name">{project.title}</h3>
              <p className="work-year">{project.year}</p>
            </div>

            {/* Always visible bottom strip */}
            <div className="work-bottom">
              <span className="work-bottom-title">{project.title}</span>
              <span className="work-bottom-cat">{project.category}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}