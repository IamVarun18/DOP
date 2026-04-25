import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

export default function Contact () {
  const tagRef = useRef(null)
  const titleRef = useRef(null)
  const lineRef = useRef(null)
  const formRef = useRef(null)
  const infoRef = useRef(null)

  useEffect(() => {
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
      formRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: formRef.current, start: 'top 85%' }
      }
    )
    gsap.fromTo(
      infoRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: infoRef.current, start: 'top 85%' }
      }
    )
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    alert('Message sent! Ashish will get back to you soon.')
  }

  return (
    <section className='contact' id='contact'>
      {/* Header */}
      <div className='contact-header'>
        <p ref={tagRef} className='contact-tag'>
          Get In Touch
        </p>
        <h2 ref={titleRef} className='contact-title'>
          Let's Create
          <br />
          <em>Something Great</em>
        </h2>
        <div ref={lineRef} className='contact-line' />
      </div>

      {/* Body */}
      <div className='contact-body'>
        {/* Left — Form */}
        <form ref={formRef} className='contact-form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Your Name</label>
            <input type='text' placeholder='John Doe' required />
          </div>
          <div className='form-group'>
            <label>Email Address</label>
            <input type='email' placeholder='john@email.com' required />
          </div>
          <div className='form-group'>
            <label>Project Type</label>
            <select>
              <option value=''>What are we creating?</option>
              <option>Music Video</option>
              <option>Short Film</option>
              <option>Documentary</option>
              <option>Web Series</option>
              <option>Other</option>
            </select>
          </div>

          <div className='form-group'>
            <label>Your Message</label>
            <textarea
              rows='5'
              placeholder='Tell me about your project...'
              required
            />
          </div>
          <button type='submit' className='form-btn'>
            Send Message
            <span className='form-btn-line' />
          </button>
        </form>

        {/* Right — Info */}
        <div ref={infoRef} className='contact-info'>
          <div className='info-block'>
            <p className='info-label'>Email</p>
            <a href='mailto:ashish@dop.com' className='info-value'>
              ashish@dop.com
            </a>
          </div>
          <div className='info-block'>
            <p className='info-label'>Phone</p>
            <a href='tel:+919999999999' className='info-value'>
              +91 99999 99999
            </a>
          </div>
          <div className='info-block'>
            <p className='info-label'>Availability</p>
            <p className='info-value available'>
              <span className='availability-dot' />
              Available for projects
            </p>
          </div>
          <div className='info-block'>
            <p className='info-label'>Follow</p>
            <div className='social-links'>
              <a href='#' className='social-link'>
                Instagram
              </a>
              <a href='#' className='social-link'>
                YouTube
              </a>
              <a href='#' className='social-link'>
                LinkedIn
              </a>
            </div>
          </div>

          {/* Big quote */}
          <div className='contact-quote'>
            <p>"Life in a Lens"</p>
            <span>— Ashish, DOP & Director</span>
          </div>
        </div>
      </div>
    </section>
  )
}
