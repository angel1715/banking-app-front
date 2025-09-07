import axios from "axios";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/**
 * Register Component
 * Handles the registration of new users by submitting their personal details
 * to the backend. It includes validation for phone number input, feedback on
 * account creation, and redirects the user to the login page after success.
 */
function Register() {
  const navigate = useNavigate();

  // Local state for form data
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    phone: "",
    email: "",
    password: "",
  });

  // State to manage submission button status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reference to the success message div
  const accountCreatedMessageRef = useRef(null);

  const { fName, lName, phone, email, password } = formData;

  /**
   * Handles input changes for text, email, and password fields.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
   */
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  /**
   * Ensures phone input only allows digits (0–9).
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
   */
  const handlePhoneNumberInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setFormData({ ...formData, phone: value });
    }
  };

  /**
   * Handles form submission. Sends registration data to the backend,
   * displays a success message, and redirects to login after 3 seconds.
   * Shows an error if the email is already in use.
   * @param {React.FormEvent<HTMLFormElement>} e - Form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const baseUrl =
        "https://bankingap.herokuapp.com/banking/saveNewUser";
      await axios.post(baseUrl, formData);

      if (accountCreatedMessageRef.current) {
        accountCreatedMessageRef.current.style.display = "block";
      }

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      if (error.response?.status === 400) {
        alert("Email is already in use");
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      {/* Navigation Bar */}
      <div className="nav-container">
        <nav className="navbar navbar-expand-lg bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand fs-1 text-light" href="/">
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

      {/* Success Message */}
      <div
        className="create-account-message bg-light"
        ref={accountCreatedMessageRef}
        style={{ display: "none" }}
      >
        <p className="create-account-message-title text-center mt-3">
          Account successfully created
        </p>
      </div>

      {/* Registration Form */}
      <div className="register-form-container container bg-light">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-5 register-form-title">
            Create new account
          </h2>

          {/* First Name */}
          <label className="form-label">First Name</label>
          <input
            type="text"
            pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+"
            title="Only letters and spaces allowed"
            className="form-control mb-4 fs-5"
            value={fName}
            name="fName"
            onChange={handleInputChange}
            required
          />

          {/* Last Name */}
          <label className="form-label">Last Name</label>
          <input
            type="text"
            pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+"
            title="Only letters and spaces allowed"
            className="form-control mb-4 fs-5"
            value={lName}
            name="lName"
            onChange={handleInputChange}
            required
          />

          {/* Phone Number */}
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control mb-4 fs-5"
            value={phone}
            name="phone"
            onChange={handlePhoneNumberInputChange}
            minLength={10}
            maxLength={10}
            required
          />

          {/* Email */}
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control mb-4 fs-5"
            value={email}
            name="email"
            onChange={handleInputChange}
            required
          />

          {/* Password */}
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control mb-4 fs-5"
            value={password}
            name="password"
            onChange={handleInputChange}
            required
          />

          {/* Terms Checkbox */}
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="termsCheck"
              required
            />
            <label className="form-check-label" htmlFor="termsCheck">
              Accept and continue
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn bg-dark text-light btn-lg register-submit-btn"
            disabled={isSubmitting}
            style={{ cursor: isSubmitting ? "not-allowed" : "pointer" }}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
