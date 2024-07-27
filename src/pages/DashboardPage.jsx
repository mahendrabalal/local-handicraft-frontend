import React from "react";
import { Link, Outlet} from "react-router-dom";

function DashboardPage() {
    return (
      <div className="dashboard">
        <nav className="dashboard-nav">
          <ul>
            <li>
              <Link to="/dashboard/home">Home</Link>
            </li>
            <li>
              <Link to="/dashboard/profile">Profile</Link>
            </li>
            <li>
              <Link to="/dashboard/settings">Settings</Link>
            </li>
          </ul>
        </nav>
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    );
  }

  export default DashboardPage;