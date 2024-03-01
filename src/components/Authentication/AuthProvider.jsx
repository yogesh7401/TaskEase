/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"

const UserContext = createContext();

export const useAuth = () => {
  return useContext(UserContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)
  const auth = getAuth()

  // validate session 
  const isAuthenticated = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setError(null)
        setUser(user)
      }
      setLoading(false)
    });
  }

  // Login function 
  const login = async (userData) => {
    setLoading(true)
    try {
      signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then(() => {
        isAuthenticated()
        setError(null)
      })
      .catch((error) => {
        setError(error.code);
        setLoading(false)
      })
    } catch (error) {
      setError(error);
    }
  };
  
  // Register function 
  const register = async (userData) => {
    if (userData.password !== userData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const auth = getAuth();
    try {
      let resp = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      setUser(resp.user)
    } catch (error) {
      setError(error.message);
    }
  }

  // Logout function 
  const logout = async () => {
    await signOut(auth)
    setUser(null);
    setLoading(true)
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading, register, error, isAuthenticated, setError }}>
      {children}
    </UserContext.Provider>
  );
};
