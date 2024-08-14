import React from 'react';
import './Style/Footer.css'; // Make sure to create this CSS file with the provided styles

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2024 Your Company Name. All rights reserved.</p>
                <p>
                    <a href="/privacy-policy" className="footer-link">Privacy Policy</a> | 
                    <a href="/terms-of-service" className="footer-link">Terms of Service</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
