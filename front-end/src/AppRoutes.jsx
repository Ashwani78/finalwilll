import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import WillGenerator from "./WillGenerator";
import Signup from "./Signup";
import Login from "./Login";
import SubscriptionChoice from "./SubscriptionChoice";
import Dashboard from "./Dashboard";
import EditWill from "./EditWill";
import Home from "./Home";

const AppRoutes = ({ user, subscription }) => {
  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={user ? <Navigate to="/subscription" /> : <Login />}
      />
      <Route
        path="/signup"
        element={user ? <Navigate to="/subscription" /> : <Signup />}
      />

      <Route path="/edit-will/:id" element={<EditWill />} />

      {/* Protected routes */}
      <Route
        path="/subscription"
        element={user ? <SubscriptionChoice /> : <Navigate to="/login" />}
      />

      {/* Will Generator Form */}
      <Route
        path="/form"
        element={
          user ? (
            <WillGenerator subscription={subscription} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/login" />}
      />

      {/* Default redirect */}
      <Route
        path="/"
        element={user ? <Navigate to="/subscription" /> : <Home />}
      />

      <Route
        path="*"
        element={<Navigate to={user ? "/subscription" : "/login"} replace />}
      />
    </Routes>
  );
};

export default AppRoutes;
