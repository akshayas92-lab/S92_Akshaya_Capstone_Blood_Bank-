function BloodRequestCard({
  bloodGroup,
  hospital,
  urgency
}) {
  return (
    <div className="card request-card">
      <div className="request-header">
        <h3>Blood Request</h3>

        <span
          className={
            urgency === "Emergency"
              ? "urgency emergency"
              : "urgency high"
          }
        >
          {urgency}
        </span>
      </div>

      <div className="card-info">
        <p>
          <strong>Blood Group</strong>
          <span className="blood-badge">
            {bloodGroup}
          </span>
        </p>

        <p>
          <strong>Hospital</strong>
          <span>{hospital}</span>
        </p>
      </div>

      <button className="card-button">
        View Request
      </button>
    </div>
  );
}

export default BloodRequestCard;