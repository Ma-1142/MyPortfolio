import './App.css';
import { useState, useEffect } from 'react';

function App() {
  // State to store categories from the API
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingPictures, setLoadingPictures] = useState(false);
  const [error, setError] = useState(null);

  // Fetch categories from Django API when component mounts
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/categories/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        return response.json();
      })
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Fetch pictures when a category is selected
  useEffect(() => {
    if (selectedCategory) {
      setLoadingPictures(true);
      fetch(`http://127.0.0.1:8000/api/pictures/?category=${selectedCategory.id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch pictures');
          }
          return response.json();
        })
        .then(data => {
          setPictures(data);
          setLoadingPictures(false);
        })
        .catch(err => {
          console.error('Error fetching pictures:', err);
          setPictures([]);
          setLoadingPictures(false);
        });
    } else {
      setPictures([]);
    }
  }, [selectedCategory]);

  // Handle category click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>eMuseum Photography Gallery</h1>
        <p>Explore our photography collection</p>
      </header>

      <main className="main-content">
        <h2>Browse by Category</h2>

        {loading && <p>Loading categories...</p>}
        {error && <p className="error">Error: {error}</p>}

        {/* Category grid */}
        <div className="category-grid">
          {categories.map(category => (
            <div
              key={category.id}
              className={`category-card ${selectedCategory?.id === category.id ? 'selected' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </div>
          ))}
        </div>

        {/* Show selected category */}
        {selectedCategory && (
          <div className="selected-category-info">
            <p>Selected: <strong>{selectedCategory.name}</strong></p>
          </div>
        )}

        {/* Pictures gallery */}
        {selectedCategory && (
          <div className="pictures-section">
            <h3>{selectedCategory.name} Gallery</h3>

            {loadingPictures && <p>Loading pictures...</p>}

            {!loadingPictures && pictures.length === 0 && (
              <p className="no-pictures">No pictures available in this category yet.</p>
            )}

            <div className="pictures-list">
              {pictures.map((picture, index) => (
                <div key={picture.id} className={`picture-row ${index % 2 === 0 ? 'image-left' : 'image-right'}`}>
                  {/* Image Section */}
                  <div className="picture-image-section">
                    {picture.image ? (
                      <img
                        src={picture.image}
                        alt={picture.title}
                        className="picture-image"
                      />
                    ) : (
                      <div className="picture-no-image">No image available</div>
                    )}
                  </div>

                  {/* Details Section */}
                  <div className="picture-details-section">
                    <div className="picture-details-content">
                      <h4>{picture.title}</h4>
                      {picture.artist && (
                        <p className="picture-artist">{picture.artist}</p>
                      )}
                      {picture.description && (
                        <p className="picture-description">{picture.description}</p>
                      )}
                      {picture.status === 'available' && picture.price && (
                        <p className="picture-price">${picture.price}</p>
                      )}
                      {picture.status === 'not_for_sale' && (
                        <p className="picture-availability">Not For Sale</p>
                      )}
                      {picture.status === 'discuss_pricing' && (
                        <p className="picture-availability">Contact owner to discuss pricing</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
