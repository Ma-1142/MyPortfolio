import { Link } from 'react-router-dom';
import FAQ from '../components/FAQ';
import './Services.css';

function Services() {
  const serviceCategories = [
    {
      id: 1,
      title: 'Portrait Photography',
      description: 'Professional portrait sessions that capture your unique personality and style.',
      packages: [
        {
          name: 'Basic Portrait',
          price: '$250',
          duration: '1 hour session',
          features: ['15 edited photos', 'One outfit change', 'Online gallery', 'Digital downloads'],
        },
        {
          name: 'Premium Portrait',
          price: '$400',
          duration: '2 hour session',
          features: ['30 edited photos', 'Multiple outfit changes', 'Location of choice', 'Print release', 'Online gallery'],
          featured: true,
        },
        {
          name: 'Family Portrait',
          price: '$350',
          duration: '1.5 hour session',
          features: ['25 edited photos', 'Up to 6 people', 'Outdoor location', 'Digital downloads'],
        },
      ],
    },
    {
      id: 2,
      title: 'Event Photography',
      description: 'Comprehensive coverage of your special events and celebrations.',
      packages: [
        {
          name: 'Small Event',
          price: '$800',
          duration: '4 hours coverage',
          features: ['100+ edited photos', 'One photographer', 'Online gallery', 'Digital downloads'],
        },
        {
          name: 'Wedding Package',
          price: '$1,500',
          duration: 'Full day coverage',
          features: ['500+ edited photos', 'Two photographers', 'Engagement session', 'Album design', 'Print release'],
          featured: true,
        },
        {
          name: 'Corporate Event',
          price: 'Custom',
          duration: 'Varies',
          features: ['Unlimited photos', 'Multiple photographers', 'Same-day previews', 'Fast turnaround'],
        },
      ],
    },
    {
      id: 3,
      title: 'Commercial Photography',
      description: 'Professional imagery for businesses, brands, and marketing campaigns.',
      packages: [
        {
          name: 'Product Shoot',
          price: '$500',
          duration: 'Half day',
          features: ['Up to 20 products', 'White background', 'Basic retouching', 'Commercial license'],
        },
        {
          name: 'Brand Campaign',
          price: '$700',
          duration: 'Full day',
          features: ['Lifestyle shots', 'Multiple setups', 'Advanced editing', 'Commercial license', 'Creative direction'],
          featured: true,
        },
        {
          name: 'Custom Project',
          price: 'Custom',
          duration: 'Project-based',
          features: ['Tailored to needs', 'Concept development', 'Full production', 'Unlimited revisions'],
        },
      ],
    },
  ];

  return (
    <div className="services">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <h1 className="services-hero-title">DIVERSE PHOTOGRAPHY OFFERINGS</h1>
          <p className="services-hero-subtitle">
            Professional photography services tailored to your unique needs and vision
          </p>
        </div>
      </section>

      {/* Services Sections */}
      {serviceCategories.map((category) => (
        <section key={category.id} className="service-category section">
          <div className="container">
            <h2 className="category-title">{category.title}</h2>
            <p className="category-description">{category.description}</p>

            <div className="packages-grid">
              {category.packages.map((pkg, index) => (
                <div key={index} className={`package-card ${pkg.featured ? 'featured' : ''}`}>
                  {pkg.featured && <span className="featured-badge">Most Popular</span>}
                  <h3 className="package-name">{pkg.name}</h3>
                  <div className="package-price">{pkg.price}</div>
                  <div className="package-duration">{pkg.duration}</div>
                  <ul className="package-features">
                    {pkg.features.map((feature, i) => (
                      <li key={i}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className={`btn ${pkg.featured ? 'btn-primary' : 'btn-outline'}`}>
                    Book Now
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
}

export default Services;
