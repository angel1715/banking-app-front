import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // Icon library

/**
 * Login Component
 * Renders a login form that allows the user to authenticate using email and password.
 * On successful login, the JWT token is saved to localStorage and the user
 * is redirected to the dashboard.
 */
function Login() {
  const navigate = useNavigate();

  // Component state
  const [user, setUser] = useState(null);
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [badCredentials, setBadCredentials] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Handles the user login by sending credentials to the backend.
   * If successful, saves the JWT in localStorage and navigates to the dashboard.
   * If credentials are invalid, shows an error message.
   *
   * @param {React.FormEvent} e - The form submit event
   */
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents parameters from being shown in the URL

    try {
      const baseUrl =
        "https://bankingap-afdd1a65c364.herokuapp.com/banking/login";
      const response = await axios.post(
        `${baseUrl}/${emailLogin}/${passwordLogin}`
      );

      const { user, jwt } = response.data;

      // Save JWT in local storage
      localStorage.setItem("jwt", jwt);
      setUser(user);

      // Redirect to dashboard
      navigate("/dashboard", {
        state: { user, jwt, emailLogin, passwordLogin },
      });
    } catch (error) {
      if (error.response?.status === 401) {
        setBadCredentials("Email or Password incorrect!");
      } else {
        setBadCredentials("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="login-container">
      {/* Navigation Bar */}
      <div className="nav-container">
        <nav className="navbar navbar-expand-lg bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand fs-1 text-light" href="#">
              AG-Bank
            </a>
            <button
              className="navbar-toggler text-light bg-light"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse menu-container"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
                <li className="nav-item">
                  <a className="nav-link text-light fs-4" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-light fs-4" to="/services">
                    Services
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-light fs-4" to="/about">
                    About us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      {/* Login Form */}
      <div className="login-form-container container bg-light">
        <h2 className="text-center mb-5 login-form-title">Log in</h2>
        {badCredentials && (
          <p className="text-center bad-credentials">{badCredentials}</p>
        )}

        <form className="login-form" onSubmit={handleLogin}>
          {/* Email Field */}
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="inputEmail"
              className="form-control mb-4 fs-5"
              name="email"
              required
              value={emailLogin}
              onChange={(e) => setEmailLogin(e.target.value.trim())}
            />
          </div>

          {/* Password Field with Toggle */}
          <div className="mb-3 login-password-container">
            <label htmlFor="inputPassword" className="form-label">
              Password
            </label>
            <span
              className="show-password-icon"
              onClick={() => setShowPassword(!showPassword)}
              role="button"
              tabIndex={0}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </span>
            <input
              type={showPassword ? "text" : "password"}
              id="inputPassword"
              className="form-control mb-4 fs-5 w-full p-2 pr-10 border rounded-lg"
              name="password"
              required
              value={passwordLogin}
              onChange={(e) => setPasswordLogin(e.target.value.trim())}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn bg-dark text-light btn-lg login-submit-btn"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
