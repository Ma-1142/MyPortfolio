import { useState, useEffect, useRef, useCallback } from 'react';
import './Museum.css';

function Museum() {
  const [categories, setCategories] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingPictures, setLoadingPictures] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [immersiveProgress, setImmersiveProgress] = useState(0);
  const galleryRef = useRef(null);

  // Scroll-driven immersive mode
  const handleScroll = useCallback(() => {
    if (!galleryRef.current) return;

    const scrollY = window.scrollY;
    let newProgress = 0;

    // Gradual exit when near top of page
    const exitThreshold = 200; // pixels from top to fully exit immersive
    if (scrollY < exitThreshold) {
      newProgress = (scrollY / exitThreshold) * 0.5; // Scale down so it's subtle near top
    } else {
      const rows = galleryRef.current.querySelectorAll('.gallery-row');
      if (rows.length > 0) {
        rows.forEach((row) => {
          const rect = row.getBoundingClientRect();
          const viewportHeight = window.innerHeight;

          // Calculate how much of the row is "engaged" (scrolled into view)
          // Progress starts when row top reaches 80% of viewport, full at 20%
          const startThreshold = viewportHeight * 0.8;
          const endThreshold = viewportHeight * 0.2;

          if (rect.top < startThreshold && rect.bottom > endThreshold) {
            // Row is in the engagement zone
            const progress = Math.min(1, Math.max(0,
              (startThreshold - rect.top) / (startThreshold - endThreshold)
            ));
            newProgress = Math.max(newProgress, progress);
          }
        });
      }
    }

    setImmersiveProgress(newProgress);
  }, []);

  // Set up scroll listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Apply immersive class to body for navbar hiding
  useEffect(() => {
    if (immersiveProgress > 0.1) {
      document.body.classList.add('museum-immersive');
      document.body.style.setProperty('--immersive-progress', immersiveProgress);
    } else {
      document.body.classList.remove('museum-immersive');
      document.body.style.removeProperty('--immersive-progress');
    }

    return () => {
      document.body.classList.remove('museum-immersive');
      document.body.style.removeProperty('--immersive-progress');
    };
  }, [immersiveProgress]);

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

  // Calculate inline styles based on immersive progress
  const sidebarStyle = {
    opacity: 1 - immersiveProgress,
    transform: `translateX(${-immersiveProgress * 100}%)`,
    pointerEvents: immersiveProgress > 0.5 ? 'none' : 'auto',
  };

  const toggleStyle = {
    opacity: 1 - immersiveProgress,
    pointerEvents: immersiveProgress > 0.5 ? 'none' : 'auto',
  };

  return (
    <div className={`museum ${immersiveProgress > 0.1 ? 'immersive-active' : ''}`}>
      <div className={`museum-layout ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {/* Sidebar Toggle Button */}
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          style={toggleStyle}
        >
          {sidebarOpen ? '◀' : '▶'}
        </button>

        {/* Sidebar */}
        <aside
          className={`museum-sidebar ${sidebarOpen ? 'open' : 'closed'}`}
          style={sidebarStyle}
        >
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
        <section
          className="gallery"
          ref={galleryRef}
          style={{
            marginLeft: sidebarOpen ? `${180 * (1 - immersiveProgress)}px` : 0,
          }}
        >
          {loadingPictures ? (
            <div className="loading">Loading pictures...</div>
          ) : pictures.length === 0 ? (
            <div className="no-pictures">
              <p>No pictures available in this category yet.</p>
            </div>
          ) : (
            <div className="gallery-list">
              {pictures.map((picture, index) => (
                <div
                  key={picture.id}
                  className={`gallery-row ${index % 2 === 0 ? 'info-left' : 'info-right'}`}
                >
                  <div className="gallery-image-section">
                    {picture.image ? (
                      <img src={picture.image} alt={picture.title} />
                    ) : (
                      <div className="image-placeholder">{picture.title}</div>
                    )}
                    {/* Info overlay on the side of the photo */}
                    <div className="gallery-info-overlay">
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
