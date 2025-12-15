import { Link } from 'react-router-dom';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import './Home.css';

function Home() {
  const services = [
    {
      id: 1,
      title: 'Portrait Photography',
      description: 'Capturing your unique personality and essence in stunning portraits.',
      image: null,
    },
    {
      id: 2,
      title: 'Event Photography',
      description: 'Documenting your special moments with artistic precision.',
      image: null,
    },
    {
      id: 3,
      title: 'Commercial Photography',
      description: 'Professional imagery that elevates your brand and products.',
      image: null,
    },
  ];

  const portfolioPreview = [
    { id: 1, title: 'Portrait Session', category: 'Portraits' },
    { id: 2, title: 'Wedding Day', category: 'Events' },
    { id: 3, title: 'Product Shoot', category: 'Commercial' },
    { id: 4, title: 'Corporate Event', category: 'Events' },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">YOUR NAME</h1>
          <p className="hero-subtitle">Professional Photographer</p>
          <p className="hero-description">
            Capturing life's precious moments with artistic vision and technical excellence.
            Every frame tells a story worth remembering.
          </p>
          <div className="hero-buttons">
            <Link to="/museum" className="btn btn-primary">View Museum</Link>
            <Link to="/contact" className="btn btn-outline">Get In Touch</Link>
          </div>
        </div>
        <div className="hero-images">
          <div className="hero-image-grid">
            <div className="hero-image image-1">
              <div className="image-placeholder">Photo 1</div>
            </div>
            <div className="hero-image image-2">
              <div className="image-placeholder">Photo 2</div>
            </div>
            <div className="hero-image image-3">
              <div className="image-placeholder">Photo 3</div>
            </div>
            <div className="hero-image image-4">
              <div className="image-placeholder">Photo 4</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="about-preview section">
        <div className="container">
          <div className="about-preview-grid">
            <div className="about-preview-image">
              <div className="image-placeholder">Profile Photo</div>
            </div>
            <div className="about-preview-content">
              <h2 className="section-title">I AM YOUR NAME</h2>
              <p className="about-preview-text">
                With over 10 years of experience in professional photography, I specialize in
                capturing the authentic moments that matter most. My approach combines technical
                expertise with artistic vision, creating images that tell your unique story.
              </p>
              <p className="about-preview-text">
                From intimate portraits to grand celebrations, I bring passion and dedication
                to every project. Let's create something beautiful together.
              </p>
              <div className="about-preview-contact">
                <div className="contact-item">
                  <span className="contact-label">Phone</span>
                  <span className="contact-value">+1 (555) 123-4567</span>
                </div>
                <div className="contact-item">
                  <span className="contact-label">Email</span>
                  <span className="contact-value">hello@yourname.com</span>
                </div>
              </div>
              <Link to="/about" className="btn btn-outline">Learn More About Me</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-preview section">
        <div className="container">
          <h2 className="section-title text-center">My Photography Services</h2>
          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-image">
                  {service.image ? (
                    <img src={service.image} alt={service.title} />
                  ) : (
                    <div className="image-placeholder">{service.title}</div>
                  )}
                </div>
                <div className="service-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '3rem' }}>
            <Link to="/services" className="btn btn-primary">View All Services</Link>
          </div>
        </div>
      </section>

      {/* Museum Preview Section */}
      <section className="museum-preview section">
        <div className="container">
          <h2 className="section-title text-center">Explore Our Museum Collection</h2>
          <div className="museum-grid">
            {portfolioPreview.map((item) => (
              <div key={item.id} className="museum-item">
                <div className="museum-image">
                  <div className="image-placeholder">{item.title}</div>
                </div>
                <div className="museum-overlay">
                  <h4>{item.title}</h4>
                  <span>{item.category}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '3rem' }}>
            <Link to="/museum" className="btn btn-primary">View Full Museum</Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Testimonials Section */}
      <Testimonials />
    </div>
  );
}

export default Home;
