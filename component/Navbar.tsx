import Link from "next/link";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#e3f2fd" }}
      data-bs-theme="light"
    >
      <div className="container">
        <Link className="navbar-brand" href="/">
          Monthly Bills Tracker
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" href="/">
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" href="/bills">
                Bills
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" href="/bill-item">
                Bill Item
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" href="/summary-card">
                Summary Card
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
