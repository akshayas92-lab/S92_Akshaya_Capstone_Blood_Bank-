
import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import "./App.css";

function App() {
  const [inventory, setInventory] = useState([]);

  const [bloodGroup, setBloodGroup] = useState("A+");
  const [unitsAvailable, setUnitsAvailable] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editUnits, setEditUnits] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "http://localhost:5000/api/blood-inventory";

  // =========================
  // GET ALL INVENTORY
  // =========================
  const fetchInventory = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch inventory");
      }

      setInventory(data);
    } catch (err) {
      console.error("GET error:", err);
      setError("Unable to load blood inventory.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  // =========================
  // ADD INVENTORY
  // =========================
  const handleAddInventory = async (e) => {
    e.preventDefault();

    if (unitsAvailable === "") {
      alert("Please enter number of units.");
      return;
    }

    if (Number(unitsAvailable) < 0) {
      alert("Units cannot be negative.");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bloodGroup,
          unitsAvailable: Number(unitsAvailable),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to add inventory.");
        return;
      }

      alert("Blood inventory added successfully!");

      setUnitsAvailable("");
      fetchInventory();
    } catch (err) {
      console.error("POST error:", err);
      alert("Server error while adding inventory.");
    }
  };

  // =========================
  // START UPDATE
  // =========================
  const handleUpdateClick = (item) => {
    setEditingId(item._id);
    setEditUnits(String(item.unitsAvailable));
  };

  // =========================
  // CANCEL UPDATE
  // =========================
  const handleCancelUpdate = () => {
    setEditingId(null);
    setEditUnits("");
  };

  // =========================
  // SAVE UPDATE
  // =========================
  const handleSaveUpdate = async (id) => {
    if (editUnits === "") {
      alert("Please enter number of units.");
      return;
    }

    if (Number(editUnits) < 0) {
      alert("Units cannot be negative.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          unitsAvailable: Number(editUnits),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Update failed.");
        return;
      }

      // Update the card immediately
      setInventory((currentInventory) =>
        currentInventory.map((item) =>
          item._id === id
            ? {
                ...item,
                unitsAvailable: Number(editUnits),
                lastUpdated: data.lastUpdated || item.lastUpdated,
              }
            : item
        )
      );

      setEditingId(null);
      setEditUnits("");

      alert("Blood inventory updated successfully!");
    } catch (err) {
      console.error("PUT error:", err);
      alert("Server error while updating inventory.");
    }
  };

  // =========================
  // DELETE INVENTORY
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blood inventory?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Delete failed.");
        return;
      }

      // Remove deleted item from screen
      setInventory((currentInventory) =>
        currentInventory.filter((item) => item._id !== id)
      );

      alert("Blood inventory deleted successfully!");
    } catch (err) {
      console.error("DELETE error:", err);
      alert("Server error while deleting inventory.");
    }
  };

  return (
    <>
      <Navbar />

      <Hero />

      {/* =========================
          BLOOD INVENTORY
      ========================= */}
      <section id="inventory" className="section">
        <h2>Blood Inventory</h2>

        <p className="section-subtitle">
          Manage available blood inventory.
        </p>

        {/* =========================
            ADD INVENTORY FORM
        ========================= */}
        <div className="inventory-form">
          <h3>Add Blood Inventory</h3>

          <form onSubmit={handleAddInventory}>
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
            >
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>

            <input
              type="number"
              min="0"
              placeholder="Units available"
              value={unitsAvailable}
              onChange={(e) => setUnitsAvailable(e.target.value)}
            />

            <button type="submit">Add Inventory</button>
          </form>
        </div>

        {/* =========================
            ERROR
        ========================= */}
        {error && <p className="error-message">{error}</p>}

        {/* =========================
            LOADING
        ========================= */}
        {loading && <p>Loading blood inventory...</p>}

        {/* =========================
            INVENTORY CARDS
        ========================= */}
        <div className="cards">
          {!loading && inventory.length === 0 && (
            <p>No blood inventory available.</p>
          )}

          {inventory.map((item) => (
            <div className="card" key={item._id}>
              <h3>{item.bloodGroup}</h3>

              {/* =========================
                  NORMAL VIEW
              ========================= */}
              {editingId !== item._id && (
                <>
                  <p>
                    Available Units:{" "}
                    <strong>{item.unitsAvailable}</strong>
                  </p>

                  <div className="inventory-actions">
                    <button
                      type="button"
                      className="update-btn"
                      onClick={() => handleUpdateClick(item)}
                    >
                      Update
                    </button>

                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}

              {/* =========================
                  UPDATE VIEW
              ========================= */}
              {editingId === item._id && (
                <div className="update-box">
                  <p>Update available units:</p>

                  <input
                    type="number"
                    min="0"
                    value={editUnits}
                    onChange={(e) => setEditUnits(e.target.value)}
                    autoFocus
                  />

                  <div className="inventory-actions">
                    <button
                      type="button"
                      className="save-btn"
                      onClick={() => handleSaveUpdate(item._id)}
                    >
                      Save
                    </button>

                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={handleCancelUpdate}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =========================
          CONTACT US
      ========================= */}
      <section id="contact" className="section">
        <h2>Contact Us</h2>

        <p className="section-subtitle">
          Need blood urgently? Get in touch with us.
        </p>

        <p>Email: bloodbank@example.com</p>

        <p>Phone: +91 98765 43210</p>
      </section>

      {/* =========================
          FOOTER
      ========================= */}
      <footer>
        <p>© 2026 Blood Bank System. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;