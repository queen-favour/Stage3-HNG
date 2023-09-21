import React, { useState } from 'react';
import { auth } from '../auth'; // Imported the firebase.js file you created in your src folder
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import React Toastify components and functions
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for React Toastify

function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonLoader, setButtonLoader] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setEmail('');
        setButtonLoader(false);
        toast.success('Login successful!', {
          autoClose: 2000,
          onClose: () => {
            navigate('/gallery');
          },
        });
      })
      .catch(() => {
        setPassword('');
        setButtonLoader(false);
        toast.error('Wrong email or password', {
          autoClose: 3000,
        });
      });
  };

  return (
    <div className='login-container'>
      <ToastContainer /> {/* Add the ToastContainer component */}
      <form className="form" onSubmit={handleSubmit}>
      <h1 className='text'>Drag and drop</h1>
      <br/>
      <h3 className='login-head'>Log In</h3>

      <br/>
        <label>E-mail
          <input
            type="email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <label>
          Password
          <input
            type="password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <br />
        <div className="button-container">
            {buttonLoader ? (
     <div className="spinner"></div>
            ) : (
            <button
              type="submit"
              className="button"
            >
              LOG IN
            </button>
          )}
      </div>
      <br/>
      <br/>
      <br/>
      <span className="form-span">
          Don't have an account?{" "} &nbsp;
          <Link to="/signup" className="text-decoration">
            Sign Up
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Form;
