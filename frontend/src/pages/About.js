import Testimonials from '../components/Testimonials';
import './About.css';

function About() {
  const stats = [
    { value: '15+', label: 'Years Experience' },
    { value: '500+', label: 'Projects Completed' },
    { value: '10+', label: 'Awards Won' },
    { value: '05+', label: 'Team Members' },
    { value: '10,000+', label: 'Photos Delivered' },
    { value: '90%', label: 'Client Retention' },
  ];

  const timeline = [
    {
      year: '2005',
      title: 'The Beginning',
      description: 'Started my journey in photography with a simple point-and-shoot camera, discovering a passion that would shape my entire career.',
    },
    {
      year: '2010',
      title: 'Professional Start',
      description: 'Launched my professional photography business after years of learning and honing my craft through countless shoots.',
    },
    {
      year: '2012',
      title: 'First Major Award',
      description: 'Received recognition at the National Photography Awards, validating years of dedication to the art.',
    },
    {
      year: '2015',
      title: 'Studio Opening',
      description: 'Opened my first professional studio space, allowing for more creative control and expanded service offerings.',
    },
    {
      year: '2017',
      title: 'International Work',
      description: 'Began accepting international clients and destination shoots, expanding my creative horizons globally.',
    },
    {
      year: '2020',
      title: 'Present Day',
      description: 'Continuing to evolve and push creative boundaries while mentoring the next generation of photographers.',
    },
  ];

  return (
    <div className="about">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1 className="about-hero-title">ABOUT YOUR NAME</h1>
          <p className="about-hero-subtitle">
            Passionate photographer dedicated to capturing life's most meaningful moments
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="biography section">
        <div className="container">
          <div className="biography-grid">
            <div className="biography-image">
              <div className="image-placeholder">Profile Photo</div>
            </div>
            <div className="biography-content">
              <h2 className="section-title">My Biography</h2>
              <p>
                Photography has been my passion and profession for over 15 years. What started as
                a hobby during my college years quickly evolved into a lifelong pursuit of visual
                storytelling. I believe that every photograph has the power to freeze a moment in
                time, preserving emotions and memories for generations to come.
              </p>
              <p>
                My approach to photography is deeply personal. I take the time to understand my
                clients, their stories, and what they hope to capture. This connection allows me
                to create images that are not just technically excellent, but emotionally resonant.
              </p>
              <p>
                When I'm not behind the camera, you'll find me exploring new locations, studying
                the work of master photographers, or mentoring aspiring artists. I believe in
                continuous learning and pushing creative boundaries.
              </p>
              <p>
                I specialize in portrait, event, and commercial photography, bringing the same
                level of dedication and artistry to every project, regardless of size. Let's
                work together to create something beautiful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline section">
        <div className="container">
          <h2 className="section-title text-center">My Journey - A Timeline</h2>
          <div className="timeline-grid">
            {timeline.map((item, index) => (
              <div key={index} className="timeline-card">
                <span className="timeline-year">{item.year}</span>
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />
    </div>
  );
}

export default About;
