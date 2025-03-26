import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on route change
    }, [pathname]); // Run effect when pathname changes

    return null; // This component does not render anything
};

export default ScrollToTop; 