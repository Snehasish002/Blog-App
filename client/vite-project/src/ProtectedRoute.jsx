import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const ProtectedRoute = ({ element }) => {
  const { userInfo } = useContext(UserContext);
  if (!userInfo?.id) {
    return <Navigate to="/login" />;
  }
  return element;
};

export default ProtectedRoute;
