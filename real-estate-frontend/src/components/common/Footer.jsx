import { Link } from "react-router-dom";
import {
  Home,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 — Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Home className="h-7 w-7 text-green-500" />
              <span className="text-white font-bold text-xl">RealEstate</span>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              India's trusted platform to buy, sell, and rent residential and
              commercial properties. Find your dream home today.
            </p>

            <div className="flex items-center gap-3">
              {[
                {
                  icon: Facebook,
                  href: "https://facebook.com",
                  color: "hover:text-blue-500",
                },
                {
                  icon: Twitter,
                  href: "https://twitter.com",
                  color: "hover:text-sky-400",
                },
                {
                  icon: Instagram,
                  href: "https://instagram.com",
                  color: "hover:text-pink-500",
                },
                {
                  icon: Linkedin,
                  href: "https://linkedin.com",
                  color: "hover:text-blue-400",
                },
                {
                  icon: Youtube,
                  href: "https://youtube.com",
                  color: "hover:text-red-500",
                },
              ].map(({ icon: Icon, href, color }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition duration-200 ${color}`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-5 pb-2 border-b border-gray-700">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {[
                { label: "Home", path: "/" },
                { label: "Buy Property", path: "/properties?type=sale" },
                { label: "Rent Property", path: "/properties?type=rent" },
                { label: "List Property", path: "/seller/add-property" },
                { label: "Seller Dashboard", path: "/seller/dashboard" },
                { label: "My Wishlist", path: "/wishlist" },
                { label: "Compare Properties", path: "/compare" },
              ].map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-gray-400 hover:text-green-400 text-sm transition duration-200 flex items-center gap-2 group"
                  >
                    <span className="text-green-600 group-hover:translate-x-1 transition-transform duration-200">
                      ›
                    </span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Property Types */}
          <div>
            <h3 className="text-white font-semibold text-base mb-5 pb-2 border-b border-gray-700">
              Property Types
            </h3>

            <ul className="space-y-3">
              {[
                { label: "Apartments", path: "/properties?category=apartment" },
                {
                  label: "Independent Houses",
                  path: "/properties?category=house",
                },
                { label: "Villas", path: "/properties?category=villa" },
                { label: "Plots & Land", path: "/properties?category=plot" },
                {
                  label: "Commercial Spaces",
                  path: "/properties?category=commercial",
                },
                { label: "PG / Hostels", path: "/properties?category=pg" },
                { label: "New Projects", path: "/properties?status=new" },
              ].map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-gray-400 hover:text-green-400 text-sm transition duration-200 flex items-center gap-2 group"
                  >
                    <span className="text-green-600 group-hover:translate-x-1 transition-transform duration-200">
                      ›
                    </span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h3 className="text-white font-semibold text-base mb-5 pb-2 border-b border-gray-700">
              Contact Us
            </h3>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm leading-relaxed">
                  123 Real Estate Tower, MG Road, Bhopal, Madhya Pradesh —
                  462001
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-green-500 shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="text-gray-400 hover:text-green-400 text-sm transition duration-200"
                >
                  +91 98765 43210
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-green-500 shrink-0" />
                <a
                  href="mailto:support@realestate.com"
                  className="text-gray-400 hover:text-green-400 text-sm transition duration-200"
                >
                  support@realestate.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
