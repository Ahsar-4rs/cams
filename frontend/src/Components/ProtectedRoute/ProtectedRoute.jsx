import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSession } from '../../context/SessionContext';

function ProtectedRoute({ requiredAccess, children }) {
    const { getCurrentAccessRights } = useSession();
    const rights = getCurrentAccessRights();

    console.log("Rights : ", rights);
    console.log("Required Access: ",requiredAccess);
    
    // Check if the user has the required access right
    if (!rights[requiredAccess]) {
        // Redirect to home page if unauthorized
        return <Navigate to="/Home" replace />;
    }
    
    return children;
}

export default ProtectedRoute;