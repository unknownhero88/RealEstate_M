import { Link, useNavigate } from "react-router-dom";
import { Home, LogOut, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav
      className="bg-white shadow-sm border-b border-gray-100 
                        sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Home className="h-7 w-7 text-green-600" />
            <span className="font-bold text-xl text-gray-800">RealEstate</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-600 hover:text-green-600 
                                       font-medium transition"
            >
              Properties
            </Link>

            {isAuthenticated ? (
              <>
                {/* Role-based dashboard link */}
                {user?.role === "SELLER" && (
                  <Link
                    to="/seller/dashboard"
                    className="text-gray-600 hover:text-green-600 
                                                   font-medium transition"
                  >
                    My Listings
                  </Link>
                )}
                {user?.role === "ADMIN" && (
                  <Link
                    to="/admin/dashboard"
                    className="text-gray-600 hover:text-green-600 
                                                   font-medium transition"
                  >
                    Admin
                  </Link>
                )}

                {/* User info */}
                <div
                  className="flex items-center gap-2 
                                                text-gray-700"
                >
                  <User className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-sm">{user?.fullName}</span>
                  <span
                    className="text-xs bg-green-100 
                                                     text-green-700 px-2 py-1 
                                                     rounded-full font-medium"
                  >
                    {user?.role}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 
                                               text-red-500 hover:text-red-700 
                                               font-medium transition"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button
                    className="text-gray-600 
                                                       hover:text-green-600 
                                                       font-medium transition"
                  >
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button
                    className="bg-green-600 
                                                       hover:bg-green-700 
                                                       text-white font-medium 
                                                       px-4 py-2 rounded-lg 
                                                       transition"
                  >
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="md:hidden border-t border-gray-100 py-4 
                                    flex flex-col gap-4"
          >
            <Link to="/" className="text-gray-600 font-medium">
              Properties
            </Link>
            {isAuthenticated ? (
              <>
                <span className="text-gray-700 font-medium">
                  {user?.fullName} ({user?.role})
                </span>
                <button
                  onClick={handleLogout}
                  className="text-red-500 font-medium text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 font-medium">
                  Login
                </Link>
                <Link to="/register" className="text-green-600 font-medium">
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
