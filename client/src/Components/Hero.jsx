function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <div className="hero-tag"><span className="live-dot" /> FAST, SAFE &amp; RELIABLE</div>

        <h1>
          Every drop can be<br />
          <span>someone's tomorrow.</span>
        </h1>

        <p className="hero-description">
          A trusted platform connecting hospitals, blood banks and generous
          donors when every second matters.
        </p>

        <div className="hero-buttons">
          <a href="#requests" className="primary-button">
            Request blood <span aria-hidden="true">↗</span>
          </a>

          <a href="#inventory" className="secondary-button">View inventory</a>
        </div>
      </div>

      <div className="hero-card">
        <div className="hero-card-top">
          <span className="mini-label">LIVE AVAILABILITY</span>
          <span className="status-pill"><span /> Updated now</span>
        </div>
        <div className="blood-illustration" aria-hidden="true">
          <div className="blood-orb">+</div>
          <span className="orbit orbit-one" />
          <span className="orbit orbit-two" />
        </div>
        <div className="hero-card-copy">
          <h3>Make an impact today</h3>
          <p>One donation can save up to three lives.</p>
        </div>
        <div className="hero-card-footer">
          <div className="avatar-stack"><span>R</span><span>A</span><span>V</span><b>+2k</b></div>
          <span>Donors making a difference</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;