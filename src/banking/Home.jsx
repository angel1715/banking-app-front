import Navigation from "./Navigation";
import Footer from "./Footer";

function Home() {
  return (
    <div className="hero-container">
      <Navigation />

      {/* Main Hero */}
      <div className="home-hero">
        <div className="hero-content">
          <h1 className="hero-title">Your Online Bank</h1>
          <p className="hero-description">
            Send and receive money anywhere, anytime. Fast. Secure. Reliable.
          </p>
          <div className="hero-buttons">
            <a href="/register" className="btn-primary">Get Started</a>
            <a href="/login" className="btn-secondary">Login</a>
          </div>
        </div>
      </div>

      {/* Benefits sesion */}
      <section className="features">
        <div className="feature">
          <h3>⚡ Instant Transfers</h3>
          <p>Move your money across the globe in seconds with low fees.</p>
        </div>
        <div className="feature">
          <h3>🔒 Bank-Level Security</h3>
          <p>Your transactions are protected with advanced encryption.</p>
        </div>
        <div className="feature">
          <h3>📱 Mobile Banking</h3>
          <p>Access your bank anytime from your mobile device.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;