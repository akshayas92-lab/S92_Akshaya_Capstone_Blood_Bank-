function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        🩸 Blood Bank
      </div>

      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#donors">Donors</a>
        <a href="#requests">Blood Requests</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;