import React from 'react';
import { Link } from 'react-router-dom';


function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white py-8 mt-auto mb-0">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-wrap justify-between items-start">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
           
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Your Company Name. All Rights Reserved.
            </p>
          </div>
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link className="hover:text-blue-400 transition duration-300" to="/about">
                  About Us
                </Link>
              </li>
              <li>
                <Link className="hover:text-blue-400 transition duration-300" to="/contact">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link className="hover:text-blue-400 transition duration-300" to="/privacy">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-sm mb-2">
            Follow us on:
            <a href="https://twitter.com" className="ml-2 text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">Twitter</a>,
            <a href="https://facebook.com" className="ml-2 text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">Facebook</a>,
            <a href="https://instagram.com" className="ml-2 text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">Instagram</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
