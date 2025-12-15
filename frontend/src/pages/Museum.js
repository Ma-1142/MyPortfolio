import { useState, useEffect } from 'react';
import './Museum.css';

function Museum() {
  const [categories, setCategories] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingPictures, setLoadingPictures] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Fetch categories on mount
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/categories/')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
        // Auto-select first category if available
        if (data.length > 0) {
          setSelectedCategory(data[0]);
        }
      })
      .catch((err) => {
        console.error('Error fetching categories:', err);
        setLoading(false);
      });
  }, []);

  // Fetch pictures when category changes
  useEffect(() => {
    if (selectedCategory) {
      setLoadingPictures(true);
      fetch(`http://127.0.0.1:8000/api/pictures/?category=${selectedCategory.id}`)
        .then((response) => response.json())
        .then((data) => {
          setPictures(data);
          setLoadingPictures(false);
        })
        .catch((err) => {
          console.error('Error fetching pictures:', err);
          setPictures([]);
          setLoadingPictures(false);
        });
    }
  }, [selectedCategory]);

  return (
    <div className="museum">
      <div className={`museum-layout ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {/* Sidebar Toggle Button */}
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {sidebarOpen ? '◀' : '▶'}
        </button>

        {/* Sidebar */}
        <aside className={`museum-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-header">
            <h2>Categories</h2>
          </div>
          <nav className="sidebar-nav">
            {loading ? (
              <p className="loading-text">Loading...</p>
            ) : (
              categories.map((category) => (
                <button
                  key={category.id}
                  className={`sidebar-item ${selectedCategory?.id === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.name}
                </button>
              ))
            )}
          </nav>
        </aside>

        {/* Gallery Section */}
        <section className="gallery">
          {loadingPictures ? (
            <div className="loading">Loading pictures...</div>
          ) : pictures.length === 0 ? (
            <div className="no-pictures">
              <p>No pictures available in this category yet.</p>
            </div>
          ) : (
            <div className="gallery-list">
              {pictures.map((picture, index) => (
                <div key={picture.id} className={`gallery-row ${index % 2 === 0 ? 'image-left' : 'image-right'}`}>
                  <div className="gallery-image-section">
                    {picture.image ? (
                      <img src={picture.image} alt={picture.title} />
                    ) : (
                      <div className="image-placeholder">{picture.title}</div>
                    )}
                  </div>
                  <div className="gallery-info-section">
                    <div className="gallery-info-content">
                      <h3 className="gallery-title">{picture.title}</h3>
                      {picture.artist && (
                        <p className="gallery-artist">By {picture.artist}</p>
                      )}
                      {picture.description && (
                        <p className="gallery-description">{picture.description}</p>
                      )}
                      <div className="gallery-meta">
                        {picture.status === 'available' && picture.price && (
                          <span className="gallery-price">${picture.price}</span>
                        )}
                        {picture.status === 'not_for_sale' && (
                          <span className="gallery-status">Not For Sale</span>
                        )}
                        {picture.status === 'discuss_pricing' && (
                          <span className="gallery-status">Contact for Pricing</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Museum;
