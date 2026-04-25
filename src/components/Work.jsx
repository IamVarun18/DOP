import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Work.css";

gsap.registerPlugin(ScrollTrigger);

const videoIds = [
  "3xv4_TxHXH4",
  "1tFk3DCSnY4",
  "HBbXh-bHZFk",
  "oDPfCzop02Q",
  "tVXHlCx89XI",
  "YyZBRnpzSFE",
  "pSE8UPjKA9o",
  "8fJOF0SWDQA",
  "Cc4PZh998LY",
  "2an9QJkp8Uw",
  "1NcPItYjbfo",
  "qO_facOiG14",
  "-JqqPlaFC3A",
  "UC6yxl37lyY",
  "J28vVkQN9l0",
  "NMUd3gBVnOM",
  "FOPegUQ2B7s",
  "XVQ0u4CnP4s",
  "jjpkY65Nzpw",
  "ISJSrEyDrBE",
  "Acu0VItGmrM",
  "kI6VxRv63oY",
  "PYBTLpaadK0",
  "CUhEiykAnro",
];

const getThumbnail = (videoId) =>
  `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

const getEmbed = (videoId) =>
  `https://www.youtube.com/embed/${videoId}?autoplay=1`;

const fetchTitle = async (videoId) => {
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    );
    const data = await res.json();
    return data.title;
  } catch {
    return videoId;
  }
};

export default function Work() {
  const [projects, setProjects] = useState(
    videoIds.map((id, i) => ({ id: i, videoId: id, title: "Loading..." }))
  );
  const [activeVideo, setActiveVideo] = useState(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const cardsRef = useRef([]);
  const modalRef = useRef(null);

  // Fetch all titles on mount
  useEffect(() => {
    const loadTitles = async () => {
      const updated = await Promise.all(
        videoIds.map(async (id, i) => ({
          id: i,
          videoId: id,
          title: await fetchTitle(id),
        }))
      );
      setProjects(updated);
    };
    loadTitles();
  }, []);

  // Header animations
  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
      }
    );
    gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: lineRef.current, start: "top 85%" },
      }
    );
  }, []);

  // Card animations when projects load
  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          delay: (i % 3) * 0.08,
          scrollTrigger: { trigger: card, start: "top 92%" },
        }
      );
    });
  }, [projects]);

  const openModal = (videoId) => {
    setActiveVideo(videoId);
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: "power2.out" }
      );
    }, 10);
  };

  const closeModal = () => {
    gsap.to(modalRef.current, {
      opacity: 0, duration: 0.3,
      onComplete: () => {
        setActiveVideo(null);
        document.body.style.overflow = "";
      },
    });
  };

  const handleMouseEnter = (card) => {
    gsap.to(card.querySelector(".work-thumb"), {
      scale: 1.07, duration: 0.5, ease: "power2.out",
    });
    gsap.to(card.querySelector(".work-overlay"), { opacity: 1, duration: 0.3 });
    gsap.to(card.querySelector(".work-play"), {
      scale: 1, opacity: 1, duration: 0.3,
    });
    gsap.to(card.querySelector(".work-info"), {
      y: 0, opacity: 1, duration: 0.3,
    });
  };

  const handleMouseLeave = (card) => {
    gsap.to(card.querySelector(".work-thumb"), {
      scale: 1, duration: 0.5, ease: "power2.out",
    });
    gsap.to(card.querySelector(".work-overlay"), { opacity: 0, duration: 0.3 });
    gsap.to(card.querySelector(".work-play"), {
      scale: 0.8, opacity: 0, duration: 0.3,
    });
    gsap.to(card.querySelector(".work-info"), {
      y: 16, opacity: 0, duration: 0.3,
    });
  };

  return (
    <>
      <section className="work" id="work">
        {/* Header */}
        <div className="work-header">
          <p className="work-tag">Selected Work</p>
          <h2 ref={titleRef} className="work-title">THE PROJECTS</h2>
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
              onClick={() => openModal(project.videoId)}
            >
              {/* YouTube Thumbnail */}
              <div className="work-thumb-wrapper">
                <img
                  className="work-thumb"
                  src={getThumbnail(project.videoId)}
                  alt={project.title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = `https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`;
                  }}
                />
              </div>

              {/* Hover overlay */}
              <div className="work-overlay" />

              {/* Play button */}
              <div className="work-play">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              </div>

              {/* Info on hover */}
              <div className="work-info">
                <h3 className="work-name">{project.title}</h3>
              </div>

              {/* Always visible bottom strip */}
              <div className="work-bottom">
                <span className="work-bottom-title">{project.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Modal */}
      {activeVideo && (
        <div ref={modalRef} className="work-modal" onClick={closeModal}>
          <button className="work-modal-close" onClick={closeModal}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div
            className="work-modal-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={getEmbed(activeVideo)}
              title="Project Video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}