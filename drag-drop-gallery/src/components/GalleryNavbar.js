import React from 'react';
import { FaSearch } from 'react-icons/fa';
import 'animate.css';

const GalleryNavbar = ({ setSearchTerm, onSearch }) => {
  const handleInputChange = (e) => {
    console.log('Input changed:', e.target.value);
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    onSearch();
  };

  return (
    <div className="navbar animate__animated animate__fadeInDown">
      <h2>pink<span className='logo-span'>Gallery</span></h2>
      <nav className="nav">
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Search images"
            className="search-input"
            onChange={handleInputChange}
          />
          {/* <button type="submit" className="search-button">
            <FaSearch />
          </button> */}
        </form>
      </nav>
    </div>
  );
};

export default GalleryNavbar;
