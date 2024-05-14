import React from 'react';
import '../styles/ProfessionalCard.css'; 
import { ProfessionalEntity } from '../interfaces';

const ProfessionalCard: React.FC<ProfessionalEntity> = ({ 
  name, 
  role, 
  location, 
  price, 
  appointment_length, 
  description, 
  total_reviews, 
  review_score 
}) => {
  const roundedReviewScore = Math.round(review_score);
  const stars = '⭐'.repeat(roundedReviewScore);

  // Define the path to the default profile picture
  const defaultProfilePicture = '/images/default-profile.jpg';

  return (
    <div className="professional-card">
      <div className="profile-picture">
        <img src={defaultProfilePicture} />
      </div>
      <div className="description">{description}</div>
      <div className="professional-info">
        <h2>{name}</h2>
        <p className="role-location">
          <span className="role">{role}</span> | <span className="location">{location}</span>
        </p>
                <div className="reviews">
          <span className="stars">{stars}</span>
          <span className="review-count">({total_reviews} reviews)</span>
        </div>
        <div className="price-info">
          <span className="price">R${price}</span> / <span className="appointment-length">{appointment_length} minutes</span>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCard;
