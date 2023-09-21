import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './auth'; // Import your Firebase configuration

const ProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    // Use Firebase's onAuthStateChanged to listen for changes in user authentication status
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated
        setIsAuthenticated(true);
      } else {
        // User is not authenticated
        setIsAuthenticated(false);
      }
    });

    return () => {
      // Unsubscribe from the Firebase auth state observer when the component unmounts
      unsubscribe();
    };
  }, []);

  if (isAuthenticated === null) {
    // Firebase is still determining the authentication state
    return null; // You can show a loading spinner or another component here
  }

  if (isAuthenticated) {
    // User is authenticated, render the protected route
    return <Route element={element} />;
  } else {
    // User is not authenticated, redirect to the login page or another page of your choice
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
