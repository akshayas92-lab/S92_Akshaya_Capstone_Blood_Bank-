function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <p className="hero-tag">
          🩸 FAST • SAFE • RELIABLE
        </p>

        <h1>
          Find Blood.
          <br />
          <span>Save Lives.</span>
        </h1>

        <p className="hero-description">
          Connect emergency blood requests with eligible
          donors quickly and efficiently.
        </p>

        <div className="hero-buttons">
          <button className="primary-button">
            Request Blood
          </button>

          <a
            href="#donors"
            className="secondary-button"
          >
            Find a Donor
          </a>
        </div>
      </div>

      <div className="hero-card">
        <div className="blood-drop">🩸</div>

        <h3>Every Drop Counts</h3>

        <p>
          Your donation can help save someone's life.
        </p>
      </div>
    </section>
  );
}

export default Hero;