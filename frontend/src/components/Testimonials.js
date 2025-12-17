import { useState } from 'react';
import './Testimonials.css';

const testimonialData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Wedding Client',
    image: null,
    rating: 5,
    text: 'Absolutely incredible work! The photos from our wedding day exceeded all expectations. Every moment was captured beautifully, and the attention to detail was remarkable.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Corporate Client',
    image: null,
    rating: 5,
    text: 'Professional, creative, and a pleasure to work with. The corporate headshots and event photography were exactly what we needed. Highly recommend!',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Portrait Client',
    image: null,
    rating: 5,
    text: 'I was nervous about my portrait session, but the experience was so comfortable and fun. The final photos were stunning - I\'ve never looked better!',
  },
  {
    id: 4,
    name: 'David Thompson',
    role: 'Event Organizer',
    image: null,
    rating: 5,
    text: 'We\'ve hired this photographer for multiple events now, and they never disappoint. Consistently excellent quality and always captures the energy of the moment.',
  },
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialData.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialData.length) % testimonialData.length);
  };

  const currentTestimonial = testimonialData[currentIndex];

  return (
    <section className="testimonials section">
      <div className="container">
        <h2 className="section-title text-center">What My Clients Say</h2>

        <div className="testimonials-carousel">
          <button className="carousel-btn prev" onClick={prevTestimonial} aria-label="Previous testimonial">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div className="testimonial-card">
            <div className="testimonial-avatar">
              {currentTestimonial.image ? (
                <img src={currentTestimonial.image} alt={currentTestimonial.name} />
              ) : (
                <div className="avatar-placeholder">
                  {currentTestimonial.name.charAt(0)}
                </div>
              )}
            </div>

            <div className="star-rating">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`star ${i < currentTestimonial.rating ? 'filled' : ''}`}>
                  ★
                </span>
              ))}
            </div>

            <p className="testimonial-text">"{currentTestimonial.text}"</p>

            <div className="testimonial-author">
              <h4>{currentTestimonial.name}</h4>
              <p>{currentTestimonial.role}</p>
            </div>
          </div>

          <button className="carousel-btn next" onClick={nextTestimonial} aria-label="Next testimonial">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        <div className="testimonial-dots">
          {testimonialData.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
