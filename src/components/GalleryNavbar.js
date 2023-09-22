import React from 'react';
import { FaSearch } from 'react-icons/fa';
import 'animate.css';
import { getAuth, signOut } from 'firebase/auth'; 
import { Auth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import React Toastify components and functions


const GalleryNavbar = ({ setSearchTerm, onSearch }) => {
  const navigate = useNavigate()
  const logout = async () => {
    const auth = getAuth();
  
    try {
      await signOut(auth);
      toast.success("Logout Successful!");
      navigate('/')
      // Redirect to the login page or perform any other necessary actions after logout
    } catch (error) {
      toast.error("Logout Unsuccessful!");
      console.error("Logout error:", error);
    }
  };
  
  

  const handleInputChange = (e) => {
    console.log('Input changed:', e.target.value);
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    onSearch();
  };
  const handleLogOut = () => {
    logout()
  console.log('Log Out Clicked')
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

        <button className='logout' onClick={handleLogOut}>
          Log Out
        </button>
      </nav>
    </div>
  );
};

export default GalleryNavbar;
