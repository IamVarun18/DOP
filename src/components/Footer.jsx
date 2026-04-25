import './Footer.css'

export default function Footer () {
  return (
    <footer className='footer'>
      <div className='footer-top'>
        <p className='footer-logo'>DOP</p>
        <p className='footer-tagline'>Life in a Lens</p>
      </div>
      <div className='footer-divider' />
      <div className='footer-bottom'>
        <p className='footer-copy'>
          © {new Date().getFullYear()} Ashish. All rights reserved.
        </p>
        <div className='footer-links'>
          <a href='#hero'>Home</a>
          <a href='#work'>Work</a>
          <a href='#about'>About</a>
          <a
            href='https://instagram.com/life.in.a_lens'
            target='_blank'
            rel='noreferrer'
          >
            Instagram
          </a>
          <a href='#contact'>Contact</a>
        </div>
      </div>
    </footer>
  )
}
