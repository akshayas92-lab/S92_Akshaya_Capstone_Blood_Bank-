function Navbar() {
  return (
    <nav className="navbar">
      <a className="logo" href="#home" aria-label="LifeLine Blood Bank home">
        <span className="logo-mark" aria-hidden="true">+</span>
        <span>
          <strong>LifeLine</strong>
          <small>Blood Bank</small>
        </span>
      </a>

      <div className="nav-links">
        <a className="active" href="#home">Overview</a>
        <a href="#inventory">Inventory</a>
        <a href="#requests">Requests</a>
        <a href="#contact">Contact</a>
      </div>

      <a className="nav-help" href="#contact">
        <span className="help-icon">?</span>
        <span>Need help?</span>
      </a>
    </nav>
  );
}

export default Navbar;