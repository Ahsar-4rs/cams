import React, { createContext, useContext, useState, useEffect } from 'react';

// Define privilege levels as constants for better maintainability
export const PRIVILEGE_LEVELS = {
    GUEST: 0,        // Common people - basic access
    STUDENT: 1,      // Students - basic + account & most tabs
    FACULTY: 2,      // Authorized faculty - adds health review privileges
    CLUB_REP: 3,     // Club representatives - adds social events access
    ADMIN: 4         // Administrator - full access
};

// Define access rights for each privilege level
export const ACCESS_RIGHTS = {
    [PRIVILEGE_LEVELS.GUEST]: {
        canAccessHome: true,
        canAccessEvents: true,
        canAccessAbout: true,
        canAccessContact: true,
        canAccessAccount: false,
        canAccessHealth: false,
        canAccessInfra: false,
        canAccessEmergency: false,
        canManageEvents: false,
        canReviewHealth: false,
        canAccessReports: false,
        canAlterSystem: false
    },
    [PRIVILEGE_LEVELS.STUDENT]: {
        canAccessHome: true,
        canAccessEvents: true,
        canAccessAbout: true,
        canAccessContact: true,
        canAccessAccount: true,
        canAccessHealth: true,
        canAccessInfra: true,
        canAccessEmergency: true,
        canManageEvents: false,
        canReviewHealth: false,
        canAccessReports: true,
        canAlterSystem: false
    },
    [PRIVILEGE_LEVELS.FACULTY]: {
        canAccessHome: true,
        canAccessEvents: true,
        canAccessAbout: true,
        canAccessContact: true,
        canAccessAccount: true,
        canAccessHealth: true,
        canAccessInfra: true,
        canAccessEmergency: true,
        canManageEvents: false,
        canReviewHealth: true,
        canAccessReports: true,
        canAlterSystem: false
    },
    [PRIVILEGE_LEVELS.CLUB_REP]: {
        canAccessHome: true,
        canAccessEvents: true,
        canAccessAbout: true,
        canAccessContact: true,
        canAccessAccount: true,
        canAccessHealth: true,
        canAccessInfra: true,
        canAccessEmergency: true,
        canManageEvents: true,
        canReviewHealth: false,
        canAccessReports: false,
        canAlterSystem: false
    },
    [PRIVILEGE_LEVELS.ADMIN]: {
        canAccessHome: true,
        canAccessEvents: true,
        canAccessAbout: true,
        canAccessContact: true,
        canAccessAccount: true,
        canAccessHealth: true,
        canAccessInfra: true,
        canAccessEmergency: true,
        canManageEvents: true,
        canReviewHealth: true,
        canAccessReports: true,
        canAlterSystem: true
    }
};

const SessionContext = createContext();

export function SessionProvider({ children }) {
    // Initialize with GUEST privileges or retrieve from localStorage
    const [privilegeLevel, setPrivilegeLevel] = useState(() => {
        const savedLevel = localStorage.getItem('privilegeLevel');
        return savedLevel ? JSON.parse(savedLevel) : PRIVILEGE_LEVELS.GUEST;
    });

    // Update localStorage whenever privilegeLevel changes
    useEffect(() => {
        localStorage.setItem('privilegeLevel', JSON.stringify(privilegeLevel));
    }, [privilegeLevel]);

    // For testing purposes - hardcoded user types
    const loginAs = (userType) => {
        switch(userType) {
            case 'student':
                setPrivilegeLevel(PRIVILEGE_LEVELS.STUDENT);
                break;
            case 'faculty':
                setPrivilegeLevel(PRIVILEGE_LEVELS.FACULTY);
                break;
            case 'clubRep':
                setPrivilegeLevel(PRIVILEGE_LEVELS.CLUB_REP);
                break;
            case 'admin':
                setPrivilegeLevel(PRIVILEGE_LEVELS.ADMIN);
                break;
            default:
                setPrivilegeLevel(PRIVILEGE_LEVELS.GUEST);
        }
    };

    // Get current user's access rights
    const getCurrentAccessRights = () => {
        return ACCESS_RIGHTS[privilegeLevel] || ACCESS_RIGHTS[PRIVILEGE_LEVELS.GUEST];
    };

    return (
        <SessionContext.Provider value={{ 
            privilegeLevel, 
            loginAs, 
            getCurrentAccessRights,
            isGuest: privilegeLevel === PRIVILEGE_LEVELS.GUEST,
            isStudent: privilegeLevel === PRIVILEGE_LEVELS.STUDENT,
            isFaculty: privilegeLevel === PRIVILEGE_LEVELS.FACULTY,
            isClubRep: privilegeLevel === PRIVILEGE_LEVELS.CLUB_REP,
            isAdmin: privilegeLevel === PRIVILEGE_LEVELS.ADMIN
        }}>
            {children}
        </SessionContext.Provider>
    );
}

export function useSession() {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
} 