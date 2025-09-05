import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div className="nav-container">
      <nav className="navbar navbar-expand-lg">
        <div class="container-fluid">
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
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse menu-container"
            id="navbarSupportedContent"
          >
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
              <li class="nav-item">
                <a
                  class="nav-link text-light fs-4"
                  aria-current="page"
                  href="/"
                >
                  Home
                </a>
              </li>
              <li class="nav-item">
                <Link class="nav-link text-light fs-4" to="/services">
                  Services
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  class="nav-link text-light fs-4"
                  to="/about"
                  aria-expanded="false"
                >
                  About us
                </Link>
              </li>
            </ul>

            <div className="register-login-container">
              <Link
                className="log-in text-dark btn btn-lg bg-light"
                to="/login"
              >
                Log in
              </Link>
              <Link
                className="register text-dark btn btn-lg bg-light"
                to="/register"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Navigation;
