import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import DonorCard from "./Components/DonorCard";
import BloodRequestCard from "./Components/BloodRequestCard";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <Hero />

      <section id="donors" className="section">
        <h2>Available Blood Donors</h2>

        <p className="section-subtitle">
          Find eligible donors who can help during emergencies.
        </p>

        <div className="cards">
          <DonorCard
            name="Akshaya"
            bloodGroup="O+"
            location="Madurai"
          />

          <DonorCard
            name="Priya"
            bloodGroup="A+"
            location="Chennai"
          />

          <DonorCard
            name="Rahul"
            bloodGroup="B+"
            location="Coimbatore"
          />
        </div>
      </section>

      <section id="requests" className="section requests-section">
        <h2>Urgent Blood Requests</h2>

        <p className="section-subtitle">
          Help patients by responding to emergency blood requests.
        </p>

        <div className="cards">
          <BloodRequestCard
            bloodGroup="O+"
            hospital="Apollo Hospital"
            urgency="Emergency"
          />

          <BloodRequestCard
            bloodGroup="A+"
            hospital="Government Hospital"
            urgency="High"
          />
        </div>
      </section>

      <section id="contact" className="contact-section">
        <h2>Need Blood?</h2>

        <p>
          During an emergency, connect with eligible donors quickly
          and save lives.
        </p>

        <button className="contact-button">
          Contact Blood Bank
        </button>
      </section>

      <footer>
        <p>© 2026 Blood Bank System. Save Lives, Donate Blood.</p>
      </footer>
    </>
  );
}

export default App;