function DonorCard({ name, bloodGroup, location }) {
  return (
    <div className="card">
      <div className="card-top">
        <div className="donor-avatar">
          {name ? name.charAt(0).toUpperCase() : "D"}
        </div>

        <div className="donor-details">
          <h3>{name}</h3>

          <span className="available">
            ● Available
          </span>
        </div>
      </div>

      <div className="card-info">
        <p>
          <strong>Blood Group</strong>

          <span className="blood-badge">
            {bloodGroup}
          </span>
        </p>

        <p>
          <strong>Location</strong>

          <span>{location}</span>
        </p>
      </div>

      <button
        className="card-button"
        type="button"
        onClick={() => alert(`Contacting ${name}`)}
      >
        Contact Donor
      </button>
    </div>
  );
}

export default DonorCard;