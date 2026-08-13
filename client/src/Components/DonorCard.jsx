function DonorCard({ name, bloodGroup, location }) {
  return (
    <div className="card">
      <div className="card-top">
        <div className="donor-avatar">
          {name.charAt(0)}
        </div>

        <div>
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

      <button className="card-button">
        Contact Donor
      </button>
    </div>
  );
}

export default DonorCard;