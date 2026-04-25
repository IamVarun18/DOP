import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ashish1 from '../assets/ashish-1.jpeg'
import ashish2 from '../assets/ashish-2.jpeg'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { number: '50+', label: 'Projects Delivered' },
  { number: '30+', label: 'Music Videos' },
  { number: '20+', label: 'Ad Films' },
  { number: '10+', label: 'Short Films' }
]

export default function About () {
  const sectionRef = useRef(null)
  const img1Ref = useRef(null)
  const img2Ref = useRef(null)
  const tagRef = useRef(null)
  const titleRef = useRef(null)
  const lineRef = useRef(null)
  const textRef = useRef(null)
  const statsRef = useRef([])

  useEffect(() => {
    // Image 1 slides in from left
    gsap.fromTo(
      img1Ref.current,
      { opacity: 0, x: -60 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: img1Ref.current, start: 'top 80%' }
      }
    )

    // Image 2 slides in slightly delayed
    gsap.fromTo(
      img2Ref.current,
      { opacity: 0, x: -30, y: 40 },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: { trigger: img1Ref.current, start: 'top 80%' }
      }
    )

    // Text content fades in from right
    gsap.fromTo(
      tagRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: tagRef.current, start: 'top 85%' }
      }
    )

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' }
      }
    )

    gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: lineRef.current, start: 'top 85%' }
      }
    )

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: { trigger: textRef.current, start: 'top 85%' }
      }
    )

    // Stats count up
    statsRef.current.forEach((stat, i) => {
      gsap.fromTo(
        stat,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          delay: i * 0.1,
          scrollTrigger: { trigger: stat, start: 'top 90%' }
        }
      )
    })
  }, [])

  return (
    <section ref={sectionRef} className='about' id='about'>
      {/* Left — Images */}
      <div className='about-images'>
        <div ref={img1Ref} className='about-img-main'>
          <img src={ashish1} alt='Ashish on set' />
          <div className='about-img-border' />
        </div>
        <div ref={img2Ref} className='about-img-secondary'>
          <img src={ashish2} alt='Ashish behind camera' />
        </div>
        {/* Floating label */}
        <div className='about-floating-tag'>
          <span>DOP</span>
          <span>&</span>
          <span>Director</span>
        </div>
      </div>

      {/* Right — Content */}
      <div className='about-content'>
        <p ref={tagRef} className='about-tag'>
          About
        </p>

        <h2 ref={titleRef} className='about-title'>
          Life in
          <br />
          <em>a Lens</em>
        </h2>

        <div ref={lineRef} className='about-line' />

        <div ref={textRef} className='about-text'>
          <p>
            Hey, I'm Ashish — a Director of Photography and Director who
            genuinely loves what he does. Whether it's a high-energy music
            video, an emotional short film, or a sleek ad campaign, I pour
            everything into making each frame feel alive.
          </p>
          <p>
            I started with a camera and a curiosity that never really switched
            off. Over the years that curiosity turned into a craft — working
            with incredible teams, talented artists, and brands that trust me to
            tell their stories visually.
          </p>
          <p>
            For me, filmmaking isn't just a job. It's how I see the world. Every
            project is a new conversation, a new emotion, a new opportunity to
            create something that stays with people long after the screen goes
            dark.
          </p>
        </div>
        {/* Stats */}
        <div className='about-stats'>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className='about-stat'
              ref={el => (statsRef.current[i] = el)}
            >
              <span className='stat-number'>{stat.number}</span>
              <span className='stat-label'>{stat.label}</span>
            </div>
          ))}
        </div>

        <a href='#contact' className='about-cta'>
          Let's Work Together
        </a>
      </div>
    </section>
  )
}
