import { useCallback, useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import "./App.css";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "http://localhost:5000" : "")
).replace(/\/$/, "");
const API_CONFIGURATION_ERROR =
  "VITE_API_URL is not configured. Set it to your backend base URL.";

function App() {
  const [session, setSession] = useState(() => {
    const token = localStorage.getItem("bloodBankToken");
    const savedUser = localStorage.getItem("bloodBankUser");

    if (!token || !savedUser) {
      return null;
    }

    try {
      return { token, user: JSON.parse(savedUser) };
    } catch (error) {
      console.error("Stored user data is invalid:", error);
      localStorage.removeItem("bloodBankToken");
      localStorage.removeItem("bloodBankUser");
      return null;
    }
  });

  const [inventory, setInventory] = useState([]);

  const [bloodGroup, setBloodGroup] = useState("A+");
  const [unitsAvailable, setUnitsAvailable] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editUnits, setEditUnits] = useState("");

  const [loading, setLoading] = useState(Boolean(session));
  const [error, setError] = useState("");

  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    phone: "",
  });
  const [authError, setAuthError] = useState("");
  const [authSubmitting, setAuthSubmitting] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [requestDraft, setRequestDraft] = useState({
    bloodGroup: "",
    unitsRequired: "",
    hospitalName: "",
    location: "",
    urgency: "medium",
  });
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [requestStatus, setRequestStatus] = useState("");

  const API_URL = `${API_BASE_URL}/api/blood-inventory`;
  const UPLOAD_URL = `${API_BASE_URL}/api/upload`;

  const apiFetch = useCallback(
    (url, options = {}) => {
      if (!API_BASE_URL) {
        throw new Error(API_CONFIGURATION_ERROR);
      }

      const headers = new Headers(options.headers);

      if (session?.token) {
        headers.set("Authorization", `Bearer ${session.token}`);
      }

      return fetch(url, { ...options, headers });
    },
    [session]
  );

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthSubmitting(true);

    try {
      if (!API_BASE_URL) {
        throw new Error(API_CONFIGURATION_ERROR);
      }

      if (authMode === "register") {
        const registerResponse = await fetch(
          `${API_BASE_URL}/api/auth/register`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(authForm),
          }
        );
        const registerData = await registerResponse.json();

        if (!registerResponse.ok) {
          throw new Error(registerData.error || "Registration failed.");
        }
      }

      const loginResponse = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: authForm.username,
          password: authForm.password,
        }),
      });
      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(loginData.error || "Login failed.");
      }

      localStorage.setItem("bloodBankToken", loginData.token);
      localStorage.setItem("bloodBankUser", JSON.stringify(loginData.user));
      setLoading(true);
      setSession({ token: loginData.token, user: loginData.user });
    } catch (err) {
      console.error("Authentication error:", err);
      setAuthError(
        err instanceof TypeError
          ? `Unable to connect to the API at ${API_BASE_URL}. Start the backend from the server folder and check its database configuration.`
          : err.message || "Unable to authenticate."
      );
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("bloodBankToken");
    localStorage.removeItem("bloodBankUser");
    setSession(null);
  };

  const handleRequestAutocomplete = async () => {
    setAiLoading(true);
    setAiError("");
    setRequestStatus("");

    try {
      const response = await apiFetch(`${API_BASE_URL}/api/ai/request-autocomplete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to generate request suggestions.");
      }

      setRequestDraft((currentDraft) => ({
        ...currentDraft,
        ...Object.fromEntries(
          Object.entries(data.suggestion).filter(([, value]) => value !== null)
        ),
      }));
    } catch (err) {
      console.error("AI autocomplete error:", err);
      setAiError(err.message || "Unable to generate request suggestions.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleBloodRequestSubmit = async (e) => {
    e.preventDefault();
    setRequestStatus("");

    try {
      const response = await apiFetch(`${API_BASE_URL}/api/blood-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...requestDraft,
          unitsRequired: Number(requestDraft.unitsRequired),
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to submit blood request.");
      }

      setRequestStatus("Blood request submitted successfully.");
      setRequestDraft({
        bloodGroup: "",
        unitsRequired: "",
        hospitalName: "",
        location: "",
        urgency: "medium",
      });
      setAiPrompt("");
    } catch (err) {
      console.error("Blood request error:", err);
      setRequestStatus(err.message || "Unable to submit blood request.");
    }
  };

  // =========================
  // GET ALL INVENTORY
  // =========================

  const requestInventory = useCallback(async () => {
    const response = await apiFetch(API_URL);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch inventory");
    }

    return data;
  }, [apiFetch, API_URL]);

  const fetchInventory = useCallback(async () => {
    try {
      setInventory(await requestInventory());
      setError("");
    } catch (err) {
      console.error("GET error:", err);
      setError(err.message || "Unable to load blood inventory.");
    } finally {
      setLoading(false);
    }
  }, [requestInventory]);

  useEffect(() => {
    if (session) {
      requestInventory()
        .then((data) => {
          setInventory(data);
          setError("");
        })
        .catch((err) => {
          console.error("GET error:", err);
          setError(err.message || "Unable to load blood inventory.");
        })
        .finally(() => setLoading(false));
    }
  }, [session, requestInventory]);

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
      const response = await apiFetch(API_URL, {
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
      setLoading(true);
      setError("");
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
      const response = await apiFetch(`${API_URL}/${id}`, {
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
      const response = await apiFetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Delete failed.");
        return;
      }

      setInventory((currentInventory) =>
        currentInventory.filter((item) => item._id !== id)
      );

      alert("Blood inventory deleted successfully!");
    } catch (err) {
      console.error("DELETE error:", err);
      alert("Server error while deleting inventory.");
    }
  };

  // =========================
  // FILE SELECT
  // =========================

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setUploadedFile(null);
  };

  // =========================
  // FILE UPLOAD
  // =========================

  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await apiFetch(UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "File upload failed.");
        return;
      }

      setUploadedFile(data.file);
      setSelectedFile(null);

      e.target.reset();

      alert("File uploaded successfully!");
    } catch (err) {
      console.error("FILE UPLOAD error:", err);
      alert("Server error while uploading file.");
    } finally {
      setUploading(false);
    }
  };

  // =========================
  // =========================
  // LOGIN SCREEN
  // =========================

  if (!session) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h1>Blood Bank</h1>

          <p>
            {authMode === "login"
              ? "Login to access the Blood Bank System"
              : "Create an account to access the Blood Bank System"}
          </p>

          <form className="auth-form" onSubmit={handleAuthSubmit}>
            {authMode === "register" && (
              <>
                <input
                  type="text"
                  placeholder="Full name"
                  autoComplete="name"
                  required
                  value={authForm.name}
                  onChange={(e) =>
                    setAuthForm({ ...authForm, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  required
                  value={authForm.email}
                  onChange={(e) =>
                    setAuthForm({ ...authForm, email: e.target.value })
                  }
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  autoComplete="tel"
                  required
                  value={authForm.phone}
                  onChange={(e) =>
                    setAuthForm({ ...authForm, phone: e.target.value })
                  }
                />
              </>
            )}
            <input
              type="text"
              placeholder="Username"
              autoComplete="username"
              required
              value={authForm.username}
              onChange={(e) =>
                setAuthForm({ ...authForm, username: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              autoComplete={
                authMode === "login" ? "current-password" : "new-password"
              }
              minLength={8}
              required
              value={authForm.password}
              onChange={(e) =>
                setAuthForm({ ...authForm, password: e.target.value })
              }
            />
            {authError && (
              <p className="auth-error" role="alert">
                {authError}
              </p>
            )}
            <button type="submit" disabled={authSubmitting}>
              {authSubmitting
                ? "Please wait..."
                : authMode === "login"
                  ? "Login"
                  : "Create account"}
            </button>
          </form>

          <button
            type="button"
            className="auth-mode-toggle"
            onClick={() => {
              setAuthMode(authMode === "login" ? "register" : "login");
              setAuthError("");
            }}
          >
            {authMode === "login"
              ? "Need an account? Register"
              : "Already registered? Login"}
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // MAIN APPLICATION
  // =========================

  return (
    <>
      <Navbar />

      <div className="user-auth-bar">
        <div>
          <span>Welcome, </span>
          <strong>{session.user.name || session.user.username}</strong>
        </div>

        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>

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
            FILE UPLOAD
        ========================= */}

        <div className="inventory-form">
          <h3>Upload File</h3>

          <form onSubmit={handleFileUpload}>
            <input
              type="file"
              onChange={handleFileChange}
            />

            <button type="submit" disabled={uploading}>
              {uploading ? "Uploading..." : "Upload File"}
            </button>
          </form>

          {selectedFile && (
            <p>
              Selected file: <strong>{selectedFile.name}</strong>
            </p>
          )}

          {uploadedFile && (
            <div>
              <p>
                Uploaded file:{" "}
                <strong>{uploadedFile.originalName}</strong>
              </p>

              <p>
                Size: <strong>{uploadedFile.size} bytes</strong>
              </p>

              <a
                href={`${API_BASE_URL}${uploadedFile.path}`}
                target="_blank"
                rel="noreferrer"
              >
                View Uploaded File
              </a>
            </div>
          )}
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

              {/* NORMAL VIEW */}

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

              {/* UPDATE VIEW */}

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

      <section id="requests" className="section">
        <h2>Request Blood</h2>
        <p className="section-subtitle">
          Describe the need in plain language and let AI draft the request
          details for you to review.
        </p>

        <div className="request-form-card">
          <label htmlFor="ai-request-prompt">Describe the blood request</label>
          <textarea
            id="ai-request-prompt"
            rows="3"
            maxLength="1000"
            placeholder="For example: City Hospital needs 2 units of O+ blood in Chennai urgently."
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
          />
          <button
            type="button"
            className="ai-autocomplete-button"
            disabled={aiLoading || aiPrompt.trim().length < 5}
            onClick={handleRequestAutocomplete}
          >
            {aiLoading ? "Generating suggestions..." : "✨ Complete with AI"}
          </button>
          {aiError && (
            <p className="request-message request-error" role="alert">
              {aiError}
            </p>
          )}

          <form className="blood-request-form" onSubmit={handleBloodRequestSubmit}>
            <label>
              Blood group
              <select
                required
                value={requestDraft.bloodGroup}
                onChange={(e) =>
                  setRequestDraft({ ...requestDraft, bloodGroup: e.target.value })
                }
              >
                <option value="" disabled>Select a blood group</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (group) => (
                    <option key={group} value={group}>{group}</option>
                  )
                )}
              </select>
            </label>
            <label>
              Units required
              <input
                type="number"
                min="1"
                max="100"
                required
                value={requestDraft.unitsRequired}
                onChange={(e) =>
                  setRequestDraft({
                    ...requestDraft,
                    unitsRequired: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Hospital
              <input
                type="text"
                maxLength="120"
                required
                value={requestDraft.hospitalName}
                onChange={(e) =>
                  setRequestDraft({
                    ...requestDraft,
                    hospitalName: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Location
              <input
                type="text"
                maxLength="120"
                required
                value={requestDraft.location}
                onChange={(e) =>
                  setRequestDraft({ ...requestDraft, location: e.target.value })
                }
              />
            </label>
            <label>
              Urgency
              <select
                value={requestDraft.urgency}
                onChange={(e) =>
                  setRequestDraft({ ...requestDraft, urgency: e.target.value })
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </label>
            <button type="submit">Submit Blood Request</button>
          </form>
          {requestStatus && (
            <p className="request-message" role="status">{requestStatus}</p>
          )}
          <p className="ai-disclaimer">
            AI suggestions can be inaccurate. Review every field before
            submitting your request.
          </p>
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