import { useAuth } from "./components/Authentication/AuthProvider";
import Login from "./components/Authentication/Login";
import Loader from "./components/Loader";
import Register from "./components/Authentication/Register";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import ProtectedRoute from "./components/Authentication/ProtectedRoute";
import { useEffect } from "react";


export default function App() {
  
  const { loading, isAuthenticated } = useAuth()

  useEffect(() => {
      isAuthenticated()
  },[isAuthenticated])
  
  if (loading) {
    return <div className="min-h-screen flex w-full">
      <Loader />
    </div>
  }

  return <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>} />
    </Routes>
  </Router>
}