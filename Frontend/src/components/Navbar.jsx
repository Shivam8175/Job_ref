import { Link } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-primary-600">
                Candidate Referral
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <Link
              to="/"
              className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/login"
              className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Signup
            </Link>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
