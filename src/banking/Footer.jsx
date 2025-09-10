function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Logo + description */}
        <div className="footer-section">
          <h2 className="footer-logo">AG-Bank</h2>
          <p className="footer-text">
            Your trusted online bank. Secure, fast and reliable banking services at your fingertips.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Services</a></li>
            
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3 className="footer-title">Contact</h3>
          <p>Email: angelgarci310@gmail.com</p>
          <p>Phone: +1 829 747 0508</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} MyBank. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;